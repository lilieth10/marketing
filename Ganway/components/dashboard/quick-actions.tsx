"use client"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      name: "Todos",
      icon: (
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 border border-white rounded-sm"></div>
        </div>
      ),
      image: null,
    },
    {
      name: "Blusas",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Vestidos",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jeans",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Blazers",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Shorts",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Tendencias de verano",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
        <button className="text-purple-600 text-sm font-medium flex items-center">
          Ver todo <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-24 text-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-2">
              {action.image ? (
                <Image
                  src={action.image || "/placeholder.svg"}
                  alt={action.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              ) : (
                action.icon
              )}
            </div>
            <p className="text-xs font-medium text-gray-700">{action.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
