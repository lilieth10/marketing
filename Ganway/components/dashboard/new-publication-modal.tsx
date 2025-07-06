"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, Tag, Sparkles } from "lucide-react"
import { usePostStore } from "@/store/postStore"
import Swal from "sweetalert2"
import { useAuth } from "@/hooks/useAuth"

interface NewPublicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewPublicationModal({ isOpen, onClose }: NewPublicationModalProps) {
  const { addPost } = usePostStore()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    tags: [] as string[],
  })
  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Depuración: mostrar el valor de la imagen
    console.log('Valor de imagen:', formData.image)

    if (!formData.title || !formData.description || !formData.image) {
      let errorMsg = "Por favor, completa todos los campos obligatorios."
      if (!formData.image) errorMsg = "Debes subir una imagen válida."
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: errorMsg,
        confirmButtonColor: "#8B5CF6",
      }).then(() => {
        setFormData({
          title: "",
          description: "",
          image: "",
          category: "",
          tags: [],
        })
        setCurrentTag("")
        onClose()
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      addPost({
        type: "photo",
        title: formData.title,
        description: formData.description,
        image: formData.image,
        user: {
          name: user?.name || "Alexia Rivera",
          username: user?.email || "@alexiarivera",
          avatar: user?.avatar || "/images/dashboard/user-alexia.jpg",
        },
        category: formData.category,
        height: 400,
        userId: user?.id || "1",
      })

      Swal.fire({
        icon: "success",
        title: "¡Publicación creada!",
        text: "Tu publicación ha sido añadida al feed exitosamente.",
        confirmButtonColor: "#8B5CF6",
        timer: 3000,
        showConfirmButton: false,
      })

      // Reset form
      setFormData({
        title: "",
        description: "",
        image: "",
        category: "",
        tags: [],
      })
      setCurrentTag("")
      onClose()
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear la publicación. Inténtalo de nuevo.",
        confirmButtonColor: "#8B5CF6",
      }).then(() => {
        setFormData({
          title: "",
          description: "",
          image: "",
          category: "",
          tags: [],
        })
        setCurrentTag("")
        onClose()
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="new-publication-description">
        <span id="new-publication-description" className="sr-only">Formulario para crear una nueva publicación. Todos los campos marcados con * son obligatorios.</span>
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold text-gray-900">
            <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
            Nueva Publicación
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Preview */}
          {formData.image && (
            <Card className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={formData.image || "/placeholder.svg"}
                  alt="Vista previa"
                  fill
                  className="object-cover"
                  onError={() => {
                    setFormData((prev) => ({ ...prev, image: "" }))
                  }}
                />
              </div>
            </Card>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Título *
            </Label>
            <Input
              id="title"
              placeholder="Ej: Mi nuevo look favorito"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full"
              maxLength={100}
            />
            <p className="text-xs text-gray-500">{formData.title.length}/100 caracteres</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Descripción *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe tu publicación..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full min-h-[100px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500">{formData.description.length}/500 caracteres</p>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image-upload" className="text-sm font-medium text-gray-700">
              Imagen *
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Categoría
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ej: Streetwear, Formal, Casual" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Streetwear">Streetwear</SelectItem>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
                <SelectItem value="Deportivo">Deportivo</SelectItem>
                <SelectItem value="Elegante">Elegante</SelectItem>
                <SelectItem value="Vintage">Vintage</SelectItem>
                <SelectItem value="Bohemio">Bohemio</SelectItem>
                <SelectItem value="Minimalista">Minimalista</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
              Etiquetas
            </Label>
            <div className="flex space-x-2">
              <Input
                id="tags"
                placeholder="Añadir etiqueta..."
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button type="button" onClick={handleAddTag} variant="outline" size="icon">
                <Tag className="w-4 h-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>#{tag}</span>
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Publicando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Publicar
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
