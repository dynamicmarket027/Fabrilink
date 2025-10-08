import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import NetworkingSidebar from './components/NetworkingSidebar';

const Dashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    setCurrentLanguage(savedLanguage);
  }, []);

  const metricsData = [
    {
      title: 'Visualizaciones del perfil',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: 'Eye',
      color: 'primary'
    },
    {
      title: 'Conexiones nuevas',
      value: '89',
      change: '+8%',
      changeType: 'increase',
      icon: 'Users',
      color: 'secondary'
    },
    {
      title: 'Interacciones',
      value: '456',
      change: '+24%',
      changeType: 'increase',
      icon: 'MessageCircle',
      color: 'success'
    },
    {
      title: 'Oportunidades',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: 'Briefcase',
      color: 'warning'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: 'connection',
      message: 'María González aceptó tu solicitud de conexión',
      time: '5 min',
      unread: true
    },
    {
      id: 2,
      type: 'job',
      message: 'Nueva oportunidad laboral coincide con tu perfil',
      time: '1 h',
      unread: true
    },
    {
      id: 3,
      type: 'message',
      message: 'Carlos Ruiz te envió un mensaje',
      time: '2 h',
      unread: false
    }
  ];

  const quickStats = [
    { label: 'Total conexiones', value: '1,234', icon: 'Users' },
    { label: 'Publicaciones', value: '67', icon: 'FileText' },
    { label: 'Seguidores', value: '892', icon: 'UserCheck' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-3xl font-heading font-bold mb-2">
                  ¡Bienvenido de vuelta, Juan!
                </h1>
                <p className="text-white/90 font-caption">
                  Tienes 3 nuevas oportunidades y 8 solicitudes de conexión esperando
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-6">
                  {quickStats?.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Icon name={stat?.icon} size={16} className="text-white/80" />
                        <span className="text-lg font-heading font-bold">{stat?.value}</span>
                      </div>
                      <span className="text-xs text-white/70 font-caption">{stat?.label}</span>
                    </div>
                  ))}
                </div>
                <Link to="/profile-management">
                  <Button variant="secondary" size="sm">
                    <Icon name="User" size={16} className="mr-2" />
                    Ver perfil
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Activity Feed - Main Content */}
            <div className="xl:col-span-2">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Actividad de tu red
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Filter" size={16} className="mr-2" />
                      Filtros
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="RefreshCw" size={16} />
                    </Button>
                  </div>
                </div>
                <ActivityFeed />
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <NetworkingSidebar />
            </div>
          </div>

          {/* Mobile Quick Stats */}
          <div className="sm:hidden mt-8">
            <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
              <h3 className="font-heading font-semibold text-foreground mb-4">Estadísticas rápidas</h3>
              <div className="grid grid-cols-3 gap-4">
                {quickStats?.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon name={stat?.icon} size={20} className="text-primary" />
                    </div>
                    <div className="text-lg font-heading font-bold text-foreground">{stat?.value}</div>
                    <div className="text-xs text-muted-foreground font-caption">{stat?.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Notifications - Mobile */}
          <div className="lg:hidden mt-8">
            <div className="bg-card border border-border rounded-lg shadow-subtle">
              <div className="p-4 border-b border-border">
                <h3 className="font-heading font-semibold text-foreground">Notificaciones recientes</h3>
              </div>
              <div className="p-4 space-y-3">
                {recentNotifications?.slice(0, 3)?.map((notification) => (
                  <div key={notification?.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification?.unread ? 'bg-primary' : 'bg-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{notification?.message}</p>
                      <p className="text-xs text-muted-foreground font-caption mt-1">
                        hace {notification?.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full">
                  Ver todas las notificaciones
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-floating"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Icon name="Plus" size={24} />
        </Button>
        
        {showMobileMenu && (
          <div className="absolute bottom-16 right-0 bg-card border border-border rounded-lg shadow-elevated p-2 min-w-48">
            <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-muted rounded-lg transition-smooth">
              <Icon name="PenTool" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Crear publicación</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-muted rounded-lg transition-smooth">
              <Icon name="MessageSquare" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-foreground">Actualizar estado</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-muted rounded-lg transition-smooth">
              <Icon name="Mail" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Enviar mensaje</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;