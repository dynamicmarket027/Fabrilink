import React from 'react';
import Icon from 'src/components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Seguridad Avanzada',
      description: 'Encriptación de extremo a extremo'
    },
    {
      icon: 'Lock',
      title: 'Datos Protegidos',
      description: 'Cumplimiento GDPR y LOPD'
    },
    {
      icon: 'Users',
      title: '+50,000 Profesionales',
      description: 'Confían en nuestra plataforma'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Directora de RRHH',
      company: 'TechCorp España',
      content: 'FabriLink me ayudó a encontrar los mejores talentos para mi equipo.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Carlos Ruiz',
      role: 'Ingeniero Senior',
      company: 'InnovaTech',
      content: 'Gracias a FabriLink conseguí mi trabajo actual y expandí mi red profesional.',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="text-center space-y-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">{feature?.title}</h3>
              <p className="text-xs text-muted-foreground font-caption">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-center text-sm font-medium text-foreground">
          Lo que dicen nuestros usuarios
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-4 space-y-3">
              <p className="text-sm text-foreground italic">
                "{testimonial?.content}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={testimonial?.avatar} 
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <Icon name="User" size={16} color="white" style={{display: 'none'}} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial?.name}</p>
                  <p className="text-xs text-muted-foreground font-caption">
                    {testimonial?.role} en {testimonial?.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;