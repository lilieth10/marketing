import React from 'react';
import { Lightbulb, BarChart3, Target } from 'lucide-react';

export const ThreeSteps = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            De la idea al impacto, en tres pasos
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Una experiencia fluida y fácil que lleva tu campaña al territorio de campañas con resultados reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Paso 1 - Crea */}
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb size={40} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">1</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Crea</h3>
            <p className="text-gray-600 leading-relaxed">
              Diseña campañas inteligentes y herramientas de personalización con IA integrada.
            </p>
          </div>

          {/* Paso 2 - Monitorea */}
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 size={40} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-600 font-bold">2</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Monitorea</h3>
            <p className="text-gray-600 leading-relaxed">
              Analiza el rendimiento en tiempo real con métricas claras y accesibles.
            </p>
          </div>

          {/* Paso 3 - Optimiza */}
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={40} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Optimiza</h3>
            <p className="text-gray-600 leading-relaxed">
              Ajusta las estrategias para maximizar rendimiento y fidelidad de audiencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 