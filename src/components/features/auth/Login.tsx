import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../context/themeContext'; // Importar el contexto del tema
import googleLogo from '../../../assets/google-logo.png'; // Importar el icono de Google


interface LoginProps {
  onLoginSuccess?: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const { darkMode, toggleDarkMode } = useTheme(); // Usar el contexto del tema
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const mockGoogleAuthFlow = () => {
      const mockEmail = "usuario@gruponissauto.com.mx";

      if (mockEmail.endsWith('@gruponissauto.com.mx')) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', mockEmail);

        if (onLoginSuccess) {
          onLoginSuccess();
        }

        navigate('/dashboard');
      } else {
        alert('Solo se permite el inicio de sesión con correos del dominio @gruponissauto.com.mx');
      }
    };

    mockGoogleAuthFlow();
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      {/* Left side - Background Image */}
      <div
        className="hidden lg:flex lg:w-2/3 relative bg-purple-900"
        style={{
          backgroundImage: `url('/src/assets/AutoInsights.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Theme toggle button */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Iniciar sesión</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Inicia sesión con tu cuenta de Grupo Nissan
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-center text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Solo se permite el inicio de sesión con correos del dominio:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md">
                <code
                  className="font-bold"
                  style={{ color: darkMode ? '#FFFFFF' : '#50368D' }}
                >
                  @gruponissauto.com.mx
                </code>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <img src={googleLogo} alt="Google" className="h-5 w-5 mr-2" />
                CONTINUAR CON GOOGLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;