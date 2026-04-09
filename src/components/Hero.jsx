// src/components/Hero.jsx
import { motion } from "framer-motion";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-blue-400 to-white bg-clip-text text-transparent">
            Donate Life. <br />
            Save Lives.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            One organ donor can save up to 8 lives. Join India's most trusted organ donation matching platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/events">
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300">
                Register as Donor
              </button>
            </a>
            <a href="/blogs">
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-white hover:bg-white/20 transition-all duration-300">
                Request Organ
              </button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto"
        >
          {[
            { number: "1,20,000+", label: "Patients Waiting for Organs", highlight: true },
            { number: "8", label: "Lives That Can Be Saved by One Donor" },
            { number: "500+", label: "Successful Transplants Facilitated" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-black/40 backdrop-blur-md rounded-xl p-5 border border-white/10 text-center"
            >
              <div className={`text-2xl md:text-3xl font-bold ${stat.highlight ? 'text-red-400' : 'text-blue-400'}`}>
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-gray-500 text-xs uppercase tracking-wider"
        >
          Join the movement • Give the gift of life
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
