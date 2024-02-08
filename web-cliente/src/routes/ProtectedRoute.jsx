import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};