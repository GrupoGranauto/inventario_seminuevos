import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Search, Settings, ChevronLeft, ChevronRight, LogOut, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../../context/themeContext';
import granautoLogo from '../../../assets/granauto.png';
import granautoLogoB from '../../../assets/granautob.png';
//import invSeminuevosCSV from '../../../assets/data/inv_seminuevos.csv'

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]); // Estado para almacenar los datos del CSV

  // Cargar y procesar el CSV al montar el componente
  // useEffect(() => {
  //   Papa.parse(invSeminuevosCSV, {
  //     download: true,
  //     header: true,
  //     complete: (result) => {
  //       setTableData(result.data); // Guardar los datos en el estado
  //     },
  //   });
  // }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Contenedor principal */}
      <div className=" mx-auto px-12 py-6">
        {/* */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <img
              src={darkMode ? granautoLogoB : granautoLogo}
              alt="Grupo Gran Auto"
              className="h-8 md:h-12"
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

        {/*  */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
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
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['NoInv']}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Ano']}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Dias']}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Auto']}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Precio']}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Origen']}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Ubicacion']}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Vin']}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Color']}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row['Observaciones']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;