import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-600 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 border border-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">Ganway</span>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Sobre nosotros
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Herramientas
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Contacto
            </Link>
          </nav>
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 hover:border-purple-600 hover:text-purple-600 bg-transparent"
              >
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
