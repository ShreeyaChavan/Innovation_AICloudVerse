// src/components/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Recipient, Kidney Transplant",
    text: "After waiting for 26 months, OrganConnect matched me with a donor within 2 weeks of registration. The platform gave me a second chance at life.",
  },
  {
    name: "Dr. Sneha Kapoor",
    role: "Transplant Coordinator, City Hospital",
    text: "The matching algorithm is remarkably efficient. We've reduced our organ allocation time by over 40% since integrating with this system.",
  },
  {
    name: "Amit Sharma",
    role: "Donor's Family Representative",
    text: "Knowing that my brother's organs saved three lives through this platform brought our family immense peace during a difficult time.",
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
          className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent mb-4"
        >
          Voices of Impact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Real stories from donors, recipients, and medical professionals
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg"
            >
              {/* Quote icon - SVG instead of emoji */}
              <div className="mb-4">
                <svg className="w-8 h-8 text-red-400/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">"{t.text}"</p>
              <div className="mt-5 pt-3 border-t border-white/10">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-blue-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider">Trusted by leading hospitals across India</p>
          <div className="flex flex-wrap justify-center gap-8 mt-4 opacity-60">
            <span className="text-gray-400 text-xs">Apollo Hospitals</span>
            <span className="text-gray-400 text-xs">Fortis Healthcare</span>
            <span className="text-gray-400 text-xs">AIIMS</span>
            <span className="text-gray-400 text-xs">Manipal Hospitals</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
