// src/hooks/useSessionTimeout.ts
import { useEffect, useRef } from 'react';

const INACTIVE_TIMEOUT = 15 * 60 * 1000; // 15 minutos en milisegundos

export function useSessionTimeout(isAuthenticated: boolean, onTimeout: () => void) {
  const timeoutRef = useRef<number | null>(null);

  // Función para reiniciar el temporizador
  const resetTimer = () => {
    // Limpiar el temporizador existente si hay uno
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    
    // Solo configurar un nuevo temporizador si el usuario está autenticado
    if (isAuthenticated) {
      timeoutRef.current = window.setTimeout(() => {
        console.log('Sesión expirada por inactividad');
        onTimeout();
      }, INACTIVE_TIMEOUT);
    }
  };

  // Configurar los event listeners para detectar actividad
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Lista de eventos que se consideran "actividad del usuario"
    const activityEvents = [
      'mousemove', 'click'
    ];
    
    // Reiniciar el temporizador inicialmente
    resetTimer();
    
    // Configurar listeners para cada tipo de evento
    const resetTimerBound = resetTimer.bind(null);
    activityEvents.forEach(event => {
      window.addEventListener(event, resetTimerBound);
    });
    
    // Limpieza al desmontar
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetTimerBound);
      });
    };
  }, [isAuthenticated, onTimeout]);

  return { resetTimer };
}