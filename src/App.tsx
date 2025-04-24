import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/features/auth/Login';
import Dashboard from './components/features/dashboard/Dashboard';
import { ThemeProvider } from './context/themeContext'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import SessionTimeoutAlert from './components/common/SessionTimeoutAlert';
//import dotenv from 'dotenv';

//dotenv.config();

const GOOGLE_CLIENT_ID = ''; 

function App() {
  // Verificar si el usuario está autenticado (desde localStorage)
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  // Función para actualizar el estado de autenticación
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPicture');
    setIsAuthenticated(false);
  };

  // Actualizar el estado cuando cambia localStorage
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };

    // Escuchar cambios en localStorage
    // Esto es útil si la autenticación se maneja en otro lugar de la aplicación
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLogin} />} 
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* Ruta para capturar cualquier otra URL no definida */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          
          {/* Componente de alerta de sesión */}
          <SessionTimeoutAlert 
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            warningTime={60000}  // 1 minuto de advertencia
            inactiveTime={15 * 60 * 1000}  // 15 minutos de inactividad
          />
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;