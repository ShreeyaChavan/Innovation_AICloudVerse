import React from "react";
import { motion } from "framer-motion";

// Team data for crisis response
const teamMembers = [
  {
    id: 1,
    name: "Aditi Sharma",
    role: "Incident Commander",
    bio: "Oversees all disaster response operations, coordinates with government agencies.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: 2,
    name: "Rohan Deshmukh",
    role: "Logistics Head",
    bio: "Manages resource allocation, supply chains, and volunteer deployment.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: 3,
    name: "Priya Iyer",
    role: "Tech Lead (AWS)",
    bio: "Architects the cloud infrastructure ensuring 99.9% availability.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: 4,
    name: "Vikram Patil",
    role: "Field Coordinator - Pune East",
    bio: "On-ground rescue operations leader, direct contact for affected zones.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: 5,
    name: "Neha Gupta",
    role: "Medical Response Lead",
    bio: "Coordinates medical camps, supplies, and emergency health services.",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: 6,
    name: "Siddharth Nair",
    role: "Volunteer Manager",
    bio: "Recruits, trains, and deploys volunteers to crisis zones.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    social: { linkedin: "#", twitter: "#" },
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6"
        >
          Crisis Response Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-purple-200 text-lg mb-12 max-w-2xl mx-auto"
        >
          Meet the dedicated professionals managing real-time disaster relief operations.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-500/30 shadow-xl"
            >
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <p className="text-purple-400 font-semibold mt-1">{member.role}</p>
                <p className="text-gray-300 text-sm mt-3">{member.bio}</p>
                <div className="flex gap-4 mt-5">
                  <a href={member.social.linkedin} className="text-purple-400 hover:text-purple-300 transition">🔗 LinkedIn</a>
                  <a href={member.social.twitter} className="text-purple-400 hover:text-purple-300 transition">🐦 Twitter</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center p-6 bg-purple-900/20 rounded-2xl border border-purple-500/30"
        >
          <p className="text-purple-200">🚨 Want to join as a volunteer? <a href="/register" className="text-cyan-400 underline">Sign up here</a> to help in active crisis zones.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;