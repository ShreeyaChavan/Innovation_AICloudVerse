import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "./Section";
import BackgroundLayout from "./BackgroundLayout"; // Import the background component

const AboutUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Floating animation (used for inner float)
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Left + Right entrance (scroll) animations
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

  // Hover 3D tilt object (passed directly to whileHover)
  const tiltHoverProps = {
    rotateX: -6,
    rotateY: 6,
    scale: 1.03,
    transition: { type: "spring", stiffness: 150, damping: 12 },
  };

  return (
    <>
      {/* Add BackgroundLayout */}
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>

      <Section className="min-h-screen py-20 relative z-20 overflow-hidden">
        {/* Decorative background - keeping your existing decorative elements */}
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
          {/* Section Header */}
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
              About AICVS
            </motion.h2>

            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          {/* ======================= CARDS ======================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT CARD */}
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full translate-y-12 -translate-x-12" />

                <motion.div className="relative z-10" variants={floatingAnimation} initial="initial" animate="animate">
                  <div className="flex items-center justify-center mb-6">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      Who We Are
                    </h3>
                  </div>

                  <p className="text-lg text-white/80 leading-relaxed font-light mb-6">
                    Welcome to the <strong className="font-semibold text-purple-300">AICVS Community</strong>! We're a passionate collective of innovators, creators, and visionaries pushing the boundaries of AI and Computer Vision.
                  </p>

                  <motion.ul className="space-y-3">
                    {[
                      "Hands-on Project Development",
                      "Expert Mentorship Programs",
                      "Cutting-edge Research",
                      "Community Collaboration",
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

            {/* RIGHT CARD */}
            <motion.div
              className="group relative"
              variants={rightCard}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ ...tiltHoverProps, rotateY: -6 }} // flip direction for right card
              style={{ perspective: 1000 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-300" />

              <div className="relative bg-n-8/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-28 h-28 bg-blue-500/10 rounded-full -translate-y-14 -translate-x-14" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-green-500/10 rounded-full translate-y-10 translate-x-10" />

                <motion.div className="relative z-10" variants={floatingAnimation} initial="initial" animate="animate">
                  <div className="flex items-center justify-center mb-6">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                      Our Vision
                    </h3>
                  </div>

                  <p className="text-lg text-white/80 leading-relaxed font-light mb-6">
                    We envision a future where students become pioneers in{" "}
                    <strong className="font-semibold text-blue-300">AI, Machine Learning, and Computer Vision</strong>, creating solutions that transform industries and improve lives.
                  </p>

                  <motion.div className="grid grid-cols-2 gap-4 mt-8" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.2 }}>
                    {[
                      { number: "30+", label: "Active Members" },
                      { number: "200+", label: "Footfall" },
                      { number: "250+", label: "Community Reach" },
                      { number: "6+", label: "Flagship Annual Events" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 1.4 + index * 0.1 }}
                      >
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">{stat.number}</div>
                        <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* CTA BUTTON */}
          {/* CTA BUTTON */}
<motion.div
  className="text-center mt-16"
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.6, delay: 1.8 }}
>
  <motion.a
    href="https://chat.whatsapp.com/KsLrW4V4Eg04np4IPAZOGI"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className="
        relative 
        bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600
        rounded-xl py-3 px-8 
        text-center font-bold text-white text-lg
        shadow-[0_0_25px_rgba(255,255,255,0.3)]
        border-2 border-white/20
        backdrop-blur-xl
        transition-all duration-300
        hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]
      "
    >
      Join Our Community
    </motion.button>
  </motion.a>
</motion.div>


        </div>
      </Section>
    </>
  );
};

export default AboutUs;