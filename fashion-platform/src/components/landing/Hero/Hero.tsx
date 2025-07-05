'use client';

import React from 'react';
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative bg-white pt-20 pb-32 px-6 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none">
        {/* Espirales decorativos del Figma */}
        <img src="/images/espiral.jpg" alt="Espiral" className="absolute top-16 left-10 w-20 h-20 opacity-80" />
        <img src="/images/espiral.jpg" alt="Espiral" className="absolute top-32 right-20 w-28 h-28 opacity-80" />
        <img src="/images/espiral.jpg" alt="Espiral" className="absolute bottom-20 left-1/4 w-24 h-24 opacity-80" />
        <img src="/images/espiral.jpg" alt="Espiral" className="absolute top-40 right-32 w-16 h-16 opacity-80" />
        <img src="/images/espiral.jpg" alt="Espiral" className="absolute bottom-32 right-10 w-12 h-12 opacity-80" />
      </div>

      {/* Fondo decorativo detrás de 'moda' */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
        <img src="/images/espiral.jpg" alt="Espiral" className="w-40 h-40 opacity-60" />
      </div>
      {/* Rayitas decorativas arriba */}
      <div className="flex justify-between items-center w-full max-w-2xl mx-auto mb-4">
        <svg width="50" height="10" viewBox="0 0 50 10" fill="none"><path d="M0 5C12.5 0 12.5 10 25 5C37.5 0 37.5 10 50 5" stroke="#8B5CF6" strokeWidth="1.2" fill="none"/></svg>
        <svg width="50" height="10" viewBox="0 0 50 10" fill="none"><path d="M0 5C12.5 0 12.5 10 25 5C37.5 0 37.5 10 50 5" stroke="#8B5CF6" strokeWidth="1.2" fill="none"/></svg>
      </div>

      {/* Rayita arriba izquierda */}
      <div className="absolute top-16 left-10 z-10">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none"><path d="M0 6C15 0 15 12 30 6C45 0 45 12 60 6" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/></svg>
      </div>
      {/* Espiral abajo izquierda */}
      <div className="absolute bottom-16 left-10 z-10">
        <img src="/images/espiral.jpg" alt="Espiral" className="w-14 h-14 opacity-40" />
      </div>
      {/* Espiral arriba derecha */}
      <div className="absolute top-16 right-10 z-10">
        <img src="/images/espiral.jpg" alt="Espiral" className="w-14 h-14 opacity-40" />
      </div>
      {/* Rayita abajo derecha */}
      <div className="absolute bottom-16 right-10 z-10">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none"><path d="M0 6C15 0 15 12 30 6C45 0 45 12 60 6" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/></svg>
      </div>

      <div className="relative container mx-auto text-center z-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 text-black">
            Lleva tu estrategia de <span className="text-brand-700">moda</span> al siguiente nivel
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Diseña campañas personalizadas y exclusivas que mejoran la conexión con tus clientes.
          </p>
          <div className="flex justify-center items-center mb-12">
            <Button className="bg-brand-700 hover:bg-brand-800 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-none">
              Explorar
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Rayitas decorativas abajo */}
      <div className="flex justify-between items-center w-full max-w-2xl mx-auto mt-4">
        <svg width="50" height="10" viewBox="0 0 50 10" fill="none"><path d="M0 5C12.5 0 12.5 10 25 5C37.5 0 37.5 10 50 5" stroke="#8B5CF6" strokeWidth="1.2" fill="none"/></svg>
        <svg width="50" height="10" viewBox="0 0 50 10" fill="none"><path d="M0 5C12.5 0 12.5 10 25 5C37.5 0 37.5 10 50 5" stroke="#8B5CF6" strokeWidth="1.2" fill="none"/></svg>
      </div>
    </section>
  );
}; 