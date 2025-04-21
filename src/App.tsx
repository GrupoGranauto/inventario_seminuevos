import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/features/auth/Login';
import Dashboard from './components/features/dashboard/Dashboard';
import { ThemeProvider } from './context/themeContext'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "573195873234-311suvsf310lr4ggn9t9m6i5u8l9381u.apps.googleusercontent.com"; 

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

    // Escuchar cambios en localStorage (aunque esto es simplificado)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider> {/* Envolver la aplicación con ThemeProvider */}
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
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;