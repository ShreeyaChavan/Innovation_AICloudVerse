import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Mira Vadjikar",
    role: "Co-Head",
    message: "AICVS helped me explore real-world AI projects — it was transformative!",
  },
  {
    name: "Aadya Singh",
    role: "PR Head",
    message: "Workshops & hackathons shaped my AI/ML career.",
  },
  {
    name: "Bhakti Chaudari",
    role: "Design Head",
    message: "Design + AI = Creativity unlocked!",
  },
  {
    name: "Shreeya Chavan",
    role: "Technical Head",
    message: "I gained real research experience in AICVS.",
  },
];

export default function Testimonials() {
  return (
// In your testimonials.jsx, change the section opening tag to:
<section className="relative z-50 w-full py-28 bg-[#05050a] overflow-hidden">
      
      {/* Moving Lines */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        <motion.div
          className="absolute w-[200%] h-[2px] bg-gradient-to-r 
                     from-purple-400 via-purple-500 to-purple-600 opacity-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 w-[200%] h-[2px] bg-gradient-to-r 
                     from-purple-400 via-purple-500 to-purple-600 opacity-20"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
      </div>

      {/* Heading */}
      <h2
  className="relative text-center text-5xl font-extrabold text-purple-400 mb-16"
  style={{ zIndex: 2 }}
>
  What Our Members Say
</h2>


      {/* Infinite Scrolling Cards */}
      <div className="relative flex overflow-hidden" style={{ zIndex: 2 }}>
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <motion.div
              key={i}
              className="min-w-[22rem] md:min-w-[26rem] rounded-3xl border border-white/20 
                         p-8 bg-gradient-to-br from-[#141428] via-[#2b2d55] to-[#1a183d]
                         text-gray-100 shadow-lg hover:shadow-[0_0_35px_-5px_rgba(150,100,255,0.8)]
                         transition-all duration-500"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-lg italic mb-6">"{t.message}"</p>
              <div className="text-right">
                <p className="text-purple-300 font-semibold">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fade Edges */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#05050a] to-transparent" style={{ zIndex: 3 }} />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#05050a] to-transparent" style={{ zIndex: 3 }} />
    </section>
  );
}