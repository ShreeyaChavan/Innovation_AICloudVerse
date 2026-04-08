// Hero.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background instead of video */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/40 z-0" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2a9?w=1600')] bg-cover bg-center opacity-20 z-0" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          CrisisConnect
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-purple-200 mt-4"
        >
          Real-time disaster aid coordination. <br />Resilient. Scalable. Built for the storm.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center mt-8 flex-wrap"
        >
          <button onClick={() => navigate('/register')} className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition">
            Request Help
          </button>
         
        </motion.div>

        {/* Live stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
          <div className="bg-black/40 backdrop-blur rounded-xl p-4">
            <div className="text-3xl font-bold text-cyan-400">124</div>
            <div className="text-sm">Active Requests</div>
          </div>
          <div className="bg-black/40 backdrop-blur rounded-xl p-4">
            <div className="text-3xl font-bold text-purple-400">18</div>
            <div className="text-sm">Coordinators Online</div>
          </div>
          <div className="bg-black/40 backdrop-blur rounded-xl p-4">
            <div className="text-3xl font-bold text-green-400">342</div>
            <div className="text-sm">Lives Helped</div>
          </div>
          <div className="bg-black/40 backdrop-blur rounded-xl p-4">
            <div className="text-3xl font-bold text-yellow-400">$0.42</div>
            <div className="text-sm">Est. Cost Today</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
