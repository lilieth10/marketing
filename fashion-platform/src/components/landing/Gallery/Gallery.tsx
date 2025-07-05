'use client';

import React from 'react';
import Image from 'next/image';

export const Gallery = () => {
  return (
    <section className="relative py-16 px-6 bg-white">
      <div className="container mx-auto">
        {/* Sección con contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna izquierda - Texto */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="text-sm font-medium text-purple-600 mb-2">Personalización</div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Exclusividad</h2>
              <h3 className="text-xl font-bold text-gray-900">Innovación</h3>
            </div>
          </div>

          {/* Galería central - 6 imágenes */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-12 gap-4 h-[550px]">
              {/* Fila superior */}
              <div className="col-span-3 h-[180px]">
                <div className="relative h-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/products/dress1.jpg"
                    alt="Vestido elegante"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="col-span-6 h-[180px]">
                <div className="relative h-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/hombres.webp"
                    alt="Moda masculina"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="col-span-3 h-[180px]">
                <div className="relative h-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/products/blazer1.jpg"
                    alt="Blazer"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Fila central */}
              <div className="col-span-4 h-[180px]">
                <div className="relative h-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/verano.jpg"
                    alt="Moda verano"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="col-span-4 h-[180px]">
                <div className="relative h-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/products/jeans1.jpg"
                    alt="Jeans"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="col-span-4 h-[180px]">
                <div className="relative h-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/products/shirt1.jpg"
                    alt="Camisa"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Contenido adicional */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-right">
              <div className="text-sm font-medium text-purple-600 mb-2">Fidelización</div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Análisis</h2>
              <h3 className="text-xl font-bold text-gray-900">Creatividad</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 