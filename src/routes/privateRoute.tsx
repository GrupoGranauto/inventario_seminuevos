import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  // Aquí verificarías si el usuario está autenticado
  // Por ahora, simulamos esto con localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si hay children, renderízalos, si no, renderiza el Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;