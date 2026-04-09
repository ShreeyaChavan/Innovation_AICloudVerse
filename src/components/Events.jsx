// src/components/Events.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";

const Events = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    organType: "",
    bloodGroup: "",
    age: "",
    weight: "",
    medicalCondition: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [smsStatus, setSmsStatus] = useState("");
  const [matchResult, setMatchResult] = useState(null); // NEW: match info
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
    const TWILIO_ACCOUNT_SID = "ACa5fc90bb02ed7a17f3f69af8a9e58fc2";
    const TWILIO_AUTH_TOKEN = "0fb1797506e5386ce4ef04af883a7707";
    const TWILIO_PHONE_NUMBER = "+16064883603";
    const formattedNumber = mobileNumber.startsWith('+') 
      ? mobileNumber 
      : `+91${mobileNumber}`;
    const message = `Thank you ${name} for registering as an organ donor with Anudaan. Your decision will save lives!`;
    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
    
    try {
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${auth}` },
        body: new URLSearchParams({ To: formattedNumber, From: TWILIO_PHONE_NUMBER, Body: message })
      });
      const data = await response.json();
      if (response.ok) {
        setSmsStatus("✅ Confirmation SMS sent to your mobile number!");
        return true;
      } else {
        setSmsStatus("⚠️ SMS could not be sent, but your registration was saved.");
        return false;
      }
    } catch (error) {
      setSmsStatus("⚠️ Could not send SMS, but your registration was saved.");
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
      // 1. Save donor to backend API
      const donorResponse = await fetch(
        "https://eli5afar3j.execute-api.ap-south-1.amazonaws.com/dev/donors",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ donor_id: Date.now().toString(), ...formData, timestamp: new Date().toISOString() }),
        }
      );
      const donorData = await donorResponse.json();
      console.log("Donor saved:", donorData);

      if (donorResponse.ok) {
        await sendTwilioSMS(formData.mobileNumber, formData.name);

        // 2. Call matching Lambda
        const matchResponse = await fetch(
          "https://1ypciholac.execute-api.ap-south-1.amazonaws.com/matchDonorToRecipient",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              donorId: donorData.donor_id, 
              donorName: formData.name, 
              organType: formData.organType, 
              bloodGroup: formData.bloodGroup, 
              age: formData.age, 
              weight: formData.weight, 
              medicalCondition: formData.medicalCondition 
            }),
          }
        );

        const matchData = await matchResponse.json();
        if (matchResponse.ok && matchData.recipientName) {
          setMatchResult({ matched: true, recipientName: matchData.recipientName });
        } else {
          setMatchResult({ matched: false });
        }
      }

      setSubmitted(true);
      setTimeout(() => navigate("/home"), 5000);

    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-10"><BackgroundLayout /></div>
      <Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Register as an Organ Donor
        </h1>
        <p className="text-center text-purple-200 mb-8">
          Your decision can save multiple lives. Fill the form below to join the donor registry.
        </p>

        {submitted ? (
          <div className="bg-green-900/50 border border-green-500 rounded-xl p-6 text-center">
            <p className="text-green-300 text-lg">✅ Thank you for registering as a donor!</p>
            {smsStatus && <p className="text-purple-200 mt-2 text-sm">{smsStatus}</p>}
            {matchResult && matchResult.matched && (
              <p className="text-cyan-300 mt-2 text-lg">🎉 You have a match with <b>{matchResult.recipientName}</b>!</p>
            )}
            {matchResult && !matchResult.matched && (
              <p className="text-yellow-300 mt-2 text-lg">⚠️ No match found yet. We'll notify you once a recipient is available.</p>
            )}
            <p className="text-purple-200 mt-2">Redirecting to home...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 space-y-4">
            {/* ... form inputs remain the same ... */}
            {/* Full Name, Mobile, Organ Type, Blood Group, Age, Weight, Medical Condition */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-bold text-white hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Register as Donor"}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Events;
