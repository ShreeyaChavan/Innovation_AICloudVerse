 // src/components/Events.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";
// If using DynamoDB, import aws-config; otherwise ignore
// import { dynamodb } from "../aws-config";

const Events = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",        // NEW FIELD
    organType: "",
    bloodGroup: "",
    age: "",
    weight: "",
    medicalCondition: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    // For mobile number, allow only digits and limit to 10
    if (e.target.name === "mobileNumber") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic mobile number validation
  if (formData.mobileNumber.length !== 10) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  try {
    const response = await fetch(
      "https://eli5afar3j.execute-api.ap-south-1.amazonaws.com/dev/donors",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donor_id: Date.now().toString(), // ✅ IMPORTANT FIX
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    setSubmitted(true);
    setTimeout(() => navigate("/home"), 2000);

  } catch (error) {
    console.error("Error:", error);
    alert("Error submitting form");
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
          Register as an Organ Donor
        </h1>
        <p className="text-center text-purple-200 mb-8">
          Your decision can save multiple lives. Fill the form below to join the donor registry.
        </p>

        {submitted ? (
          <div className="bg-green-900/50 border border-green-500 rounded-xl p-6 text-center">
            <p className="text-green-300 text-lg">✅ Thank you for registering as a donor!</p>
            <p className="text-purple-200 mt-2">Redirecting to home...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 space-y-4">
            <div>
              <label className="block text-purple-300 mb-1">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Mobile Number</label>
              <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} placeholder="10-digit mobile number" className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Organ Type</label>
              <select name="organType" required value={formData.organType} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white">
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
              <label className="block text-purple-300 mb-1">Medical Condition (if any)</label>
              <textarea name="medicalCondition" rows="2" value={formData.medicalCondition} onChange={handleChange} className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white"></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-bold text-white hover:opacity-90 transition">
              Register as Donor
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Events; just change for this no other changes
