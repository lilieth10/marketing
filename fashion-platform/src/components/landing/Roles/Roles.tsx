import React from 'react';
import { Users, Store, TrendingUp } from 'lucide-react';

export const Roles = () => {
  return (
    <section className="py-20 px-6 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Para todos los roles en la industria de la moda
        </h2>
        <p className="text-xl text-gray-300 mb-16 max-w-4xl mx-auto">
          Nuestra plataforma está diseñada para abordar las necesidades específicas de cada tipo de usuario:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marcas y diseñadores */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Marcas y diseñadores</h3>
            <p className="text-gray-300 leading-relaxed">
              Herramientas avanzadas para crear campañas exitosas, gestionar inventarios, analizar tendencias y conectar con tu audiencia de manera efectiva.
            </p>
          </div>

          {/* Compradores y tiendas */}
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Store size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Compradores y tiendas</h3>
            <p className="text-gray-300 leading-relaxed">
              Plataforma integral para descubrir nuevas tendencias, gestionar compras, optimizar inventario y mejorar la experiencia de tus clientes.
            </p>
          </div>

          {/* Agencias de marketing digital */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Agencias de marketing digital</h3>
            <p className="text-gray-300 leading-relaxed">
              Herramientas especializadas para gestionar múltiples clientes, crear campañas personalizadas y generar reportes detallados de rendimiento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 