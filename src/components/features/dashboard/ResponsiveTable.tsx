import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MobileTableRowProps {
  row: any;
  index: number;
  formatCurrency: (value: string | number) => string;
  indexInPage: number;
}

const MobileTableRow: React.FC<MobileTableRowProps> = ({ row, index, formatCurrency, indexInPage }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Vista colapsada (siempre visible) */}
      <div 
        className={`flex justify-between items-center p-3 cursor-pointer ${
          index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/40' : ''
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="font-medium text-gray-700 dark:text-gray-200 mr-2">#{indexInPage}</span>
            <span className="font-medium text-gray-700 dark:text-gray-200">{row['NumeroInventario'] || row['No']}</span>
          </div>
          <div className="text-sm mt-1 text-gray-900 dark:text-gray-100 font-semibold">{row['Caracteristicas']}</div>
          <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">{row['Ubicacion']}</div>
        </div>
        <div className="flex items-center">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Detalles expandidos */}
      {expanded && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-gray-500 dark:text-gray-400">Año</div>
              <div className="font-medium">{row['Anio']}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Días en inventario</div>
              <div className="font-medium">{row['DiasEnInv'] === undefined || row['DiasEnInv'] === null ? '0' : row['DiasEnInv']}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Precio de venta</div>
              <div className="font-medium">{formatCurrency(row['PrecioVta'] || 0)}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Origen</div>
              <div className="font-medium">{row['Origen']}</div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-500 dark:text-gray-400">Vin</div>
              <div className="font-medium truncate">{row['Numero']}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Color</div>
              <div className="font-medium">{row['Color']}</div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-500 dark:text-gray-400">Observaciones</div>
              <div className="font-medium break-words">{row['Obs_Veh']}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface ResponsiveTableProps {
  data: any[];
  currentPage: number;
  recordsPerPage: number;
  formatCurrency: (value: string | number) => string;
  columnWidths: Record<string, string>;
  selectedRow: number | null;
  handleRowClick: (index: number) => void;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  data,
  currentPage,
  recordsPerPage,
  formatCurrency,
  columnWidths,
  selectedRow,
  handleRowClick
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  if (isMobile) {
    // Vista móvil
    return (
      <div className="px-3 py-4">
        {data.map((row, index) => {
          const indexOfFirstRecord = (currentPage - 1) * recordsPerPage;
          return (
            <MobileTableRow 
              key={index} 
              row={row} 
              index={index} 
              formatCurrency={formatCurrency} 
              indexInPage={indexOfFirstRecord + index + 1} 
            />
          );
        })}
      </div>
    );
  }

  // Vista desktop 
  return (
    <div className="overflow-auto" style={{ height: '640px' }}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
        <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0 z-10">
          <tr>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.index }}
            >
              #
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.numeroInventario }}
            >
              No. Inv
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.anio }}
            >
              Año
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.diasInv }}
            >
              Días en inventario
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.caracteristicas }}
            >
              Auto versión
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.precioVta }}
            >
              Precio de venta
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.origen }}
            >
              Origen
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.ubicacion }}
            >
              Ubicación
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.numero }}
            >
              Vin
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.color }}
            >
              Color
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              style={{ width: columnWidths.obsVeh }}
            >
              Observaciones vehículo
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, index) => {
            const indexOfFirstRecord = (currentPage - 1) * recordsPerPage;
            const isEven = (indexOfFirstRecord + index) % 2 === 0;
            const isSelected = selectedRow === index;
            
            return (
              <tr 
                key={index}
                className={`
                  cursor-pointer
                  ${isEven ? 
                    "bg-gray-50 dark:bg-gray-700/40" : 
                    "bg-white dark:bg-gray-800"}
                  ${isSelected ? 
                    "outline outline-2 outline-blue-500 dark:outline-blue-400 relative z-10" : 
                    ""}
                  hover:bg-blue-50 dark:hover:bg-blue-900/30 
                  transition-colors duration-150
                `}
                onClick={() => handleRowClick(index)}
              >
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate"
                  style={{ width: columnWidths.index, maxWidth: columnWidths.index }}
                >
                  {indexOfFirstRecord + index + 1}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate" 
                  style={{ width: columnWidths.numeroInventario, maxWidth: columnWidths.numeroInventario }}
                  title={row['NumeroInventario'] || row['No']}
                >
                  {row['NumeroInventario'] || row['No']}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate"
                  style={{ width: columnWidths.anio, maxWidth: columnWidths.anio }}
                  title={row['Anio']}
                >
                  {row['Anio']}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate"
                  style={{ width: columnWidths.diasInv, maxWidth: columnWidths.diasInv }}
                  title={row['DiasEnInv'] === undefined || row['DiasEnInv'] === null ? '0' : row['DiasEnInv']}
                >
                  {row['DiasEnInv'] === undefined || row['DiasEnInv'] === null ? '0' : row['DiasEnInv']}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                  style={{ 
                    width: columnWidths.caracteristicas, 
                    maxWidth: columnWidths.caracteristicas,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={row['Caracteristicas']}
                >
                  {row['Caracteristicas']}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate"
                  style={{ width: columnWidths.precioVta, maxWidth: columnWidths.precioVta }}
                  title={formatCurrency(row['PrecioVta'] || 0)}
                >
                  {formatCurrency(row['PrecioVta'] || 0)}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate"
                  style={{ width: columnWidths.origen, maxWidth: columnWidths.origen }}
                  title={row['Origen']}
                >
                  {row['Origen']}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate"
                  style={{ width: columnWidths.ubicacion, maxWidth: columnWidths.ubicacion }}
                  title={row['Ubicacion']}
                >
                  {row['Ubicacion']}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate"
                  style={{ width: columnWidths.numero, maxWidth: columnWidths.numero }}
                  title={row['Numero']}
                >
                  {row['Numero']}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate"
                  style={{ width: columnWidths.color, maxWidth: columnWidths.color }}
                  title={row['Color']}
                >
                  {row['Color']}
                </td>
                <td 
                  className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                  style={{ 
                    width: columnWidths.obsVeh, 
                    maxWidth: columnWidths.obsVeh,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={row['Obs_Veh']}
                >
                  {row['Obs_Veh']}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;