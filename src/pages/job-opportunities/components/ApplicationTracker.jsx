import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ApplicationTracker = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const applications = [
    {
      id: 1,
      jobTitle: 'Desarrollador Frontend Senior',
      company: 'TechCorp España',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      appliedDate: '2024-09-20T10:00:00Z',
      status: 'interview',
      statusDate: '2024-09-25T14:30:00Z',
      location: 'Madrid, España',
      salary: '€45,000 - €65,000',
      nextStep: 'Entrevista técnica programada para el 30/09',
      notes: 'Primera entrevista fue muy positiva. Revisar conceptos de React avanzado.',
      timeline: [
        { status: 'applied', date: '2024-09-20T10:00:00Z', description: 'Aplicación enviada' },
        { status: 'reviewing', date: '2024-09-22T09:15:00Z', description: 'CV en revisión' },
        { status: 'interview', date: '2024-09-25T14:30:00Z', description: 'Primera entrevista completada' }
      ]
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'InnovateLab',
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
      appliedDate: '2024-09-18T15:45:00Z',
      status: 'reviewing',
      statusDate: '2024-09-19T11:20:00Z',
      location: 'Barcelona, España',
      salary: '€50,000 - €70,000',
      nextStep: 'Esperando respuesta del equipo de RRHH',
      notes: 'Empresa muy interesante, cultura de trabajo remoto.',
      timeline: [
        { status: 'applied', date: '2024-09-18T15:45:00Z', description: 'Aplicación enviada' },
        { status: 'reviewing', date: '2024-09-19T11:20:00Z', description: 'CV en revisión por RRHH' }
      ]
    },
    {
      id: 3,
      jobTitle: 'Full Stack Developer',
      company: 'StartupTech',
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop',
      appliedDate: '2024-09-15T12:30:00Z',
      status: 'rejected',
      statusDate: '2024-09-24T16:00:00Z',
      location: 'Valencia, España',
      salary: '€40,000 - €55,000',
      nextStep: null,
      notes: 'Feedback: Buscan más experiencia en Node.js. Considerar para futuras aplicaciones.',
      timeline: [
        { status: 'applied', date: '2024-09-15T12:30:00Z', description: 'Aplicación enviada' },
        { status: 'reviewing', date: '2024-09-16T09:00:00Z', description: 'CV en revisión' },
        { status: 'interview', date: '2024-09-20T10:00:00Z', description: 'Entrevista técnica' },
        { status: 'rejected', date: '2024-09-24T16:00:00Z', description: 'Aplicación rechazada' }
      ]
    },
    {
      id: 4,
      jobTitle: 'UX/UI Designer',
      company: 'DesignStudio',
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      appliedDate: '2024-09-12T14:15:00Z',
      status: 'accepted',
      statusDate: '2024-09-28T10:30:00Z',
      location: 'Remoto',
      salary: '€35,000 - €50,000',
      nextStep: 'Firma de contrato pendiente',
      notes: '¡Oferta aceptada! Inicio previsto para el 15 de octubre.',
      timeline: [
        { status: 'applied', date: '2024-09-12T14:15:00Z', description: 'Aplicación enviada' },
        { status: 'reviewing', date: '2024-09-13T08:30:00Z', description: 'Portfolio en revisión' },
        { status: 'interview', date: '2024-09-18T15:00:00Z', description: 'Entrevista con equipo de diseño' },
        { status: 'interview', date: '2024-09-25T11:00:00Z', description: 'Entrevista final con CEO' },
        { status: 'accepted', date: '2024-09-28T10:30:00Z', description: 'Oferta de trabajo aceptada' }
      ]
    }
  ];

  const tabs = [
    { id: 'all', label: 'Todas', count: applications?.length },
    { id: 'reviewing', label: 'En revisión', count: applications?.filter(app => app?.status === 'reviewing')?.length },
    { id: 'interview', label: 'Entrevistas', count: applications?.filter(app => app?.status === 'interview')?.length },
    { id: 'accepted', label: 'Aceptadas', count: applications?.filter(app => app?.status === 'accepted')?.length },
    { id: 'rejected', label: 'Rechazadas', count: applications?.filter(app => app?.status === 'rejected')?.length }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      'applied': { label: 'Aplicado', color: 'text-primary', bg: 'bg-primary/10', icon: 'Send' },
      'reviewing': { label: 'En revisión', color: 'text-warning', bg: 'bg-warning/10', icon: 'Eye' },
      'interview': { label: 'Entrevista', color: 'text-secondary', bg: 'bg-secondary/10', icon: 'MessageCircle' },
      'rejected': { label: 'Rechazado', color: 'text-error', bg: 'bg-error/10', icon: 'X' },
      'accepted': { label: 'Aceptado', color: 'text-success', bg: 'bg-success/10', icon: 'Check' }
    };
    return configs?.[status] || configs?.['applied'];
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays}d`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `Hace ${diffInWeeks}sem`;
  };

  const filteredApplications = applications?.filter(app => {
    const matchesTab = activeTab === 'all' || app?.status === activeTab;
    const matchesSearch = app?.jobTitle?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         app?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Seguimiento de aplicaciones
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Gestiona el estado de tus aplicaciones de empleo
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-smooth ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab?.label} ({tab?.count})
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-border bg-muted/30">
          <Input
            type="search"
            placeholder="Buscar por puesto o empresa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>

        {/* Applications List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredApplications?.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? `No se encontraron aplicaciones con "${searchQuery}"` : 'No hay aplicaciones en esta categoría'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredApplications?.map((application) => {
                const statusConfig = getStatusConfig(application?.status);
                
                return (
                  <div key={application?.id} className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                    {/* Application Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={application?.companyLogo} 
                            alt={application?.company}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                            {application?.jobTitle}
                          </h3>
                          <p className="text-secondary font-medium mb-2">{application?.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Icon name="MapPin" size={14} />
                              <span>{application?.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="DollarSign" size={14} />
                              <span>{application?.salary}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Calendar" size={14} />
                              <span>Aplicado {getTimeAgo(application?.appliedDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusConfig?.bg} ${statusConfig?.color}`}>
                          <Icon name={statusConfig?.icon} size={14} />
                          <span>{statusConfig?.label}</span>
                        </span>
                      </div>
                    </div>
                    {/* Next Step */}
                    {application?.nextStep && (
                      <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Icon name="Clock" size={16} className="text-accent-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-accent-foreground">Próximo paso:</p>
                            <p className="text-sm text-accent-foreground mt-1">{application?.nextStep}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Timeline */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-3">Cronología</h4>
                      <div className="space-y-3">
                        {application?.timeline?.map((event, index) => {
                          const eventConfig = getStatusConfig(event?.status);
                          const isLast = index === application?.timeline?.length - 1;
                          
                          return (
                            <div key={index} className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${eventConfig?.bg}`}>
                                <Icon name={eventConfig?.icon} size={14} className={eventConfig?.color} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">{event?.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(event.date)?.toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                              {!isLast && (
                                <div className="w-px h-8 bg-border ml-4 -mt-2"></div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* Notes */}
                    {application?.notes && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Icon name="FileText" size={16} className="text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">Notas:</p>
                            <p className="text-sm text-muted-foreground">{application?.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit3"
                          iconPosition="left"
                        >
                          Editar notas
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Calendar"
                          iconPosition="left"
                        >
                          Programar recordatorio
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Última actualización: {getTimeAgo(application?.statusDate)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;