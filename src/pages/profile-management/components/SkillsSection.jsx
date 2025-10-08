import React, { useState } from 'react';
import Icon from 'src/components/AppIcon';
import Button from 'src/components/ui/Button';
import Input from 'src/components/ui/Input';
import Select from 'src/components/ui/Select';

const SkillsSection = ({ skills, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'intermedio',
    category: 'tecnica'
  });

  const skillLevels = [
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' },
    { value: 'experto', label: 'Experto' }
  ];

  const skillCategories = [
    { value: 'tecnica', label: 'Técnica' },
    { value: 'blanda', label: 'Habilidad blanda' },
    { value: 'idioma', label: 'Idioma' },
    { value: 'herramienta', label: 'Herramienta' }
  ];

  const getLevelColor = (level) => {
    const colors = {
      principiante: 'bg-yellow-500',
      intermedio: 'bg-blue-500',
      avanzado: 'bg-green-500',
      experto: 'bg-purple-500'
    };
    return colors?.[level] || 'bg-gray-500';
  };

  const getLevelWidth = (level) => {
    const widths = {
      principiante: 'w-1/4',
      intermedio: 'w-2/4',
      avanzado: 'w-3/4',
      experto: 'w-full'
    };
    return widths?.[level] || 'w-1/4';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      tecnica: 'Code',
      blanda: 'Heart',
      idioma: 'Globe',
      herramienta: 'Wrench'
    };
    return icons?.[category] || 'Star';
  };

  const handleAddSkill = () => {
    if (newSkill?.name?.trim()) {
      const updatedSkills = [...skills, {
        ...newSkill,
        id: Date.now(),
        endorsements: Math.floor(Math.random() * 20) + 1
      }];
      onUpdate('skills', updatedSkills);
      setNewSkill({
        name: '',
        level: 'intermedio',
        category: 'tecnica'
      });
    }
  };

  const handleDeleteSkill = (skillId) => {
    const updatedSkills = skills?.filter(skill => skill?.id !== skillId);
    onUpdate('skills', updatedSkills);
  };

  const handleEndorseSkill = (skillId) => {
    const updatedSkills = skills?.map(skill => 
      skill?.id === skillId 
        ? { ...skill, endorsements: skill?.endorsements + 1 }
        : skill
    );
    onUpdate('skills', updatedSkills);
  };

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc?.[skill?.category]) {
      acc[skill.category] = [];
    }
    acc?.[skill?.category]?.push(skill);
    return acc;
  }, {});

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Habilidades y Competencias
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName={isEditing ? "X" : "Plus"}
          iconPosition="left"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancelar' : 'Añadir habilidad'}
        </Button>
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Add Skill Form */}
        {isEditing && (
          <div className="border border-border rounded-lg p-4 bg-muted/30 mb-6">
            <h4 className="font-heading font-medium text-foreground mb-4">
              Añadir nueva habilidad
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Nombre de la habilidad"
                type="text"
                placeholder="ej. JavaScript, Liderazgo, Inglés"
                value={newSkill?.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e?.target?.value }))}
              />
              <Select
                label="Nivel"
                options={skillLevels}
                value={newSkill?.level}
                onChange={(value) => setNewSkill(prev => ({ ...prev, level: value }))}
              />
              <Select
                label="Categoría"
                options={skillCategories}
                value={newSkill?.category}
                onChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={handleAddSkill}
                disabled={!newSkill?.name?.trim()}
              >
                Añadir habilidad
              </Button>
            </div>
          </div>
        )}

        {/* Skills by Category */}
        {Object.keys(groupedSkills)?.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedSkills)?.map(([category, categorySkills]) => {
              const categoryLabel = skillCategories?.find(c => c?.value === category)?.label || category;
              return (
                <div key={category}>
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon 
                      name={getCategoryIcon(category)} 
                      size={18} 
                      className="text-primary" 
                    />
                    <h4 className="font-heading font-medium text-foreground">
                      {categoryLabel}
                    </h4>
                    <span className="text-sm text-muted-foreground font-caption">
                      ({categorySkills?.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categorySkills?.map((skill) => (
                      <div key={skill?.id} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h5 className="font-medium text-foreground">{skill?.name}</h5>
                            <p className="text-sm text-muted-foreground font-caption">
                              Nivel: {skillLevels?.find(l => l?.value === skill?.level)?.label}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSkill(skill?.id)}
                          >
                            <Icon name="X" size={14} className="text-error" />
                          </Button>
                        </div>
                        
                        {/* Skill Level Progress */}
                        <div className="mb-3">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getLevelColor(skill?.level)} ${getLevelWidth(skill?.level)}`}
                            />
                          </div>
                        </div>

                        {/* Endorsements */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon name="ThumbsUp" size={14} className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground font-caption">
                              {skill?.endorsements} recomendaciones
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Plus"
                            onClick={() => handleEndorseSkill(skill?.id)}
                          >
                            Recomendar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          (<div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Star" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="font-heading font-medium text-foreground mb-2">
              No hay habilidades añadidas
            </h4>
            <p className="text-sm text-muted-foreground font-caption mb-4">
              Añade tus habilidades técnicas y competencias para destacar tu perfil
            </p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsEditing(true)}
            >
              Añadir primera habilidad
            </Button>
          </div>)
        )}

        {/* Skills Summary */}
        {skills?.length > 0 && (
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-heading font-medium text-foreground">
                  Resumen de habilidades
                </h4>
                <p className="text-sm text-muted-foreground font-caption">
                  Total: {skills?.length} habilidades • {skills?.reduce((sum, skill) => sum + skill?.endorsements, 0)} recomendaciones
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-heading font-semibold text-primary">
                    {skills?.filter(s => s?.level === 'experto')?.length}
                  </div>
                  <div className="text-xs text-muted-foreground font-caption">Experto</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-heading font-semibold text-secondary">
                    {skills?.filter(s => s?.level === 'avanzado')?.length}
                  </div>
                  <div className="text-xs text-muted-foreground font-caption">Avanzado</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;