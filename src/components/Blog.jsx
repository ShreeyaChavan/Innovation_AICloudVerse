// src/components/Blog.jsx
import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";

const stories = [
  {
    title: "Rescue operation saves 47 stranded families",
    date: "April 7, 2026",
    summary: "Using real-time request mapping, our team coordinated boats and food supplies to Karvenagar within 2 hours.",
    icon: "🚤",
    link: "#",
  },
  {
    title: "Medical camp reaches remote village",
    date: "April 5, 2026",
    summary: "A medical team was dispatched to Hinjewadi after 12 high‑severity medical requests were received through CrisisConnect.",
    icon: "🏥",
    link: "#",
  },
  {
    title: "How to stay safe during a flood",
    date: "Safety Guide",
    summary: "Avoid floodwaters, keep emergency numbers handy, and use CrisisConnect to request help immediately.",
    icon: "📢",
    link: "#",
  },
  {
    title: "Volunteer coordination success",
    date: "April 3, 2026",
    summary: "Over 200 volunteers registered via CrisisConnect to assist in rescue and relief efforts across Pune.",
    icon: "🤝",
    link: "#",
  },
];

const Blog = () => {
  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>

      {/* Header - now visible */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Success Stories & Safety
        </h1>
        <p className="text-center text-purple-200 mb-12">
          Real impact from the field and essential guidelines.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black/40 backdrop-blur-md rounded-2xl border border-purple-500/30 p-6 hover:scale-[1.02] transition-all"
            >
              <div className="text-5xl mb-3">{story.icon}</div>
              <h3 className="text-xl font-bold text-white">{story.title}</h3>
              <p className="text-purple-300 text-sm mt-1">{story.date}</p>
              <p className="text-gray-300 mt-3">{story.summary}</p>
              <a href={story.link} className="inline-block mt-4 text-cyan-400 text-sm hover:underline">
                Read more →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Emergency Helplines Banner */}
        <div className="mt-12 bg-purple-900/30 border border-purple-500/40 rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold text-cyan-300">⚠️ Emergency Helplines</h2>
          <p className="text-white mt-2">National Disaster Response Force (NDRF): <strong>011-24363260</strong></p>
          <p className="text-white">State Emergency Operations Centre: <strong>1077</strong></p>
          <p className="text-purple-200 text-sm mt-3">
            Use <a href="/register" className="text-cyan-400 underline">CrisisConnect</a> to request food, water, shelter, or rescue.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Blog;