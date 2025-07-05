'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  TrendingUp, 
  TrendingDown, 
  Users,
  DollarSign,
  ShoppingBag,
  Brain,
  Shield,
  Clock,
  Zap,
  RefreshCw
} from 'lucide-react';
import { type AdminStats } from '@/lib/mocks/admin';

interface AdminStatsProps {
  stats: AdminStats[];
}

const AdminStatsComponent: React.FC<AdminStatsProps> = ({ stats }) => {
  const getStatIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
      'users': Users,
      'trending-up': TrendingUp,
      'shopping-bag': ShoppingBag,
      'brain': Brain,
      'shield': Shield,
      'clock': Clock,
      'dollar-sign': DollarSign
    };
    return iconMap[iconName] || Users;
  };

  const getStatColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': 'from-blue-500 to-blue-600',
      'green': 'from-green-500 to-green-600',
      'orange': 'from-orange-500 to-orange-600',
      'purple': 'from-purple-500 to-purple-600',
      'red': 'from-red-500 to-red-600',
      'cyan': 'from-cyan-500 to-cyan-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas Principales */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Panel de Control</h2>
        <Button variant="secondary" className="flex items-center space-x-2">
          <RefreshCw size={16} />
          <span>Actualizar</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat: AdminStats) => {
          const Icon = getStatIcon(stat.icon);
          return (
            <Card key={stat.id} className="p-6 bg-gradient-to-br from-white to-gray-50 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                      {stat.unit && <span className="text-lg text-gray-500 ml-1">{stat.unit}</span>}
                    </p>
                    {stat.change && (
                      <div className={`flex items-center text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.trend === 'up' ? <TrendingUp size={16} /> : 
                         stat.trend === 'down' ? <TrendingDown size={16} /> : null}
                        <span className="ml-1">{Math.abs(stat.change)}%</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`p-3 bg-gradient-to-r ${getStatColor(stat.color)} rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              {stat.aiInsight && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start space-x-2">
                    <Zap className="text-purple-600 mt-0.5" size={16} />
                    <p className="text-sm text-purple-800">{stat.aiInsight}</p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminStatsComponent; 