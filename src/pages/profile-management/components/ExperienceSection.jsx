import React, { useState } from 'react';
import Icon from 'src/components/AppIcon';

import Button from 'src/components/ui/Button';
import Input from 'src/components/ui/Input';

import { Checkbox } from 'src/components/ui/Checkbox';

const ExperienceSection = ({ experiences, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ['']
  });

  const employmentTypes = [
    { value: 'tiempo_completo', label: 'Tiempo completo' },
    { value: 'tiempo_parcial', label: 'Tiempo parcial' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'contrato', label: 'Contrato' },
    { value: 'practicas', label: 'Prácticas' }
  ];

  const handleAddExperience = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    });
    setEditingIndex(-1);
    setIsEditing(true);
  };

  const handleEditExperience = (index) => {
    const experience = experiences?.[index];
    setFormData({
      ...experience,
      achievements: experience?.achievements || ['']
    });
    setEditingIndex(index);
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedExperiences = [...experiences];
    const experienceData = {
      ...formData,
      achievements: formData?.achievements?.filter(achievement => achievement?.trim() !== '')
    };

    if (editingIndex >= 0) {
      updatedExperiences[editingIndex] = experienceData;
    } else {
      updatedExperiences?.push({
        ...experienceData,
        id: Date.now()
      });
    }

    onUpdate('experiences', updatedExperiences);
    setIsEditing(false);
    setEditingIndex(-1);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingIndex(-1);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = experiences?.filter((_, i) => i !== index);
    onUpdate('experiences', updatedExperiences);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...formData?.achievements];
    updatedAchievements[index] = value;
    setFormData(prev => ({
      ...prev,
      achievements: updatedAchievements
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev?.achievements, '']
    }));
  };

  const removeAchievement = (index) => {
    const updatedAchievements = formData?.achievements?.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      achievements: updatedAchievements
    }));
  };

  const formatDateRange = (startDate, endDate, current) => {
    const start = new Date(startDate)?.toLocaleDateString('es-ES', { 
      month: 'short', 
      year: 'numeric' 
    });
    const end = current ? 'Actualidad' : new Date(endDate)?.toLocaleDateString('es-ES', { 
      month: 'short', 
      year: 'numeric' 
    });
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Experiencia Profesional
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddExperience}
          disabled={isEditing}
        >
          Añadir experiencia
        </Button>
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Experience List */}
        {experiences?.length > 0 && (
          <div className="space-y-6 mb-6">
            {experiences?.map((experience, index) => (
              <div key={experience?.id || index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Building2" size={20} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-medium text-foreground">
                        {experience?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-caption">
                        {experience?.company} • {experience?.location}
                      </p>
                      <p className="text-xs text-muted-foreground font-caption mt-1">
                        {formatDateRange(experience?.startDate, experience?.endDate, experience?.current)}
                      </p>
                      {experience?.description && (
                        <p className="text-sm text-foreground mt-2 leading-relaxed">
                          {experience?.description}
                        </p>
                      )}
                      {experience?.achievements && experience?.achievements?.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-foreground mb-2">Logros destacados:</p>
                          <ul className="space-y-1">
                            {experience?.achievements?.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-sm text-muted-foreground flex items-start">
                                <Icon name="ChevronRight" size={14} className="mt-0.5 mr-2 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditExperience(index)}
                      disabled={isEditing}
                    >
                      <Icon name="Edit2" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteExperience(index)}
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
                {editingIndex >= 0 ? 'Editar experiencia' : 'Añadir nueva experiencia'}
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
              {/* Job Title and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Puesto de trabajo"
                  type="text"
                  placeholder="ej. Desarrollador Senior"
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  required
                />
                <Input
                  label="Empresa"
                  type="text"
                  placeholder="ej. TechCorp S.L."
                  value={formData?.company}
                  onChange={(e) => handleInputChange('company', e?.target?.value)}
                  required
                />
              </div>

              {/* Location */}
              <Input
                label="Ubicación"
                type="text"
                placeholder="Madrid, España"
                value={formData?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
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
                  disabled={formData?.current}
                />
              </div>

              {/* Current Position */}
              <Checkbox
                label="Trabajo actual"
                checked={formData?.current}
                onChange={(e) => handleInputChange('current', e?.target?.checked)}
              />

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descripción del puesto
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Describe tus responsabilidades y funciones principales..."
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                />
              </div>

              {/* Achievements */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-foreground">
                    Logros destacados
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={addAchievement}
                  >
                    Añadir logro
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData?.achievements?.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="ej. Aumenté las ventas en un 25%"
                        value={achievement}
                        onChange={(e) => handleAchievementChange(index, e?.target?.value)}
                        className="flex-1"
                      />
                      {formData?.achievements?.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAchievement(index)}
                        >
                          <Icon name="X" size={16} className="text-error" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {experiences?.length === 0 && !isEditing && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Briefcase" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="font-heading font-medium text-foreground mb-2">
              No hay experiencia profesional
            </h4>
            <p className="text-sm text-muted-foreground font-caption mb-4">
              Añade tu experiencia laboral para mostrar tu trayectoria profesional
            </p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={handleAddExperience}
            >
              Añadir primera experiencia
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;