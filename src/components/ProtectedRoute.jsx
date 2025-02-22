import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // ✅ Check for token in localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // 🔄 Redirect to /auth if not logged in
    return <Navigate to="/auth" replace />;
  }

  // ✅ If logged in, render the component
  return children;
};

export default ProtectedRoute;
