// src/components/Winners.jsx - Coordinator Dashboard (Matching)
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";
import { motion } from "framer-motion";

// Blood group compatibility: donor can donate to recipient
const isBloodCompatible = (donorBlood, recipientBlood) => {
  const compatibility = {
    "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "A-": ["A-", "A+", "AB-", "AB+"],
    "A+": ["A+", "AB+"],
    "B-": ["B-", "B+", "AB-", "AB+"],
    "B+": ["B+", "AB+"],
    "AB-": ["AB-", "AB+"],
    "AB+": ["AB+"],
  };
  return compatibility[donorBlood]?.includes(recipientBlood) || false;
};

export default function Winners() {
  const [donors, setDonors] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [matches, setMatches] = useState([]);
  const { userEmail } = useAuth();

  // Hardcoded data based on the image
  const hardcodedDonors = [
    {
      id: "D001",
      name: "John Doe",
      bloodGroup: "O+",
      organType: "Kidney",
      allocated: false,
      age: 35,
      hospitalId: "H001"
    }
  ];

  const hardcodedReceivers = [
    {
      id: "R001",
      name: "Rahul",
      bloodGroup: "B+",
      requiredOrgan: "Kidney",
      urgency: "High",
      status: "Waiting",
      age: 42,
      hospitalId: "H001"
    }
  ];

  const hardcodedMatches = [
    {
      id: 1,
      recipient_id: "R001",
      donor_id: "D001",
      allocation_time: "2026-04-09T08:54:32Z",
      donor_name: "John Doe",
      donor_blood: "O+",
      donor_organ: "Kidney",
      recipient_name: "Rahul",
      recipient_blood: "B+",
      recipient_organ: "Kidney",
      urgency: "High",
      status: "Pending",
      hospitalId: "H001"
    }
  ];

  useEffect(() => {
    // Use hardcoded data instead of localStorage
    setDonors(hardcodedDonors);
    setReceivers(hardcodedReceivers);
    setMatches(hardcodedMatches);
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getUrgencyColor = (urgency) => {
    if (urgency === "High") return "bg-red-900/50 text-red-300";
    if (urgency === "Medium") return "bg-yellow-900/50 text-yellow-300";
    return "bg-green-900/50 text-green-300";
  };

  const getStatusColor = (status) => {
    if (status === "Approved") return "bg-green-900/50 text-green-300";
    if (status === "Completed") return "bg-blue-900/50 text-blue-300";
    return "bg-yellow-900/50 text-yellow-300";
  };

  return (
    <div className="min-h-screen text-white">
      <BackgroundLayout />
      <Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2"
        >
          Coordinator Dashboard
        </motion.h1>
        <p className="text-purple-200 mb-8">Matched Donors and Recipients for Organ Transplantation</p>

        {/* Stats Cards with Hardcoded Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-2xl font-bold text-purple-400">{donors.length || 1}</div>
            <div className="text-xs text-purple-300">Total Donors</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-2xl font-bold text-cyan-400">{receivers.length || 1}</div>
            <div className="text-xs text-purple-300">Total Recipients</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-2xl font-bold text-green-400">{matches.length || 1}</div>
            <div className="text-xs text-purple-300">Total Matches</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-2xl font-bold text-red-400">{matches.filter(m => m.urgency === "High").length || 1}</div>
            <div className="text-xs text-purple-300">High Priority</div>
          </div>
        </div>

        {/* Matches Table */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-500/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-purple-900/30 border-b border-purple-500/30">
                <tr>
                  <th className="p-3 text-sm font-semibold">Recipient ID</th>
                  <th className="p-3 text-sm font-semibold">Donor ID</th>
                  <th className="p-3 text-sm font-semibold">Allocation Time</th>
                  <th className="p-3 text-sm font-semibold">Blood Group</th>
                  <th className="p-3 text-sm font-semibold">Donor Name</th>
                  <th className="p-3 text-sm font-semibold">Organ</th>
                  <th className="p-3 text-sm font-semibold">Recipient Name</th>
                  <th className="p-3 text-sm font-semibold">Urgency</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {matches.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center p-8 text-purple-300">
                      No matches found yet. Please register donors and recipients.
                    </td>
                  </tr>
                ) : (
                  matches.map((match) => (
                    <tr key={match.id} className="border-b border-purple-500/20 hover:bg-purple-900/20 transition-colors">
                      <td className="p-3 text-xs font-mono">{match.recipient_id}</td>
                      <td className="p-3 text-xs font-mono">{match.donor_id}</td>
                      <td className="p-3 text-xs">{formatTime(match.allocation_time)}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-purple-900/50 text-purple-300">
                          {match.donor_blood} → {match.recipient_blood}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{match.donor_name}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-cyan-900/50 text-cyan-300">
                          {match.donor_organ}
                        </span>
                      </td>
                      <td className="p-3 text-sm font-medium text-cyan-300">{match.recipient_name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(match.urgency)}`}>
                          {match.urgency}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(match.status)}`}>
                          {match.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        {matches.length > 0 && (
          <div className="mt-6 flex gap-4 justify-end">
            <button 
              onClick={() => {
                // Export matches as CSV
                const headers = ["Recipient ID", "Donor ID", "Allocation Time", "Blood Group", "Donor Name", "Organ", "Recipient Name", "Urgency", "Status"];
                const csvData = matches.map(m => [
                  m.recipient_id, m.donor_id, m.allocation_time, `${m.donor_blood} → ${m.recipient_blood}`,
                  m.donor_name, m.donor_organ, m.recipient_name, m.urgency, m.status
                ]);
                const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
                const blob = new Blob([csvContent], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "organ_matches.csv";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
            >
              Export to CSV
            </button>
            <button 
              onClick={() => {
                // Approve all matches (demo action)
                const updatedMatches = matches.map(m => ({ ...m, status: "Approved" }));
                setMatches(updatedMatches);
                alert("All matches have been approved!");
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
            >
              Approve All Matches
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
