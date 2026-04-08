import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AuthProvider } from './context/AuthContext';
import App from "./App.jsx";
import "./index.css";
import Team from "./components/Team.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./components/Register.jsx";
import Events from "./components/Events.jsx";
import Blog from "./components/Blog.jsx";
import Winners from "./components/Winners.jsx";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

Amplify.configure(awsConfig);

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
    element: <Register />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/blogs",
    element: <Blog />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/winners",
    element: (
      <ProtectedRoute>
        <Winners />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
