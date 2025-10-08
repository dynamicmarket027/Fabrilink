import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EducationSection = ({ education, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    field: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: ''
  });

  const degreeTypes = [
    { value: 'bachillerato', label: 'Bachillerato' },
    { value: 'fp_medio', label: 'FP Grado Medio' },
    { value: 'fp_superior', label: 'FP Grado Superior' },
    { value: 'grado', label: 'Grado Universitario' },
    { value: 'master', label: 'Máster' },
    { value: 'doctorado', label: 'Doctorado' },
    { value: 'certificacion', label: 'Certificación' },
    { value: 'curso', label: 'Curso' }
  ];

  const handleAddEducation = () => {
    setFormData({
      degree: '',
      institution: '',
      field: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: ''
    });
    setEditingIndex(-1);
    setIsEditing(true);
  };

  const handleEditEducation = (index) => {
    const educationItem = education?.[index];
    setFormData(educationItem);
    setEditingIndex(index);
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedEducation = [...education];
    
    if (editingIndex >= 0) {
      updatedEducation[editingIndex] = formData;
    } else {
      updatedEducation?.push({
        ...formData,
        id: Date.now()
      });
    }

    onUpdate('education', updatedEducation);
    setIsEditing(false);
    setEditingIndex(-1);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingIndex(-1);
  };

  const handleDeleteEducation = (index) => {
    const updatedEducation = education?.filter((_, i) => i !== index);
    onUpdate('education', updatedEducation);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate)?.toLocaleDateString('es-ES', { 
      month: 'short', 
      year: 'numeric' 
    });
    const end = new Date(endDate)?.toLocaleDateString('es-ES', { 
      month: 'short', 
      year: 'numeric' 
    });
    return `${start} - ${end}`;
  };

  const getDegreeLabel = (degreeValue) => {
    const degree = degreeTypes?.find(d => d?.value === degreeValue);
    return degree ? degree?.label : degreeValue;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Formación Académica
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddEducation}
          disabled={isEditing}
        >
          Añadir formación
        </Button>
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Education List */}
        {education?.length > 0 && (
          <div className="space-y-6 mb-6">
            {education?.map((educationItem, index) => (
              <div key={educationItem?.id || index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="GraduationCap" size={20} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-medium text-foreground">
                        {getDegreeLabel(educationItem?.degree)}
                        {educationItem?.field && ` en ${educationItem?.field}`}
                      </h4>
                      <p className="text-sm text-muted-foreground font-caption">
                        {educationItem?.institution}
                      </p>
                      <p className="text-xs text-muted-foreground font-caption mt-1">
                        {formatDateRange(educationItem?.startDate, educationItem?.endDate)}
                      </p>
                      {educationItem?.grade && (
                        <p className="text-sm text-foreground mt-2">
                          <span className="font-medium">Calificación:</span> {educationItem?.grade}
                        </p>
                      )}
                      {educationItem?.description && (
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {educationItem?.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditEducation(index)}
                      disabled={isEditing}
                    >
                      <Icon name="Edit2" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEducation(index)}
                      disabled={isEditing}
                    >
                      <Icon name="Trash2" size={16} className="text-error" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Form */}
        {isEditing && (
          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-heading font-medium text-foreground">
                {editingIndex >= 0 ? 'Editar formación' : 'Añadir nueva formación'}
              </h4>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={handleSave}
                >
                  Guardar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Degree Type and Field */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Tipo de formación"
                  options={degreeTypes}
                  value={formData?.degree}
                  onChange={(value) => handleInputChange('degree', value)}
                  placeholder="Selecciona el tipo"
                  required
                />
                <Input
                  label="Campo de estudio"
                  type="text"
                  placeholder="ej. Ingeniería Informática"
                  value={formData?.field}
                  onChange={(e) => handleInputChange('field', e?.target?.value)}
                />
              </div>

              {/* Institution */}
              <Input
                label="Institución"
                type="text"
                placeholder="ej. Universidad Complutense de Madrid"
                value={formData?.institution}
                onChange={(e) => handleInputChange('institution', e?.target?.value)}
                required
              />

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Fecha de inicio"
                  type="date"
                  value={formData?.startDate}
                  onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                  required
                />
                <Input
                  label="Fecha de fin"
                  type="date"
                  value={formData?.endDate}
                  onChange={(e) => handleInputChange('endDate', e?.target?.value)}
                  required
                />
              </div>

              {/* Grade */}
              <Input
                label="Calificación"
                type="text"
                placeholder="ej. Sobresaliente, 8.5/10, Cum Laude"
                value={formData?.grade}
                onChange={(e) => handleInputChange('grade', e?.target?.value)}
                description="Opcional: nota media, mención honorífica, etc."
              />

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descripción adicional
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Proyectos destacados, actividades extracurriculares, logros académicos..."
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {education?.length === 0 && !isEditing && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="GraduationCap" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="font-heading font-medium text-foreground mb-2">
              No hay formación académica
            </h4>
            <p className="text-sm text-muted-foreground font-caption mb-4">
              Añade tu formación académica para mostrar tu background educativo
            </p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={handleAddEducation}
            >
              Añadir primera formación
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationSection;