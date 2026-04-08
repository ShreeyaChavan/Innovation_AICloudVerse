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
  const { userEmail, logout } = useAuth();
  const [openNavigation, setOpenNavigation] = useState(false);

  // Check if user is coordinator (has email from Cognito) or just a regular user
  const isCoordinator = !!userEmail;
  const isLoggedIn = isCoordinator || !!localStorage.getItem("crisisUser");

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
    if (isCoordinator) {
      await logout();
    } else {
      localStorage.removeItem("crisisUser");
    }
    navigate('/');
    handleClick();
  };

  // Build navigation items including Winners only for coordinators
  const navItems = [...navigation];
  if (isCoordinator) {
    navItems.push({
      id: "4",
      title: "Winners",
      url: "/winners",
    });
  }

  return (
    <div className={`fixed top-0 left-0 w-full z-50 bg-transparent ${openNavigation ? "bg-n-8" : "bg-transparent"}`}>
      <div className="flex px-5 lg:px-7.5 xl:px-10 max-lg:py-4 items-center justify-between w-full">
        <a className="block w-[12rem] xl:mr-8 flex-shrink-0" href="/home">
          <img className="rounded-full mt-2 mx-auto lg:my-5 h-[50px] w-[50px]" src={brainwave} width={80} height={80} alt="AICVS" />
        </a>

        <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:flex-1 lg:justify-center lg:bg-transparent`}>
          <div className="relative z-2 flex flex-col items-center justify-center gap-8 lg:flex-row">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xl lg:font-semibold ${
                  item.url === pathname.pathname ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
            {/* Mobile menu extra content */}
            {isLoggedIn && (
              <div className="lg:hidden flex flex-col gap-4 mt-4 w-full px-6">
                <div className="text-purple-300 text-center bg-white/5 p-3 rounded-xl">
                  Welcome, {isCoordinator ? userEmail : localStorage.getItem("crisisUser")}
                </div>
                <button onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded-full text-white">
                  Logout
                </button>
              </div>
            )}
          </div>
          <HamburgerMenu />
        </nav>

        {/* Desktop right section */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="text-purple-300 text-sm whitespace-nowrap bg-white/5 px-3 py-1.5 rounded-full">
                Welcome, {isCoordinator ? userEmail?.split('@')[0] : localStorage.getItem("crisisUser")}
              </div>
              <button onClick={handleLogout} className="bg-red-600/80 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition shadow-md whitespace-nowrap">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/')} className="bg-purple-600/80 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-purple-700 transition">
              Login
            </button>
          )}
        </div>

        <Button className="ml-auto lg:hidden" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
