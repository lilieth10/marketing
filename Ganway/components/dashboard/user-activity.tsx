import { Activity } from "lucide-react"

export function UserActivity() {
  const activityData = [
    { label: "Publicaciones", value: 12, color: "text-gray-900" },
    { label: "Me gusta recibidos", value: 847, color: "text-red-500" },
    { label: "Seguidores", value: 234, color: "text-blue-500" },
    { label: "Eventos asistidos", value: 8, color: "text-green-500" },
  ]

  const trendsData = [
    { hashtag: "#MinimalLuxury", change: "+24%" },
    { hashtag: "#SustainableFashion", change: "-15%" },
    { hashtag: "#PowerDressing", change: "+10%" },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      {/* Tu Actividad */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Tu Actividad</h3>
        </div>
        <div className="space-y-3">
          {activityData.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className={`text-sm font-medium ${item.color}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tendencias IA */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Tendencias IA</h3>
        </div>
        <div className="space-y-3">
          {trendsData.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{item.hashtag}</span>
              <span
                className={`text-sm font-medium ${item.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
