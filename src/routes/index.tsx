import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from '../components/features/auth/Login';
import Dashboard from '../components/features/dashboard/Dashboard';
import routes from './routes';

const AppRoutes: React.FC = () => {
  // Estado de autenticación (simulado)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.dispatchEvent(new Event('storage'));
  };

  // Mapea las definiciones de rutas a elementos React
  const routesWithElements = routes.map(route => {
    let element;
    
    switch (route.id) {
      case 'home':
        element = <Login />;
        break;
      case 'login':
        element = <Login />;
        break;
      case 'dashboard':
        element = <Dashboard onLogout={handleLogout} />;
        break;
      default:
        element = <Login />;
    }
    
    return { ...route, element };
  });

  return useRoutes(routesWithElements);
};

export default AppRoutes;