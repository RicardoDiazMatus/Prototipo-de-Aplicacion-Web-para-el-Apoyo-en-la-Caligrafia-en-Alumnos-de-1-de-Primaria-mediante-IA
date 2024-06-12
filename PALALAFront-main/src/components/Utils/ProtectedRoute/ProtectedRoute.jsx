import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ child, requiredRole }) {
  const getUserRole = (auth) => {
    try {
      const [header, payload, signature] = auth.split(".");
      const decodePayload = JSON.parse(atob(payload));
      return decodePayload.userType;
    } catch (error) {
      return null;
    }
  };
  
  const auth = useSelector((appState) => appState.authToken);
  let location = useLocation();
  if (auth === null) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }
  if (getUserRole(auth) !== requiredRole) {
    return <Navigate to="/ForbiddenPage" state={{ from: location }} replace />;
  }
  return child;
}

export default ProtectedRoute;
