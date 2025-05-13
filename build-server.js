const { build } = require('esbuild');
const { promises: fs } = require('fs');

async function convertToCommonJS() {
  // Convertir el archivo server.js a CommonJS
  await build({
    entryPoints: ['server.js'],
    bundle: true,
    platform: 'node',
    target: 'node16',
    outfile: 'server.cjs',
    format: 'cjs',
  });
  
  console.log('Archivo server.cjs creado exitosamente!');
}

convertToCommonJS().catch(err => {
  console.error('Error al convertir el archivo:', err);
  process.exit(1);
});