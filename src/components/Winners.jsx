// src/components/Winners.jsx - Coordinator Dashboard (Matching)
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";

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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedDonors = JSON.parse(localStorage.getItem("organDonors") || "[]");
    const storedReceivers = JSON.parse(localStorage.getItem("organReceivers") || "[]");
    setDonors(storedDonors);
    setReceivers(storedReceivers);
    generateMatches(storedDonors, storedReceivers);
  };

  const generateMatches = (donorsList, receiversList) => {
    const newMatches = [];
    for (const receiver of receiversList) {
      for (const donor of donorsList) {
        if (donor.organType === receiver.requiredOrgan && isBloodCompatible(donor.bloodGroup, receiver.bloodGroup)) {
          newMatches.push({
            id: `${donor.id}-${receiver.id}`,
            donorName: donor.name,
            donorBlood: donor.bloodGroup,
            donorOrgan: donor.organType,
            recipientName: receiver.name,
            recipientBlood: receiver.bloodGroup,
            recipientOrgan: receiver.requiredOrgan,
            urgency: receiver.urgency,
            matchDate: new Date().toLocaleString(),
          });
          break; // Match each receiver with first compatible donor
        }
      }
    }
    setMatches(newMatches);
  };

  return (
    <div className="min-h-screen text-white">
      <BackgroundLayout />
      <Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Coordinator Dashboard
        </h1>
        <p className="text-purple-200 mb-8">Matched Donors and Recipients</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-purple-500/30">
            <h2 className="text-xl font-bold text-cyan-300">Total Donors</h2>
            <p className="text-3xl font-mono">{donors.length}</p>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-purple-500/30">
            <h2 className="text-xl font-bold text-cyan-300">Total Recipients</h2>
            <p className="text-3xl font-mono">{receivers.length}</p>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md rounded-2xl overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-purple-900/30 border-b border-purple-500/30">
              <tr>
                <th className="p-3">Donor Name</th>
                <th>Donor Blood</th>
                <th>Organ</th>
                <th>Recipient Name</th>
                <th>Recipient Blood</th>
                <th>Urgency</th>
              </tr>
            </thead>
            <tbody>
              {matches.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-purple-300">No matches found yet. Register donors and recipients.</td>
                </tr>
              ) : (
                matches.map((m) => (
                  <tr key={m.id} className="border-b border-purple-500/20">
                    <td className="p-3">{m.donorName}</td>
                    <td>{m.donorBlood}</td>
                    <td>{m.donorOrgan}</td>
                    <td className="font-medium text-cyan-300">{m.recipientName}</td>
                    <td>{m.recipientBlood}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${m.urgency === "High" ? "bg-red-900/50" : m.urgency === "Medium" ? "bg-yellow-900/50" : "bg-green-900/50"}`}>
                        {m.urgency}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
