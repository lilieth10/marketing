'use client';

import React from 'react';
import { 
  BarChart3, 
  Users, 
  Activity, 
  FileText, 
  MessageSquare 
} from 'lucide-react';

type ActiveSection = 'dashboard' | 'users' | 'activity' | 'content' | 'support';

interface AdminNavigationProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

const AdminNavigationComponent: React.FC<AdminNavigationProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Panel de Control', icon: BarChart3 },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'activity', label: 'Actividad', icon: Activity },
    { id: 'content', label: 'Contenidos', icon: FileText },
    { id: 'support', label: 'Soporte', icon: MessageSquare }
  ];

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="px-6 py-4">
        <nav className="flex space-x-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id as ActiveSection)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} className="mr-2" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AdminNavigationComponent; 