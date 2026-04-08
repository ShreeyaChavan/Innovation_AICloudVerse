import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useAuth } from "../context/AuthContext";
import MenuSvg from "../assets/svg/MenuSvg";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import { HamburgerMenu } from "./design/Header";

const Header = () => {
  const pathname = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    handleClick();
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 bg-transparent ${openNavigation ? "bg-n-8" : "bg-transparent"}`}>
      <div className="flex px-5 lg:px-7.5 xl:px-10 max-lg:py-4 items-center justify-between w-full">
        {/* Logo - fixed on left */}
        <a className="block w-[12rem] xl:mr-8 flex-shrink-0" href="#hero">
          <img className="rounded-full mt-2 mx-auto lg:my-5 h-[50px] w-[50px]" src={brainwave} width={80} height={80} alt="AICVS" />
        </a>

        {/* Navigation and Login Button combined for desktop */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className="block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 px-4 py-2"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Login / Logout Button - Now directly after nav, not at edge */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-purple-300 text-sm whitespace-nowrap">Welcome, {user?.username}</span>
                <button onClick={handleLogout} className="bg-red-600/80 px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition shadow-md">
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 rounded-xl text-sm font-bold hover:scale-105 transition shadow-lg whitespace-nowrap"
              >
                Coordinator Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile: Show hamburger and auth buttons inside drawer (already handled) */}
        <Button className="ml-auto lg:hidden" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>

        {/* Mobile menu content - already included above via nav */}
        <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:hidden flex-col items-center pt-8`}>
          <div className="flex flex-col items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className="block text-2xl uppercase text-n-1 hover:text-color-1"
              >
                {item.title}
              </a>
            ))}
            <div className="mt-4">
              {user ? (
                <button onClick={handleLogout} className="bg-red-600 px-8 py-2 rounded-full text-white">Logout</button>
              ) : (
                <button onClick={() => { navigate('/login'); handleClick(); }} className="bg-purple-600 px-8 py-2 rounded-full text-white">Login</button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
