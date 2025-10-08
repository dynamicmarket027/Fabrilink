import React, { useState } from 'react';
import Icon from 'src/components/AppIcon';
import Image from 'src/components/AppImage';
import Button from 'src/components/ui/Button';

const JobCard = ({ job, onSave, onApply, onShare, isSaved = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salario a negociar';
    if (min && max) return `€${min?.toLocaleString()} - €${max?.toLocaleString()}`;
    if (min) return `Desde €${min?.toLocaleString()}`;
    return `Hasta €${max?.toLocaleString()}`;
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays}d`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `Hace ${diffInWeeks}sem`;
  };

  const getApplicationStatus = (status) => {
    const statusConfig = {
      'not_applied': { label: 'No aplicado', color: 'text-muted-foreground', bg: 'bg-muted' },
      'applied': { label: 'Aplicado', color: 'text-primary', bg: 'bg-primary/10' },
      'reviewing': { label: 'En revisión', color: 'text-warning', bg: 'bg-warning/10' },
      'interview': { label: 'Entrevista', color: 'text-secondary', bg: 'bg-secondary/10' },
      'rejected': { label: 'Rechazado', color: 'text-error', bg: 'bg-error/10' },
      'accepted': { label: 'Aceptado', color: 'text-success', bg: 'bg-success/10' }
    };
    return statusConfig?.[status] || statusConfig?.['not_applied'];
  };

  const statusInfo = getApplicationStatus(job?.applicationStatus);

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle hover:shadow-elevated transition-smooth">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src={job?.company?.logo} 
                alt={job?.company?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1 line-clamp-2">
                {job?.title}
              </h3>
              <p className="text-secondary font-medium mb-2">{job?.company?.name}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{job?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{getTimeAgo(job?.postedDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{job?.applicants} candidatos</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo?.bg} ${statusInfo?.color}`}>
              {statusInfo?.label}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSave(job?.id)}
              className={isSaved ? 'text-primary' : 'text-muted-foreground'}
            >
              <Icon name={isSaved ? "Bookmark" : "BookmarkPlus"} size={18} />
            </Button>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {job?.type}
            </span>
            <span className="px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm font-medium">
              {job?.experienceLevel}
            </span>
            {job?.remote && (
              <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                Remoto
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-foreground">
              {formatSalary(job?.salaryMin, job?.salaryMax)}
            </div>
            <div className="text-sm text-muted-foreground">
              Fecha límite: {new Date(job.deadline)?.toLocaleDateString('es-ES')}
            </div>
          </div>

          {/* Description Preview */}
          <div className="text-sm text-muted-foreground">
            <p className={`${isExpanded ? '' : 'line-clamp-2'}`}>
              {job?.description}
            </p>
            {job?.description?.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary hover:text-primary/80 font-medium mt-1 transition-smooth"
              >
                {isExpanded ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>

          {/* Skills */}
          {job?.skills && job?.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job?.skills?.slice(0, 5)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {job?.skills?.length > 5 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                  +{job?.skills?.length - 5} más
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant={job?.applicationStatus === 'not_applied' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onApply(job?.id)}
              disabled={job?.applicationStatus === 'applied'}
              iconName={job?.applicationStatus === 'applied' ? 'Check' : 'Send'}
              iconPosition="left"
            >
              {job?.applicationStatus === 'applied' ? 'Aplicado' : 'Aplicar'}
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowShareMenu(!showShareMenu)}
                iconName="Share2"
                iconPosition="left"
              >
                Compartir
              </Button>
              
              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-10">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        onShare(job?.id, 'linkedin');
                        setShowShareMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="Linkedin" size={16} />
                      <span>LinkedIn</span>
                    </button>
                    <button
                      onClick={() => {
                        onShare(job?.id, 'email');
                        setShowShareMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="Mail" size={16} />
                      <span>Email</span>
                    </button>
                    <button
                      onClick={() => {
                        onShare(job?.id, 'copy');
                        setShowShareMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="Copy" size={16} />
                      <span>Copiar enlace</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Eye" size={14} />
            <span>{job?.views} vistas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;