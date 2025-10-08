import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const RecommendedConnections = ({ recommendations, onConnect, onDismiss, onViewProfile }) => {
  const [dismissedIds, setDismissedIds] = useState(new Set());

  const handleConnect = (connectionId) => {
    onConnect(connectionId);
  };

  const handleDismiss = (connectionId) => {
    setDismissedIds(prev => new Set([...prev, connectionId]));
    onDismiss(connectionId);
  };

  const handleViewProfile = (connectionId) => {
    onViewProfile(connectionId);
  };

  const featuredRecommendations = recommendations?.filter(rec => rec?.featured && !dismissedIds?.has(rec?.id));
  const regularRecommendations = recommendations?.filter(rec => !rec?.featured && !dismissedIds?.has(rec?.id));

  const RecommendationReason = ({ reason, icon }) => (
    <div className="flex items-center space-x-2 text-xs text-muted-foreground font-caption mb-2">
      <Icon name={icon} size={12} />
      <span>{reason}</span>
    </div>
  );

  const getRecommendationReason = (connection) => {
    if (connection?.mutualConnections > 5) {
      return {
        reason: `${connection?.mutualConnections} conexiones en común`,
        icon: 'Users'
      };
    }
    if (connection?.sameCompany) {
      return {
        reason: `Trabaja en ${connection?.company}`,
        icon: 'Building'
      };
    }
    if (connection?.sameIndustry) {
      return {
        reason: `Trabaja en ${connection?.industry}`,
        icon: 'Briefcase'
      };
    }
    if (connection?.sameLocation) {
      return {
        reason: `Ubicado en ${connection?.location}`,
        icon: 'MapPin'
      };
    }
    return {
      reason: 'Recomendado para ti',
      icon: 'Star'
    };
  };

  if (recommendations?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Users" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No hay recomendaciones disponibles
        </h3>
        <p className="text-muted-foreground font-caption">
          Completa tu perfil para recibir mejores recomendaciones de conexión
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Featured Recommendations */}
      {featuredRecommendations?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Recomendaciones destacadas
            </h3>
            <Button variant="ghost" size="sm" iconName="RefreshCw">
              Actualizar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {featuredRecommendations?.slice(0, 3)?.map((connection) => {
              const recommendation = getRecommendationReason(connection);
              
              return (
                <div key={connection?.id} className="relative">
                  <div className="absolute top-2 left-2 z-10">
                    <div className="bg-warning text-warning-foreground px-2 py-1 rounded-md text-xs font-caption font-medium">
                      <Icon name="Star" size={12} className="inline mr-1" />
                      Destacado
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <Image
                          src={connection?.avatar}
                          alt={connection?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 
                            className="font-heading font-medium text-foreground hover:text-primary transition-smooth cursor-pointer truncate"
                            onClick={() => handleViewProfile(connection?.id)}
                          >
                            {connection?.name}
                          </h4>
                          <p className="text-sm text-muted-foreground font-caption truncate">
                            {connection?.title}
                          </p>
                          <p className="text-xs text-muted-foreground font-caption truncate">
                            {connection?.company}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDismiss(connection?.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>

                    <RecommendationReason 
                      reason={recommendation?.reason} 
                      icon={recommendation?.icon} 
                    />

                    {connection?.skills && connection?.skills?.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {connection?.skills?.slice(0, 2)?.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-muted text-xs text-muted-foreground font-caption rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                          {connection?.skills?.length > 2 && (
                            <span className="px-2 py-1 bg-muted text-xs text-muted-foreground font-caption rounded-md">
                              +{connection?.skills?.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="UserPlus"
                        iconPosition="left"
                        onClick={() => handleConnect(connection?.id)}
                        className="flex-1"
                      >
                        Conectar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                        onClick={() => handleViewProfile(connection?.id)}
                      >
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Regular Recommendations */}
      {regularRecommendations?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Más recomendaciones para ti
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground font-caption">
                {regularRecommendations?.length} sugerencias
              </span>
              <Button variant="ghost" size="sm" iconName="Settings">
                Configurar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {regularRecommendations?.map((connection) => {
              const recommendation = getRecommendationReason(connection);
              
              return (
                <div key={connection?.id} className="relative">
                  <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <Image
                          src={connection?.avatar}
                          alt={connection?.name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 
                            className="font-heading font-medium text-foreground hover:text-primary transition-smooth cursor-pointer truncate text-sm"
                            onClick={() => handleViewProfile(connection?.id)}
                          >
                            {connection?.name}
                          </h4>
                          <p className="text-xs text-muted-foreground font-caption truncate">
                            {connection?.title}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDismiss(connection?.id)}
                        className="text-muted-foreground hover:text-foreground flex-shrink-0"
                      >
                        <Icon name="X" size={12} />
                      </Button>
                    </div>

                    <RecommendationReason 
                      reason={recommendation?.reason} 
                      icon={recommendation?.icon} 
                    />

                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="UserPlus"
                        onClick={() => handleConnect(connection?.id)}
                        className="flex-1 text-xs"
                      >
                        Conectar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                        onClick={() => handleViewProfile(connection?.id)}
                      >
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Load More */}
      {(featuredRecommendations?.length > 3 || regularRecommendations?.length > 8) && (
        <div className="text-center">
          <Button variant="outline" iconName="ChevronDown" iconPosition="right">
            Ver más recomendaciones
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecommendedConnections;