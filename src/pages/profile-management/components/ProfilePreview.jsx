import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePreview = ({ profileData }) => {
  const calculateCompleteness = () => {
    const sections = [
      { key: 'firstName', weight: 10 },
      { key: 'lastName', weight: 10 },
      { key: 'headline', weight: 15 },
      { key: 'location', weight: 5 },
      { key: 'industry', weight: 10 },
      { key: 'profileImage', weight: 10 },
      { key: 'experiences', weight: 25, isArray: true },
      { key: 'education', weight: 10, isArray: true },
      { key: 'skills', weight: 5, isArray: true }
    ];

    let completedWeight = 0;
    sections?.forEach(section => {
      if (section?.isArray) {
        if (profileData?.[section?.key] && profileData?.[section?.key]?.length > 0) {
          completedWeight += section?.weight;
        }
      } else {
        if (profileData?.[section?.key] && profileData?.[section?.key]?.trim() !== '') {
          completedWeight += section?.weight;
        }
      }
    });

    return Math.round(completedWeight);
  };

  const getCompletionRecommendations = () => {
    const recommendations = [];
    
    if (!profileData?.headline || profileData?.headline?.trim() === '') {
      recommendations?.push({
        icon: 'User',
        text: 'Añade un titular profesional',
        priority: 'high'
      });
    }
    
    if (!profileData?.experiences || profileData?.experiences?.length === 0) {
      recommendations?.push({
        icon: 'Briefcase',
        text: 'Añade tu experiencia laboral',
        priority: 'high'
      });
    }
    
    if (!profileData?.profileImage || profileData?.profileImage?.trim() === '') {
      recommendations?.push({
        icon: 'Camera',
        text: 'Sube una foto de perfil',
        priority: 'medium'
      });
    }
    
    if (!profileData?.skills || profileData?.skills?.length < 3) {
      recommendations?.push({
        icon: 'Star',
        text: 'Añade más habilidades (mínimo 3)',
        priority: 'medium'
      });
    }
    
    if (!profileData?.education || profileData?.education?.length === 0) {
      recommendations?.push({
        icon: 'GraduationCap',
        text: 'Añade tu formación académica',
        priority: 'low'
      });
    }

    return recommendations;
  };

  const completeness = calculateCompleteness();
  const recommendations = getCompletionRecommendations();

  const formatExperienceYears = () => {
    if (!profileData?.experiences || profileData?.experiences?.length === 0) return '0 años';
    
    const totalMonths = profileData?.experiences?.reduce((total, exp) => {
      const start = new Date(exp.startDate);
      const end = exp?.current ? new Date() : new Date(exp.endDate);
      const months = (end?.getFullYear() - start?.getFullYear()) * 12 + (end?.getMonth() - start?.getMonth());
      return total + months;
    }, 0);
    
    const years = Math.floor(totalMonths / 12);
    return years > 0 ? `${years} año${years > 1 ? 's' : ''}` : 'Menos de 1 año';
  };

  const getTopSkills = () => {
    if (!profileData?.skills || profileData?.skills?.length === 0) return [];
    return profileData?.skills?.sort((a, b) => b?.endorsements - a?.endorsements)?.slice(0, 3);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle sticky top-24">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Vista previa del perfil
        </h3>
        <p className="text-sm text-muted-foreground font-caption mt-1">
          Así verán otros usuarios tu perfil
        </p>
      </div>
      {/* Profile Preview */}
      <div className="p-6">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-muted rounded-full overflow-hidden border-4 border-card shadow-subtle">
              {profileData?.profileImage ? (
                <Image
                  src={profileData?.profileImage}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Icon name="User" size={28} className="text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <Icon name="Check" size={12} className="text-white" />
            </div>
          </div>
          
          <h4 className="font-heading font-semibold text-foreground text-lg">
            {profileData?.firstName && profileData?.lastName 
              ? `${profileData?.firstName} ${profileData?.lastName}`
              : 'Tu nombre completo'
            }
          </h4>
          
          <p className="text-sm text-muted-foreground font-caption mt-1">
            {profileData?.headline || 'Tu titular profesional'}
          </p>
          
          <p className="text-xs text-muted-foreground font-caption mt-1 flex items-center justify-center">
            <Icon name="MapPin" size={12} className="mr-1" />
            {profileData?.location || 'Tu ubicación'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-heading font-semibold text-primary">
              {profileData?.experiences ? profileData?.experiences?.length : 0}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Experiencias
            </div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-heading font-semibold text-secondary">
              {profileData?.skills ? profileData?.skills?.length : 0}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Habilidades
            </div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-heading font-semibold text-accent">
              {formatExperienceYears()}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Experiencia
            </div>
          </div>
        </div>

        {/* Top Skills */}
        {getTopSkills()?.length > 0 && (
          <div className="mb-6">
            <h5 className="font-heading font-medium text-foreground mb-3 text-sm">
              Principales habilidades
            </h5>
            <div className="space-y-2">
              {getTopSkills()?.map((skill, index) => (
                <div key={skill?.id} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{skill?.name}</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="ThumbsUp" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-caption">
                      {skill?.endorsements}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Completeness */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-heading font-medium text-foreground text-sm">
              Completitud del perfil
            </h5>
            <span className="text-sm font-medium text-primary">
              {completeness}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground font-caption mt-2">
            {completeness >= 80 
              ? '¡Excelente! Tu perfil está muy completo'
              : completeness >= 60
              ? 'Buen progreso, añade más información'
              : 'Completa tu perfil para mayor visibilidad'
            }
          </p>
        </div>

        {/* Recommendations */}
        {recommendations?.length > 0 && (
          <div className="mb-6">
            <h5 className="font-heading font-medium text-foreground text-sm mb-3">
              Recomendaciones
            </h5>
            <div className="space-y-2">
              {recommendations?.slice(0, 3)?.map((rec, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Icon 
                    name={rec?.icon} 
                    size={14} 
                    className={`${
                      rec?.priority === 'high' ? 'text-error' :
                      rec?.priority === 'medium'? 'text-warning' : 'text-muted-foreground'
                    }`}
                  />
                  <span className="text-muted-foreground font-caption">
                    {rec?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            fullWidth
          >
            Ver perfil público
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            iconPosition="left"
            fullWidth
          >
            Compartir perfil
          </Button>
        </div>

        {/* Profile Views */}
        <div className="mt-6 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Vistas del perfil</span>
            </div>
            <span className="text-sm font-medium text-primary">
              {Math.floor(Math.random() * 50) + 10}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-caption mt-1">
            En los últimos 30 días
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;