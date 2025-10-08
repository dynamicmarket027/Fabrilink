import React from 'react';
import Icon from '../../../components/AppIcon';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';


const NetworkAnalytics = ({ analytics }) => {
  const industryData = [
    { name: 'Tecnología', value: 35, color: '#1B365D' },
    { name: 'Finanzas', value: 20, color: '#4A90A4' },
    { name: 'Marketing', value: 15, color: '#E8A87C' },
    { name: 'Consultoría', value: 12, color: '#38A169' },
    { name: 'Educación', value: 10, color: '#D69E2E' },
    { name: 'Otros', value: 8, color: '#718096' }
  ];

  const growthData = [
    { month: 'Ene', connections: 45 },
    { month: 'Feb', connections: 52 },
    { month: 'Mar', connections: 48 },
    { month: 'Abr', connections: 61 },
    { month: 'May', connections: 55 },
    { month: 'Jun', connections: 67 }
  ];

  const connectionStrengthData = [
    { level: 'Fuerte', count: 45, percentage: 25 },
    { level: 'Moderada', count: 89, percentage: 50 },
    { level: 'Débil', count: 44, percentage: 25 }
  ];

  const StatCard = ({ icon, title, value, subtitle, trend }) => (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-xs font-caption ${
            trend > 0 ? 'text-success' : 'text-error'
          }`}>
            <Icon name={trend > 0 ? "TrendingUp" : "TrendingDown"} size={12} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-heading font-semibold text-foreground mb-1">
        {value}
      </h3>
      <p className="text-sm font-medium text-foreground mb-1">{title}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground font-caption">{subtitle}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="Users"
          title="Total de Conexiones"
          value="178"
          subtitle="Crecimiento este mes"
          trend={12}
        />
        <StatCard
          icon="UserPlus"
          title="Nuevas Conexiones"
          value="23"
          subtitle="Últimos 30 días"
          trend={8}
        />
        <StatCard
          icon="MessageCircle"
          title="Conversaciones Activas"
          value="12"
          subtitle="Mensajes intercambiados"
          trend={-5}
        />
        <StatCard
          icon="Eye"
          title="Visualizaciones de Perfil"
          value="89"
          subtitle="Esta semana"
          trend={15}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Distribución por Industria
            </h3>
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {industryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Porcentaje']}
                  labelStyle={{ color: '#2D3748' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {industryData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-xs text-muted-foreground font-caption">
                  {item?.name} ({item?.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Network Growth */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Crecimiento de Red
            </h3>
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#718096' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#718096' }}
                />
                <Tooltip 
                  formatter={(value) => [value, 'Conexiones']}
                  labelStyle={{ color: '#2D3748' }}
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="connections" 
                  fill="#1B365D" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Connection Strength Analysis */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Análisis de Fortaleza de Conexiones
          </h3>
          <Button variant="outline" size="sm" iconName="Download">
            Exportar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {connectionStrengthData?.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={index === 0 ? "#38A169" : index === 1 ? "#D69E2E" : "#E53E3E"}
                    strokeWidth="2"
                    strokeDasharray={`${item?.percentage}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-heading font-semibold text-foreground">
                    {item?.count}
                  </span>
                </div>
              </div>
              <h4 className="font-medium text-foreground mb-1">{item?.level}</h4>
              <p className="text-sm text-muted-foreground font-caption">
                {item?.percentage}% del total
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">
                Recomendación para mejorar tu red
              </h4>
              <p className="text-sm text-muted-foreground font-caption">
                Considera interactuar más frecuentemente con tus conexiones débiles. 
                Envía mensajes personalizados o comenta en sus publicaciones para fortalecer estas relaciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkAnalytics;