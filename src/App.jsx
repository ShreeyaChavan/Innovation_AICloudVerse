// src/App.jsx (updated title)
import { useEffect } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";

const App = () => {
  useEffect(() => {
    // Set page title
    document.title = "Anudaan – Donate Life, Save Lives";
    if (document.querySelector('script[src="https://insertabot.io/widget.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://insertabot.io/widget.js";
    script.setAttribute("data-api-key", "ib_sk_3a4e83c66d42dce0dac26916c1a43d91b2e00087fd36c2c3");
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
        <Header />
        <Hero />
        <AboutUs />
        <Testimonials />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
