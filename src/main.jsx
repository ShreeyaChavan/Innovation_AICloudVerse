// src/main.jsx
import './lib/rum';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AuthProvider } from './context/AuthContext';
import "./index.css";

// Components
import LoginPage from "./components/LoginPage";
import App from "./App";                    // <-- main website
import ProtectedRoute from "./components/ProtectedRoute";
import Winners from "./components/Winners";
import Team from "./components/Team";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Events from "./components/Events";
import Blog from "./components/Blog";

import { AwsRum } from "aws-rum-web";

try {
  const config = {
    sessionSampleRate: 1,
    endpoint: "https://dataplane.rum.ap-south-1.amazonaws.com",
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: false,
    signing: true
  };

  const APPLICATION_ID = "d82ece1b-1ce3-41d4-a578-097149c3e2ac";
  const APPLICATION_VERSION = "1.0.0";
  const APPLICATION_REGION = "ap-south-1";

  new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config);
} catch (error) {
  console.error("AWS RUM error:", error);
}
// ===== AWS RUM END =====

// ===== AWS LAMBDA + CLOUDWATCH MONITORING (WORKING) =====
const LAMBDA_URL = 'https://muuodutklwhota54mnw275nuzm0rkdis.lambda-url.ap-south-1.on.aws/';

const logToAWS = async (page) => {
  try {
    const response = await fetch(`${LAMBDA_URL}?page=${encodeURIComponent(page)}`);
    if (response.ok) {
      console.log('✅ AWS CloudWatch Logged:', page);
    }
  } catch (error) {
    console.error('❌ Lambda logging error:', error);
  }
};

// Log initial page load
logToAWS(window.location.pathname);

// Track page changes for SPA
const originalPushState = history.pushState;
history.pushState = function(...args) {
  originalPushState.apply(this, args);
  logToAWS(window.location.pathname);
};

window.addEventListener('popstate', () => {
  logToAWS(window.location.pathname);
});

// Configure Amplify (for coordinator login)
Amplify.configure(awsConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",                         // <-- public main website
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
  // Public routes (accessible without login)
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
