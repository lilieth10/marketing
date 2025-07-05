'use client';

import React from 'react';
import { Button } from "@/components/ui/Button";
import { BarChart3, TrendingUp, Users, Brain, Target, Zap } from 'lucide-react';

export const Technology = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Columna izquierda - Conecta datos */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Conecta datos, creatividad y resultados
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestra plataforma te integra con mejores herramientas para optimizar la experiencia de tus clientes.
              </p>
            </div>

            {/* Grid de características */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Brain size={24} className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Moda estratégica IA</h3>
                <p className="text-sm text-gray-600">
                  Usa la comprensión de IA inclusivas y analíticas para la experiencia del cliente.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Users size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Segmentación inteligente</h3>
                <p className="text-sm text-gray-600">
                  Identifica y segmenta automáticamente diferentes tipos de consumidores.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Target size={24} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Análisis eficiente</h3>
                <p className="text-sm text-gray-600">
                  Genera reportes detallados y actionables para tu estrategia.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <Zap size={24} className="text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Automatización inteligente</h3>
                <p className="text-sm text-gray-600">
                  Automatiza procesos y optimiza campañas en tiempo real.
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha - Descubre el impacto */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Descubre el impacto de tus estrategias
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Obtén insights claros sobre métricas clave, segmentación de audiencias y optimización de conversiones.
              </p>
            </div>

            {/* Gráfico de barras simulado */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Total de ventas</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>2024</span>
                </div>
              </div>
              
              {/* Gráfico de barras simple */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-8">Ene</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6">
                    <div className="bg-purple-500 h-6 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-8">Feb</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6">
                    <div className="bg-purple-500 h-6 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-8">Mar</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6">
                    <div className="bg-purple-500 h-6 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-8">Abr</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6">
                    <div className="bg-purple-500 h-6 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-8">May</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6">
                    <div className="bg-purple-500 h-6 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-8">Jun</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6">
                    <div className="bg-purple-500 h-6 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 