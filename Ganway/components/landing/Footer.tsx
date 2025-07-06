import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const footerSections = [
    {
      title: "Producto",
      links: ["Características", "Precios", "Integraciones", "API"],
    },
    {
      title: "Empresa",
      links: ["Sobre nosotros", "Blog", "Carreras", "Prensa"],
    },
    {
      title: "Recursos",
      links: ["Documentación", "Tutoriales", "Webinars", "Comunidad"],
    },
  ]

  return (
    <footer className="w-full bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 border border-white rounded-sm"></div>
              </div>
              <span className="text-xl font-semibold">Ganway</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La plataforma completa para estrategias de moda exitosas.
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <span className="text-xs">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <span className="text-xs">in</span>
              </div>
            </div>
          </div>
          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-white text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Suscríbete</h3>
            <p className="text-gray-400 text-sm">Mantente al día con las últimas noticias y actualizaciones.</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-600"
              />
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de privacidad
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos de servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
