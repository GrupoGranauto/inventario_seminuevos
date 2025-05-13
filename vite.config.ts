import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    assetsInclude: ['**/*.csv'],
    // Configuración específica para producción
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
      chunkSizeWarningLimit: 1600,
    },
    // Configuración de servidor para desarrollo
    server: {
      port: parseInt(env.PORT || '3000'),
      host: true, // Escuchar en todas las interfaces de red
    },
  };
});