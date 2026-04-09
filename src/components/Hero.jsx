// src/components/Hero.jsx
import { motion } from "framer-motion";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Donate Life. <br />
            Save Lives.
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-8">
            One organ donor can save up to 8 lives. Join the mission to bridge
            the gap between donors and recipients.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/events">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                Become a Donor
              </Button>
            </a>
            <a href="/blogs">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600">
                Request Organ
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { number: "1,20,000+", label: "Patients Waiting" },
            { number: "8", label: "Lives Saved Per Donor" },
            { number: "500+", label: "Transplants Facilitated" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30"
            >
              <div className="text-3xl font-bold text-cyan-400">{stat.number}</div>
              <div className="text-purple-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-purple-300 text-sm"
        >
           Register as a donor today and give the gift of life
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
