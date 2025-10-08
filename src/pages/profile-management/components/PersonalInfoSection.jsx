import React, { useState } from 'react';
import Icon from 'src/components/AppIcon';
import Image from 'src/components/AppImage';
import Button from 'src/components/ui/Button';
import Input from 'src/components/ui/Input';
import Select from 'src/components/ui/Select';

const PersonalInfoSection = ({ profileData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    headline: profileData?.headline || '',
    location: profileData?.location || '',
    industry: profileData?.industry || '',
    phone: profileData?.phone || '',
    email: profileData?.email || '',
    website: profileData?.website || '',
    profileImage: profileData?.profileImage || '',
    backgroundImage: profileData?.backgroundImage || ''
  });

  const industryOptions = [
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'finanzas', label: 'Finanzas' },
    { value: 'salud', label: 'Salud' },
    { value: 'educacion', label: 'Educación' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'ingenieria', label: 'Ingeniería' },
    { value: 'consultoria', label: 'Consultoría' },
    { value: 'ventas', label: 'Ventas' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdate('personalInfo', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: profileData?.firstName || '',
      lastName: profileData?.lastName || '',
      headline: profileData?.headline || '',
      location: profileData?.location || '',
      industry: profileData?.industry || '',
      phone: profileData?.phone || '',
      email: profileData?.email || '',
      website: profileData?.website || '',
      profileImage: profileData?.profileImage || '',
      backgroundImage: profileData?.backgroundImage || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Información Personal
        </h3>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit2"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </Button>
        ) : (
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
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Profile Images */}
        <div className="mb-8">
          <div className="relative">
            {/* Background Image */}
            <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg overflow-hidden relative">
              {formData?.backgroundImage && (
                <Image
                  src={formData?.backgroundImage}
                  alt="Imagen de fondo del perfil"
                  className="w-full h-full object-cover"
                />
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Camera"
                    className="text-white hover:bg-white/20"
                  >
                    Cambiar fondo
                  </Button>
                </div>
              )}
            </div>

            {/* Profile Image */}
            <div className="absolute -bottom-12 left-6">
              <div className="relative">
                <div className="w-24 h-24 bg-card border-4 border-card rounded-full overflow-hidden">
                  {formData?.profileImage ? (
                    <Image
                      src={formData?.profileImage}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Icon name="User" size={32} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <Icon name="Camera" size={16} className="text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-16 space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre"
              type="text"
              value={formData?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              disabled={!isEditing}
              required
            />
            <Input
              label="Apellidos"
              type="text"
              value={formData?.lastName}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              disabled={!isEditing}
              required
            />
          </div>

          {/* Headline */}
          <Input
            label="Titular profesional"
            type="text"
            placeholder="ej. Desarrollador Full Stack en TechCorp"
            value={formData?.headline}
            onChange={(e) => handleInputChange('headline', e?.target?.value)}
            disabled={!isEditing}
            description="Una breve descripción de tu posición actual"
          />

          {/* Location and Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Ubicación"
              type="text"
              placeholder="Madrid, España"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              disabled={!isEditing}
            />
            <Select
              label="Sector"
              options={industryOptions}
              value={formData?.industry}
              onChange={(value) => handleInputChange('industry', value)}
              disabled={!isEditing}
              placeholder="Selecciona tu sector"
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Teléfono"
              type="tel"
              placeholder="+34 600 000 000"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              disabled={!isEditing}
            />
            <Input
              label="Email"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              disabled={!isEditing}
              required
            />
          </div>

          {/* Website */}
          <Input
            label="Sitio web"
            type="url"
            placeholder="https://tu-sitio-web.com"
            value={formData?.website}
            onChange={(e) => handleInputChange('website', e?.target?.value)}
            disabled={!isEditing}
            description="Tu sitio web personal o portafolio"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;