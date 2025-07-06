"use client"
import { Crown, ShoppingBag, Megaphone } from "lucide-react"

export function Roles() {
  const roles = [
    {
      icon: Crown,
      title: "Marcas y diseñadores",
      description:
        "Impulsa tu marca con campañas inteligentes diseñadas para maximizar el alcance y engagement de tus productos.",
    },
    {
      icon: ShoppingBag,
      title: "Compradores y clientes",
      description: "Descubre productos únicos y ofertas exclusivas que se adaptan perfectamente a tu estilo personal.",
    },
    {
      icon: Megaphone,
      title: "Agencias de marketing digital",
      description: "Herramientas avanzadas para gestionar múltiples campañas y clientes con resultados medibles.",
    },
  ]

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Para todos los roles en la industria de la moda</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nuestra plataforma está diseñada para atender las necesidades específicas de cada tipo de usuario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <role.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{role.title}</h3>
              <p className="text-gray-300 leading-relaxed">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
