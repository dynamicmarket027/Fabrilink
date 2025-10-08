import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/ui/Button';

const RegisterPrompt = () => {
  return (
    <div className="text-center space-y-4 pt-6 border-t border-border">
      <p className="text-sm text-muted-foreground font-caption">
        ¿Nuevo en FabriLink?
      </p>
      <Link to="/register">
        <Button variant="outline" fullWidth iconName="UserPlus" iconPosition="left">
          Crear Cuenta Gratuita
        </Button>
      </Link>
      <p className="text-xs text-muted-foreground font-caption">
        Únete a miles de profesionales que ya confían en nosotros
      </p>
    </div>
  );
};

export default RegisterPrompt;