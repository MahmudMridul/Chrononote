import { Navigate, useLocation } from "react-router";
import { isAuthenticatedUser } from "../services/authService";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedUser());

  useEffect(() => {
    const authStatus = isAuthenticatedUser();
    setIsAuthenticated(authStatus);
  }, [location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
