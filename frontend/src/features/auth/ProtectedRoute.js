// ProtectedRoute.js
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkTokenValidity } from "../../api/auth";

const ProtectedRoute = ({ children }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkTokenValidity();
      setIsValidToken(isValid);
      setIsValidating(false);
    };

    validateToken();
  }, []);

  if (isValidating) {
    return <div>Loading...</div>;
  }

  if (!isValidToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
