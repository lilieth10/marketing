"use client"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative">
          {/* Decorative Elements - Exactly as in Figma with PURPLE color */}
          {/* Top wavy lines - PURPLE */}
          <svg className="absolute -top-12 left-1/4 w-32 h-8 text-purple-300" viewBox="0 0 128 32" fill="none">
            <path
              d="M0 16C16 6 32 26 48 16C64 6 80 26 96 16C112 6 128 26 128 16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 20C16 10 32 30 48 20C64 10 80 30 96 20C112 10 128 30 128 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Left spiral - PURPLE */}
          <div className="absolute top-16 left-8 w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full text-purple-300">
              <path
                d="M40 10C58 10 70 22 70 40C70 58 58 70 40 70C22 70 10 58 10 40C10 30 15 22 22 17C29 12 37 10 40 10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M40 18C50 18 58 26 58 36C58 46 50 54 40 54C30 54 22 46 22 36C22 31 25 27 29 25"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          {/* Right spiral - PURPLE */}
          <div className="absolute top-16 right-8 w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full text-purple-300">
              <path
                d="M40 10C58 10 70 22 70 40C70 58 58 70 40 70C22 70 10 58 10 40C10 30 15 22 22 17C29 12 37 10 40 10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M40 18C50 18 58 26 58 36C58 46 50 54 40 54C30 54 22 46 22 36C22 31 25 27 29 25"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          {/* Bottom wavy lines - PURPLE */}
          <svg className="absolute bottom-16 right-1/4 w-32 h-8 text-purple-300" viewBox="0 0 128 32" fill="none">
            <path
              d="M0 16C16 6 32 26 48 16C64 6 80 26 96 16C112 6 128 26 128 16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 20C16 10 32 30 48 20C64 10 80 30 96 20C112 10 128 30 128 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Lleva tu estrategia de moda
            <br />
            al siguiente nivel
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Diseña campañas personalizadas y exclusivas que mejoren la conexión con tus clientes.
          </p>

          <Link
            href="/auth/register"
            className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors text-lg mb-16"
          >
            Explorar
          </Link>

          {/* Fashion Images Grid - Exactly as in Figma */}
          <div className="relative max-w-5xl mx-auto">
            {/* Keywords on the LEFT side - NO CARDS, just text */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-40 space-y-6 text-left">
              <div className="space-y-2">
                <div className="text-gray-900 font-medium italic">Personalización</div>
                <div className="text-gray-900 font-medium italic">Exclusividad</div>
                <div className="text-gray-900 font-medium italic">Innovación</div>
                <div className="w-20 h-1 bg-gray-900 mt-4"></div>
              </div>
            </div>

            {/* Fashion Images - Exact layout from Figma */}
            <div className="grid grid-cols-5 gap-4 items-end">
              <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=200"
                  alt="Fashion 1"
                  width={200}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=400&width=220"
                  alt="Fashion 2"
                  width={220}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=450&width=240"
                  alt="Fashion 3"
                  width={240}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-56 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=350&width=210"
                  alt="Fashion 4"
                  width={210}
                  height={350}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-60 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=380&width=200"
                  alt="Fashion 5"
                  width={200}
                  height={380}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Second row */}
            <div className="grid grid-cols-3 gap-4 mt-4 max-w-3xl mx-auto">
              <div className="h-40 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=250&width=180"
                  alt="Fashion 6"
                  width={180}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=200"
                  alt="Fashion 7"
                  width={200}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-44 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=280&width=190"
                  alt="Fashion 8"
                  width={190}
                  height={280}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Keywords on the RIGHT side - NO CARDS, just text */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-40 space-y-6 text-right">
              <div className="space-y-2">
                <div className="text-gray-900 font-medium italic">Fidelización</div>
                <div className="text-gray-900 font-medium italic">Análisis</div>
                <div className="text-gray-900 font-medium italic">Creatividad</div>
                <div className="w-20 h-1 bg-gray-900 mt-4 ml-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
