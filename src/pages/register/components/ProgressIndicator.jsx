import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import SocialRegistration from './components/SocialRegistration';
import ValueProposition from './components/ValueProposition';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const totalSteps = 3;

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleSocialRegister = (provider, userData) => {
    console.log(`Registering with ${provider}:`, userData);
    
    // Simulate successful social registration
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration data:', formData);
      
      setShowSuccess(true);
      
      // Redirect to dashboard after success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Helmet>
          <title>Registro Exitoso - FabriLink</title>
          <meta name="description" content="Tu cuenta ha sido creada exitosamente en FabriLink" />
        </Helmet>
        
        <div className="max-w-md w-full text-center">
          <div className="bg-card border border-border rounded-lg p-8 shadow-elevated">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              ¡Cuenta Creada Exitosamente!
            </h1>
            
            <p className="text-muted-foreground mb-6">
              Te hemos enviado un email de verificación. Revisa tu bandeja de entrada para activar tu cuenta.
            </p>
            
            <div className="space-y-3">
              <Button fullWidth onClick={() => navigate('/dashboard')}>
                Ir al Dashboard
              </Button>
              <Button variant="outline" fullWidth onClick={() => navigate('/login')}>
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Registro - FabriLink | Tu Red Profesional</title>
        <meta name="description" content="Únete a FabriLink y conecta con más de 50,000 profesionales. Crea tu perfil profesional y accede a oportunidades laborales exclusivas." />
        <meta name="keywords" content="registro, networking profesional, LinkedIn español, oportunidades laborales, red profesional" />
      </Helmet>
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Link" size={24} color="white" />
                </div>
                <span className="text-2xl font-heading font-bold text-primary">
                  FabriLink
                </span>
              </Link>
              
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Crea Tu Cuenta
              </h1>
              <p className="text-muted-foreground">
                Únete a la red profesional más activa
              </p>
            </div>

            {/* Progress Indicator */}
            <ProgressIndicator 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
            />

            {/* Social Registration */}
            {currentStep === 1 && (
              <div className="mb-8">
                <SocialRegistration onSocialRegister={handleSocialRegister} />
              </div>
            )}

            {/* Registration Form */}
            <RegistrationForm
              currentStep={currentStep}
              onStepChange={handleStepChange}
              onSubmit={handleFormSubmit}
            />

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>

            {/* Loading Overlay */}
            {isSubmitting && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-card border border-border rounded-lg p-6 shadow-elevated">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-foreground font-medium">Creando tu cuenta...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Value Proposition */}
        <div className="hidden lg:flex lg:flex-1 bg-muted/30 p-8 items-center justify-center">
          <div className="w-full max-w-lg">
            <ValueProposition />
          </div>
        </div>
      </div>
      {/* Mobile Value Proposition */}
      <div className="lg:hidden bg-muted/30 p-6">
        <ValueProposition />
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Términos de Uso
              </Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/help" className="hover:text-foreground transition-colors">
                Ayuda
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} />
                <span>Conexión Segura</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} FabriLink
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;