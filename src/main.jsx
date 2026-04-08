// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AuthProvider } from './context/AuthContext';
import "./index.css";

// Components
import LoginPage from "./components/LoginPage";
import App from "./App";          // <-- import the main website
import ProtectedRoute from "./components/ProtectedRoute";
import Winners from "./components/Winners";
import Team from "./components/Team";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Events from "./components/Events";
import Blog from "./components/Blog";

Amplify.configure(awsConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",               // <-- new route for the main website
    element: <App />,
  },
  {
    path: "/winners",
    element: (
      <ProtectedRoute>
        <Winners />
      </ProtectedRoute>
    ),
  },
  // Public routes
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
