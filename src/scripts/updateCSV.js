import { BigQuery } from '@google-cloud/bigquery';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de BigQuery
const bigquery = new BigQuery({
  projectId: 'base-maestra-gn',
  keyFilename: path.join(__dirname, '../credentials/bigquery-key.json'),
});

// Ruta donde se guardará el CSV
const CSV_PATH = path.join(__dirname, '../assets/data/inv_seminuevos.csv');

// Query SQL para extraer datos de BigQuery
async function extractDataFromBigQuery() {
  console.log('Iniciando extracción de datos desde BigQuery...');
  
  const query = `
    SELECT
        NumeroInventario,
        Anio,
        DiasEnInv,
        Caracteristicas,
        PrecioVta,
        Origen,
        Ubicacion,
        Numero,
        Color,
        Obs_Veh
    FROM
        \`base-maestra-gn.seminuevos.tab_inv_seminuevos_V\`
    WHERE
        PrecioVta > 1
    ORDER BY
        DiasEnInv ASC
    `;

  try {
    // Ejecutar la consulta
    const [rows] = await bigquery.query({ query });
    console.log(`Se encontraron ${rows.length} registros en BigQuery`);
    return rows;
  } catch (error) {
    console.error('Error al consultar BigQuery:', error);
    throw error;
  }
}

// Función para convertir los datos a formato CSV
function convertToCSV(data) {
  if (data.length === 0) {
    console.error('No hay datos para convertir a CSV');
    return '';
  }

  // Obtener encabezados (keys del primer objeto)
  const headers = Object.keys(data[0]);
  
  // Crear la línea de encabezados
  const csvRows = [headers.join(',')];
  
  // Agregar los datos
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header] || '';
      // Escapar las comas y comillas en los valores
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
}

// Función principal que orquesta todo el proceso
async function updateCSVFromBigQuery() {
  try {
    console.log('Iniciando proceso de actualización de CSV desde BigQuery...');
    
    // 1. Extraer datos
    const data = await extractDataFromBigQuery();
    
    // 2. Verificar que tenemos datos
    if (!data || data.length === 0) {
      throw new Error('No se encontraron datos en BigQuery');
    }
    
    // 3. Convertir a CSV
    const csvContent = convertToCSV(data);
    
    // 4. Guardar a archivo
    fs.writeFileSync(CSV_PATH, csvContent, 'utf8');
    
    console.log(`CSV actualizado exitosamente en: ${CSV_PATH}`);
    console.log(`Total de registros: ${data.length}`);
    
    return {
      success: true,
      recordCount: data.length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error al actualizar el CSV:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Ejecutar si este script se llama directamente
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  updateCSVFromBigQuery()
    .then(result => {
      console.log('Resultado:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Error no manejado:', error);
      process.exit(1);
    });
}

export { updateCSVFromBigQuery };