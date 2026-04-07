import { Analytics } from "@vercel/analytics/react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";

const App = () => {
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