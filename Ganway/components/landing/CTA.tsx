import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold leading-tight">Haz de tu marca una tendencia</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            La moda evoluciona, y tu también puedes hacerlo. Únete a nuestra plataforma para crear campañas únicas que
            posicionen tu marca en la mente del sector.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg">
            Comenzar ahora
          </Button>
        </div>
      </div>
    </section>
  )
}
