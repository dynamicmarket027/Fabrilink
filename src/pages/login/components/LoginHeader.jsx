import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'src/components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <Link to="/" className="inline-flex items-center space-x-3">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-elevated">
          <Icon name="Link" size={24} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-heading font-bold text-primary">FabriLink</h1>
          <p className="text-sm text-muted-foreground font-caption">Red Profesional</p>
        </div>
      </Link>
      
      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Bienvenido de vuelta
        </h2>
        <p className="text-muted-foreground font-caption">
          Conecta con profesionales y haz crecer tu carrera
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;