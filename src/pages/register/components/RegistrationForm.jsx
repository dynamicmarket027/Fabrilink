import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ currentStep, onStepChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    empresa: '',
    cargo: '',
    sector: '',
    experiencia: '',
    ubicacion: '',
    telefono: '',
    acceptTerms: false,
    acceptPrivacy: false,
    marketingEmails: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const sectorOptions = [
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'finanzas', label: 'Finanzas' },
    { value: 'salud', label: 'Salud' },
    { value: 'educacion', label: 'Educación' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'ventas', label: 'Ventas' },
    { value: 'recursos-humanos', label: 'Recursos Humanos' },
    { value: 'ingenieria', label: 'Ingeniería' },
    { value: 'consultoria', label: 'Consultoría' },
    { value: 'manufactura', label: 'Manufactura' },
    { value: 'retail', label: 'Retail' },
    { value: 'otros', label: 'Otros' }
  ];

  const experienciaOptions = [
    { value: 'estudiante', label: 'Estudiante' },
    { value: '0-1', label: '0-1 años' },
    { value: '2-5', label: '2-5 años' },
    { value: '6-10', label: '6-10 años' },
    { value: '11-15', label: '11-15 años' },
    { value: '16+', label: 'Más de 16 años' }
  ];

  const ubicacionOptions = [
    { value: 'madrid', label: 'Madrid, España' },
    { value: 'barcelona', label: 'Barcelona, España' },
    { value: 'valencia', label: 'Valencia, España' },
    { value: 'sevilla', label: 'Sevilla, España' },
    { value: 'bilbao', label: 'Bilbao, España' },
    { value: 'mexico-city', label: 'Ciudad de México, México' },
    { value: 'buenos-aires', label: 'Buenos Aires, Argentina' },
    { value: 'bogota', label: 'Bogotá, Colombia' },
    { value: 'lima', label: 'Lima, Perú' },
    { value: 'santiago', label: 'Santiago, Chile' },
    { value: 'otros', label: 'Otros' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Password strength calculation
    if (field === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.nombre?.trim()) newErrors.nombre = 'El nombre es obligatorio';
      if (!formData?.apellidos?.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
      if (!formData?.email?.trim()) {
        newErrors.email = 'El email es obligatorio';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'El formato del email no es válido';
      }
      if (!formData?.password) {
        newErrors.password = 'La contraseña es obligatoria';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    if (step === 2) {
      if (!formData?.empresa?.trim()) newErrors.empresa = 'La empresa es obligatoria';
      if (!formData?.cargo?.trim()) newErrors.cargo = 'El cargo es obligatorio';
      if (!formData?.sector) newErrors.sector = 'El sector es obligatorio';
      if (!formData?.experiencia) newErrors.experiencia = 'La experiencia es obligatoria';
      if (!formData?.ubicacion) newErrors.ubicacion = 'La ubicación es obligatoria';
    }

    if (step === 3) {
      if (!formData?.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
      if (!formData?.acceptPrivacy) newErrors.acceptPrivacy = 'Debes aceptar la política de privacidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      onStepChange(currentStep + 1);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateStep(3)) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Muy débil';
    if (passwordStrength < 50) return 'Débil';
    if (passwordStrength < 75) return 'Media';
    return 'Fuerte';
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Información Personal
        </h2>
        <p className="text-muted-foreground">
          Comencemos con tu información básica
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          type="text"
          placeholder="Tu nombre"
          value={formData?.nombre}
          onChange={(e) => handleInputChange('nombre', e?.target?.value)}
          error={errors?.nombre}
          required
        />
        <Input
          label="Apellidos"
          type="text"
          placeholder="Tus apellidos"
          value={formData?.apellidos}
          onChange={(e) => handleInputChange('apellidos', e?.target?.value)}
          error={errors?.apellidos}
          required
        />
      </div>

      <Input
        label="Correo Electrónico"
        type="email"
        placeholder="tu@email.com"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        description="Utilizaremos este email para enviarte notificaciones importantes"
        required
      />

      <Input
        label="Contraseña"
        type="password"
        placeholder="Crea una contraseña segura"
        value={formData?.password}
        onChange={(e) => handleInputChange('password', e?.target?.value)}
        error={errors?.password}
        required
      />

      {formData?.password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Seguridad de la contraseña:</span>
            <span className={`font-medium ${
              passwordStrength < 50 ? 'text-error' : 
              passwordStrength < 75 ? 'text-warning' : 'text-success'
            }`}>
              {getPasswordStrengthText()}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
              style={{ width: `${passwordStrength}%` }}
            />
          </div>
        </div>
      )}

      <Input
        label="Confirmar Contraseña"
        type="password"
        placeholder="Confirma tu contraseña"
        value={formData?.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
        error={errors?.confirmPassword}
        required
      />

      <Input
        label="Teléfono (Opcional)"
        type="tel"
        placeholder="+34 600 000 000"
        value={formData?.telefono}
        onChange={(e) => handleInputChange('telefono', e?.target?.value)}
        description="Te ayudará a conectar con más profesionales"
      />

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
          Continuar
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Información Profesional
        </h2>
        <p className="text-muted-foreground">
          Cuéntanos sobre tu experiencia profesional
        </p>
      </div>

      <Input
        label="Empresa Actual"
        type="text"
        placeholder="Nombre de tu empresa"
        value={formData?.empresa}
        onChange={(e) => handleInputChange('empresa', e?.target?.value)}
        error={errors?.empresa}
        required
      />

      <Input
        label="Cargo Actual"
        type="text"
        placeholder="Tu posición o título"
        value={formData?.cargo}
        onChange={(e) => handleInputChange('cargo', e?.target?.value)}
        error={errors?.cargo}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Sector"
          placeholder="Selecciona tu sector"
          options={sectorOptions}
          value={formData?.sector}
          onChange={(value) => handleInputChange('sector', value)}
          error={errors?.sector}
          required
          searchable
        />

        <Select
          label="Años de Experiencia"
          placeholder="Selecciona tu experiencia"
          options={experienciaOptions}
          value={formData?.experiencia}
          onChange={(value) => handleInputChange('experiencia', value)}
          error={errors?.experiencia}
          required
        />
      </div>

      <Select
        label="Ubicación"
        placeholder="Selecciona tu ubicación"
        options={ubicacionOptions}
        value={formData?.ubicacion}
        onChange={(value) => handleInputChange('ubicacion', value)}
        error={errors?.ubicacion}
        required
        searchable
      />

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => onStepChange(1)}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Anterior
        </Button>
        <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
          Continuar
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Términos y Preferencias
        </h2>
        <p className="text-muted-foreground">
          Últimos detalles para completar tu registro
        </p>
      </div>

      <div className="space-y-4 p-6 bg-muted rounded-lg">
        <Checkbox
          label="Acepto los Términos y Condiciones"
          description="He leído y acepto los términos de uso de FabriLink"
          checked={formData?.acceptTerms}
          onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
          error={errors?.acceptTerms}
          required
        />

        <Checkbox
          label="Acepto la Política de Privacidad"
          description="Entiendo cómo FabriLink maneja mis datos personales"
          checked={formData?.acceptPrivacy}
          onChange={(e) => handleInputChange('acceptPrivacy', e?.target?.checked)}
          error={errors?.acceptPrivacy}
          required
        />

        <Checkbox
          label="Recibir emails de marketing (Opcional)"
          description="Mantente al día con noticias, consejos profesionales y oportunidades"
          checked={formData?.marketingEmails}
          onChange={(e) => handleInputChange('marketingEmails', e?.target?.checked)}
        />
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Tu privacidad es importante</h4>
            <p className="text-sm text-muted-foreground">
              Cumplimos con GDPR y nunca compartiremos tu información sin tu consentimiento.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => onStepChange(2)}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Anterior
        </Button>
        <Button 
          onClick={handleSubmit}
          iconName="UserPlus"
          iconPosition="right"
          className="bg-success hover:bg-success/90"
        >
          Crear Cuenta
        </Button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
    </form>
  );
};

export default RegistrationForm;