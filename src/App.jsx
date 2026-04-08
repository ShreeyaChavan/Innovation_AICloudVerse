import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";

const App = () => {
  // Inject Tawk.to chat script on mount
  useEffect(() => {
    // Prevent adding duplicate script
    if (document.getElementById("tawk-script")) return;

    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = "https://embed.tawk.to/69d6cdbdb927021c2d6b6a90/1jlnh9emd";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
        <Header />
        <Hero />

        {/* Remove the z-index wrapper and let content flow naturally */}
        <AboutUs />
        <Testimonials />
        <Footer />
      </div>

      <Analytics />
      <ButtonGradient />
    </>
  );
};

export default App;
