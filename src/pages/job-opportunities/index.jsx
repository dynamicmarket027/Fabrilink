import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import JobCard from './components/JobCard';
import FilterPanel from './components/FilterPanel';
import JobAlerts from './components/JobAlerts';
import SavedJobs from './components/SavedJobs';
import ApplicationTracker from './components/ApplicationTracker';

const JobOpportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showJobAlerts, setShowJobAlerts] = useState(false);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [showApplicationTracker, setShowApplicationTracker] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState(new Set([2, 4]));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    keywords: '',
    location: [],
    industry: [],
    experienceLevel: [],
    jobType: [],
    companySize: [],
    salaryMin: '',
    salaryMax: '',
    remote: false,
    postedWithin: ''
  });

  // Mock job data
  const allJobs = [
    {
      id: 1,
      title: 'Desarrollador Frontend Senior',
      company: {
        name: 'TechCorp España',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'
      },
      location: 'Madrid, España',
      type: 'Tiempo completo',
      experienceLevel: 'Senior',
      salaryMin: 45000,
      salaryMax: 65000,
      remote: true,
      postedDate: '2024-09-25T10:00:00Z',
      deadline: '2024-10-25T23:59:59Z',
      description: `Buscamos un Desarrollador Frontend Senior con experiencia en React y TypeScript para unirse a nuestro equipo de desarrollo de productos digitales.\n\nResponsabilidades principales:\n• Desarrollar interfaces de usuario modernas y responsivas\n• Colaborar con el equipo de diseño UX/UI\n• Optimizar el rendimiento de aplicaciones web\n• Mentorizar a desarrolladores junior\n\nRequisitos:\n• 5+ años de experiencia en desarrollo frontend\n• Dominio de React, TypeScript, y herramientas modernas\n• Experiencia con metodologías ágiles\n• Excelentes habilidades de comunicación`,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
      applicants: 45,
      views: 234,
      applicationStatus: 'not_applied'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: {
        name: 'InnovateLab',
        logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop'
      },
      location: 'Barcelona, España',
      type: 'Tiempo completo',
      experienceLevel: 'Intermedio',
      salaryMin: 50000,
      salaryMax: 70000,
      remote: false,
      postedDate: '2024-09-24T09:15:00Z',
      deadline: '2024-10-20T23:59:59Z',
      description: `Únete a nuestro equipo como Product Manager y lidera el desarrollo de productos innovadores que impacten a miles de usuarios.\n\nBuscamos a alguien con:\n• Experiencia en metodologías ágiles\n• Capacidad de análisis de datos\n• Excelentes habilidades de comunicación\n• Visión estratégica de producto\n\nResponsabilidades:\n• Definir la estrategia y roadmap de producto\n• Colaborar con equipos de desarrollo y diseño\n• Analizar métricas y feedback de usuarios\n• Gestionar el backlog de producto`,
      skills: ['Product Management', 'Agile', 'Scrum', 'Analytics', 'Figma'],
      applicants: 32,
      views: 187,
      applicationStatus: 'applied'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: {
        name: 'DataTech Solutions',
        logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop'
      },
      location: 'Madrid, España',
      type: 'Tiempo completo',
      experienceLevel: 'Senior',
      salaryMin: 55000,
      salaryMax: 75000,
      remote: true,
      postedDate: '2024-09-23T14:30:00Z',
      deadline: '2024-10-30T23:59:59Z',
      description: `Estamos buscando un Data Scientist experimentado para unirse a nuestro equipo de inteligencia artificial y machine learning.\n\nQué harás:\n• Desarrollar modelos de machine learning\n• Analizar grandes volúmenes de datos\n• Crear dashboards y visualizaciones\n• Colaborar con equipos de producto e ingeniería\n\nRequisitos:\n• Maestría en Ciencias de Datos, Estadística o campo relacionado\n• Experiencia con Python, R, SQL\n• Conocimiento de frameworks de ML (TensorFlow, PyTorch)\n• Experiencia con herramientas de visualización`,
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau'],
      applicants: 28,
      views: 156,
      applicationStatus: 'not_applied'
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      company: {
        name: 'DesignStudio',
        logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop'
      },
      location: 'Valencia, España',
      type: 'Tiempo completo',
      experienceLevel: 'Junior',
      salaryMin: 30000,
      salaryMax: 45000,
      remote: true,
      postedDate: '2024-09-23T11:30:00Z',
      deadline: '2024-10-15T23:59:59Z',
      description: `Estamos buscando un UX/UI Designer creativo y apasionado para crear experiencias digitales excepcionales.\n\nQué harás:\n• Diseñar interfaces intuitivas y atractivas\n• Realizar investigación de usuarios\n• Crear prototipos interactivos\n• Colaborar con equipos multidisciplinarios\n\nRequisitos:\n• 2+ años de experiencia en diseño UX/UI\n• Dominio de Figma, Sketch o Adobe XD\n• Conocimiento de principios de usabilidad\n• Portfolio sólido con casos de estudio`,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      applicants: 28,
      views: 156,
      applicationStatus: 'not_applied'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: {
        name: 'CloudTech',
        logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop'
      },
      location: 'Sevilla, España',
      type: 'Tiempo completo',
      experienceLevel: 'Intermedio',
      salaryMin: 48000,
      salaryMax: 62000,
      remote: true,
      postedDate: '2024-09-22T16:45:00Z',
      deadline: '2024-10-22T23:59:59Z',
      description: `Únete a nuestro equipo de DevOps para construir y mantener infraestructuras escalables en la nube.\n\nResponsabilidades:\n• Gestionar infraestructura en AWS/Azure\n• Implementar pipelines CI/CD\n• Monitorear y optimizar sistemas\n• Automatizar procesos de despliegue\n\nRequisitos:\n• 3+ años de experiencia en DevOps\n• Experiencia con Docker, Kubernetes\n• Conocimiento de Terraform, Ansible\n• Experiencia con servicios cloud (AWS/Azure)`,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      applicants: 22,
      views: 134,
      applicationStatus: 'not_applied'
    },
    {
      id: 6,
      title: 'Marketing Digital Specialist',
      company: {
        name: 'GrowthMarketing',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
      },
      location: 'Bilbao, España',
      type: 'Tiempo completo',
      experienceLevel: 'Intermedio',
      salaryMin: 35000,
      salaryMax: 50000,
      remote: false,
      postedDate: '2024-09-21T13:20:00Z',
      deadline: '2024-10-18T23:59:59Z',
      description: `Buscamos un especialista en marketing digital para liderar nuestras estrategias de crecimiento online.\n\nFunciones principales:\n• Gestionar campañas de Google Ads y Facebook Ads\n• Optimizar SEO y contenido web\n• Analizar métricas y ROI\n• Desarrollar estrategias de email marketing\n\nRequisitos:\n• 3+ años de experiencia en marketing digital\n• Certificaciones en Google Ads y Analytics\n• Experiencia con herramientas de automatización\n• Conocimientos de diseño gráfico básico`,
      skills: ['Google Ads', 'SEO', 'Analytics', 'Email Marketing', 'Social Media'],
      applicants: 38,
      views: 201,
      applicationStatus: 'not_applied'
    }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Más relevantes' },
    { value: 'date', label: 'Más recientes' },
    { value: 'salary', label: 'Mejor salario' },
    { value: 'company', label: 'Empresa A-Z' }
  ];

  const jobsPerPage = 6;

  // Filter and sort jobs
  const filteredJobs = allJobs?.filter(job => {
    // Search query filter
    if (searchQuery && !job?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
        !job?.company?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
        !job?.skills?.some(skill => skill?.toLowerCase()?.includes(searchQuery?.toLowerCase()))) {
      return false;
    }

    // Apply other filters
    if (filters?.keywords && !job?.title?.toLowerCase()?.includes(filters?.keywords?.toLowerCase()) &&
        !job?.company?.name?.toLowerCase()?.includes(filters?.keywords?.toLowerCase())) {
      return false;
    }

    if (filters?.location?.length > 0 && !filters?.location?.some(loc => 
      job?.location?.toLowerCase()?.includes(loc?.toLowerCase()) || 
      (loc === 'remote' && job?.remote))) {
      return false;
    }

    if (filters?.experienceLevel?.length > 0 && !filters?.experienceLevel?.includes(job?.experienceLevel?.toLowerCase())) {
      return false;
    }

    if (filters?.jobType?.length > 0 && !filters?.jobType?.includes(job?.type?.toLowerCase()?.replace(' ', '-'))) {
      return false;
    }

    if (filters?.remote && !job?.remote) {
      return false;
    }

    if (filters?.salaryMin && job?.salaryMax < parseInt(filters?.salaryMin)) {
      return false;
    }

    if (filters?.salaryMax && job?.salaryMin > parseInt(filters?.salaryMax)) {
      return false;
    }

    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs]?.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.postedDate) - new Date(a.postedDate);
      case 'salary':
        return (b?.salaryMax || 0) - (a?.salaryMax || 0);
      case 'company':
        return a?.company?.name?.localeCompare(b?.company?.name);
      default:
        return 0;
    }
  });

  // Paginate jobs
  const totalPages = Math.ceil(sortedJobs?.length / jobsPerPage);
  const paginatedJobs = sortedJobs?.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleSearch = (e) => {
    e?.preventDefault();
    setCurrentPage(1);
  };

  const handleSaveJob = (jobId) => {
    setSavedJobIds(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(jobId)) {
        newSet?.delete(jobId);
      } else {
        newSet?.add(jobId);
      }
      return newSet;
    });
  };

  const handleApplyJob = (jobId) => {
    console.log('Applying to job:', jobId);
    // Here you would typically navigate to application form or open modal
  };

  const handleShareJob = (jobId, platform) => {
    console.log(`Sharing job ${jobId} on ${platform}`);
    // Here you would implement sharing functionality
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      keywords: '',
      location: [],
      industry: [],
      experienceLevel: [],
      jobType: [],
      companySize: [],
      salaryMin: '',
      salaryMax: '',
      remote: false,
      postedWithin: ''
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Oportunidades de empleo
                </h1>
                <p className="text-muted-foreground">
                  Descubre empleos que se adapten a tu perfil profesional
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowJobAlerts(true)}
                  iconName="Bell"
                  iconPosition="left"
                >
                  Alertas
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSavedJobs(true)}
                  iconName="Bookmark"
                  iconPosition="left"
                >
                  Guardados ({savedJobIds?.size})
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowApplicationTracker(true)}
                  iconName="FileText"
                  iconPosition="left"
                >
                  Mis aplicaciones
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Buscar empleos, empresas, habilidades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
              <Button type="submit" iconName="Search" iconPosition="left">
                Buscar
              </Button>
            </form>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">
                  {isLoading ? 'Cargando...' : `${sortedJobs?.length} empleos encontrados`}
                </p>
                {(searchQuery || Object.values(filters)?.some(f => f && (Array.isArray(f) ? f?.length > 0 : true))) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      handleClearFilters();
                    }}
                    iconName="X"
                    iconPosition="left"
                  >
                    Limpiar búsqueda
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  placeholder="Ordenar por"
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                />
                <div className="flex items-center space-x-1 border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <Icon name="List" size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <div className="w-80 flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Jobs List */}
            <div className="flex-1">
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(3)]?.map((_, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-muted rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-6 bg-muted rounded w-3/4"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                          <div className="h-4 bg-muted rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginatedJobs?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                    No se encontraron empleos
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Intenta ajustar tus filtros de búsqueda o palabras clave
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      handleClearFilters();
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <>
                  <div className={`${
                    viewMode === 'grid' ?'grid grid-cols-1 xl:grid-cols-2 gap-6' :'space-y-6'
                  }`}>
                    {paginatedJobs?.map((job) => (
                      <JobCard
                        key={job?.id}
                        job={job}
                        onSave={handleSaveJob}
                        onApply={handleApplyJob}
                        onShare={handleShareJob}
                        isSaved={savedJobIds?.has(job?.id)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <Icon name="ChevronLeft" size={16} />
                      </Button>
                      
                      {[...Array(totalPages)]?.map((_, index) => {
                        const page = index + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? 'default' : 'outline'}
                              size="icon"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-2 text-muted-foreground">...</span>;
                        }
                        return null;
                      })}
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <Icon name="ChevronRight" size={16} />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <JobAlerts 
        isOpen={showJobAlerts} 
        onClose={() => setShowJobAlerts(false)} 
      />
      <SavedJobs 
        isOpen={showSavedJobs} 
        onClose={() => setShowSavedJobs(false)} 
      />
      <ApplicationTracker 
        isOpen={showApplicationTracker} 
        onClose={() => setShowApplicationTracker(false)} 
      />
    </div>
  );
};

export default JobOpportunities;