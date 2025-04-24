import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, InputAdornment, SelectChangeEvent } from '@mui/material';
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

// Datos para los menús desplegables
const ubicaciones = [
  { value: "Agua Prieta", label: "Agua Prieta" },
  { value: "Caborca", label: "Caborca" },
  { value: "Cananea", label: "Cananea" },
  { value: "Nogales", label: "Nogales" },
  { value: "Magdalena", label: "Magdalena" },
  { value: "Guaymas", label: "Guaymas" },
  { value: "Navojoa", label: "Navojoa" },
  { value: "Puerto Peñasco", label: "Puerto Peñasco" },
  { value: "Morelia", label: "Morelia" },
  { value: "Morelos", label: "Morelos" },
  { value: "Nissauto", label: "Nissauto" },
  { value: "Macroplaza", label: "Macroplaza" },
  { value: "Granauto", label: "Granauto" }
];

const DashboardFilters: React.FC<DashboardFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    searchText: '',
    ubicacion: '',
    origen: '',
    minDiasEnInv: '',
    maxDiasEnInv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
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
      {/* <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Filtros</h3> */}
      
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 2,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(0, 0, 0, 0.6)',
        },
        '& .MuiInputBase-input': {
          color: 'inherit',
        },
        '.dark &': {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiSvgIcon-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        }
      }}>
        {/* Búsqueda general */}
        <TextField
          name="searchText"
          label="Buscar"
          variant="outlined"
          value={filters.searchText}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="h-5 w-5 text-gray-400" />
              </InputAdornment>
            ),
          }}
          sx={{ width: '260px' }}
        />

        {/* Filtro por ubicación */}
        <FormControl sx={{ minWidth: '200px' }}>
          <InputLabel id="ubicacion-label">Ubicación</InputLabel>
          <Select
            labelId="ubicacion-label"
            id="ubicacion"
            name="ubicacion"
            value={filters.ubicacion}
            label="Ubicación"
            onChange={handleSelectChange}
          >
            <MenuItem value="">Todas las ubicaciones</MenuItem>
            {ubicaciones.map((ubicacion) => (
              <MenuItem key={ubicacion.value} value={ubicacion.value}>
                {ubicacion.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rango de días en inventario */}
        <TextField
          name="minDiasEnInv"
          label="Min días"
          type="number"
          value={filters.minDiasEnInv}
          onChange={handleInputChange}
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ width: '120px' }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
          <span className="text-gray-500">a</span>
        </Box>
        
        <TextField
          name="maxDiasEnInv"
          label="Max días"
          type="number"
          value={filters.maxDiasEnInv}
          onChange={handleInputChange}
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ width: '120px' }}
        />

        {/* Botón de reset */}
        <Button 
          variant="contained" 
          onClick={handleReset}
          sx={{ 
            backgroundColor: 'rgba(229, 231, 235, 1)',
            color: 'rgba(31, 41, 55, 1)',
            '&:hover': {
              backgroundColor: 'rgba(209, 213, 219, 1)',
            },
            '.dark &': {
              backgroundColor: 'rgba(55, 65, 81, 1)',
              color: 'rgba(229, 231, 235, 1)',
              '&:hover': {
                backgroundColor: 'rgba(75, 85, 99, 1)',
              }
            }
          }}
        >
          Limpiar filtros
        </Button>
      </Box>
    </div>
  );
};

export default DashboardFilters;