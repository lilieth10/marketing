"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface LuxuryHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export function LuxuryHistoryModal({ isOpen, onClose, productName }: LuxuryHistoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6 bg-white rounded-2xl shadow-lg">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Historia de Lujo: {productName}</DialogTitle>
          <DialogDescription className="text-gray-600">
            Descubre la inspiración, el proceso artesanal y el legado detrás de esta pieza única.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
              Inspiración
            </h3>
            <p className="text-sm">
              Este collar de perlas fue inspirado en la elegancia atemporal de las joyas de la realeza europea del siglo
              XVIII, fusionando la tradición con un toque moderno y minimalista.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
              Proceso Artesanal
            </h3>
            <p className="text-sm">
              Cada perla es seleccionada a mano por su lustre y forma perfecta. El cierre de plata es forjado por
              artesanos expertos, garantizando durabilidad y un acabado impecable. Un proceso que toma más de 20 horas
              por pieza.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
              Legado y Exclusividad
            </h3>
            <p className="text-sm">
              Parte de nuestra colección "Heritage", este collar es una edición limitada que celebra la maestría y la
              belleza perdurable. Cada pieza viene con un certificado de autenticidad numerado.
            </p>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-sm font-medium rounded-lg mt-6"
        >
          Cerrar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
