export default function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "Crea",
      description: "Diseña campañas únicas usando nuestras plantillas inteligentes y herramientas de personalización.",
    },
    {
      number: "2",
      title: "Monitorea",
      description: "Analiza el rendimiento en tiempo real con métricas claras y accionables.",
    },
    {
      number: "3",
      title: "Optimiza",
      description: "Ajusta tus estrategias para maximizar resultados y mejorar tu audiencia.",
    },
  ]

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">De la idea al impacto, en tres pasos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Una experiencia fluida que lleva tu campaña al siguiente nivel.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white border border-gray-200 shadow-sm rounded-lg p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-lg flex items-center justify-center mx-auto text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
