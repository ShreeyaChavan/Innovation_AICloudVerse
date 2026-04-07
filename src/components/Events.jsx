// src/components/Events.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";
import EventList from "./EventList";   // ← use the repurposed EventList

const Events = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>
      <Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Active Disaster Zones
        </h1>
        <p className="text-center text-purple-200 text-lg mb-12">
          Real‑time updates on affected areas and required resources.
        </p>
        <EventList />   {/* ← now shows crisis zones */}
      </div>
      <Footer />
    </>
  );
};

export default Events;