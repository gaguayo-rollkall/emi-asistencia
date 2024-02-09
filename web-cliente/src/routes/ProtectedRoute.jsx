import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import apiService from '../servicios/api-service';

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line no-constant-condition
    if (user?.token) {
      apiService.get('/health')
        .then(() => {
          console.info('Token funcionando');
        }, () => {
          console.error('Token expirado');
          navigate('/login');
        })
    }
  }, [user])

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};