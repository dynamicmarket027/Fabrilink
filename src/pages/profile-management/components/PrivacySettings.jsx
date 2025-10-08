import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySettings = ({ privacySettings, onUpdate }) => {
  const [settings, setSettings] = useState({
    profileVisibility: privacySettings?.profileVisibility || 'publico',
    contactInfo: privacySettings?.contactInfo || 'conexiones',
    experienceVisibility: privacySettings?.experienceVisibility || 'publico',
    educationVisibility: privacySettings?.educationVisibility || 'publico',
    skillsVisibility: privacySettings?.skillsVisibility || 'publico',
    connectionsList: privacySettings?.connectionsList || 'conexiones',
    activityFeed: privacySettings?.activityFeed || 'publico',
    searchEngineIndexing: privacySettings?.searchEngineIndexing !== false,
    profileInSearch: privacySettings?.profileInSearch !== false,
    emailNotifications: privacySettings?.emailNotifications !== false,
    connectionRequests: privacySettings?.connectionRequests !== false,
    messageRequests: privacySettings?.messageRequests !== false,
    jobAlerts: privacySettings?.jobAlerts !== false,
    networkUpdates: privacySettings?.networkUpdates !== false
  });

  const visibilityOptions = [
    { value: 'publico', label: 'Público - Visible para todos' },
    { value: 'conexiones', label: 'Solo conexiones' },
    { value: 'red_extendida', label: 'Red extendida (conexiones de 2º grado)' },
    { value: 'privado', label: 'Privado - Solo yo' }
  ];

  const handleSettingChange = (key, value) => {
    const updatedSettings = {
      ...settings,
      [key]: value
    };
    setSettings(updatedSettings);
    onUpdate('privacySettings', updatedSettings);
  };

  const getVisibilityIcon = (visibility) => {
    const icons = {
      publico: 'Globe',
      conexiones: 'Users',
      red_extendida: 'Network',
      privado: 'Lock'
    };
    return icons?.[visibility] || 'Globe';
  };

  const getVisibilityColor = (visibility) => {
    const colors = {
      publico: 'text-green-500',
      conexiones: 'text-blue-500',
      red_extendida: 'text-yellow-500',
      privado: 'text-red-500'
    };
    return colors?.[visibility] || 'text-gray-500';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Configuración de Privacidad
          </h3>
        </div>
        <p className="text-sm text-muted-foreground font-caption mt-2">
          Controla quién puede ver tu información y cómo interactúan contigo
        </p>
      </div>
      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Profile Visibility Section */}
        <div>
          <h4 className="font-heading font-medium text-foreground mb-4 flex items-center">
            <Icon name="Eye" size={18} className="mr-2 text-primary" />
            Visibilidad del Perfil
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Perfil general"
                description="Quién puede ver tu perfil completo"
                options={visibilityOptions}
                value={settings?.profileVisibility}
                onChange={(value) => handleSettingChange('profileVisibility', value)}
              />
              <Select
                label="Información de contacto"
                description="Quién puede ver tu email y teléfono"
                options={visibilityOptions}
                value={settings?.contactInfo}
                onChange={(value) => handleSettingChange('contactInfo', value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Experiencia laboral"
                description="Visibilidad de tu historial profesional"
                options={visibilityOptions}
                value={settings?.experienceVisibility}
                onChange={(value) => handleSettingChange('experienceVisibility', value)}
              />
              <Select
                label="Formación académica"
                description="Quién puede ver tu educación"
                options={visibilityOptions}
                value={settings?.educationVisibility}
                onChange={(value) => handleSettingChange('educationVisibility', value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Habilidades"
                description="Visibilidad de tus competencias"
                options={visibilityOptions}
                value={settings?.skillsVisibility}
                onChange={(value) => handleSettingChange('skillsVisibility', value)}
              />
              <Select
                label="Lista de conexiones"
                description="Quién puede ver tus contactos"
                options={visibilityOptions}
                value={settings?.connectionsList}
                onChange={(value) => handleSettingChange('connectionsList', value)}
              />
            </div>
          </div>
        </div>

        {/* Activity & Search Section */}
        <div>
          <h4 className="font-heading font-medium text-foreground mb-4 flex items-center">
            <Icon name="Activity" size={18} className="mr-2 text-primary" />
            Actividad y Búsquedas
          </h4>
          <div className="space-y-4">
            <Select
              label="Feed de actividad"
              description="Quién puede ver tus publicaciones y actividad"
              options={visibilityOptions}
              value={settings?.activityFeed}
              onChange={(value) => handleSettingChange('activityFeed', value)}
            />
            
            <div className="space-y-3">
              <Checkbox
                label="Permitir indexación en motores de búsqueda"
                description="Tu perfil público aparecerá en Google y otros buscadores"
                checked={settings?.searchEngineIndexing}
                onChange={(e) => handleSettingChange('searchEngineIndexing', e?.target?.checked)}
              />
              <Checkbox
                label="Aparecer en búsquedas internas"
                description="Otros usuarios pueden encontrarte usando la búsqueda de FabriLink"
                checked={settings?.profileInSearch}
                onChange={(e) => handleSettingChange('profileInSearch', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h4 className="font-heading font-medium text-foreground mb-4 flex items-center">
            <Icon name="Bell" size={18} className="mr-2 text-primary" />
            Notificaciones
          </h4>
          <div className="space-y-3">
            <Checkbox
              label="Notificaciones por email"
              description="Recibir resúmenes y actualizaciones importantes por correo"
              checked={settings?.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
            />
            <Checkbox
              label="Solicitudes de conexión"
              description="Notificarme cuando alguien quiera conectar conmigo"
              checked={settings?.connectionRequests}
              onChange={(e) => handleSettingChange('connectionRequests', e?.target?.checked)}
            />
            <Checkbox
              label="Solicitudes de mensaje"
              description="Notificarme cuando reciba mensajes de no-conexiones"
              checked={settings?.messageRequests}
              onChange={(e) => handleSettingChange('messageRequests', e?.target?.checked)}
            />
            <Checkbox
              label="Alertas de empleo"
              description="Recibir notificaciones sobre oportunidades laborales relevantes"
              checked={settings?.jobAlerts}
              onChange={(e) => handleSettingChange('jobAlerts', e?.target?.checked)}
            />
            <Checkbox
              label="Actualizaciones de la red"
              description="Notificarme sobre actividad de mis conexiones"
              checked={settings?.networkUpdates}
              onChange={(e) => handleSettingChange('networkUpdates', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Privacy Summary */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-heading font-medium text-foreground mb-3 flex items-center">
            <Icon name="Info" size={18} className="mr-2 text-primary" />
            Resumen de Privacidad
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Perfil general:</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getVisibilityIcon(settings?.profileVisibility)} 
                    size={14} 
                    className={getVisibilityColor(settings?.profileVisibility)} 
                  />
                  <span className="text-sm font-caption text-muted-foreground">
                    {visibilityOptions?.find(o => o?.value === settings?.profileVisibility)?.label?.split(' - ')?.[0]}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Contacto:</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getVisibilityIcon(settings?.contactInfo)} 
                    size={14} 
                    className={getVisibilityColor(settings?.contactInfo)} 
                  />
                  <span className="text-sm font-caption text-muted-foreground">
                    {visibilityOptions?.find(o => o?.value === settings?.contactInfo)?.label?.split(' - ')?.[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Búsquedas:</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={settings?.profileInSearch ? "Check" : "X"} 
                    size={14} 
                    className={settings?.profileInSearch ? "text-green-500" : "text-red-500"} 
                  />
                  <span className="text-sm font-caption text-muted-foreground">
                    {settings?.profileInSearch ? "Habilitado" : "Deshabilitado"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Notificaciones:</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={settings?.emailNotifications ? "Check" : "X"} 
                    size={14} 
                    className={settings?.emailNotifications ? "text-green-500" : "text-red-500"} 
                  />
                  <span className="text-sm font-caption text-muted-foreground">
                    {settings?.emailNotifications ? "Habilitado" : "Deshabilitado"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => {
              const defaultSettings = {
                profileVisibility: 'publico',
                contactInfo: 'conexiones',
                experienceVisibility: 'publico',
                educationVisibility: 'publico',
                skillsVisibility: 'publico',
                connectionsList: 'conexiones',
                activityFeed: 'publico',
                searchEngineIndexing: true,
                profileInSearch: true,
                emailNotifications: true,
                connectionRequests: true,
                messageRequests: true,
                jobAlerts: true,
                networkUpdates: true
              };
              setSettings(defaultSettings);
              onUpdate('privacySettings', defaultSettings);
            }}
          >
            Restaurar por defecto
          </Button>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-success font-caption">
              Configuración guardada automáticamente
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;