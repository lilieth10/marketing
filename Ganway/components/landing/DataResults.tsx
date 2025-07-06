export default function DataResultsSection() {
  const dataFeatures = [
    {
      icon: "📊",
      title: "Google Analytics",
      description: "Mide el rendimiento de tus campañas con datos detallados.",
      action: "Saber más",
    },
    {
      icon: "📧",
      title: "Mailchimp",
      description: "Automatiza y segmenta tus campañas de email marketing.",
      action: "Saber más",
    },
    {
      icon: "📱",
      title: "Meta Ads Manager",
      description: "Optimiza la publicidad en Instagram y Facebook.",
      action: "Saber más",
    },
    {
      icon: "🛒",
      title: "Shopify",
      description: "Sincroniza tu inventario y gestiona pedidos con facilidad.",
      action: "Saber más",
    },
  ]

  const salesData = [
    { month: "Ene", value: 180 },
    { month: "Feb", value: 220 },
    { month: "Mar", value: 280 },
    { month: "Abr", value: 240 },
    { month: "May", value: 160 },
    { month: "Jun", value: 190 },
    { month: "Jul", value: 350 },
    { month: "Ago", value: 280 },
    { month: "Sep", value: 320 },
    { month: "Oct", value: 260 },
    { month: "Nov", value: 380 },
    { month: "Dic", value: 300 },
  ]

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Data Features */}
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Conecta datos, creatividad y resultados
            </h2>
            <p className="text-gray-600 text-lg">
              Nuestra plataforma se integra con las mejores herramientas para maximizar el impacto de tus campañas:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {dataFeatures.map((feature, index) => (
                <div key={index} className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                  <div className="w-8 h-8 bg-purple-600 rounded mb-3"></div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">{feature.description}</p>
                  <button className="text-xs text-purple-600 font-medium">{feature.action}</button>
                </div>
              ))}
            </div>
          </div>
          {/* Right Side - Analytics */}
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Descubre el impacto de tus estrategias
            </h2>
            <p className="text-gray-600 text-lg">
              Evalúa interacciones en redes sociales, segmentación de clientes y comportamientos de compra.
            </p>
            {/* Chart with Grid and Data Table */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 text-lg">Total de ventas</h3>
                <div className="text-sm text-gray-500">Tabla</div>
                <div className="flex space-x-4 text-sm bg-gray-100 rounded-lg px-3 py-1">
                  <span className="bg-gray-900 text-white px-2 py-1 rounded text-xs">Año</span>
                  <span className="text-gray-600 px-2 py-1 text-xs">Mes</span>
                </div>
              </div>
              {/* Chart with grid lines */}
              <div className="relative h-64 mb-6">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
                  <span>400</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="border-t border-gray-100"></div>
                  ))}
                </div>
                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-between space-x-1">
                  {salesData.map((data, index) => (
                    <div
                      key={index}
                      className="bg-purple-600 w-8 rounded-t flex-1 max-w-8"
                      style={{ height: `${(data.value / 400) * 100}%` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-500 mb-4">
                {salesData.map((data) => (
                  <span key={data.month}>{data.month}</span>
                ))}
              </div>

              {/* Data Table - EXACTLY like Figma */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-6 gap-2 text-xs">
                  {salesData.slice(0, 6).map((data) => (
                    <div key={data.month} className="flex justify-between">
                      <span className="text-gray-600">{data.month}</span>
                      <span className="font-medium">{data.value}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-2 text-xs mt-2">
                  {salesData.slice(6, 12).map((data) => (
                    <div key={data.month} className="flex justify-between">
                      <span className="text-gray-600">{data.month}</span>
                      <span className="font-medium">{data.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
