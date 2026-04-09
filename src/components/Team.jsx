// src/components/Team.jsx - Waiting List (Receivers List)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";

const Team = () => {
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    // Sample data based on the images you provided
    const sampleData = [
      {
        id: 1,
        name: "Ananya",
        bloodGroup: "B+",
        organType: "Heart",
        urgency: "High",
        status: "Waiting",
        time: "2026-04-09T15:30:00Z",
        hospitalId: "9897",
        age: 45
      },
      {
        id: 2,
        name: "Jahnvi",
        bloodGroup: "B+",
        organType: "Lungs",
        urgency: "Medium",
        status: "Waiting",
        time: "2026-04-09T07:45:36Z",
        hospitalId: "8451",
        age: 38
      },
      {
        id: 3,
        name: "Sharvari",
        bloodGroup: "B",
        organType: "Lungs",
        urgency: "Medium",
        status: "Waiting",
        time: "2026-04-09T07:45:33Z",
        hospitalId: "8451",
        age: 42
      },
      {
        id: 4,
        name: "Hariom",
        bloodGroup: "B",
        organType: "Lungs",
        urgency: "Medium",
        status: "Waiting",
        time: "2026-04-09T07:45:31Z",
        hospitalId: "8451",
        age: 35
      },
      {
        id: 5,
        name: "Priya Jadhav",
        bloodGroup: "B",
        organType: "Heart",
        urgency: "Medium",
        status: "Waiting",
        time: "2026-04-09T19:44:51Z",
        hospitalId: "8149",
        age: 66
      },
      {
        id: 6,
        name: "Shreya",
        bloodGroup: "B",
        organType: "Eyes",
        urgency: "Medium",
        status: "Waiting",
        time: "2026-04-09T16:28:20Z",
        hospitalId: "1234",
        age: 98
      },
      {
        id: 7,
        name: "Vedika",
        bloodGroup: "B",
        organType: "Lungs",
        urgency: "Medium",
        status: "Waiting",
        time: "2026-04-09T07:45:35Z",
        hospitalId: "8451",
        age: 38
      },
      {
        id: 8,
        name: "Namita",
        bloodGroup: "B",
        organType: "Lungs",
        urgency: "Medium",
        status: "Waiting",
        time: "2026-04-09T07:45:36Z",
        hospitalId: "8451",
        age: 38
      },
      {
        id: 9,
        name: "Shri",
        bloodGroup: "B",
        organType: "Lungs",
        urgency: "Medium",
        status: "Waiting",
        time: "2026-04-09T07:45:35Z",
        hospitalId: "8451",
        age: 38
      },
      {
        id: 10,
        name: "Rahul Kale",
        bloodGroup: "O",
        organType: "Kidney",
        urgency: "High",
        status: "Allocated",
        time: "2026-04-09T07:12:32Z",
        hospitalId: "1775",
        age: 47,
        allocated: true
      },
      {
        id: 11,
        name: "Mahima Sharma",
        bloodGroup: "A+",
        organType: "Kidney",
        urgency: "Medium",
        status: "Waiting",
        time: "2026-04-09T15:30:00Z",
        hospitalId: "9876",
        age: 45
      }
    ];

    // Try to load from localStorage first, otherwise use sample data
    const stored = JSON.parse(localStorage.getItem("organReceivers") || "[]");
    if (stored.length > 0) {
      // Sort by urgency: High > Medium > Low
      const urgencyOrder = { High: 1, Medium: 2, Low: 3 };
      const sorted = [...stored].sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
      setReceivers(sorted);
    } else {
      setReceivers(sampleData);
    }
  }, []);

  const getUrgencyColor = (urgency) => {
    if (urgency === "High") return "bg-red-900/50 text-red-300";
    if (urgency === "Medium") return "bg-yellow-900/50 text-yellow-300";
    return "bg-green-900/50 text-green-300";
  };

  const getStatusColor = (status) => {
    if (status === "Allocated") return "bg-green-900/50 text-green-300";
    if (status === "In Progress") return "bg-blue-900/50 text-blue-300";
    return "bg-yellow-900/50 text-yellow-300";
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
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
                  <th className="p-3 text-left">Blood Group</th>
                  <th className="p-3 text-left">Organ Type</th>
                  <th className="p-3 text-left">Age</th>
                  <th className="p-3 text-left">Urgency</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Hospital ID</th>
                  <th className="p-3 text-left">Registered On</th>
                </tr>
              </thead>
              <tbody>
                {receivers.map((r) => (
                  <tr key={r.id} className="border-b border-purple-500/20 hover:bg-purple-900/20">
                    <td className="p-3 font-medium">{r.name}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-purple-900/50 text-purple-300">
                        {r.bloodGroup}
                      </span>
                    </td>
                    <td className="p-3">{r.organType}</td>
                    <td className="p-3">{r.age}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(r.urgency)}`}>
                        {r.urgency}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(r.status)}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{r.hospitalId}</td>
                    <td className="p-3 text-xs">{formatTime(r.time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-2xl font-bold text-purple-400">{receivers.length}</div>
            <div className="text-xs text-purple-300">Total Patients</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-2xl font-bold text-red-400">{receivers.filter(r => r.urgency === "High").length}</div>
            <div className="text-xs text-purple-300">High Urgency</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-2xl font-bold text-green-400">{receivers.filter(r => r.status === "Allocated").length}</div>
            <div className="text-xs text-purple-300">Allocated</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-2xl font-bold text-yellow-400">{receivers.filter(r => r.status === "Waiting").length}</div>
            <div className="text-xs text-purple-300">Waiting</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
