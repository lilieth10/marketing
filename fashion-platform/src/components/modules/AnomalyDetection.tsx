'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Brain, Target, TrendingUp, Users, Eye, Clock, DollarSign, MapPin, Zap, CheckCircle } from 'lucide-react';

interface AnomalyDetection {
  id: string;
  type: 'fraud_transaction' | 'suspicious_behavior' | 'inventory_anomaly' | 'price_manipulation' | 'bot_activity';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: number;
  title: string;
  description: string;
  timestamp: string;
  affectedUsers: number;
  potentialLoss: number;
  location: string;
  metrics: {
    anomalyScore: number;
    riskLevel: number;
    impactRadius: number;
  };
  recommendation: string;
  status: 'Active' | 'Investigating' | 'Resolved';
  evidence: string[];
}

const mockAnomalies: AnomalyDetection[] = [
  {
    id: 'anomaly-001',
    type: 'fraud_transaction',
    severity: 'Critical',
    confidence: 96,
    title: 'Múltiples transacciones sospechosas desde IP único',
    description: 'Se detectaron 47 transacciones de alta valor desde una misma IP en 15 minutos, patrón inconsistente con comportamiento normal.',
    timestamp: '2024-01-15 14:23:00',
    affectedUsers: 47,
    potentialLoss: 12450,
    location: 'Ciudad de México, MX',
    metrics: {
      anomalyScore: 0.96,
      riskLevel: 89,
      impactRadius: 23
    },
    recommendation: 'Bloquear IP inmediatamente y revisar todas las transacciones relacionadas',
    status: 'Active',
    evidence: [
      'Velocidad de transacciones 450% superior al promedio',
      'Datos de tarjetas de diferentes países',
      'Patrones de clics automatizados detectados'
    ]
  },
  {
    id: 'anomaly-002',
    type: 'suspicious_behavior',
    severity: 'High',
    confidence: 87,
    title: 'Actividad de scraping masivo detectada',
    description: 'Bot realizando scraping sistemático de precios y productos, posible competencia recopilando inteligencia comercial.',
    timestamp: '2024-01-15 12:45:00',
    affectedUsers: 1,
    potentialLoss: 0,
    location: 'São Paulo, BR',
    metrics: {
      anomalyScore: 0.87,
      riskLevel: 72,
      impactRadius: 15
    },
    recommendation: 'Implementar CAPTCHA y rate limiting en endpoints de productos',
    status: 'Investigating',
    evidence: [
      'Requests por segundo 1200% superior a usuario normal',
      'User-Agent rotativo sospechoso',
      'Acceso secuencial a catálogo completo'
    ]
  }
];

const AnomalyLoader: React.FC<{ stage: number; totalStages: number }> = ({ stage, totalStages }) => {
  const stages = [
    { icon: Brain, message: "Inicializando sistema de detección...", detail: "Cargando modelos de ML" },
    { icon: Eye, message: "Analizando patrones de comportamiento...", detail: "Procesando 2.3M eventos" },
    { icon: Shield, message: "Evaluando niveles de riesgo...", detail: "Aplicando algoritmos de clustering" },
    { icon: Target, message: "Identificando anomalías críticas...", detail: "Validación con modelos ensemble" },
    { icon: CheckCircle, message: "Generando alertas inteligentes...", detail: "Sistema listo para monitoreo" }
  ];

  const currentStage = stages[Math.min(stage, stages.length - 1)];
  const Icon = currentStage.icon;

  return (
    <div className="bg-gradient-to-br from-red-950 to-orange-950 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg mx-auto mb-4">
          <Icon size={20} className="sm:hidden animate-pulse" />
          <Icon size={28} className="hidden sm:block animate-pulse" />
        </div>
        <h3 className="text-lg sm:text-2xl font-light text-white mb-2">Sistema de Detección de Anomalías</h3>
        <p className="text-red-400 text-xs sm:text-sm px-2">{currentStage.message}</p>
        <div className="w-full bg-white/10 rounded-full h-2 mt-4 sm:mt-6">
          <div 
            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-700"
            style={{ width: `${((stage + 1) / totalStages) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const AnomalyCard: React.FC<{ anomaly: AnomalyDetection }> = ({ anomaly }) => {
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'fraud_transaction': return DollarSign;
      case 'suspicious_behavior': return Eye;
      case 'inventory_anomaly': return TrendingUp;
      case 'bot_activity': return Zap;
      default: return AlertTriangle;
    }
  };

  const TypeIcon = getTypeIcon(anomaly.type);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <TypeIcon size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{anomaly.title}</h3>
            <p className="text-sm text-gray-500">{anomaly.timestamp}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(anomaly.severity)}`}>
          {anomaly.severity}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{anomaly.description}</p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">{anomaly.confidence}%</div>
          <div className="text-xs text-gray-500">Confianza</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">{anomaly.affectedUsers}</div>
          <div className="text-xs text-gray-500">Usuarios</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">${anomaly.potentialLoss}</div>
          <div className="text-xs text-gray-500">Pérdida Pot.</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <h4 className="font-medium text-gray-800 mb-2">Evidencia:</h4>
        <ul className="space-y-1">
          {anomaly.evidence.map((item, idx) => (
            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors">
          Investigar
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors">
          Marcar Falso Positivo
        </button>
      </div>
    </div>
  );
};

export function AnomalyDetection() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [anomalies, setAnomalies] = useState<AnomalyDetection[]>([]);

  useEffect(() => {
    const totalStages = 5;
    const stageInterval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev >= totalStages - 1) {
          clearInterval(stageInterval);
          setTimeout(() => {
            setAnomalies(mockAnomalies);
            setIsLoading(false);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(stageInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <AnomalyLoader stage={loadingStage} totalStages={5} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Detección de Anomalías IA
        </h2>
        <p className="text-gray-600">Sistema inteligente de monitoreo y detección de comportamientos sospechosos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {anomalies.map(anomaly => (
          <AnomalyCard key={anomaly.id} anomaly={anomaly} />
        ))}
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Estado del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">96%</div>
            <div className="text-sm text-gray-600">Precisión</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">2.3M</div>
            <div className="text-sm text-gray-600">Eventos/día</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">47</div>
            <div className="text-sm text-gray-600">Alertas Activas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
