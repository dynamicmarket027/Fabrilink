import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConnectionCard = ({ connection, onConnect, onMessage, onViewProfile, variant = 'suggestion' }) => {
  const handleConnect = () => {
    onConnect(connection?.id);
  };

  const handleMessage = () => {
    onMessage(connection?.id);
  };

  const handleViewProfile = () => {
    onViewProfile(connection?.id);
  };

  const renderConnectionActions = () => {
    if (variant === 'connected') {
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={handleMessage}
            className="flex-1"
          >
            Mensaje
          </Button>
          <Button
            variant="ghost"
            size="icon"
            iconName="MoreHorizontal"
          >
          </Button>
        </div>
      );
    }

    if (variant === 'pending') {
      return (
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleConnect}
            className="flex-1"
          >
            Aceptar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Rechazar
          </Button>
        </div>
      );
    }

    return (
      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          iconName="UserPlus"
          iconPosition="left"
          onClick={handleConnect}
          className="flex-1"
        >
          Conectar
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MessageCircle"
          onClick={handleMessage}
        >
        </Button>
      </div>
    );
  };

  const getStatusBadge = () => {
    if (variant === 'connected' && connection?.isOnline) {
      return (
        <div className="absolute top-2 right-2 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth cursor-pointer">
      <div className="relative">
        {getStatusBadge()}
        
        {/* Profile Image and Basic Info */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="relative flex-shrink-0">
            <Image
              src={connection?.avatar}
              alt={connection?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {connection?.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 
              className="font-heading font-medium text-foreground hover:text-primary transition-smooth cursor-pointer truncate"
              onClick={handleViewProfile}
            >
              {connection?.name}
            </h3>
            <p className="text-sm text-muted-foreground font-caption truncate">
              {connection?.title}
            </p>
            <p className="text-xs text-muted-foreground font-caption truncate">
              {connection?.company}
            </p>
          </div>
        </div>

        {/* Location and Mutual Connections */}
        <div className="flex items-center justify-between text-xs text-muted-foreground font-caption mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} />
            <span>{connection?.location}</span>
          </div>
          {connection?.mutualConnections > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{connection?.mutualConnections} conexiones en común</span>
            </div>
          )}
        </div>

        {/* Skills or Recent Activity */}
        {connection?.skills && connection?.skills?.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {connection?.skills?.slice(0, 3)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-xs text-muted-foreground font-caption rounded-md"
                >
                  {skill}
                </span>
              ))}
              {connection?.skills?.length > 3 && (
                <span className="px-2 py-1 bg-muted text-xs text-muted-foreground font-caption rounded-md">
                  +{connection?.skills?.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Recent Activity for Connected Users */}
        {variant === 'connected' && connection?.recentActivity && (
          <div className="mb-3 p-2 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground font-caption">
              {connection?.recentActivity}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {renderConnectionActions()}
      </div>
    </div>
  );
};

export default ConnectionCard;