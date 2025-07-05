'use client';

import React from 'react';
import { Sparkles, Heart, Instagram, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/Button";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Newsletter Subscription */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ganway
                </h1>
                <p className="text-xs text-gray-400">Tu plataforma de moda inteligente</p>
              </div>
            </div>
            
            {/* Newsletter Subscription */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Mantente al día</h3>
              <p className="text-gray-300 text-sm">
                Suscríbete para recibir las últimas tendencias y novedades.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transform hover:scale-105 transition-all duration-300">
                  Suscribirse
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Producto */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Producto</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Características</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Integraciones</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">API</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Seguridad</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Precios</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Empresa</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Sobre nosotros</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Carreras</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Prensa</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Contacto</a></li>
            </ul>
          </div>

          {/* Soporte */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Soporte</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Centro de ayuda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Documentación</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Comunidad</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Estado del servicio</a></li>
              <li>
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Soporte 24/7</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-gray-400 text-sm">
                © 2024 Ganway. Todos los derechos reservados.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200">
                  Términos de uso
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200">
                  Política de privacidad
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200">
                  Cookies
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Hecho con</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>en España</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 