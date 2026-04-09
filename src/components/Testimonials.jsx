// src/components/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul M.",
    role: "Recipient",
    text: "After waiting for 2 years, OrganConnect found me a matching kidney donor. I'm forever grateful.",
    icon: "❤️",
  },
  {
    name: "Dr. Sneha K.",
    role: "Transplant Coordinator",
    text: "The matching system is incredibly efficient. We've reduced waiting times by 40%.",
    icon: "🏥",
  },
  {
    name: "Amit S.",
    role: "Donor's Family",
    text: "Knowing my brother's organs saved 3 lives gives our family immense peace.",
    icon: "🕊️",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-12"
        >
          Real Stories, Real Impact
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 text-center"
            >
              <div className="text-5xl mb-4">{t.icon}</div>
              <p className="text-white/90 italic">"{t.text}"</p>
              <div className="mt-4">
                <p className="font-bold text-purple-300">{t.name}</p>
                <p className="text-sm text-purple-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
