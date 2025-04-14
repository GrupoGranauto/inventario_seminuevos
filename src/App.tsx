import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/features/auth/Login';
import Dashboard from './components/features/dashboard/Dashboard'; // Ajusta la ruta según tu estructura

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
  );
}

export default App;