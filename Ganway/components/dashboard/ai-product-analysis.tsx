"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProductData } from "@/store/postStore" // Import ProductData type

interface AIProductAnalysisProps {
  metrics: ProductData["styleMetrics"] // Use the specific metrics from ProductData
  onOpenLuxuryHistory: () => void
}

export function AIProductAnalysis({ metrics, onOpenLuxuryHistory }: AIProductAnalysisProps) {
  return (
    <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Análisis de Estilo IA</h3>
      </div>
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex justify-between items-center text-sm text-gray-700 mb-1">
              <span>{metric.label}</span>
              <span className="font-medium text-purple-600">{metric.value}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${metric.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-purple-100">
        <Button
          variant="ghost"
          className="w-full justify-start px-0 text-lg font-semibold text-gray-900 hover:bg-transparent hover:underline"
          onClick={onOpenLuxuryHistory}
        >
          Historia de Lujo
        </Button>
        <p className="text-sm text-gray-600">Descubre la inspiración detrás de esta pieza.</p>
      </div>
    </div>
  )
}
