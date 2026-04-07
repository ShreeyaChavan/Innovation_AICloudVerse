// src/components/EventList.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Truck } from "lucide-react";

// Crisis zone data (you can later load from localStorage or API)
const crisisZones = [
  {
    id: 1,
    title: "Karvenagar, Pune",
    severity: "High",
    type: "Flood",
    resourcesNeeded: ["Food", "Water", "Rescue boats"],
    status: "active",
    lastUpdated: "2025-04-07T10:30:00",
    coordinator: "A. Sharma",
    thumbnail: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400&h=200&fit=crop", // flood image
    banner: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=1200&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Hinjewadi, Pune",
    severity: "Medium",
    type: "Waterlogging",
    resourcesNeeded: ["Medical", "Portable pumps"],
    status: "active",
    lastUpdated: "2025-04-07T09:15:00",
    coordinator: "M. Patil",
    thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2a9?w=400&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2a9?w=1200&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Lonavala",
    severity: "Low",
    type: "Landslide blockage",
    resourcesNeeded: ["Earthmovers", "Food"],
    status: "monitoring",
    lastUpdated: "2025-04-06T18:00:00",
    coordinator: "S. Desai",
    thumbnail: "https://images.unsplash.com/photo-1565464026393-8a223c2dfcbe?w=400&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1565464026393-8a223c2dfcbe?w=1200&h=400&fit=crop",
  },
];

const NAVBAR_HEIGHT = 80;

const EventList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isCoordinator, setIsCoordinator] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("crisisCoordinator") === "true";
    setIsCoordinator(logged);
  }, []);

  const selectedEvent = crisisZones.find((e) => e.id === selectedId);
  const selectedIndex = crisisZones.findIndex((e) => e.id === selectedId);
  const isLeftColumn = selectedIndex % 2 === 0;

  const dispatchResource = (zoneId, resource) => {
    alert(`🚁 Resource "${resource}" dispatched to ${zoneId}`);
    // In real app, call AWS API
  };

  const getSeverityColor = (severity) => {
    if (severity === "High") return "text-red-400 border-red-500/50";
    if (severity === "Medium") return "text-yellow-400 border-yellow-500/50";
    return "text-green-400 border-green-500/50";
  };

  return (
    <div className="relative min-h-screen px-6 md:px-16 py-10">
      {/* Grid of crisis zones */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 justify-items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {crisisZones.map((zone, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={zone.id}
              layoutId={`card-${zone.id}`}
              onClick={() => setSelectedId(zone.id)}
              whileHover={{ scale: 1.04 }}
              className={`relative cursor-pointer w-full max-w-[600px] bg-zinc-900/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-700 ${
                isLeft ? "z-[30]" : "z-[20]"
              }`}
            >
              <img
                src={zone.thumbnail}
                alt={zone.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-semibold">{zone.title}</h2>
                  <AlertTriangle className={`w-5 h-5 ${zone.severity === "High" ? "text-red-400" : "text-yellow-400"}`} />
                </div>
                <p className="text-gray-300 text-sm">{zone.type} • Severity: {zone.severity}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {zone.resourcesNeeded.slice(0, 2).map((res, i) => (
                    <span key={i} className="bg-purple-900/60 px-2 py-0.5 rounded-full text-xs">{res}</span>
                  ))}
                  {zone.resourcesNeeded.length > 2 && <span className="text-xs text-gray-400">+{zone.resourcesNeeded.length-2}</span>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Expanded modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />
            <motion.div
              layoutId={`card-${selectedId}`}
              className="fixed inset-x-0 mx-auto w-[95vw] max-w-[1100px] bg-zinc-900/95 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10 z-[120]"
              style={{ top: `${NAVBAR_HEIGHT + 12}px`, height: `calc(100vh - ${NAVBAR_HEIGHT + 24}px)` }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-[130]">
                <X size={20} />
              </button>

              <div className={`relative h-full flex flex-col md:flex-row ${isLeftColumn ? "md:flex-row-reverse" : "md:flex-row"}`}>
                <div className="w-full md:w-[45%] h-72 md:h-full flex-shrink-0 overflow-hidden">
                  <img src={selectedEvent.banner} alt={selectedEvent.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 md:w-[55%] overflow-y-auto p-8 custom-scrollbar">
                  <h2 className="text-3xl font-semibold mb-2">{selectedEvent.title}</h2>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 ${selectedEvent.severity === "High" ? "bg-red-900/60 text-red-200" : selectedEvent.severity === "Medium" ? "bg-yellow-900/60 text-yellow-200" : "bg-green-900/60 text-green-200"}`}>
                    {selectedEvent.severity} Severity
                  </div>
                  <p><span className="text-purple-300">Disaster type:</span> {selectedEvent.type}</p>
                  <p><span className="text-purple-300">Coordinator:</span> {selectedEvent.coordinator}</p>
                  <p><span className="text-purple-300">Resources needed:</span></p>
                  <div className="flex flex-wrap gap-2 mt-1 mb-4">
                    {selectedEvent.resourcesNeeded.map((res, i) => (
                      <span key={i} className="bg-purple-800/70 px-3 py-1 rounded-full text-sm">{res}</span>
                    ))}
                  </div>
                  {isCoordinator && (
                    <div className="mt-4 p-4 bg-purple-900/30 rounded-xl">
                      <label className="block text-purple-300 mb-2">Dispatch Resource</label>
                      <select
                        onChange={(e) => dispatchResource(selectedEvent.id, e.target.value)}
                        className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2"
                        defaultValue=""
                      >
                        <option value="" disabled>Select resource</option>
                        {selectedEvent.resourcesNeeded.map((res) => (
                          <option key={res} value={res}>{res}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <p className="text-gray-400 text-xs mt-4">Last updated: {new Date(selectedEvent.lastUpdated).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventList;