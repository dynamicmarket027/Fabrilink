import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import JobCard from './JobCard';

const SavedJobs = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('saved_date');
  const [savedJobs, setSavedJobs] = useState([
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
      description: `Buscamos un Desarrollador Frontend Senior con experiencia en React y TypeScript para unirse a nuestro equipo de desarrollo de productos digitales.\n\nResponsabilidades principales:\n• Desarrollar interfaces de usuario modernas y responsivas\n• Colaborar con el equipo de diseño UX/UI\n• Optimizar el rendimiento de aplicaciones web\n• Mentorizar a desarrolladores junior`,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
      applicants: 45,
      views: 234,
      applicationStatus: 'not_applied',
      savedDate: '2024-09-26T14:30:00Z',
      notes: 'Empresa interesante, revisar stack tecnológico'
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
      description: `Únete a nuestro equipo como Product Manager y lidera el desarrollo de productos innovadores que impacten a miles de usuarios.\n\nBuscamos a alguien con:\n• Experiencia en metodologías ágiles\n• Capacidad de análisis de datos\n• Excelentes habilidades de comunicación\n• Visión estratégica de producto`,
      skills: ['Product Management', 'Agile', 'Scrum', 'Analytics', 'Figma'],
      applicants: 32,
      views: 187,
      applicationStatus: 'applied',
      savedDate: '2024-09-24T16:45:00Z',
      notes: 'Aplicado el 24/09. Seguimiento pendiente.'
    },
    {
      id: 3,
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
      description: `Estamos buscando un UX/UI Designer creativo y apasionado para crear experiencias digitales excepcionales.\n\nQué harás:\n• Diseñar interfaces intuitivas y atractivas\n• Realizar investigación de usuarios\n• Crear prototipos interactivos\n• Colaborar con equipos multidisciplinarios`,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      applicants: 28,
      views: 156,
      applicationStatus: 'not_applied',
      savedDate: '2024-09-23T18:20:00Z',
      notes: 'Revisar portfolio antes de aplicar'
    }
  ]);

  const [jobNotes, setJobNotes] = useState({});
  const [editingNotes, setEditingNotes] = useState(null);

  const sortOptions = [
    { value: 'saved_date', label: 'Fecha guardado' },
    { value: 'posted_date', label: 'Fecha publicación' },
    { value: 'deadline', label: 'Fecha límite' },
    { value: 'salary', label: 'Salario' },
    { value: 'company', label: 'Empresa' }
  ];

  const filteredJobs = savedJobs?.filter(job =>
    job?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    job?.company?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    job?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const sortedJobs = [...filteredJobs]?.sort((a, b) => {
    switch (sortBy) {
      case 'saved_date':
        return new Date(b.savedDate) - new Date(a.savedDate);
      case 'posted_date':
        return new Date(b.postedDate) - new Date(a.postedDate);
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      case 'salary':
        return (b?.salaryMax || 0) - (a?.salaryMax || 0);
      case 'company':
        return a?.company?.name?.localeCompare(b?.company?.name);
      default:
        return 0;
    }
  });

  const handleUnsaveJob = (jobId) => {
    setSavedJobs(prev => prev?.filter(job => job?.id !== jobId));
  };

  const handleApplyJob = (jobId) => {
    setSavedJobs(prev =>
      prev?.map(job =>
        job?.id === jobId
          ? { ...job, applicationStatus: 'applied' }
          : job
      )
    );
  };

  const handleShareJob = (jobId, platform) => {
    console.log(`Sharing job ${jobId} on ${platform}`);
  };

  const handleSaveNotes = (jobId, notes) => {
    setSavedJobs(prev =>
      prev?.map(job =>
        job?.id === jobId
          ? { ...job, notes }
          : job
      )
    );
    setEditingNotes(null);
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const saved = new Date(date);
    const diffInHours = Math.floor((now - saved) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays}d`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `Hace ${diffInWeeks}sem`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Empleos guardados
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {savedJobs?.length} empleos guardados
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

        {/* Search and Sort */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Buscar en empleos guardados..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
              />
            </div>
            <div className="sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {sortOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="flex-1 overflow-y-auto p-6">
          {sortedJobs?.length === 0 ? (
            <div className="text-center py-12">
              {searchQuery ? (
                <>
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No se encontraron empleos con "{searchQuery}"
                  </p>
                </>
              ) : (
                <>
                  <Icon name="Bookmark" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No tienes empleos guardados</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Guarda empleos interesantes para revisarlos más tarde
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedJobs?.map((job) => (
                <div key={job?.id} className="space-y-4">
                  <JobCard
                    job={job}
                    onSave={() => handleUnsaveJob(job?.id)}
                    onApply={handleApplyJob}
                    onShare={handleShareJob}
                    isSaved={true}
                  />
                  
                  {/* Notes Section */}
                  <div className="ml-4 pl-4 border-l-2 border-muted">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        <span>Guardado {getTimeAgo(job?.savedDate)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingNotes(editingNotes === job?.id ? null : job?.id)}
                        iconName={editingNotes === job?.id ? "X" : "Edit3"}
                        iconPosition="left"
                      >
                        {editingNotes === job?.id ? 'Cancelar' : 'Editar notas'}
                      </Button>
                    </div>
                    
                    {editingNotes === job?.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={jobNotes?.[job?.id] !== undefined ? jobNotes?.[job?.id] : job?.notes || ''}
                          onChange={(e) => setJobNotes(prev => ({
                            ...prev,
                            [job?.id]: e?.target?.value
                          }))}
                          placeholder="Añade tus notas sobre este empleo..."
                          className="w-full p-3 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          rows={3}
                        />
                        <div className="flex space-x-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleSaveNotes(job?.id, jobNotes?.[job?.id] || '')}
                            iconName="Save"
                            iconPosition="left"
                          >
                            Guardar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted/50 rounded-lg p-3">
                        {job?.notes ? (
                          <p className="text-sm text-foreground whitespace-pre-wrap">
                            {job?.notes}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            No hay notas para este empleo
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;