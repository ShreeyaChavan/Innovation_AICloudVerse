// src/components/AboutUs.jsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "./Section";
import BackgroundLayout from "./BackgroundLayout";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const leftCard = {
    hidden: { opacity: 0, x: -140, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightCard = {
    hidden: { opacity: 0, x: 140, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const tiltHoverProps = {
    rotateX: -6,
    rotateY: 6,
    scale: 1.03,
    transition: { type: "spring", stiffness: 150, damping: 12 },
  };

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>

      <Section className="min-h-screen py-20 relative z-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div ref={sectionRef} className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About OrganConnect
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              className="group relative"
              variants={leftCard}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={tiltHoverProps}
              style={{ perspective: 1000 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-300" />
              <div className="relative bg-n-8/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden h-full flex flex-col">
                <motion.div className="relative z-10" variants={floatingAnimation} initial="initial" animate="animate">
                  <div className="flex items-center justify-center mb-6">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed font-light mb-6">
                    OrganConnect is a platform dedicated to bridging the gap between organ donors and recipients. We believe every life is precious and timely access to organs can save thousands.
                  </p>
                  <motion.ul className="space-y-3">
                    {[
                      "Connect donors with recipients seamlessly",
                      "Reduce waiting time for critical patients",
                      "Transparent and secure matching process",
                      "Save lives through technology",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center text-white/70"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ delay: 0.8 + index * 0.08 }}
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              variants={rightCard}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ ...tiltHoverProps, rotateY: -6 }}
              style={{ perspective: 1000 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-300" />
              <div className="relative bg-n-8/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden">
                <motion.div className="relative z-10" variants={floatingAnimation} initial="initial" animate="animate">
                  <div className="flex items-center justify-center mb-6">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                      How It Works
                    </h3>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed font-light mb-6">
                    Our system matches donors and recipients based on organ type and blood group compatibility, ensuring the right organ reaches the right patient quickly.
                  </p>
                  <motion.div className="grid grid-cols-2 gap-4 mt-8">
                    {[
                      { number: "1", label: "Donor registers" },
                      { number: "2", label: "Recipient requests" },
                      { number: "3", label: "AI matching" },
                      { number: "4", label: "Life saved" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 1.4 + index * 0.1 }}
                      >
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                          {stat.number}
                        </div>
                        <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <motion.a href="/events" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-xl py-3 px-8 text-center font-bold text-white text-lg shadow-[0_0_25px_rgba(255,255,255,0.3)] border-2 border-white/20 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
              >
                Register as a Donor
              </motion.button>
            </motion.a>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default AboutUs;
