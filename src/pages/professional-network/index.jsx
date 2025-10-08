import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConnectionCard from './components/ConnectionCard';
import { NetworkSearch } from './components/NetworkSearch';
import NetworkAnalytics from './components/NetworkAnalytics';
import ConnectionRequests from './components/ConnectionRequests';
import RecommendedConnections from './components/RecommendedConnections';

const ProfessionalNetwork = () => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [searchFilters, setSearchFilters] = useState({
    industry: '',
    location: '',
    experienceLevel: '',
    connectionType: ''
  });

  // Mock data for connections
  const mockConnections = [
    {
      id: 1,
      name: "María González",
      title: "Directora de Marketing Digital",
      company: "TechSolutions España",
      location: "Madrid, España",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      mutualConnections: 12,
      skills: ["Marketing Digital", "SEO", "Analytics"],
      verified: true,
      isOnline: true,
      recentActivity: "Publicó sobre tendencias en marketing digital hace 2 días"
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      title: "Ingeniero de Software Senior",
      company: "InnovaTech",
      location: "Barcelona, España",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      mutualConnections: 8,
      skills: ["React", "Node.js", "Python"],
      verified: false,
      isOnline: false,
      recentActivity: "Compartió un artículo sobre desarrollo web hace 1 semana"
    },
    {
      id: 3,
      name: "Ana Martínez",
      title: "Consultora en Recursos Humanos",
      company: "HR Excellence",
      location: "Valencia, España",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      mutualConnections: 15,
      skills: ["Gestión de Talento", "Coaching", "Liderazgo"],
      verified: true,
      isOnline: true,
      recentActivity: "Actualizó su experiencia laboral hace 3 días"
    }
  ];

  const mockConnectionRequests = [
    {
      id: 1,
      name: "Diego Fernández",
      title: "Product Manager",
      company: "StartupHub",
      location: "Madrid, España",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      mutualConnections: 5,
      message: "Hola, me gustaría conectar contigo para explorar oportunidades de colaboración en proyectos de tecnología.",
      requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      experience: "5-7 años",
      industry: "Tecnología",
      skills: ["Product Management", "Agile", "UX/UI"],
      mutualConnectionsPreview: [
        { name: "Laura Pérez", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" },
        { name: "Miguel Santos", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" }
      ]
    },
    {
      id: 2,
      name: "Isabel López",
      title: "Diseñadora UX/UI",
      company: "Creative Studio",
      location: "Barcelona, España",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      mutualConnections: 3,
      message: "Vi tu perfil y me parece muy interesante tu experiencia. Me encantaría conectar para intercambiar ideas sobre diseño.",
      requestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      experience: "3-5 años",
      industry: "Diseño",
      skills: ["Figma", "Adobe Creative Suite", "Prototipado"],
      mutualConnectionsPreview: [
        { name: "Carlos Ruiz", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" }
      ]
    }
  ];

  const mockRecommendations = [
    {
      id: 1,
      name: "Roberto Silva",
      title: "Director de Ventas",
      company: "SalesForce España",
      location: "Madrid, España",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      mutualConnections: 18,
      skills: ["Ventas B2B", "CRM", "Negociación"],
      featured: true,
      sameCompany: false,
      sameIndustry: true,
      sameLocation: true
    },
    {
      id: 2,
      name: "Patricia Moreno",
      title: "Especialista en Marketing de Contenidos",
      company: "Content Masters",
      location: "Barcelona, España",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      mutualConnections: 7,
      skills: ["Content Marketing", "SEO", "Social Media"],
      featured: true,
      sameCompany: false,
      sameIndustry: true,
      sameLocation: false
    },
    {
      id: 3,
      name: "Javier Herrera",
      title: "Desarrollador Full Stack",
      company: "WebDev Solutions",
      location: "Valencia, España",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      mutualConnections: 4,
      skills: ["JavaScript", "React", "MongoDB"],
      featured: false,
      sameCompany: false,
      sameIndustry: true,
      sameLocation: false
    }
  ];

  const tabs = [
    { id: 'suggestions', label: 'Sugerencias', icon: 'Users', count: mockRecommendations?.length },
    { id: 'connections', label: 'Mis Conexiones', icon: 'UserCheck', count: mockConnections?.length },
    { id: 'requests', label: 'Solicitudes', icon: 'UserPlus', count: mockConnectionRequests?.length },
    { id: 'analytics', label: 'Análisis', icon: 'BarChart3', count: null }
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const handleFilterChange = (filters) => {
    setSearchFilters(filters);
  };

  const handleConnect = (connectionId) => {
    console.log('Connecting to:', connectionId);
  };

  const handleMessage = (connectionId) => {
    console.log('Messaging:', connectionId);
  };

  const handleViewProfile = (connectionId) => {
    console.log('Viewing profile:', connectionId);
  };

  const handleAcceptRequest = (requestId) => {
    console.log('Accepting request:', requestId);
  };

  const handleDeclineRequest = (requestId) => {
    console.log('Declining request:', requestId);
  };

  const handleSendMessage = (connectionId, message) => {
    console.log('Sending message to:', connectionId, message);
  };

  const handleDismissRecommendation = (connectionId) => {
    console.log('Dismissing recommendation:', connectionId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'suggestions':
        return (
          <div className="space-y-6">
            <NetworkSearch
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              filters={searchFilters}
            />
            <RecommendedConnections
              recommendations={mockRecommendations}
              onConnect={handleConnect}
              onDismiss={handleDismissRecommendation}
              onViewProfile={handleViewProfile}
            />
          </div>
        );

      case 'connections':
        return (
          <div className="space-y-6">
            <NetworkSearch
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              filters={searchFilters}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockConnections?.map((connection) => (
                <ConnectionCard
                  key={connection?.id}
                  connection={connection}
                  variant="connected"
                  onConnect={handleConnect}
                  onMessage={handleMessage}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          </div>
        );

      case 'requests':
        return (
          <div className="space-y-6">
            <ConnectionRequests
              requests={mockConnectionRequests}
              onAccept={handleAcceptRequest}
              onDecline={handleDeclineRequest}
              onSendMessage={handleSendMessage}
            />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <NetworkAnalytics analytics={{}} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Mi Red Profesional
                </h1>
                <p className="text-muted-foreground font-caption">
                  Conecta con profesionales de tu industria y expande tu red de contactos
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                >
                  Exportar contactos
                </Button>
                <Button
                  variant="default"
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Invitar contactos
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  {tab?.count !== null && (
                    <span className={`px-2 py-1 rounded-full text-xs font-caption ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {tab?.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalNetwork;