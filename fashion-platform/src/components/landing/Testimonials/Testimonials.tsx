'use client';

import React from 'react';
import { Card } from "@/components/ui/Card";

export const Testimonials = () => {
  return (
    <section className="container mx-auto py-20 px-6 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side - Conecta datos, creatividad y resultados */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Conecta datos, creatividad y resultados</h2>
          <p className="text-lg text-gray-600 mb-8">
            Nuestra plataforma integra con las mejores herramientas del mercado para ofrecerte una experiencia
            completa.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Google Analytics</h4>
              <p className="text-xs text-gray-500">Mide el rendimiento de tus campañas con datos detallados</p>
              <p className="text-xs text-purple-600 font-medium">Saber más</p>
            </Card>
            
            <Card className="p-4 text-center space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .02C5.373.02 0 5.393 0 12.02s5.373 12 12 12 12-5.373 12-12S18.627.02 12 .02zM7.99 17.535a.624.624 0 11-1.248 0 .624.624 0 011.248 0zm8.02 0a.624.624 0 11-1.248 0 .624.624 0 011.248 0z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Mailchimp</h4>
              <p className="text-xs text-gray-500">Automatiza y segmenta tus campañas de email marketing</p>
              <p className="text-xs text-purple-600 font-medium">Saber más</p>
            </Card>
            
            <Card className="p-4 text-center space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.4 2.1C2.4 2.1 0 4.6 0 7.5v9c0 2.9 2.4 5.4 5.4 5.4h13.2c2.9 0 5.4-2.4 5.4-5.4v-9c0-2.9-2.4-5.4-5.4-5.4H5.4zM12 6.9c2.8 0 5.1 2.3 5.1 5.1s-2.3 5.1-5.1 5.1-5.1-2.3-5.1-5.1S9.2 6.9 12 6.9z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Hootsuite</h4>
              <p className="text-xs text-gray-500">Gestiona todas tus redes sociales desde un solo lugar</p>
              <p className="text-xs text-purple-600 font-medium">Saber más</p>
            </Card>
            
            <Card className="p-4 text-center space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.724 2.624c-1.816-.398-3.768-.398-5.584 0-1.816.398-3.264 1.266-4.32 2.592C4.764 6.542 4.236 8.026 4.236 9.6c0 1.574.528 3.058 1.584 4.384 1.056 1.326 2.504 2.194 4.32 2.592.908.199 1.848.299 2.82.299s1.912-.1 2.82-.299c1.816-.398 3.264-1.266 4.32-2.592C21.156 12.658 21.684 11.174 21.684 9.6s-.528-3.058-1.584-4.384c-1.056-1.326-2.504-2.194-4.32-2.592h-.056z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Shopify</h4>
              <p className="text-xs text-gray-500">Optimiza tu tienda online y aumenta las conversiones</p>
              <p className="text-xs text-purple-600 font-medium">Saber más</p>
            </Card>
          </div>
        </div>

        {/* Right Side - Descubre el impacto de tus estrategias (con gráfica) */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Descubre el impacto de tus estrategias</h2>
          <p className="text-lg text-gray-600 mb-8">
            Evalúa interacciones en redes sociales, segmentación de clientes y comportamientos de compra.
          </p>
          {/* Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total de ventas</h3>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <span>Año</span>
                <span>Mes</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <div className="relative">
              <div className="flex">
                <div className="flex flex-col justify-between h-48 text-xs text-gray-500 pr-2">
                  <span>500</span>
                  <span>400</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>
                <div className="flex-1 h-48 flex items-end justify-around space-x-1 border-l border-b border-gray-200">
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "60px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Ene</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "80px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Feb</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "120px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Mar</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "100px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Abr</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "140px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">May</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "90px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Jun</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "110px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Jul</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "95px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Ago</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "130px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Sep</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "115px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Oct</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "125px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Nov</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 bg-purple-600 rounded-t" style={{ height: "105px" }}></div>
                    <span className="text-xs text-gray-600 mt-1">Dic</span>
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