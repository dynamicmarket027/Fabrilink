import React from 'react';
import Icon from 'src/components/AppIcon';
import Image from 'src/components/AppImage';

const ValueProposition = () => {
  const benefits = [
    {
      icon: 'Users',
      title: 'Red Profesional',
      description: 'Conecta con más de 50,000 profesionales en España y Latinoamérica'
    },
    {
      icon: 'Briefcase',
      title: 'Oportunidades Laborales',
      description: 'Accede a ofertas exclusivas de las mejores empresas'
    },
    {
      icon: 'TrendingUp',
      title: 'Crecimiento Profesional',
      description: 'Herramientas para impulsar tu carrera y desarrollo'
    },
    {
      icon: 'MessageCircle',
      title: 'Networking Efectivo',
      description: 'Participa en conversaciones que importan en tu sector'
    }
  ];

  const testimonials = [
    {
      name: 'Ana Martínez',
      role: 'Directora de Marketing',
      company: 'Innovate Corp',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      quote: 'FabriLink me ayudó a encontrar mi trabajo actual y a expandir mi red profesional significativamente.'
    },
    {
      name: 'Miguel Rodríguez',
      role: 'Ingeniero de Software',
      company: 'TechStart',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      quote: 'La plataforma perfecta para conectar con otros profesionales de tecnología en España.'
    },
    {
      name: 'Laura González',
      role: 'Consultora Senior',
      company: 'Strategy Plus',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      quote: 'Excelente para mantenerse al día con las tendencias de la industria y hacer networking.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Profesionales Activos' },
    { number: '2.5K+', label: 'Empresas Registradas' },
    { number: '15K+', label: 'Ofertas de Trabajo' },
    { number: '95%', label: 'Satisfacción de Usuarios' }
  ];

  return (
    <div className="space-y-8">
      {/* Main Value Proposition */}
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
          Tu Red Profesional Te Espera
        </h2>
        <p className="text-muted-foreground text-lg">
          Únete a la comunidad profesional más activa de habla hispana
        </p>
      </div>
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-subtle transition-shadow duration-200">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={benefit?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">{benefit?.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Statistics */}
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-heading font-bold text-primary mb-1">
                {stat?.number}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground text-center">
          Lo Que Dicen Nuestros Usuarios
        </h3>
        <div className="space-y-3">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow duration-200">
              <div className="flex items-start space-x-3">
                <Image
                  src={testimonial?.image}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground italic mb-2">
                    "{testimonial?.quote}"
                  </p>
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      {testimonial?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial?.role} en {testimonial?.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Signals */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-6 text-center">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">SSL Seguro</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">GDPR Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">Verificado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;