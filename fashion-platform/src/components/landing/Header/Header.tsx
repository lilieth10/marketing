'use client';

import React from 'react';
import { Button } from "@/components/ui/Button";
import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Solo logo */}
          <div className="flex items-center">
            <img src="/images/ganway.jpg" alt="Ganway Logo" className="w-10 h-10 object-contain" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-brand-900 hover:text-brand-600 font-medium transition-colors duration-200">
              Inicio
            </a>
            <a href="#caracteristicas" className="text-brand-900 hover:text-brand-600 font-medium transition-colors duration-200">
              Características
            </a>
            <a href="#herramientas" className="text-brand-900 hover:text-brand-600 font-medium transition-colors duration-200">
              Herramientas
            </a>
            <a href="#precios" className="text-brand-900 hover:text-brand-600 font-medium transition-colors duration-200">
              Precios
            </a>
            <a href="#contacto" className="text-brand-900 hover:text-brand-600 font-medium transition-colors duration-200">
              Contacto
            </a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/auth/login">
              <Button className="bg-white border border-brand-700 text-brand-700 hover:bg-brand-50 px-5 py-2 font-semibold rounded-full transition-all duration-300 shadow-none">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-brand-700 hover:bg-brand-800 text-white px-5 py-2 font-semibold rounded-full transition-all duration-300 shadow-none">
                Registrarse
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#inicio" className="text-brand-900 hover:text-brand-600 font-medium transition-colors py-2">
                Inicio
              </a>
              <a href="#caracteristicas" className="text-brand-900 hover:text-brand-600 font-medium transition-colors py-2">
                Características
              </a>
              <a href="#herramientas" className="text-brand-900 hover:text-brand-600 font-medium transition-colors py-2">
                Herramientas
              </a>
              <a href="#precios" className="text-brand-900 hover:text-brand-600 font-medium transition-colors py-2">
                Precios
              </a>
              <a href="#contacto" className="text-brand-900 hover:text-brand-600 font-medium transition-colors py-2">
                Contacto
              </a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-brand-100 mt-4">
                <Link href="/auth/login">
                  <Button className="w-full bg-transparent hover:bg-brand-50 text-brand-700 border border-brand-200 font-semibold rounded-full transition-all duration-300">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-full shadow-lg transition-all duration-300">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}; 