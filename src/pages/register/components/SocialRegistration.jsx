import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister }) => {
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLinkedInRegister = async () => {
    setIsLinkedInLoading(true);
    
    // Simulate LinkedIn OAuth flow
    setTimeout(() => {
      const mockLinkedInData = {
        nombre: 'María',
        apellidos: 'García López',
        email: 'maria.garcia@email.com',
        empresa: 'Tech Solutions S.L.',
        cargo: 'Desarrolladora Senior',
        sector: 'tecnologia',
        experiencia: '6-10',
        ubicacion: 'madrid',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      };
      
      onSocialRegister('linkedin', mockLinkedInData);
      setIsLinkedInLoading(false);
    }, 2000);
  };

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true);
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      const mockGoogleData = {
        nombre: 'Carlos',
        apellidos: 'Rodríguez Martín',
        email: 'carlos.rodriguez@gmail.com'
      };
      
      onSocialRegister('google', mockGoogleData);
      setIsGoogleLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            O regístrate con
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* LinkedIn Registration */}
        <Button
          variant="outline"
          fullWidth
          onClick={handleLinkedInRegister}
          loading={isLinkedInLoading}
          iconName="Linkedin"
          iconPosition="left"
          className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors duration-200"
        >
          {isLinkedInLoading ? 'Conectando con LinkedIn...' : 'Continuar con LinkedIn'}
        </Button>

        {/* Google Registration */}
        <Button
          variant="outline"
          fullWidth
          onClick={handleGoogleRegister}
          loading={isGoogleLoading}
          className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white transition-colors duration-200"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{isGoogleLoading ? 'Conectando con Google...' : 'Continuar con Google'}</span>
          </div>
        </Button>
      </div>

      {/* Benefits of Social Registration */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Zap" size={18} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground text-sm mb-1">
              Registro Rápido con LinkedIn
            </h4>
            <p className="text-xs text-muted-foreground">
              Importa automáticamente tu información profesional y acelera tu registro en segundos.
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} />
        <span>Conexión segura y cifrada</span>
      </div>
    </div>
  );
};

export default SocialRegistration;