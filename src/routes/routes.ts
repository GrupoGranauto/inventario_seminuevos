import React from 'react';
import { RouteObject } from 'react-router-dom';
import Login from '../components/features/auth/Login';
import Dashboard from '../components/features/dashboard/Dashboard';

// Define todas las rutas de la aplicación
const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Login)
  },
  {
    path: '/login',
    element: React.createElement(Login)
  },
  {
    path: '/dashboard',
    element: React.createElement(Dashboard, {
      onLogout: () => {
        localStorage.removeItem('isAuthenticated');
        window.dispatchEvent(new Event('storage'));
      }
    })
  }
];

export default routes;