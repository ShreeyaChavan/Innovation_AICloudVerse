// src/components/Footer.jsx (updated with Anudaan)
import React from "react";
import { socials } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">Anudaan</span>
            <p className="text-gray-500 text-sm mt-1">Giving the gift of life</p>
          </div>
          <div className="flex gap-6">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition"
              >
                <img src={social.iconUrl} alt={social.title} className="w-5 h-5 opacity-70 hover:opacity-100" />
              </a>
            ))}
          </div>
          <div className="text-gray-500 text-xs">
            © {currentYear} Anudaan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
