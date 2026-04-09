// src/components/Blog.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";
// import { dynamodb } from "../aws-config";

const Blog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",        // NEW FIELD
    requiredOrgan: "",
    bloodGroup: "",
    age: "",
    weight: "",
    medicalCondition: "",
    urgency: "Medium",
    waitingTime: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "mobileNumber") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    const newReceiver = {
      receiverId: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString(),
      status: "waiting",
    };
    // Save to localStorage
    const receivers = JSON.parse(localStorage.getItem("organReceivers") || "[]");
    receivers.push(newReceiver);
    localStorage.setItem("organReceivers", JSON.stringify(receivers));

    // If using DynamoDB, uncomment the following:
    /*
    const params = {
      TableName: 'Anudaan-Receivers',
      Item: newReceiver,
    };
    try {
      await dynamodb.put(params).promise();
    } catch (error) {
      console.error("Error saving to DynamoDB:", error);
      alert("Error saving data. Please try again.");
      return;
    }
    */

    setSubmitted(true);
    setTimeout(() => navigate("/home"), 2000);
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
            <p className="text-purple-200 mt-2">Redirecting to home...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 space-y-4">
            <div>
              <label className="block text-purple-300 mb-1">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white" />
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Mobile Number</label>
              <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} placeholder="10-digit mobile number" className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white" />
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Required Organ Type</label>
              <select name="requiredOrgan" required value={formData.requiredOrgan} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white">
                <option value="">Select Organ</option>
                <option>Kidney</option><option>Liver</option><option>Heart</option>
                <option>Lungs</option><option>Pancreas</option><option>Cornea</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Blood Group</label>
              <select name="bloodGroup" required value={formData.bloodGroup} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white">
                <option value="">Select Blood Group</option>
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 mb-1">Age</label>
                <input type="number" name="age" required value={formData.age} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white" />
              </div>
              <div>
                <label className="block text-purple-300 mb-1">Weight (kg)</label>
                <input type="number" name="weight" required value={formData.weight} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white" />
              </div>
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Medical Condition</label>
              <textarea name="medicalCondition" rows="2" value={formData.medicalCondition} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 mb-1">Urgency</label>
                <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white">
                  <option>High</option><option>Medium</option><option>Low</option>
                </select>
              </div>
             
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-xl font-bold text-white hover:opacity-90 transition">
              Submit Request
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Blog;
