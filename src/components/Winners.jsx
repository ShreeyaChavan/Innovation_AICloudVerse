// Winners.jsx – complete overhaul
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";

export default function Winners() {
  const [requests, setRequests] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const logged = localStorage.getItem("crisisCoordinator") === "true";
    setIsLoggedIn(logged);
    if (logged) loadRequests();
  }, []);

  const loadRequests = () => {
    const stored = JSON.parse(localStorage.getItem("crisisRequests") || "[]");
    setRequests(stored);
    setCost((stored.length * 0.0002).toFixed(4));
  };

  const updateStatus = (id, status) => {
    const updated = requests.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem("crisisRequests", JSON.stringify(updated));
    loadRequests();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pwd = e.target.password.value;
    if (email === "coordinator@crisisconnect.com" && pwd === "demo123") {
      localStorage.setItem("crisisCoordinator", "true");
      setIsLoggedIn(true);
      loadRequests();
    } else alert("Invalid credentials");
  };

  const handleLogout = () => {
    localStorage.removeItem("crisisCoordinator");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen text-white">
        <BackgroundLayout /><Header />
        <div className="relative z-10 pt-32 max-w-md mx-auto px-4">
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Coordinator Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" name="email" placeholder="Email" className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2" required />
              <input type="password" name="password" placeholder="Password" className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2" required />
              <button type="submit" className="w-full bg-purple-600 py-2 rounded-xl font-bold">Login</button>
            </form>
            <p className="text-xs text-center mt-4 text-purple-300">Demo: coordinator@crisisconnect.com / demo123</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <BackgroundLayout /><Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Coordinator Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600/80 px-4 py-2 rounded-xl">Logout</button>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 mb-8 flex justify-between">
          <span className="text-purple-300">Estimated Monthly AWS Cost</span>
          <span className="text-2xl font-mono text-cyan-400">${cost}</span>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-2xl overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-purple-900/30 border-b border-purple-500/30"><tr><th className="p-3">Type</th><th>Location</th><th>Severity</th><th>Status</th><th>Time</th><th>Action</th></tr></thead>
            <tbody>
              {requests.length === 0 ? <tr><td colSpan="6" className="text-center p-8">No requests</td></tr> : requests.map(r => (
                <tr key={r.id} className="border-b border-purple-500/20">
                  <td className="p-3">{r.type}</td><td>{r.location}</td>
                  <td><span className={`px-2 py-0.5 rounded text-xs ${r.severity==='High'?'bg-red-900/50':r.severity==='Medium'?'bg-yellow-900/50':'bg-green-900/50'}`}>{r.severity}</span></td>
                  <td className="capitalize">{r.status}</td>
                  <td className="text-xs">{new Date(r.timestamp).toLocaleTimeString()}</td>
                  <td>{r.status === 'pending' && <button onClick={()=>updateStatus(r.id,'in-progress')} className="bg-blue-600 px-2 py-1 rounded text-xs">Start</button>}
                  {r.status === 'in-progress' && <button onClick={()=>updateStatus(r.id,'fulfilled')} className="bg-green-600 px-2 py-1 rounded text-xs">Fulfill</button>}
                  {r.status === 'fulfilled' && <span className="text-green-400 text-xs">✓</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}