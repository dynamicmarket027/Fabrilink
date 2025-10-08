import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const JobAlerts = ({ isOpen, onClose }) => {
  const [alertData, setAlertData] = useState({
    name: '',
    keywords: '',
    location: '',
    frequency: 'daily',
    emailNotifications: true,
    pushNotifications: false
  });

  const [existingAlerts, setExistingAlerts] = useState([
    {
      id: 1,
      name: 'Desarrollador Frontend',
      keywords: 'React, JavaScript, Frontend',
      location: 'Madrid',
      frequency: 'daily',
      isActive: true,
      createdDate: '2024-09-15',
      matchCount: 12
    },
    {
      id: 2,
      name: 'Product Manager',
      keywords: 'Product Manager, Agile, Scrum',
      location: 'Barcelona',
      frequency: 'weekly',
      isActive: true,
      createdDate: '2024-09-10',
      matchCount: 8
    },
    {
      id: 3,
      name: 'Data Scientist',
      keywords: 'Python, Machine Learning, AI',
      location: 'Remoto',
      frequency: 'daily',
      isActive: false,
      createdDate: '2024-09-05',
      matchCount: 5
    }
  ]);

  const frequencyOptions = [
    { value: 'daily', label: 'Diariamente' },
    { value: 'weekly', label: 'Semanalmente' },
    { value: 'monthly', label: 'Mensualmente' }
  ];

  const locationOptions = [
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'bilbao', label: 'Bilbao' },
    { value: 'remote', label: 'Remoto' },
    { value: 'spain', label: 'Toda España' }
  ];

  const handleInputChange = (field, value) => {
    setAlertData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateAlert = () => {
    if (!alertData?.name || !alertData?.keywords) return;

    const newAlert = {
      id: Date.now(),
      ...alertData,
      isActive: true,
      createdDate: new Date()?.toISOString()?.split('T')?.[0],
      matchCount: 0
    };

    setExistingAlerts(prev => [newAlert, ...prev]);
    setAlertData({
      name: '',
      keywords: '',
      location: '',
      frequency: 'daily',
      emailNotifications: true,
      pushNotifications: false
    });
  };

  const handleToggleAlert = (alertId) => {
    setExistingAlerts(prev =>
      prev?.map(alert =>
        alert?.id === alertId
          ? { ...alert, isActive: !alert?.isActive }
          : alert
      )
    );
  };

  const handleDeleteAlert = (alertId) => {
    setExistingAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const getFrequencyLabel = (frequency) => {
    const option = frequencyOptions?.find(opt => opt?.value === frequency);
    return option ? option?.label : frequency;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Alertas de empleo
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Create New Alert */}
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-border">
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Crear nueva alerta
            </h3>
            
            <div className="space-y-4">
              <Input
                label="Nombre de la alerta"
                placeholder="ej. Desarrollador Frontend Madrid"
                value={alertData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                required
              />

              <Input
                label="Palabras clave"
                placeholder="React, JavaScript, Frontend..."
                value={alertData?.keywords}
                onChange={(e) => handleInputChange('keywords', e?.target?.value)}
                description="Separa las palabras clave con comas"
                required
              />

              <Select
                label="Ubicación"
                placeholder="Seleccionar ubicación"
                options={locationOptions}
                value={alertData?.location}
                onChange={(value) => handleInputChange('location', value)}
              />

              <Select
                label="Frecuencia de notificaciones"
                options={frequencyOptions}
                value={alertData?.frequency}
                onChange={(value) => handleInputChange('frequency', value)}
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  Preferencias de notificación
                </label>
                <Checkbox
                  label="Notificaciones por email"
                  checked={alertData?.emailNotifications}
                  onChange={(e) => handleInputChange('emailNotifications', e?.target?.checked)}
                />
                <Checkbox
                  label="Notificaciones push"
                  checked={alertData?.pushNotifications}
                  onChange={(e) => handleInputChange('pushNotifications', e?.target?.checked)}
                />
              </div>

              <Button
                variant="default"
                onClick={handleCreateAlert}
                disabled={!alertData?.name || !alertData?.keywords}
                iconName="Plus"
                iconPosition="left"
                className="w-full"
              >
                Crear alerta
              </Button>
            </div>
          </div>

          {/* Existing Alerts */}
          <div className="lg:w-1/2 p-6 overflow-y-auto">
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Mis alertas ({existingAlerts?.length})
            </h3>

            {existingAlerts?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tienes alertas creadas</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Crea tu primera alerta para recibir notificaciones
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {existingAlerts?.map((alert) => (
                  <div
                    key={alert?.id}
                    className={`p-4 border rounded-lg transition-smooth ${
                      alert?.isActive
                        ? 'border-border bg-card' :'border-muted bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          alert?.isActive ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {alert?.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert?.keywords}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleAlert(alert?.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Icon name={alert?.isActive ? "Pause" : "Play"} size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteAlert(alert?.id)}
                          className="text-muted-foreground hover:text-error"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={14} />
                          <span>{alert?.location || 'Cualquier ubicación'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{getFrequencyLabel(alert?.frequency)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert?.isActive
                            ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                        }`}>
                          {alert?.isActive ? 'Activa' : 'Pausada'}
                        </span>
                        {alert?.matchCount > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {alert?.matchCount} coincidencias
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAlerts;