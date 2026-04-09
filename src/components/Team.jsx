// src/components/Team.jsx - Waiting List (Receivers List)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";

const Team = () => {
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("organReceivers") || "[]");
    // Sort by urgency: High > Medium > Low
    const urgencyOrder = { High: 1, Medium: 2, Low: 3 };
    const sorted = [...stored].sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
    setReceivers(sorted);
  }, []);

  const getUrgencyColor = (urgency) => {
    if (urgency === "High") return "bg-red-900/50 text-red-300";
    if (urgency === "Medium") return "bg-yellow-900/50 text-yellow-300";
    return "bg-green-900/50 text-green-300";
  };

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>
      <Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4"
        >
          Organ Recipient Waiting List
        </motion.h1>
        <p className="text-center text-purple-200 mb-12">
          Patients awaiting organ transplants. Urgency determines priority.
        </p>

        {receivers.length === 0 ? (
          <div className="text-center text-purple-300 bg-black/40 rounded-xl p-8">No recipients registered yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden">
              <thead className="bg-purple-900/30 border-b border-purple-500/30">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Organ Needed</th>
                  <th className="p-3 text-left">Blood Group</th>
                  <th className="p-3 text-left">Age</th>
                  <th className="p-3 text-left">Urgency</th>
                  <th className="p-3 text-left">Waiting Time</th>
                  <th className="p-3 text-left">Registered On</th>
                </tr>
              </thead>
              <tbody>
                {receivers.map((r) => (
                  <tr key={r.id} className="border-b border-purple-500/20 hover:bg-purple-900/20">
                    <td className="p-3 font-medium">{r.name}</td>
                    <td className="p-3">{r.requiredOrgan}</td>
                    <td className="p-3">{r.bloodGroup}</td>
                    <td className="p-3">{r.age}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(r.urgency)}`}>
                        {r.urgency}
                      </span>
                    </td>
                    <td className="p-3">{r.waitingTime}</td>
                    <td className="p-3 text-xs">{new Date(r.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Team;
