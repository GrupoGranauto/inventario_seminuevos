import React, { useState, useEffect, useRef } from 'react';

interface SessionTimeoutAlertProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  warningTime?: number; // Tiempo en ms antes de expirar para mostrar advertencia
  inactiveTime?: number; // Tiempo en ms de inactividad para cerrar sesión
}

const SessionTimeoutAlert: React.FC<SessionTimeoutAlertProps> = ({
  isAuthenticated,
  onLogout,
  warningTime = 60 * 1000, // 1 minuto de advertencia
  inactiveTime = 15 * 60 * 1000, // 15 minutos inactivos
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const warningTimeoutRef = useRef<number | null>(null);
  const logoutTimeoutRef = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(warningTime / 1000);
  const countdownRef = useRef<number | null>(null);

  // Resetear temporizadores
  const resetTimers = () => {
    // Limpiar todos los timeouts
    if (warningTimeoutRef.current) window.clearTimeout(warningTimeoutRef.current);
    if (logoutTimeoutRef.current) window.clearTimeout(logoutTimeoutRef.current);
    if (countdownRef.current) window.clearInterval(countdownRef.current);
    
    setShowWarning(false);
    
    // Solo configurar nuevos timers si está autenticado
    if (isAuthenticated) {
      // Timer para mostrar advertencia
      warningTimeoutRef.current = window.setTimeout(() => {
        setShowWarning(true);
        setRemainingTime(Math.floor(warningTime / 1000));
        
        // Iniciar countdown
        countdownRef.current = window.setInterval(() => {
          setRemainingTime(prev => {
            if (prev <= 1) {
              if (countdownRef.current) window.clearInterval(countdownRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
      }, inactiveTime - warningTime);
      
      // Timer para cerrar sesión
      logoutTimeoutRef.current = window.setTimeout(() => {
        if (isAuthenticated) {
          onLogout();
        }
      }, inactiveTime);
    }
  };

  // Configurar event listeners
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const activityEvents = [
      'scroll', 'click'
    ];
    
    resetTimers();
    
    const resetTimersBound = resetTimers.bind(null);
    activityEvents.forEach(event => {
      window.addEventListener(event, resetTimersBound);
    });
    
    return () => {
      // Limpiar timeouts al desmontar
      if (warningTimeoutRef.current) window.clearTimeout(warningTimeoutRef.current);
      if (logoutTimeoutRef.current) window.clearTimeout(logoutTimeoutRef.current);
      if (countdownRef.current) window.clearInterval(countdownRef.current);
      
      // Quitar event listeners
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetTimersBound);
      });
    };
  }, [isAuthenticated, inactiveTime, warningTime, onLogout]);

  if (!showWarning || !isAuthenticated) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">Su sesión está por expirar</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Su sesión expirará en {remainingTime} segundos debido a inactividad.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cerrar Sesión
          </button>
          <button
            onClick={resetTimers}
            className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
          >
            Continuar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutAlert;