import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const NetworkSearch = ({ onSearch, onFilterChange, filters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const industryOptions = [
    { value: '', label: 'Todas las industrias' },
    { value: 'technology', label: 'Tecnología' },
    { value: 'finance', label: 'Finanzas' },
    { value: 'healthcare', label: 'Salud' },
    { value: 'education', label: 'Educación' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'consulting', label: 'Consultoría' },
    { value: 'manufacturing', label: 'Manufactura' },
    { value: 'retail', label: 'Retail' }
  ];

  const locationOptions = [
    { value: '', label: 'Todas las ubicaciones' },
    { value: 'madrid', label: 'Madrid, España' },
    { value: 'barcelona', label: 'Barcelona, España' },
    { value: 'valencia', label: 'Valencia, España' },
    { value: 'sevilla', label: 'Sevilla, España' },
    { value: 'bilbao', label: 'Bilbao, España' },
    { value: 'mexico-city', label: 'Ciudad de México, México' },
    { value: 'buenos-aires', label: 'Buenos Aires, Argentina' },
    { value: 'bogota', label: 'Bogotá, Colombia' }
  ];

  const experienceLevelOptions = [
    { value: '', label: 'Todos los niveles' },
    { value: 'entry', label: 'Nivel inicial (0-2 años)' },
    { value: 'mid', label: 'Nivel medio (3-5 años)' },
    { value: 'senior', label: 'Senior (6-10 años)' },
    { value: 'executive', label: 'Ejecutivo (10+ años)' }
  ];

  const connectionTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: '1st', label: 'Conexiones directas' },
    { value: '2nd', label: 'Conexiones de segundo grado' },
    { value: '3rd', label: 'Conexiones de tercer grado' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    onFilterChange({
      industry: '',
      location: '',
      experienceLevel: '',
      connectionType: ''
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Main Search */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Buscar profesionales por nombre, empresa, cargo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10 pr-12"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            <Icon name="Search" size={16} />
          </Button>
        </div>
      </form>
      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          iconPosition="left"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          Filtros avanzados
          <Icon 
            name={showAdvancedFilters ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="ml-2" 
          />
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={clearFilters}
          >
            Limpiar filtros
          </Button>
        )}
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
          <Select
            label="Industria"
            options={industryOptions}
            value={filters?.industry}
            onChange={(value) => handleFilterChange('industry', value)}
            placeholder="Seleccionar industria"
          />

          <Select
            label="Ubicación"
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => handleFilterChange('location', value)}
            placeholder="Seleccionar ubicación"
            searchable
          />

          <Select
            label="Nivel de experiencia"
            options={experienceLevelOptions}
            value={filters?.experienceLevel}
            onChange={(value) => handleFilterChange('experienceLevel', value)}
            placeholder="Seleccionar nivel"
          />

          <Select
            label="Tipo de conexión"
            options={connectionTypeOptions}
            value={filters?.connectionType}
            onChange={(value) => handleFilterChange('connectionType', value)}
            placeholder="Seleccionar tipo"
          />
        </div>
      )}
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {Object.entries(filters)?.map(([key, value]) => {
            if (!value) return null;
            
            let label = '';
            let displayValue = value;
            
            switch (key) {
              case 'industry':
                label = 'Industria';
                displayValue = industryOptions?.find(opt => opt?.value === value)?.label || value;
                break;
              case 'location':
                label = 'Ubicación';
                displayValue = locationOptions?.find(opt => opt?.value === value)?.label || value;
                break;
              case 'experienceLevel':
                label = 'Experiencia';
                displayValue = experienceLevelOptions?.find(opt => opt?.value === value)?.label || value;
                break;
              case 'connectionType':
                label = 'Conexión';
                displayValue = connectionTypeOptions?.find(opt => opt?.value === value)?.label || value;
                break;
              default:
                return null;
            }

            return (
              <div
                key={key}
                className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-caption"
              >
                <span>{label}: {displayValue}</span>
                <button
                  onClick={() => handleFilterChange(key, '')}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-smooth"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NetworkSearch;