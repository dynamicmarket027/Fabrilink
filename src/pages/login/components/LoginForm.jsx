import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/ui/Button';
import Input from 'src/components/ui/Input';
import { Checkbox } from 'src/components/ui/Checkbox';
import Icon from 'src/components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }
    
    if (!formData?.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Mock authentication - check against mock credentials
      const mockCredentials = {
        email: 'juan.perez@fabriclink.com',
        password: 'fabriclink123'
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Store user session
        localStorage.setItem('fabriclink_user', JSON.stringify({
          email: formData?.email,
          name: 'Juan Pérez',
          rememberMe: formData?.rememberMe
        }));
        
        navigate('/dashboard');
      } else {
        setErrors({
          general: 'Credenciales incorrectas. Usa: juan.perez@fabriclink.com / fabriclink123'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Error de conexión. Por favor, inténtalo de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />
        
        <Input
          label="Contraseña"
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Recordarme"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
          disabled={isLoading}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left"
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};

export default LoginForm;