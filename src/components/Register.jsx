// Register.jsx – complete replacement
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";

const helpTypes = ["Food", "Water", "Medical", "Shelter", "Rescue"];

export default function Register() {
  const [form, setForm] = useState({ type: "Food", location: "", severity: "Medium", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = { id: Date.now(), ...form, timestamp: new Date().toISOString(), status: "pending" };
    const existing = JSON.parse(localStorage.getItem("crisisRequests") || "[]");
    localStorage.setItem("crisisRequests", JSON.stringify([newRequest, ...existing]));
    setSubmitted(true);
    setForm({ type: "Food", location: "", severity: "Medium", description: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen text-white">
      <BackgroundLayout />
      <Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Request Help</h1>
          <p className="text-purple-200 mt-2">Fill the form – aid will reach you as soon as possible.</p>
        </motion.div>

        <motion.div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-10"><div className="text-green-400 text-6xl mb-4">✓</div><h2 className="text-2xl">Request Sent!</h2></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div><label className="block text-purple-300 mb-1">Type of Help</label><select className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>{helpTypes.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className="block text-purple-300 mb-1">Location</label><input type="text" className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required /></div>
              <div><label className="block text-purple-300 mb-1">Severity</label><div className="flex gap-4">{["Low","Medium","High"].map(s => <label key={s} className="flex items-center gap-1"><input type="radio" name="severity" value={s} checked={form.severity === s} onChange={e => setForm({...form, severity: e.target.value})} className="accent-purple-500" />{s}</label>)}</div></div>
              <div><label className="block text-purple-300 mb-1">Details</label><textarea rows="3" className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-3 rounded-xl font-bold">Submit Request</button>
            </form>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}