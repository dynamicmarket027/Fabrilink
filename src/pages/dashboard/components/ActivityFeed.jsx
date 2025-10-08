import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  const filters = [
    { id: 'todos', label: 'Todos', icon: 'Grid3x3' },
    { id: 'actualizaciones', label: 'Actualizaciones', icon: 'MessageSquare' },
    { id: 'empleos', label: 'Empleos', icon: 'Briefcase' },
    { id: 'articulos', label: 'Artículos', icon: 'FileText' }
  ];

  const activities = [
    {
      id: 1,
      type: 'job_change',
      user: {
        name: 'María González',
        title: 'Desarrolladora Senior',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      content: `¡Emocionada de anunciar que he comenzado mi nueva posición como Desarrolladora Senior en TechCorp! \n\nGracias a todos los que me apoyaron durante esta transición. Estoy lista para nuevos desafíos y oportunidades de crecimiento.`,
      timestamp: '2 horas',
      engagement: { likes: 24, comments: 8, shares: 3 },
      category: 'actualizaciones'
    },
    {
      id: 2,
      type: 'job_posting',
      user: {
        name: 'Carlos Ruiz',
        title: 'HR Manager en InnovaTech',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      content: `🚀 ¡Estamos contratando! Buscamos un Desarrollador Full Stack para unirse a nuestro equipo dinámico.\n\n✅ Experiencia con React y Node.js\n✅ Conocimientos en bases de datos\n✅ Trabajo remoto disponible\n\n¡Envía tu CV!`,
      timestamp: '4 horas',
      engagement: { likes: 45, comments: 12, shares: 18 },
      category: 'empleos',
      jobDetails: {
        position: 'Desarrollador Full Stack',
        company: 'InnovaTech',
        location: 'Madrid, España',
        type: 'Tiempo completo'
      }
    },
    {
      id: 3,
      type: 'article',
      user: {
        name: 'Ana Martínez',
        title: 'Product Manager',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      content: `Las 5 tendencias tecnológicas que definirán 2024\n\nEn mi último artículo, analizo cómo la IA, el desarrollo low-code y la computación cuántica están transformando la industria tech.`,
      timestamp: '6 horas',
      engagement: { likes: 67, comments: 23, shares: 31 },
      category: 'articulos',
      articleImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=300&fit=crop'
    },
    {
      id: 4,
      type: 'company_update',
      user: {
        name: 'TechStart Solutions',
        title: 'Empresa',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop'
      },
      content: `🎉 ¡Celebramos nuestro 5º aniversario! Gracias a nuestro increíble equipo de 50+ profesionales que hacen posible nuestro éxito.\n\n#Aniversario #Equipo #Crecimiento`,
      timestamp: '1 día',
      engagement: { likes: 89, comments: 34, shares: 12 },
      category: 'actualizaciones'
    },
    {
      id: 5,
      type: 'achievement',
      user: {
        name: 'Luis Fernández',
        title: 'Data Scientist',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      content: `¡Acabo de completar mi certificación en Machine Learning de Google Cloud! 🎓\n\nFue un viaje desafiante pero muy gratificante. Listo para aplicar estos conocimientos en proyectos reales.`,
      timestamp: '2 días',
      engagement: { likes: 156, comments: 28, shares: 9 },
      category: 'actualizaciones'
    }
  ];

  const filteredActivities = activeFilter === 'todos' 
    ? activities 
    : activities?.filter(activity => activity?.category === activeFilter);

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(postId)) {
        newSet?.delete(postId);
      } else {
        newSet?.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(postId)) {
        newSet?.delete(postId);
      } else {
        newSet?.add(postId);
      }
      return newSet;
    });
  };

  const getTypeIcon = (type) => {
    const icons = {
      job_change: 'Briefcase',
      job_posting: 'MapPin',
      article: 'FileText',
      company_update: 'Building',
      achievement: 'Award'
    };
    return icons?.[type] || 'MessageSquare';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      {/* Filter Tabs */}
      <div className="border-b border-border p-4">
        <div className="flex flex-wrap gap-2">
          {filters?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => setActiveFilter(filter?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                activeFilter === filter?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={filter?.icon} size={16} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Activity List */}
      <div className="divide-y divide-border">
        {filteredActivities?.map((activity) => (
          <div key={activity?.id} className="p-6 hover:bg-muted/50 transition-smooth">
            {/* Header */}
            <div className="flex items-start space-x-3 mb-4">
              <div className="relative">
                <Image
                  src={activity?.user?.avatar}
                  alt={activity?.user?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-card border-2 border-card rounded-full flex items-center justify-center">
                  <Icon name={getTypeIcon(activity?.type)} size={12} className="text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{activity?.user?.name}</h3>
                    <p className="text-sm text-muted-foreground font-caption">{activity?.user?.title}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground font-caption">hace {activity?.timestamp}</span>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="text-foreground whitespace-pre-line mb-3">{activity?.content}</p>
              
              {/* Job Details */}
              {activity?.jobDetails && (
                <div className="bg-muted rounded-lg p-4 mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Briefcase" size={16} className="text-primary" />
                    <span className="font-medium text-foreground">{activity?.jobDetails?.position}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Building" size={14} />
                      <span>{activity?.jobDetails?.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{activity?.jobDetails?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{activity?.jobDetails?.type}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Image */}
              {activity?.articleImage && (
                <div className="rounded-lg overflow-hidden mb-3">
                  <Image
                    src={activity?.articleImage}
                    alt="Artículo"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Engagement */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(activity?.id)}
                  className={`flex items-center space-x-2 text-sm transition-smooth ${
                    likedPosts?.has(activity?.id)
                      ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon 
                    name={likedPosts?.has(activity?.id) ? 'Heart' : 'Heart'} 
                    size={16}
                    className={likedPosts?.has(activity?.id) ? 'fill-current' : ''}
                  />
                  <span>{activity?.engagement?.likes + (likedPosts?.has(activity?.id) ? 1 : 0)}</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  <Icon name="MessageCircle" size={16} />
                  <span>{activity?.engagement?.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  <Icon name="Share" size={16} />
                  <span>{activity?.engagement?.shares}</span>
                </button>
              </div>
              <button
                onClick={() => handleSave(activity?.id)}
                className={`p-2 rounded-lg transition-smooth ${
                  savedPosts?.has(activity?.id)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name="Bookmark" 
                  size={16}
                  className={savedPosts?.has(activity?.id) ? 'fill-current' : ''}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Cargar más actividades
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;