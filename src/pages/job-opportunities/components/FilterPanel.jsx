import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const industryOptions = [
    { value: 'technology', label: 'Tecnología' },
    { value: 'finance', label: 'Finanzas' },
    { value: 'healthcare', label: 'Salud' },
    { value: 'education', label: 'Educación' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Ventas' },
    { value: 'design', label: 'Diseño' },
    { value: 'engineering', label: 'Ingeniería' },
    { value: 'consulting', label: 'Consultoría' },
    { value: 'manufacturing', label: 'Manufactura' }
  ];

  const experienceLevelOptions = [
    { value: 'entry', label: 'Nivel de entrada' },
    { value: 'junior', label: 'Junior (1-3 años)' },
    { value: 'mid', label: 'Intermedio (3-5 años)' },
    { value: 'senior', label: 'Senior (5+ años)' },
    { value: 'lead', label: 'Líder/Gerente' },
    { value: 'executive', label: 'Ejecutivo' }
  ];

  const jobTypeOptions = [
    { value: 'full-time', label: 'Tiempo completo' },
    { value: 'part-time', label: 'Tiempo parcial' },
    { value: 'contract', label: 'Contrato' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Prácticas' }
  ];

  const companySizeOptions = [
    { value: 'startup', label: 'Startup (1-50)' },
    { value: 'small', label: 'Pequeña (51-200)' },
    { value: 'medium', label: 'Mediana (201-1000)' },
    { value: 'large', label: 'Grande (1000+)' }
  ];

  const locationOptions = [
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'bilbao', label: 'Bilbao' },
    { value: 'remote', label: 'Remoto' },
    { value: 'hybrid', label: 'Híbrido' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleArrayFilterChange = (key, value, checked) => {
    const currentArray = localFilters?.[key] || [];
    const updatedArray = checked
      ? [...currentArray, value]
      : currentArray?.filter(item => item !== value);
    
    handleFilterChange(key, updatedArray);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      keywords: '',
      location: [],
      industry: [],
      experienceLevel: [],
      jobType: [],
      companySize: [],
      salaryMin: '',
      salaryMax: '',
      remote: false,
      postedWithin: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.keywords) count++;
    if (localFilters?.location?.length) count++;
    if (localFilters?.industry?.length) count++;
    if (localFilters?.experienceLevel?.length) count++;
    if (localFilters?.jobType?.length) count++;
    if (localFilters?.companySize?.length) count++;
    if (localFilters?.salaryMin || localFilters?.salaryMax) count++;
    if (localFilters?.remote) count++;
    if (localFilters?.postedWithin) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="w-full"
        >
          Filtros {activeCount > 0 && `(${activeCount})`}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card border border-border rounded-lg shadow-subtle ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Filtros de búsqueda
            </h2>
            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                iconName="X"
                iconPosition="left"
              >
                Limpiar ({activeCount})
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Keywords Search */}
            <div>
              <Input
                label="Palabras clave"
                type="search"
                placeholder="Título, empresa, habilidades..."
                value={localFilters?.keywords || ''}
                onChange={(e) => handleFilterChange('keywords', e?.target?.value)}
              />
            </div>

            {/* Location */}
            <div>
              <Select
                label="Ubicación"
                placeholder="Seleccionar ubicaciones"
                options={locationOptions}
                value={localFilters?.location || []}
                onChange={(value) => handleFilterChange('location', value)}
                multiple
                searchable
              />
            </div>

            {/* Industry */}
            <div>
              <Select
                label="Industria"
                placeholder="Seleccionar industrias"
                options={industryOptions}
                value={localFilters?.industry || []}
                onChange={(value) => handleFilterChange('industry', value)}
                multiple
                searchable
              />
            </div>

            {/* Experience Level */}
            <div>
              <Select
                label="Nivel de experiencia"
                placeholder="Seleccionar niveles"
                options={experienceLevelOptions}
                value={localFilters?.experienceLevel || []}
                onChange={(value) => handleFilterChange('experienceLevel', value)}
                multiple
              />
            </div>

            {/* Job Type */}
            <div>
              <Select
                label="Tipo de empleo"
                placeholder="Seleccionar tipos"
                options={jobTypeOptions}
                value={localFilters?.jobType || []}
                onChange={(value) => handleFilterChange('jobType', value)}
                multiple
              />
            </div>

            {/* Company Size */}
            <div>
              <Select
                label="Tamaño de empresa"
                placeholder="Seleccionar tamaños"
                options={companySizeOptions}
                value={localFilters?.companySize || []}
                onChange={(value) => handleFilterChange('companySize', value)}
                multiple
              />
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Rango salarial (EUR)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Mínimo"
                  value={localFilters?.salaryMin || ''}
                  onChange={(e) => handleFilterChange('salaryMin', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Máximo"
                  value={localFilters?.salaryMax || ''}
                  onChange={(e) => handleFilterChange('salaryMax', e?.target?.value)}
                />
              </div>
            </div>

            {/* Remote Work */}
            <div>
              <Checkbox
                label="Trabajo remoto disponible"
                checked={localFilters?.remote || false}
                onChange={(e) => handleFilterChange('remote', e?.target?.checked)}
              />
            </div>

            {/* Posted Within */}
            <div>
              <Select
                label="Publicado en"
                placeholder="Cualquier momento"
                options={[
                  { value: '24h', label: 'Últimas 24 horas' },
                  { value: '3d', label: 'Últimos 3 días' },
                  { value: '1w', label: 'Última semana' },
                  { value: '2w', label: 'Últimas 2 semanas' },
                  { value: '1m', label: 'Último mes' }
                ]}
                value={localFilters?.postedWithin || ''}
                onChange={(value) => handleFilterChange('postedWithin', value)}
              />
            </div>
          </div>
        </div>

        {/* Mobile Apply Filters Button */}
        <div className="lg:hidden p-4 border-t border-border">
          <Button
            variant="default"
            onClick={onToggle}
            className="w-full"
          >
            Ver resultados
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;