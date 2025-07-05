import React from 'react';
import { Heart, Target, Brain, Users, BarChart3, Eye } from 'lucide-react';

export const Features = () => {
  return (
    <section className="container mx-auto py-20 px-6 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Todo lo que necesitas para destacar en moda
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Nuestra plataforma te ofrece un conjunto de beneficios únicos diseñados para transformar la forma en que
          conectas con tu audiencia.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Personalización a medida */}
        <div className="p-8 text-center space-y-6 bg-purple-50 rounded-2xl border border-purple-100">
          <div className="mx-auto h-16 w-16 bg-purple-600 rounded-2xl flex items-center justify-center">
            <Heart size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Personalización a medida</h3>
          <p className="text-gray-600 leading-relaxed">
            Cada cliente es único. Crea campañas personalizadas que reflejen el estilo y preferencias individuales.
          </p>
        </div>

        {/* Fidelización garantizada */}
        <div className="p-8 text-center space-y-6 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Target size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Fidelización garantizada</h3>
          <p className="text-gray-600 leading-relaxed">
            Ofrece experiencias exclusivas que mantienen siempre en primer lugar a tus clientes más importantes.
          </p>
        </div>

        {/* Análisis predictivo */}
        <div className="p-8 text-center space-y-6 bg-green-50 rounded-2xl border border-green-100">
          <div className="mx-auto h-16 w-16 bg-green-600 rounded-2xl flex items-center justify-center">
            <Brain size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Análisis predictivo</h3>
          <p className="text-gray-600 leading-relaxed">
            Anticipa tendencias y momentos siempre un paso adelante en el mercado.
          </p>
        </div>

        {/* Colaboración creativa */}
        <div className="p-8 text-center space-y-6 bg-pink-50 rounded-2xl border border-pink-100">
          <div className="mx-auto h-16 w-16 bg-pink-600 rounded-2xl flex items-center justify-center">
            <Users size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Colaboración creativa</h3>
          <p className="text-gray-600 leading-relaxed">
            Comparte con diseñadores, artistas y otros profesionales en un entorno colaborativo.
          </p>
        </div>

        {/* Gestión simplificada */}
        <div className="p-8 text-center space-y-6 bg-indigo-50 rounded-2xl border border-indigo-100">
          <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center">
            <BarChart3 size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Gestión simplificada</h3>
          <p className="text-gray-600 leading-relaxed">
            Desde campañas hasta colecciones, no en un solo lugar.
          </p>
        </div>

        {/* Mayor visibilidad */}
        <div className="p-8 text-center space-y-6 bg-amber-50 rounded-2xl border border-amber-100">
          <div className="mx-auto h-16 w-16 bg-amber-600 rounded-2xl flex items-center justify-center">
            <Eye size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Mayor visibilidad</h3>
          <p className="text-gray-600 leading-relaxed">
            Mejora tu alcance con herramientas que optimizan tu presencia digital.
          </p>
        </div>
      </div>
    </section>
  );
}; 