"use client"
import { Palette, Shield, Brain, Users, BarChart3, Sparkles } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Palette,
      title: "Personalización a medida",
      description: "Cada cliente es único. Crea campañas que reflejen su estilo personal.",
    },
    {
      icon: Shield,
      title: "Fidelización garantizada",
      description: "Ofrece experiencias exclusivas que mantengan a tus clientes comprometidos.",
    },
    {
      icon: Brain,
      title: "Análisis predictivo",
      description: "Anticipa tendencias y mantente siempre un paso adelante.",
    },
    {
      icon: Users,
      title: "Colaboración creativa",
      description: "Conecta con diseñadores, artistas y otros profesionales del entorno.",
    },
    {
      icon: BarChart3,
      title: "Gestión simplificada",
      description: "Desde campañas hasta colecciones, administra todo en un solo lugar.",
    },
    {
      icon: Sparkles,
      title: "Mayor visibilidad",
      description: "Mejora tu alcance con herramientas que optimizan tu presencia digital.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para destacar en moda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestra plataforma te ofrece un conjunto completo de herramientas diseñadas para transformar la forma en que
            trabajas con la moda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:bg-gray-50 p-6 rounded-xl transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <feature.icon size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
