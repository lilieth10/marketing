"use client"
import { Check } from "lucide-react"

export function Technology() {
  const features = [
    "Personalización avanzada",
    "Análisis en tiempo real",
    "Optimización de recursos",
    "Diferenciación de marca",
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Tu creatividad, nuestra tecnología</h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nuestra plataforma SaaS está diseñada específicamente para marcas de moda que buscan destacar en un
              mercado competitivo. Usando inteligencia de negocios y análisis de datos, te permite crear campañas
              sociales personalizadas y exclusivas para conectar profundamente con tus clientes y ofrecerles prendas
              únicas que fidelicen y enamoren.
            </p>

            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Empezar ahora
            </button>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-purple-600 text-white p-6 rounded-xl flex items-center space-x-4">
                <Check size={20} className="text-white flex-shrink-0" />
                <span className="font-semibold">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
