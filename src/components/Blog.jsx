// src/components/Blog.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";

const Blog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    requiredOrgan: "",
    bloodGroup: "",
    age: "",
    weight: "",
    medicalCondition: "",
    urgency: "Medium",
    waitingTime: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [smsStatus, setSmsStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "mobileNumber") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Twilio SMS function
  const sendTwilioSMS = async (mobileNumber, name) => {
    // Your Twilio credentials
    const TWILIO_ACCOUNT_SID = "ACa5fc90bb02ed7a17f3f69af8a9e58fc2";
    const TWILIO_AUTH_TOKEN = "0fb1797506e5386ce4ef04af883a7707";
    const TWILIO_PHONE_NUMBER = "+16064883603";
    
    // Format Indian number (add +91)
    const formattedNumber = mobileNumber.startsWith('+') 
      ? mobileNumber 
      : `+91${mobileNumber}`;
    
    const message = `Thank you ${name} for registering with Anudaan. You have been added to the organ recipient waiting list. We will notify you when a match is found.`;
    
    // Basic authentication for Twilio API
    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
    
    try {
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`
        },
        body: new URLSearchParams({
          To: formattedNumber,
          From: TWILIO_PHONE_NUMBER,
          Body: message
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log("✅ SMS sent successfully!", data);
        setSmsStatus("✅ Confirmation SMS sent to your mobile number!");
        return true;
      } else {
        console.error("SMS failed:", data);
        setSmsStatus("⚠️ SMS could not be sent, but your request was saved.");
        return false;
      }
    } catch (error) {
      console.error("Network error sending SMS:", error);
      setSmsStatus("⚠️ Could not send SMS, but your request was saved.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        requiredOrgan: formData.requiredOrgan.toLowerCase(),
        bloodGroup: formData.bloodGroup,
        medicalCondition: formData.medicalCondition,
        urgency: formData.urgency.toLowerCase()
      };

      console.log("Sending:", payload);

      // 1. Submit recipient request to your API
      const res = await fetch("https://fagw10bmre.execute-api.ap-south-1.amazonaws.com/addRecipient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log("Response:", data);

      // 2. Send SMS confirmation (only if API call succeeded)
      if (res.ok) {
        await sendTwilioSMS(formData.mobileNumber, formData.name);
      }

      setSubmitted(true);
      setTimeout(() => navigate("/home"), 3000);

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>
      <Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Request an Organ
        </h1>
        <p className="text-center text-purple-200 mb-8">
          Fill this form to be added to the waiting list. We'll match you with a compatible donor.
        </p>

        {submitted ? (
          <div className="bg-green-900/50 border border-green-500 rounded-xl p-6 text-center">
            <p className="text-green-300 text-lg">✅ Request submitted! You've been added to the waiting list.</p>
            {smsStatus && <p className="text-purple-200 mt-2 text-sm">{smsStatus}</p>}
            <p className="text-purple-200 mt-2">Redirecting to home...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 space-y-4">
            <div>
              <label className="block text-purple-300 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400" 
              />
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Mobile Number</label>
              <input 
                type="tel" 
                name="mobileNumber" 
                required 
                value={formData.mobileNumber} 
                onChange={handleChange} 
                placeholder="10-digit mobile number" 
                className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400" 
              />
              <p className="text-gray-500 text-xs mt-1">You will receive a confirmation SMS on this number</p>
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Required Organ Type</label>
              <select 
                name="requiredOrgan" 
                required 
                value={formData.requiredOrgan} 
                onChange={handleChange} 
                className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white"
              >
                <option value="">Select Organ</option>
                <option>Kidney</option>
                <option>Liver</option>
                <option>Heart</option>
                <option>Lungs</option>
                <option>Pancreas</option>
                <option>Cornea</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Blood Group</label>
              <select 
                name="bloodGroup" 
                required 
                value={formData.bloodGroup} 
                onChange={handleChange} 
                className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 mb-1">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  required 
                  value={formData.age} 
                  onChange={handleChange} 
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white" 
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-1">Weight (kg)</label>
                <input 
                  type="number" 
                  name="weight" 
                  required 
                  value={formData.weight} 
                  onChange={handleChange} 
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white" 
                />
              </div>
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Medical Condition</label>
              <textarea 
                name="medicalCondition" 
                rows="2" 
                value={formData.medicalCondition} 
                onChange={handleChange} 
                className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 mb-1">Urgency</label>
                <select 
                  name="urgency" 
                  value={formData.urgency} 
                  onChange={handleChange} 
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-xl font-bold text-white hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Submit Request"}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Blog;
