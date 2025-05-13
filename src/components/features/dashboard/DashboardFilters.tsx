import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, InputAdornment, SelectChangeEvent } from '@mui/material';
import { Search, Filter, X } from 'lucide-react';

interface DashboardFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  years: string[]; // Añadimos los años disponibles como prop
}

export interface FilterValues {
  searchText: string;
  ubicacion: string;
  origen: string;
  minDiasEnInv: string;
  maxDiasEnInv: string;
  minPrecio: string; // Nuevo filtro para precio mínimo
  maxPrecio: string; // Nuevo filtro para precio máximo
  year: string;      // Nuevo filtro para año
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
  { value: "Granauto", label: "Granauto" },
  { value: "Quiroga", label: "Quiroga" }
];


const DashboardFilters: React.FC<DashboardFiltersProps> = ({ onFilterChange, years }) => {
  const [filters, setFilters] = useState<FilterValues>({
    searchText: '',
    ubicacion: '',
    origen: '',
    minDiasEnInv: '',
    maxDiasEnInv: '',
    minPrecio: '',
    maxPrecio: '',
    year: '',
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Detectar si es dispositivo móvil
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
      minPrecio: '',
      maxPrecio: '',
      year: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    if (isMobile) {
      setShowFilters(false);
    }
  };

  // Vista móvil
  if (isMobile) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        {/* Vista colapsada para móvil */}
        <div className="flex justify-between items-center">
          <TextField
            name="searchText"
            placeholder="Buscar..."
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
            fullWidth
            sx={{ 
              mr: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                '&.Mui-focused fieldset': { borderColor: '#1976d2' },
              },
              '.dark &': {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                  '&.Mui-focused fieldset': { borderColor: '#90caf9' },
                },
                '& .MuiInputBase-input': { color: 'white' },
              }
            }}
          />
          
          <Button
            variant="contained"
            onClick={() => setShowFilters(!showFilters)}
            startIcon={showFilters ? <X size={18} /> : <Filter size={18} />}
            sx={{ 
              minWidth: 'auto',
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
            {showFilters ? 'Cerrar' : 'Filtros'}
          </Button>
        </div>
        
        {/* Filtros expandidos */}
        {showFilters && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2,
            mt: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
              '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
              '&.Mui-focused fieldset': { borderColor: '#1976d2' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(0, 0, 0, 0.6)' },
            '& .MuiInputBase-input': { color: 'inherit' },
            '.dark &': {
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                '&.Mui-focused fieldset': { borderColor: '#90caf9' },
              },
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiSvgIcon-root': { color: 'rgba(255, 255, 255, 0.7)' },
            }
          }}>
            {/* Filtro por ubicación */}
            <FormControl fullWidth>
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

            {/* Filtro por año */}
            <FormControl fullWidth>
              <InputLabel id="year-label">Año</InputLabel>
              <Select
                labelId="year-label"
                id="year"
                name="year"
                value={filters.year}
                label="Año"
                onChange={handleSelectChange}
              >
                <MenuItem value="">Todos los años</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Rango de días en inventario */}
            <div className="flex gap-2 items-center">
              <TextField
                name="minDiasEnInv"
                label="Min días"
                type="number"
                value={filters.minDiasEnInv}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
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
                fullWidth
              />
            </div>

            {/* Rango de precios */}
            <div className="flex gap-2 items-center">
              <TextField
                name="minPrecio"
                label="Precio min"
                type="number"
                value={filters.minPrecio}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                <span className="text-gray-500">a</span>
              </Box>
              
              <TextField
                name="maxPrecio"
                label="Precio max"
                type="number"
                value={filters.maxPrecio}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
              />
            </div>

            {/* Botón de reset */}
            <Button 
              variant="contained" 
              onClick={handleReset}
              fullWidth
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
        )}
      </div>
    );
  }

  // Vista desktop (original)
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
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

        {/* Filtro por año */}
        <FormControl sx={{ minWidth: '120px' }}>
          <InputLabel id="year-label">Año</InputLabel>
          <Select
            labelId="year-label"
            id="year"
            name="year"
            value={filters.year}
            label="Año"
            onChange={handleSelectChange}
          >
            <MenuItem value="">Todos</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
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

        {/* Rango de precios */}
        <TextField
          name="minPrecio"
          label="$ Min"
          type="number"
          value={filters.minPrecio}
          onChange={handleInputChange}
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ width: '120px' }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
          <span className="text-gray-500">a</span>
        </Box>
        
        <TextField
          name="maxPrecio"
          label="$ Max"
          type="number"
          value={filters.maxPrecio}
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