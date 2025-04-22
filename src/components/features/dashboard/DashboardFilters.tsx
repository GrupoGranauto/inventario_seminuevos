import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface DashboardFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  searchText: string;
  ubicacion: string;
  origen: string;
  minDiasEnInv: string;
  maxDiasEnInv: string;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    searchText: '',
    ubicacion: '',
    origen: '',
    minDiasEnInv: '',
    maxDiasEnInv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchText: '',
      ubicacion: '',
      origen: '',
      minDiasEnInv: '',
      maxDiasEnInv: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Filtros</h3>
      
      <div className="flex flex-wrap gap-4">
        {/* Búsqueda general */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="searchText"
            value={filters.searchText}
            onChange={handleInputChange}
            placeholder="Buscar..."
            className="block w-64 pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Filtro por ubicación */}
        <div>
          <select
            name="ubicacion"
            value={filters.ubicacion}
            onChange={handleInputChange}
            className="block w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Todas las ubicaciones</option>
            <option value="Agua Prieta">Agua Prieta</option>
            <option value="Caborca">Caborca</option>
            <option value="Cananea">Cananea</option>
            <option value="Nogales">Nogales</option>
            <option value="Magdalena">Magdalena</option>
            <option value="Guaymas">Guaymas</option>
            <option value="Navojoa">Navojoa</option>
            <option value="Puerto Peñasco">Puerto Peñasco</option>
            <option value="Morelia">Morelia</option>
            <option value="Morelos">Morelos</option>
            <option value="Nissauto">Nissauto</option>
            <option value="Macroplaza">Macroplaza</option>
            <option value="Granauto">Granauto</option>
          </select>
        </div>

        {/* Filtro por origen */}
        <div>
          <select
            name="origen"
            value={filters.origen}
            onChange={handleInputChange}
            className="block w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Todos los orígenes</option>
            <option value="Agua Prieta">Agua Prieta</option>
            <option value="Caborca">Caborca</option>
            <option value="Cananea">Cananea</option>
            <option value="Magdalena">Magdalena</option>
            <option value="Navojoa">Navojoa</option>
            <option value="Nogales">Nogales</option>
            <option value="Puerto Peñasco">Puerto Peñasco</option>
            <option value="Guaymas">Guaymas</option>
            <option value="Morelos">Morelos</option>
            <option value="Macroplaza">Macroplaza</option>
            <option value="Granauto">Granauto</option>
            <option value="Nissauto">Nissauto</option>
          </select>
        </div>

        {/* Rango de días en inventario */}
        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="minDiasEnInv"
            value={filters.minDiasEnInv}
            onChange={handleInputChange}
            placeholder="Min días"
            min="0"
            className="block w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <span className="text-gray-500">a</span>
          <input
            type="number"
            name="maxDiasEnInv"
            value={filters.maxDiasEnInv}
            onChange={handleInputChange}
            placeholder="Max días"
            min="0"
            className="block w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Botón de reset */}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default DashboardFilters;