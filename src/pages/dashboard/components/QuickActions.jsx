import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState('update');

  const quickActions = [
    {
      id: 'post',
      label: 'Crear publicación',
      icon: 'PenTool',
      color: 'primary',
      action: () => setShowPostModal(true)
    },
    {
      id: 'status',
      label: 'Actualizar estado',
      icon: 'MessageSquare',
      color: 'secondary',
      action: () => console.log('Update status')
    },
    {
      id: 'message',
      label: 'Enviar mensaje',
      icon: 'Mail',
      color: 'success',
      action: () => console.log('Send message')
    },
    {
      id: 'event',
      label: 'Crear evento',
      icon: 'Calendar',
      color: 'warning',
      action: () => console.log('Create event')
    }
  ];

  const postTypes = [
    { id: 'update', label: 'Actualización', icon: 'MessageSquare' },
    { id: 'job', label: 'Oferta de trabajo', icon: 'Briefcase' },
    { id: 'article', label: 'Artículo', icon: 'FileText' },
    { id: 'achievement', label: 'Logro', icon: 'Award' }
  ];

  const handlePostSubmit = (e) => {
    e?.preventDefault();
    if (postContent?.trim()) {
      console.log('Publishing post:', { type: postType, content: postContent });
      setPostContent('');
      setShowPostModal(false);
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20',
      success: 'bg-success/10 text-success hover:bg-success/20 border-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20 border-warning/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Acciones rápidas</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className={`p-4 rounded-lg border transition-smooth text-center ${getColorClasses(action?.color)}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon name={action?.icon} size={24} />
                <span className="text-sm font-medium">{action?.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Recent Activity Summary */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-heading font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground font-caption">Publicaciones</div>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-secondary">48</div>
              <div className="text-sm text-muted-foreground font-caption">Interacciones</div>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-success">156</div>
              <div className="text-sm text-muted-foreground font-caption">Visualizaciones</div>
            </div>
          </div>
        </div>
      </div>
      {/* Post Creation Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-foreground">Crear publicación</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPostModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handlePostSubmit} className="p-6">
              {/* Post Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Tipo de publicación
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {postTypes?.map((type) => (
                    <button
                      key={type?.id}
                      type="button"
                      onClick={() => setPostType(type?.id)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-smooth ${
                        postType === type?.id
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <Icon name={type?.icon} size={16} />
                        <span>{type?.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contenido
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e?.target?.value)}
                  placeholder="¿Qué quieres compartir con tu red profesional?"
                  className="w-full h-32 p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground font-caption">
                    {postContent?.length}/500 caracteres
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" type="button">
                      <Icon name="Image" size={16} className="mr-1" />
                      Imagen
                    </Button>
                    <Button variant="ghost" size="sm" type="button">
                      <Icon name="Link" size={16} className="mr-1" />
                      Enlace
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowPostModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={!postContent?.trim()}
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Publicar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;