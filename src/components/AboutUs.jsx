// src/components/AboutUs.jsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "./Section";
import BackgroundLayout from "./BackgroundLayout";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({ 
      opacity: 1, 
      scale: 1, 
      transition: { delay: i * 0.1, duration: 0.4 } 
    })
  };

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>

      <Section className="py-20 relative z-20 overflow-hidden">
        <div ref={sectionRef} className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-blue-400 to-white bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              About OrganConnect
            </motion.h2>
            <motion.div
              className="w-20 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>

          {/* Smaller, professional cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card 1 - Mission */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To create a seamless, transparent, and efficient organ donation matching platform that reduces waiting times and saves lives through technology and compassion.
              </p>
            </motion.div>

            {/* Card 2 - Vision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                A world where no patient dies waiting for an organ, and every donation opportunity is utilized to its fullest potential through intelligent matching.
              </p>
            </motion.div>

            {/* Card 3 - How It Works (span both on larger screens? No, keep grid) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">How It Works</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {[
                  { step: "01", title: "Donor Registration", desc: "Register as a donor with medical details" },
                  { step: "02", title: "Recipient Request", desc: "Patients request needed organs" },
                  { step: "03", title: "AI Matching", desc: "System matches based on compatibility" },
                  { step: "04", title: "Life Saved", desc: "Coordinator facilitates transplant" }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-red-400">{item.step}</div>
                    <div className="font-medium text-white text-sm mt-1">{item.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { value: "1,20,000+", label: "Patients Waiting" },
              { value: "8", label: "Lives Per Donor" },
              { value: "500+", label: "Transplants" },
              { value: "99%", label: "Match Accuracy" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/5"
              >
                <div className="text-xl md:text-2xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7 }}
          >
            <a href="/events">
              <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                Become a Donor Today
              </button>
            </a>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default AboutUs;
