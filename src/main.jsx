//main
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { team2023, team2024 } from "./constants";
import App from "./App.jsx";
import "./index.css";
import Team from "./components/Team.jsx"; 
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./components/Register.jsx";
import Events from "./components/Events.jsx";
import Blog from "./components/Blog.jsx";
import Winners from "./components/Winners";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/team",
    element: (
      <div className="bg-black text-white min-h-screen pt-[5rem]">
        <Header />
        <Team />  
        <Footer />
      </div>
    ),
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/events",
    element: <Events />
  },
  {
    path: "/blogs",
    element: <Blog />
  },
  {
  path: "/winners",
  element: <Winners />
},

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);