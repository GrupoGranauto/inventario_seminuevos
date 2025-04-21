import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Search, Settings, ChevronLeft, ChevronRight, LogOut, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../../context/themeContext';
import granautoLogo from '../../../assets/granauto.png';
import granautoLogoB from '../../../assets/granautob.png';
import invSeminuevosCSV from '../../../assets/data/inv_seminuevos.csv'

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [tableData, setTableData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [currentRecords, setCurrentRecords] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  // Define the type for a row of your CSV data
  interface InventoryRow {
    No?: string;
    Anio?: string;
    DiasEnInv?: string;
    Caracteristicas?: string;
    PrecioVta?: string;
    Origen?: string;
    Ubicacion?: string;
    Numero?: string;
    Color?: string;
    Obs_Veh?: string;
    [key: string]: any; // Permitir otras propiedades
  }

  // Cargar y procesar el CSV al montar el componente
  useEffect(() => {
    try {
      console.log('Intentando cargar CSV desde:', invSeminuevosCSV);
      Papa.parse(invSeminuevosCSV, {
        download: true,
        header: true,
        complete: (result) => {
          console.log('CSV Data:', result.data);
  
          // Mapeo del campo ubicación
          const ubicacionMap: Record<string, string> = {
            'AGUA PRIETA': 'Agua Prieta',
            'CABORCA': 'Caborca',
            'CANANEA': 'Cananea',
            'NOGALES': 'Nogales',
            'MAGDALENA': 'Magdalena',
            'GUAYMAS': 'Guaymas',
            'GUAYMAS SEMINUEVOS': 'Guaymas',
            'NAVOJOA': 'Navojoa',
            'PUERTO  PEÑASCO': 'Puerto Peñasco',
            'MORELIA': 'Morelia',
            'SALA MORELOS': 'Morelos',
            'SALA NISSAUTO': 'Nissauto',
            'NISSAUTO': 'Nissauto',
            'MACRO PLAZA': 'Macroplaza',
            'MACROPLAZA': 'Macroplaza',
            'GRANAUTO': 'Granauto',
            'ALMACEN MAGDALENA': 'Magdalena',
            'AUTO CLINICA MACRO': 'Auto Clínica Macroplaza',
            'ENTREGADO': 'Entregado',
            'MITSU CHIHUA-SEMI': 'Mitsu Chihuahua',
          };

          // Mapeo del campo origen
          const origenMap: Record<string, string> = {
            'AGUA PRIETA NISSAUTO': 'Agua Prieta',
            'CABORCA NISSAUTO': 'Caborca',
            'CANANEA': 'Cananea',
            'CANANEA NISSAUTO': 'Cananea',
            'MAGDALENA NISSAUTO': 'Magdalena',
            'NAVOJOA NISSAUTO': 'Navojoa',
            'NOGALES NISSAUTO': 'Nogales',
            'PEÑASCO NISSAUTO': 'Puerto Peñasco',
            'GUAYMAS': 'Guaymas',
            'MORELOS': 'Morelos',
            'MACROPLAZA': 'Macroplaza',
            'GRANAUTO': 'Granauto',
            'NISSAUTO': 'Nissauto',
          };
  
          // Transformación de los datos
          const transformedData = (result.data as InventoryRow[]).map((row: InventoryRow) => {
            return {
              ...row,
              Ubicacion: ubicacionMap[row['Ubicacion'] ?? ''] || 'OTRO', 
              Origen: origenMap[row['Origen'] ?? ''] || 'OTRO', 
            };
          });
  
          // Ordenar los datos por "DiasEnInv" en orden ascendente
          const sortedData = transformedData.sort((a, b) => {
            const diasA = parseInt(a.DiasEnInv ?? '', 10) || 0;
            const diasB = parseInt(b.DiasEnInv ?? '', 10) || 0;
            return diasA - diasB;
          });
  
          setTableData(sortedData);
          setTotalPages(Math.ceil(sortedData.length / recordsPerPage));
          setLoading(false);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setError('Error al cargar los datos del CSV');
          setLoading(false);
        },
      });
    } catch (e) {
      console.error('Error en el efecto de carga:', e);
      setError('Error al inicializar la carga de datos');
      setLoading(false);
    }
  }, []);

  // Actualizar registros actuales cuando cambia la página o los datos
  useEffect(() => {
    if (tableData.length > 0) {
      setCurrentRecords(tableData.slice(indexOfFirstRecord, indexOfLastRecord));
    }
  }, [tableData, currentPage, indexOfFirstRecord, indexOfLastRecord]);

  // Funciones para la paginación
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 6;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Ajustar si estamos en los límites
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  const formatCurrency = (value: string | number) => {
    const numericValue = typeof value === 'string'
      ? parseFloat(value.replace(/[^0-9.-]+/g, ''))
      : value;
  
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(numericValue);
  };
  

  // Verificación de renderizado
  console.log('Rendering Dashboard with:', { 
    darkMode, 
    loading, 
    error, 
    dataLength: tableData.length,
    currentPage,
    totalPages
  });

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Contenedor principal */}
      <div className="mx-auto px-4 md:px-12 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <img
              src={darkMode ? granautoLogoB : granautoLogo}
              alt="Grupo Gran Auto"
              className="h-8 md:h-12"
              onError={(e) => {
                console.error('Error al cargar imagen');
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="gray"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">Logo</text></svg>';
              }}
            />
            <div className="ml-4">
              <h1 className="text-xl md:text-2xl font-bold">Business Intelligence</h1>
              <h2 className="text-base md:text-lg">Inventario Seminuevos</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cambio de tema */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Cerrar sesión */}
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Área de contenido principal */}
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 flex justify-center items-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Cargando datos...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {currentRecords.length === 0 ? (
              <div className="p-8 text-center">
                <p>No hay datos disponibles</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        No. Inv
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Año
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Días en inventario
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Auto versión
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Precio de venta
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Origen
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Ubicación
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Vin
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Color
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Observaciones vehículo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {currentRecords.map((row, index) => (
                      <tr key={index}>
                        {/* Nueva columna para enumerar las filas */}
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {indexOfFirstRecord + index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['No']}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Anio']}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['DiasEnInv']}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Caracteristicas']}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {formatCurrency(row['PrecioVta'])}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Origen']}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Ubicacion']}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Numero']}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Color']}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Obs_Veh']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Paginación */}
            {tableData.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                        currentPage === 1
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      Anterior
                    </button>
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                        currentPage === totalPages
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      Siguiente
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Página <span className="font-medium">{currentPage}</span> de{' '}
                        <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium ${
                            currentPage === 1
                              ? 'text-gray-300 dark:text-gray-500'
                              : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className="sr-only">Anterior</span>
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        
                        {getPageNumbers().map((number) => (
                          <button
                            key={number}
                            onClick={() => goToPage(number)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                              currentPage === number
                                ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-200'
                                : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                        
                        <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium ${
                            currentPage === totalPages
                              ? 'text-gray-300 dark:text-gray-500'
                              : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className="sr-only">Siguiente</span>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Información sobre paginación */}
        {!loading && tableData.length > 0 && (
          <div className="mt-2 mb-4 text-sm">
            <p>
              Mostrando registros {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, tableData.length)} de {tableData.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;