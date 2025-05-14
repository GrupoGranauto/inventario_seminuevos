// scheduleCSV.js - Versión corregida usando ESM
import cron from 'node-cron';
import { updateCSVFromBigQuery } from './updateCSV.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('El script scheduleCSV.js está activo y en ejecución.');

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta para el archivo de logs
const LOG_FILE = path.join(__dirname, '../../logs/csv-update.log');

// Asegurar que exista el directorio de logs
const logDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Función para agregar entrada al log
function logToFile(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  
  fs.appendFileSync(LOG_FILE, logEntry);
  console.log(message);
}

// Programar la tarea para ejecutarse todos los días a las 2:00 PM
// Formato cron: minuto hora día-mes mes día-semana
// 0 14 * * * = a las 2:00 PM todos los días
cron.schedule('0 12 * * *', async () => {
  logToFile('Iniciando actualización programada del CSV desde BigQuery');
  
  try {
    const result = await updateCSVFromBigQuery();
    
    if (result.success) {
      logToFile(`Actualización exitosa. ${result.recordCount} registros actualizados.`);
    } else {
      logToFile(`Error en la actualización: ${result.error}`);
    }
  } catch (error) {
    logToFile(`Error no manejado en la tarea programada: ${error.message}`);
  }
});

logToFile('Servicio de actualización de CSV iniciado. Se ejecutará todos los días');

// Mantener el proceso vivo
process.stdin.resume();

// Manejar señales de terminación
process.on('SIGINT', () => {
  logToFile('Servicio de actualización de CSV detenido');
  process.exit(0);
});