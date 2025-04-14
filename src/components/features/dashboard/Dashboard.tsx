import React, { useState } from 'react';
import { Search, Settings, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'; 

// Define la interfaz para las props del componente
interface DashboardProps {
  onLogout: () => void;
}

// Cambiar la declaración del componente para usar React.FC
const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Header with added logout button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img
              src="/api/placeholder/100/48"
              alt="Grupo Gran Auto"
              className="h-12"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">Business Intelligence</h1>
              <h2 className="text-lg text-gray-600">Inventario Seminuevos</h2>
            </div>
          </div>
          
          {/* Logout Button */}
          <button 
            onClick={onLogout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Cerrar Sesión
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Año</option>
            {/* Add year options */}
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
          >
            <option value="">Origen</option>
            {/* Add origin options */}
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Ubicación</option>
            {/* Add location options */}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. Inv
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Año
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Días en inventario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auto versión
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio de venta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Observaciones vehículo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            1 - 25 / 485
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;