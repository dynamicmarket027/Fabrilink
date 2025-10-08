import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';
import RegisterPrompt from './components/RegisterPrompt';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('fabriclink_user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Login Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-card rounded-2xl shadow-elevated border border-border p-8">
              <LoginHeader />
              
              <div className="mt-8 space-y-6">
                <LoginForm />
                <SocialLogin />
                <RegisterPrompt />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Trust Signals & Branding */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="w-full max-w-lg space-y-8">
            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Profesionales trabajando en equipo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-floating border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-success">95%</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Tasa de Éxito</p>
                    <p className="text-xs text-muted-foreground font-caption">En conexiones profesionales</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-floating border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">24h</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Respuesta Media</p>
                    <p className="text-xs text-muted-foreground font-caption">Entre profesionales</p>
                  </div>
                </div>
              </div>
            </div>
            
            <TrustSignals />
            
            {/* Additional Features */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                ¿Por qué elegir FabriLink?
              </h3>
              <div className="space-y-3">
                {[
                  'Conecta con profesionales de tu sector',
                  'Encuentra oportunidades laborales exclusivas',
                  'Comparte tu experiencia y conocimientos',
                  'Accede a recursos de desarrollo profesional'
                ]?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <p className="text-sm text-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="fixed bottom-4 left-4 right-4 text-center">
        <p className="text-xs text-muted-foreground font-caption">
          © {new Date()?.getFullYear()} FabriLink. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;