import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Personal', description: 'Información básica' },
    { number: 2, title: 'Profesional', description: 'Experiencia laboral' },
    { number: 3, title: 'Términos', description: 'Finalizar registro' }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-border z-0">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        {steps?.map((step, index) => {
          const isCompleted = currentStep > step?.number;
          const isCurrent = currentStep === step?.number;
          const isPending = currentStep < step?.number;

          return (
            <div key={step?.number} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${isCompleted 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : isCurrent 
                    ? 'bg-card border-primary text-primary shadow-lg' 
                    : 'bg-card border-border text-muted-foreground'
                }
              `}>
                {isCompleted ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <span className="font-medium text-sm">{step?.number}</span>
                )}
              </div>
              {/* Step Info */}
              <div className="mt-3 text-center">
                <div className={`font-medium text-sm transition-colors duration-300 ${
                  isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  {step?.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Mobile Step Info */}
      <div className="mt-6 text-center sm:hidden">
        <div className="text-sm font-medium text-primary">
          Paso {currentStep} de {totalSteps}: {steps?.[currentStep - 1]?.title}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {steps?.[currentStep - 1]?.description}
        </div>
      </div>
      {/* Progress Percentage */}
      <div className="mt-4 text-center">
        <div className="text-xs text-muted-foreground">
          Progreso: {Math.round((currentStep / totalSteps) * 100)}% completado
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;