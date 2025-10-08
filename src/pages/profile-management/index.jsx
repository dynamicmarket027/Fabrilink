import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PersonalInfoSection from './components/PersonalInfoSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ProfilePreview from './components/ProfilePreview';
import PrivacySettings from './components/PrivacySettings';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'Juan',
    lastName: 'Pérez García',
    headline: 'Desarrollador Full Stack Senior | React & Node.js',
    location: 'Madrid, España',
    industry: 'tecnologia',
    phone: '+34 600 123 456',
    email: 'juan.perez@email.com',
    website: 'https://juanperez.dev',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=200&fit=crop',
    
    // Experience
    experiences: [
      {
        id: 1,
        title: 'Desarrollador Full Stack Senior',
        company: 'TechCorp Solutions',
        location: 'Madrid, España',
        startDate: '2022-03-01',
        endDate: '',
        current: true,
        description: `Lidero el desarrollo de aplicaciones web escalables utilizando React, Node.js y PostgreSQL. Responsable de la arquitectura técnica y mentoría del equipo junior.`,
        achievements: [
          'Reduje el tiempo de carga de la aplicación principal en un 40%',
          'Implementé sistema de CI/CD que redujo los errores de producción en 60%',
          'Lideré la migración a microservicios mejorando la escalabilidad'
        ]
      },
      {
        id: 2,
        title: 'Desarrollador Frontend',
        company: 'Digital Innovations S.L.',
        location: 'Barcelona, España',
        startDate: '2020-01-15',
        endDate: '2022-02-28',
        current: false,
        description: `Desarrollé interfaces de usuario modernas y responsivas para aplicaciones web empresariales. Colaboré estrechamente con el equipo de UX/UI para implementar diseños pixel-perfect.`,
        achievements: [
          'Desarrollé 15+ componentes reutilizables que redujeron el tiempo de desarrollo en 30%',
          'Implementé testing automatizado aumentando la cobertura de código al 85%'
        ]
      }
    ],
    
    // Education
    education: [
      {
        id: 1,
        degree: 'grado',
        field: 'Ingeniería Informática',
        institution: 'Universidad Politécnica de Madrid',
        startDate: '2016-09-01',
        endDate: '2020-06-30',
        grade: 'Sobresaliente (8.7/10)',
        description: 'Especialización en Desarrollo de Software y Sistemas Distribuidos. Proyecto final sobre arquitecturas de microservicios.'
      },
      {
        id: 2,
        degree: 'master',
        field: 'Desarrollo de Aplicaciones Web',
        institution: 'Universidad Complutense de Madrid',
        startDate: '2020-09-01',
        endDate: '2021-07-15',
        grade: 'Matrícula de Honor',
        description: 'Máster especializado en tecnologías web modernas, incluyendo React, Vue.js, Node.js y arquitecturas cloud.'
      }
    ],
    
    // Skills
    skills: [
      {
        id: 1,
        name: 'JavaScript',
        level: 'experto',
        category: 'tecnica',
        endorsements: 24
      },
      {
        id: 2,
        name: 'React',
        level: 'experto',
        category: 'tecnica',
        endorsements: 19
      },
      {
        id: 3,
        name: 'Node.js',
        level: 'avanzado',
        category: 'tecnica',
        endorsements: 16
      },
      {
        id: 4,
        name: 'PostgreSQL',
        level: 'avanzado',
        category: 'tecnica',
        endorsements: 12
      },
      {
        id: 5,
        name: 'Liderazgo de equipos',
        level: 'avanzado',
        category: 'blanda',
        endorsements: 8
      },
      {
        id: 6,
        name: 'Inglés',
        level: 'avanzado',
        category: 'idioma',
        endorsements: 15
      },
      {
        id: 7,
        name: 'Docker',
        level: 'intermedio',
        category: 'herramienta',
        endorsements: 7
      }
    ],
    
    // Privacy Settings
    privacySettings: {
      profileVisibility: 'publico',
      contactInfo: 'conexiones',
      experienceVisibility: 'publico',
      educationVisibility: 'publico',
      skillsVisibility: 'publico',
      connectionsList: 'conexiones',
      activityFeed: 'publico',
      searchEngineIndexing: true,
      profileInSearch: true,
      emailNotifications: true,
      connectionRequests: true,
      messageRequests: true,
      jobAlerts: true,
      networkUpdates: true
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const tabs = [
    {
      id: 'personal',
      label: 'Información Personal',
      icon: 'User',
      component: PersonalInfoSection
    },
    {
      id: 'experience',
      label: 'Experiencia',
      icon: 'Briefcase',
      component: ExperienceSection
    },
    {
      id: 'education',
      label: 'Formación',
      icon: 'GraduationCap',
      component: EducationSection
    },
    {
      id: 'skills',
      label: 'Habilidades',
      icon: 'Star',
      component: SkillsSection
    },
    {
      id: 'privacy',
      label: 'Privacidad',
      icon: 'Shield',
      component: PrivacySettings
    }
  ];

  // Auto-save functionality
  const handleProfileUpdate = (section, data) => {
    setIsSaving(true);
    
    setTimeout(() => {
      setProfileData(prev => ({
        ...prev,
        [section]: data
      }));
      setIsSaving(false);
      setLastSaved(new Date());
    }, 500);
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    // Language is already Spanish, no need to change
  }, []);

  const getCurrentTabComponent = () => {
    const currentTab = tabs?.find(tab => tab?.id === activeTab);
    if (!currentTab) return null;

    const Component = currentTab?.component;
    const props = {
      onUpdate: handleProfileUpdate
    };

    switch (activeTab) {
      case 'personal':
        return <Component profileData={profileData} {...props} />;
      case 'experience':
        return <Component experiences={profileData?.experiences || []} {...props} />;
      case 'education':
        return <Component education={profileData?.education || []} {...props} />;
      case 'skills':
        return <Component skills={profileData?.skills || []} {...props} />;
      case 'privacy':
        return <Component privacySettings={profileData?.privacySettings || {}} {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Gestión de Perfil
                </h1>
                <p className="text-muted-foreground font-caption mt-2">
                  Administra tu información profesional y configuración de privacidad
                </p>
              </div>
              
              {/* Save Status */}
              <div className="flex items-center space-x-4">
                {isSaving && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-caption">Guardando...</span>
                  </div>
                )}
                {lastSaved && !isSaving && (
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="Check" size={16} />
                    <span className="text-sm font-caption">
                      Guardado {lastSaved?.toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  Exportar CV
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border shadow-subtle sticky top-24">
                <div className="p-4">
                  <h3 className="font-heading font-medium text-foreground mb-4">
                    Secciones del perfil
                  </h3>
                  <nav className="space-y-1">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-smooth text-left ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {getCurrentTabComponent()}
              </div>
            </div>

            {/* Right Sidebar - Profile Preview */}
            <div className="lg:col-span-1">
              <ProfilePreview profileData={profileData} />
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 min-w-0 flex flex-col items-center space-y-1 px-2 py-3 text-xs font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span className="truncate">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;