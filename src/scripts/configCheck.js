// Archivo para garantizar que las credenciales de BigQuery estén disponibles
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta del directorio de credenciales
const credentialsDir = path.join(__dirname, '../credentials');
const credentialsFile = path.join(credentialsDir, 'bigquery-key.json');

// Verificar si existe el directorio de credenciales
if (!fs.existsSync(credentialsDir)) {
  console.log('Creando directorio de credenciales...');
  fs.mkdirSync(credentialsDir, { recursive: true });
}

// Verificar si existe el archivo de credenciales
if (!fs.existsSync(credentialsFile)) {
  console.log('Verificando variables de entorno para credenciales de BigQuery...');
  
  // Verificar si las credenciales están en las variables de entorno
  if (process.env.BIGQUERY_CREDENTIALS) {
    console.log('Creando archivo de credenciales desde variables de entorno...');
    try {
      // Parsear la cadena JSON desde la variable de entorno
      const credentials = JSON.parse(process.env.BIGQUERY_CREDENTIALS);
      
      // Escribir las credenciales en el archivo
      fs.writeFileSync(credentialsFile, JSON.stringify(credentials, null, 2));
      console.log('Archivo de credenciales creado exitosamente.');
    } catch (error) {
      console.error('Error al crear archivo de credenciales:', error);
    }
  } else {
    console.warn('No se encontraron credenciales de BigQuery en las variables de entorno.');
    console.warn('El servicio de actualización de CSV podría no funcionar correctamente.');
  }
}

// Verificar si existe el directorio de datos
const dataDir = path.join(__dirname, '../assets/data');
if (!fs.existsSync(dataDir)) {
  console.log('Creando directorio para datos CSV...');
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('Verificación de configuración completada.');