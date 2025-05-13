import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, AlertCircle } from 'lucide-react';
import { useTheme } from '../../../context/themeContext';
import googleLogo from '../../../assets/google-logo.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess?: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    return email.toLowerCase().endsWith('@gruponissauto.com.mx');
  };

  // Configuración del login con Google
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      setErrorMessage(null);
      
      try {
        // Información del usuario usando el token de acceso
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${codeResponse.access_token}` } }
        );
        
        const userEmail = userInfo.data.email;
        
        // Verificar el dominio del correo
        if (validateEmail(userEmail)) {
          // Guardar información de autenticación
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('userName', userInfo.data.name || '');
          localStorage.setItem('userPicture', userInfo.data.picture || '');
          
          if (onLoginSuccess) {
            onLoginSuccess();
          }
          
          navigate('/dashboard');
        } else {
          setErrorMessage(`No se permite el acceso con el correo ${userEmail}. Solo se permiten correos con dominio @gruponissauto.com.mx`);
        }
      } catch (error) {
        setErrorMessage('Error al obtener información del usuario. Inténtalo de nuevo.');
        console.error('Error en autenticación Google:', error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      setErrorMessage('Error en la autenticación con Google. Inténtalo de nuevo.');
      console.error('Error en login Google:', error);
      setIsLoading(false);
    },
    flow: 'implicit' // Flujo de OAuth recomendado para aplicaciones SPA
  });

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      {/* Background Image */}
      <div
        className="hidden lg:flex lg:w-2/3 relative bg-purple-900"
        style={{
          backgroundImage: `url('/public/AutoInsights.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Login Form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Theme button */}
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
            {errorMessage && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-3 mt-0.5" />
                  <div className="text-sm text-red-700 dark:text-red-300">
                    {errorMessage}
                  </div>
                </div>
              </div>
            )}
            
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
                onClick={() => googleLogin()}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  <>
                    <img src={googleLogo} alt="Google" className="h-5 w-5 mr-2" />
                    Continuar con Google
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;