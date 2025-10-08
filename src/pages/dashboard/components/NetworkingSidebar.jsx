import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NetworkingSidebar = () => {
  const [acceptedConnections, setAcceptedConnections] = useState(new Set());
  const [dismissedSuggestions, setDismissedSuggestions] = useState(new Set());

  const connectionRequests = [
    {
      id: 1,
      name: 'Elena Rodríguez',
      title: 'UX Designer en DesignStudio',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 12,
      company: 'DesignStudio'
    },
    {
      id: 2,
      name: 'Roberto Silva',
      title: 'Product Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 8,
      company: 'TechCorp'
    },
    {
      id: 3,
      name: 'Carmen López',
      title: 'Data Analyst',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 15,
      company: 'DataInsights'
    }
  ];

  const networkingSuggestions = [
    {
      id: 4,
      name: 'Miguel Ángel Torres',
      title: 'Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      reason: 'Trabaja en tu sector',
      company: 'WebSolutions'
    },
    {
      id: 5,
      name: 'Patricia Morales',
      title: 'Marketing Director',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      reason: 'Conexión de segundo grado',
      company: 'MarketPro'
    },
    {
      id: 6,
      name: 'Javier Hernández',
      title: 'DevOps Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      reason: 'Misma universidad',
      company: 'CloudTech'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Conferencia de Tecnología Madrid 2024',
      date: '15 Oct',
      time: '09:00',
      attendees: 245,
      type: 'Presencial',
      location: 'Madrid'
    },
    {
      id: 2,
      title: 'Webinar: Futuro del Desarrollo Web',
      date: '18 Oct',
      time: '16:00',
      attendees: 89,
      type: 'Virtual',
      location: 'Online'
    },
    {
      id: 3,
      title: 'Networking Profesional Barcelona',
      date: '22 Oct',
      time: '19:00',
      attendees: 156,
      type: 'Presencial',
      location: 'Barcelona'
    }
  ];

  const handleAcceptConnection = (requestId) => {
    setAcceptedConnections(prev => new Set([...prev, requestId]));
  };

  const handleDismissSuggestion = (suggestionId) => {
    setDismissedSuggestions(prev => new Set([...prev, suggestionId]));
  };

  const filteredRequests = connectionRequests?.filter(req => !acceptedConnections?.has(req?.id));
  const filteredSuggestions = networkingSuggestions?.filter(sug => !dismissedSuggestions?.has(sug?.id));

  return (
    <div className="space-y-6">
      {/* Connection Requests */}
      {filteredRequests?.length > 0 && (
        <div className="bg-card border border-border rounded-lg shadow-subtle">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-foreground">Solicitudes de conexión</h3>
              <span className="text-sm text-muted-foreground font-caption">
                {filteredRequests?.length}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {filteredRequests?.map((request) => (
              <div key={request?.id} className="flex items-start space-x-3">
                <Image
                  src={request?.avatar}
                  alt={request?.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm">{request?.name}</h4>
                  <p className="text-xs text-muted-foreground font-caption mb-1">{request?.title}</p>
                  <p className="text-xs text-muted-foreground font-caption">
                    {request?.mutualConnections} conexiones en común
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      size="xs"
                      onClick={() => handleAcceptConnection(request?.id)}
                    >
                      Aceptar
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                    >
                      Ignorar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border">
            <Button variant="ghost" size="sm" className="w-full">
              Ver todas las solicitudes
            </Button>
          </div>
        </div>
      )}
      {/* Networking Suggestions */}
      {filteredSuggestions?.length > 0 && (
        <div className="bg-card border border-border rounded-lg shadow-subtle">
          <div className="p-4 border-b border-border">
            <h3 className="font-heading font-semibold text-foreground">Personas que podrías conocer</h3>
          </div>
          <div className="p-4 space-y-4">
            {filteredSuggestions?.slice(0, 3)?.map((suggestion) => (
              <div key={suggestion?.id} className="flex items-start space-x-3">
                <Image
                  src={suggestion?.avatar}
                  alt={suggestion?.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm">{suggestion?.name}</h4>
                  <p className="text-xs text-muted-foreground font-caption mb-1">{suggestion?.title}</p>
                  <p className="text-xs text-primary font-caption">{suggestion?.reason}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button size="xs" variant="outline">
                      <Icon name="UserPlus" size={12} className="mr-1" />
                      Conectar
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleDismissSuggestion(suggestion?.id)}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border">
            <Button variant="ghost" size="sm" className="w-full">
              Ver más sugerencias
            </Button>
          </div>
        </div>
      )}
      {/* Upcoming Events */}
      <div className="bg-card border border-border rounded-lg shadow-subtle">
        <div className="p-4 border-b border-border">
          <h3 className="font-heading font-semibold text-foreground">Próximos eventos</h3>
        </div>
        <div className="p-4 space-y-4">
          {upcomingEvents?.slice(0, 3)?.map((event) => (
            <div key={event?.id} className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-smooth">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-primary">{event?.date?.split(' ')?.[0]}</span>
                    <span className="text-xs text-primary">{event?.date?.split(' ')?.[1]}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-1">{event?.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground font-caption">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{event?.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name={event?.type === 'Virtual' ? 'Monitor' : 'MapPin'} size={12} />
                      <span>{event?.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground font-caption">
                      {event?.attendees} asistentes
                    </span>
                    <Button size="xs" variant="outline">
                      Interesado
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full">
            Ver todos los eventos
          </Button>
        </div>
      </div>
      {/* Professional Opportunities */}
      <div className="bg-card border border-border rounded-lg shadow-subtle">
        <div className="p-4 border-b border-border">
          <h3 className="font-heading font-semibold text-foreground">Oportunidades destacadas</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground text-sm">3 empleos nuevos</h4>
              <p className="text-xs text-muted-foreground font-caption">Coinciden con tu perfil</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground text-sm">Grupo de React</h4>
              <p className="text-xs text-muted-foreground font-caption">Te han invitado a unirte</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingSidebar;