import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.persistent.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Redirect to the sign-in page if there's no token
      navigate("/auth/sign-in");
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default ProtectedRoute;
