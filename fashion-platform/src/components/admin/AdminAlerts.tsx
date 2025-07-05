'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Shield, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { type AIAlert } from '@/lib/mocks/admin';

interface AdminAlertsProps {
  alerts: AIAlert[];
}

const AdminAlertsComponent: React.FC<AdminAlertsProps> = ({ alerts }) => {
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical' || alert.severity === 'high').slice(0, 3);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Shield className="mr-2 text-red-600" />
          Alertas Críticas de IA
        </h2>
        <Button variant="secondary" className="flex items-center space-x-2">
          <RefreshCw size={16} />
          <span>Actualizar</span>
        </Button>
      </div>
      <div className="space-y-4">
        {criticalAlerts.map((alert: AIAlert) => (
          <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
            alert.severity === 'critical' ? 'bg-red-50 border-red-500' : 'bg-orange-50 border-orange-500'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className={`${
                    alert.severity === 'critical' ? 'text-red-600' : 'text-orange-600'
                  }`} size={18} />
                  <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{alert.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{alert.affectedUsers} usuarios afectados</span>
                  <span>{new Date(alert.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="primary">
                  Investigar
                </Button>
                <Button size="sm" variant="secondary">
                  Resolver
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AdminAlertsComponent; 