'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, RefreshCw, ShoppingBag, Users, FileText, Star, MessageCircle, Clock, MapPin, Smartphone, Monitor } from 'lucide-react';
import { type ActivityMetric } from '@/lib/mocks/admin';

interface AdminActivityProps {
  activities: ActivityMetric[];
}

const AdminActivity: React.FC<AdminActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'purchase': return ShoppingBag;
      case 'login': return Users;
      case 'upload': return FileText;
      case 'review': return Star;
      case 'message': return MessageCircle;
      default: return Users;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Actividad del Sistema</h2>
        <div className="flex space-x-3">
          <Button variant="secondary">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          <Button variant="primary">
            <RefreshCw size={16} className="mr-2" />
            Actualizar
          </Button>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {activities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activity.impact === 'high' ? 'bg-red-100' :
                      activity.impact === 'medium' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      <ActivityIcon size={20} className={
                        activity.impact === 'high' ? 'text-red-600' :
                        activity.impact === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      } />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{activity.user}</h4>
                        <span className="text-sm text-gray-500">{activity.action}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {activity.location}
                        </span>
                        <span className="flex items-center">
                          {activity.device === 'Mobile' ? <Smartphone size={12} className="mr-1" /> : <Monitor size={12} className="mr-1" />}
                          {activity.device}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.impact === 'high' ? 'bg-red-100 text-red-800' :
                      activity.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.impact}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default AdminActivity; 