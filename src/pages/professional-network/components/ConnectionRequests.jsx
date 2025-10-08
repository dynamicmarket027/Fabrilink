import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConnectionRequests = ({ requests, onAccept, onDecline, onSendMessage }) => {
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const handleAccept = (requestId) => {
    onAccept(requestId);
  };

  const handleDecline = (requestId) => {
    onDecline(requestId);
  };

  const handleSendMessage = () => {
    if (messageText?.trim() && selectedConnection) {
      onSendMessage(selectedConnection?.id, messageText);
      setMessageText('');
      setShowMessageModal(false);
      setSelectedConnection(null);
    }
  };

  const openMessageModal = (connection) => {
    setSelectedConnection(connection);
    setShowMessageModal(true);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'hace menos de 1 hora';
    if (diffInHours < 24) return `hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `hace ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`;
  };

  if (requests?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="UserPlus" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No tienes solicitudes pendientes
        </h3>
        <p className="text-muted-foreground font-caption">
          Las nuevas solicitudes de conexión aparecerán aquí
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests?.map((request) => (
        <div
          key={request?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth"
        >
          <div className="flex items-start space-x-4">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <Image
                src={request?.avatar}
                alt={request?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>

            {/* Request Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-heading font-medium text-foreground hover:text-primary transition-smooth cursor-pointer">
                    {request?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-caption">
                    {request?.title} en {request?.company}
                  </p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground font-caption">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{request?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{request?.mutualConnections} conexiones en común</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-caption whitespace-nowrap">
                  {formatTimeAgo(request?.requestDate)}
                </span>
              </div>

              {/* Personal Message */}
              {request?.message && (
                <div className="mb-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-foreground font-caption">
                    "{request?.message}"
                  </p>
                </div>
              )}

              {/* Mutual Connections Preview */}
              {request?.mutualConnectionsPreview && request?.mutualConnectionsPreview?.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground font-caption mb-2">
                    Conexiones en común:
                  </p>
                  <div className="flex items-center space-x-2">
                    {request?.mutualConnectionsPreview?.slice(0, 3)?.map((connection, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <Image
                          src={connection?.avatar}
                          alt={connection?.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-muted-foreground font-caption">
                          {connection?.name}
                        </span>
                      </div>
                    ))}
                    {request?.mutualConnections > 3 && (
                      <span className="text-xs text-muted-foreground font-caption">
                        y {request?.mutualConnections - 3} más
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => handleAccept(request?.id)}
                >
                  Aceptar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => handleDecline(request?.id)}
                >
                  Rechazar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => openMessageModal(request)}
                >
                  Mensaje
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpandedRequest(
                    expandedRequest === request?.id ? null : request?.id
                  )}
                >
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>

              {/* Expanded Details */}
              {expandedRequest === request?.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Información profesional</h4>
                      <p className="text-muted-foreground font-caption mb-1">
                        <strong>Experiencia:</strong> {request?.experience || 'No especificada'}
                      </p>
                      <p className="text-muted-foreground font-caption">
                        <strong>Industria:</strong> {request?.industry || 'No especificada'}
                      </p>
                    </div>
                    {request?.skills && request?.skills?.length > 0 && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Habilidades</h4>
                        <div className="flex flex-wrap gap-1">
                          {request?.skills?.slice(0, 5)?.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs font-caption rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {/* Message Modal */}
      {showMessageModal && selectedConnection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Enviar mensaje
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMessageModal(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground font-caption mt-1">
                Para: {selectedConnection?.name}
              </p>
            </div>
            
            <div className="p-4">
              <Input
                label="Mensaje"
                type="text"
                placeholder="Escribe tu mensaje aquí..."
                value={messageText}
                onChange={(e) => setMessageText(e?.target?.value)}
                className="mb-4"
              />
              
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={handleSendMessage}
                  disabled={!messageText?.trim()}
                  className="flex-1"
                >
                  Enviar mensaje
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowMessageModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionRequests;