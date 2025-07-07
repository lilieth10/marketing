"use client"

import { ChevronRight, Calendar, MapPin, Users, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EventDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Eventos</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Perfil del evento</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="relative">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80"
                  alt="La Magia de la Semana de la Moda de París"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">EVENTO DE MODA</span>
                  </div>
                  <h1 className="text-3xl font-bold">
                    La Magia de <span className="text-white">la Semana de la Moda de París</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Resumen */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen</h2>
                <p className="text-gray-700 leading-relaxed">
                  La Semana de la Moda de París 2023 finalmente ha llegado con su esplendor y creatividad. Considerada
                  un momento como forma festiva, Theotime Chaumette y Gretchen Whitman por la influencia, el impacto de
                  la atención de los medios y la industria de la moda. Este evento reúne a los mejores diseñadores,
                  modelos y celebridades de la moda mundial.
                </p>
              </section>

              {/* Convocatoria Masiva y Expectación */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Convocatoria Masiva y Expectación</h2>
                <p className="text-gray-700 leading-relaxed">
                  La convocatoria fue impresionante, con miles de asistentes que abarrotaron las calles de París. Desde
                  fashionistas hasta influencers, todos querían ser parte de este evento icónico. Las redes sociales se
                  inundaron con imágenes y comentarios, creando un buzz mediático que se extendió mucho más allá de la
                  semana.
                </p>
              </section>

              {/* Marcas que Marcan Tendencia */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Marcas que Marcan Tendencia</h2>
                <p className="text-gray-700 leading-relaxed">
                  Las principales marcas de moda, como Chanel, Dior y Louis Vuitton, presentaron sus últimas
                  colecciones, dejando a todos boquiabiertos. Cada pasarela fue un espectáculo visual, mostrando no solo
                  ropa, sino también arte y cultura. Estas casas de moda continúan estableciendo el estándar de la
                  industria, innovando con cada temporada.
                </p>
              </section>

              {/* Tendencias que Definirán el Futuro */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tendencias que Definirán el Futuro</h2>
                <p className="text-gray-700 leading-relaxed">
                  Entre las tendencias destacadas, se vieron colores vibrantes, estampados audaces y una mezcla de
                  estilos vintage y modernos. Los diseñadores jugaron con texturas y siluetas, creando piezas únicas que
                  seguramente influirán en las próximas temporadas. La sostenibilidad también fue un tema recurrente,
                  con varias marcas presentando colecciones eco-amigables.
                </p>
              </section>

              {/* Celebridades y Estilo Personal */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Celebridades y Estilo Personal</h2>
                <p className="text-gray-700 leading-relaxed">
                  Las celebridades no solo asistieron, sino que también se convirtieron en verdaderas íconos de estilo.
                  Cada una aportó su personalidad a través de sus elecciones de vestuario, desde looks clásicos hasta
                  arriesgadas propuestas, convirtiendo cada aparición en una forma de expresión, reflejando la
                  diversidad y la individualidad de cada asistente.
                </p>
              </section>

              {/* Un Evento que Inspira */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Un Evento que Inspira</h2>
                <p className="text-gray-700 leading-relaxed">
                  La Semana de la Moda de París 2023 no solo fue un desfile de moda, sino una celebración de la
                  creatividad y la innovación. Este evento inspira a diseñadores y amantes de la moda a seguir
                  explorando y empujando los límites de lo que es posible. Sin duda, algo que huella importante en la
                  historia de la moda.
                </p>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Forma parte de Venrama Card */}
            <div className="bg-teal-400 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Forma parte de Venrama</h3>
              <p className="text-sm mb-4 opacity-90">Te invitamos a nuestros eventos</p>
              <p className="text-xs mb-4 opacity-80">
                Únete a nuestro equipo y accede a eventos exclusivos, networking y oportunidades únicas en el mundo de
                la moda.
              </p>
              <Button className="bg-white text-teal-400 hover:bg-gray-100 font-medium">Únete ahora</Button>
            </div>

            {/* Social Media Card */}
            <div className="bg-teal-400 rounded-lg p-4">
              <p className="text-white text-sm mb-3">Síguenos</p>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-pink-500 rounded"></div>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-700 rounded"></div>
                </div>
              </div>
            </div>

            {/* En este evento */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">En este evento</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Resumen</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Convocatoria Masiva y Expectación</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Marcas que Marcan Tendencia</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Tendencias que Definirán el Futuro</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Share2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Celebridades y Estilo Personal</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Un Evento que Inspira</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eventos relacionados */}
      <div className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Eventos relacionados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80"
                alt="Tendencias de moda"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-purple-600 font-medium">Desfile de primavera</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Tendencias de moda
              </h3>
              <p className="text-sm text-gray-500">19 de octubre • Lectura de 10 minutos</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80"
                alt="Estilos de calle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-purple-600 font-medium">Colección de verano</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Estilos de calle
              </h3>
              <p className="text-sm text-gray-500">19 de octubre • Lectura de 10 minutos</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80"
                alt="Moda sostenible"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-purple-600 font-medium">Tendencias de otoño</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Moda sostenible
              </h3>
              <p className="text-sm text-gray-500">19 de octubre • Lectura de 10 minutos</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80"
                alt="Estilo minimalista"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-purple-600 font-medium">Eventos de gala</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Estilo minimalista
              </h3>
              <p className="text-sm text-gray-500">19 de octubre • Lectura de 10 minutos</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80"
                alt="Moda vintage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-purple-600 font-medium">Tendencias de invierno</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Moda vintage
              </h3>
              <p className="text-sm text-gray-500">19 de octubre • Lectura de 10 minutos</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=400&q=80"
                alt="Estilo bohemio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-purple-600 font-medium">Festival de moda</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Estilo bohemio
              </h3>
              <p className="text-sm text-gray-500">19 de octubre • Lectura de 10 minutos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
