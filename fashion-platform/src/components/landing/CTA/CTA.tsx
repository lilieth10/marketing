'use client';

import React from 'react';
import { Button } from "@/components/ui/Button";
import { ArrowRight } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Haz de tu marca una tendencia
          </h2>
          <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto">
            La moda evoluciona y la tecnología puede brindarte,
            únete a nuestra plataforma para crear estrategias que marquen la diferencia en el mercado.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300">
            Comenzar ahora
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}; 