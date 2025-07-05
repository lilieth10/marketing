'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
import { useProductsStore } from '@/store/products.store';
import { useAuthStore } from '@/store/auth.store';
import { ArrowLeft } from 'lucide-react';

interface ProductForm {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  colors: string[];
  sizes: string[];
  materials: string[];
  images: string[];
}

interface AIProductAnalysis {
  marketPotential: number;
  suggestedPrice: number;
  trendingTags: string[];
  competitorAnalysis: string;
  recommendations: string[];
}

export default function PublishProductPage() {
  const router = useRouter();
  const { addProduct } = useProductsStore();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [analyzingWithAI, setAnalyzingWithAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIProductAnalysis | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    category: '',
    tags: [],
    colors: [],
    sizes: [],
    materials: [],
    images: []
  });

  const categories = [
    'Camisetas', 'Pantalones', 'Vestidos', 'Chaquetas', 'Accesorios', 
    'Zapatos', 'Ropa Interior', 'Deportiva', 'Formal', 'Casual'
  ];

  const availableTags = [
    'sostenible', 'vintage', 'moderno', 'clásico', 'urbano', 'bohemio',
    'minimalista', 'elegante', 'deportivo', 'cómodo', 'premium', 'único'
  ];

  const availableColors = [
    'Negro', 'Blanco', 'Gris', 'Azul', 'Rojo', 'Verde', 'Amarillo',
    'Rosa', 'Morado', 'Marrón', 'Naranja', 'Beige'
  ];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  const availableMaterials = [
    'Algodón', 'Poliéster', 'Lino', 'Seda', 'Lana', 'Denim', 
    'Cuero', 'Sintético', 'Orgánico', 'Reciclado'
  ];

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof ProductForm, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(item)
        ? (prev[field] as string[]).filter(i => i !== item)
        : [...(prev[field] as string[]), item]
    }));
  };

  // Convertir archivo a base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    // Limitar a 1 imagen
    if (formData.images.length >= 1) {
      alert('Solo puedes subir 1 imagen por producto en la demo.');
      return;
    }
    // Validar archivos
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} no es una imagen válida`);
        return false;
      }
      if (file.size > 150 * 1024) { // 150KB
        alert(`${file.name} es demasiado grande (max 150KB para la demo)`);
        return false;
      }
      return true;
    });
    if (validFiles.length === 0) return;
    // Convertir a base64 para persistencia
    const base64Images = await Promise.all(validFiles.map(fileToBase64));
    setImagePreviews(prev => [...prev, ...base64Images]);
    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...base64Images] 
    }));
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const handleAIAnalysis = () => {
    setAnalyzingWithAI(true);
    setModalOpen(true);
    
    setTimeout(() => {
      const analysis: AIProductAnalysis = {
        marketPotential: Math.floor(Math.random() * 40) + 60,
        suggestedPrice: formData.price * (0.9 + Math.random() * 0.4),
        trendingTags: availableTags.slice(0, 4),
        competitorAnalysis: 'Productos similares se venden entre $25-45. Tu propuesta está bien posicionada.',
        recommendations: [
          'Destaca los materiales sostenibles en la descripción',
          'Considera agregar más opciones de color',
          'El precio está competitivo para el mercado actual',
          'Tus tags están alineados con las tendencias'
        ]
      };
      setAiAnalysis(analysis);
      setAnalyzingWithAI(false);
    }, 2000);
  };

  const handlePublish = async () => {
    if (!user) {
      alert('Debes estar logueado para publicar');
      return;
    }
    if (!formData.name || !formData.description || !formData.category || formData.price <= 0) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    setPublishing(true);
    try {
      // Validar imágenes: solo strings
      const imageUrls = (formData.images.length > 0
        ? formData.images.filter(img => typeof img === 'string')
        : ['/images/placeholder1.png']);
      // Log para debug
      console.log('Publicando producto:', {
        ...formData,
        images: imageUrls
      });
      addProduct({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        tags: formData.tags,
        colors: formData.colors,
        sizes: formData.sizes,
        materials: formData.materials,
        images: imageUrls,
        designerId: user.id || 'designer-1'
      });
      setTimeout(() => {
        setPublishing(false);
        alert('¡Producto publicado exitosamente! 🎉\n\nTu producto ya aparece en:\n• El feed principal para todos los usuarios\n• Tu catálogo de productos\n• Las búsquedas por categoría');
        router.push('/dashboard/designer/products');
      }, 1500);
    } catch (error) {
      setPublishing(false);
      alert('Error al publicar el producto. Inténtalo de nuevo.');
      console.error('Error al publicar producto:', error);
    }
  };

  // --- Generador IA de descripciones ---
  const generateDescriptionAI = () => {
    const color = formData.colors[0] || 'un color único';
    const material = formData.materials[0] || 'material premium';
    const size = formData.sizes[0] || 'todas las tallas';
    const tag = formData.tags[0] || 'tendencia';
    const category = formData.category || 'prenda exclusiva';
    return `Descubre la nueva ${category} en ${color}, confeccionada en ${material} y disponible en ${size}. Ideal para quienes buscan ${tag} y comodidad. ¡Hazla tuya y destaca tu estilo!`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header con botón de volver */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Publicar Nuevo Producto</h1>
        <p className="text-gray-600">Crea y publica tu diseño en la plataforma. Aparecerá en el feed principal para todos los usuarios.</p>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Información básica</span>
            <span>Detalles y variantes</span>
            <span>Imágenes y publicación</span>
          </div>
        </div>
      </div>

      {/* Step 1: Información básica */}
      {step === 1 && (
        <Card className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Información Básica</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ej: Camiseta Gráfica Verano 2024"
              />
            </div>

            {/* Descripción IA mejorada */}
            <div className="mb-6">
              <label className="block font-semibold mb-1">Descripción (IA)</label>
              <textarea
                className="w-full border rounded p-2 min-h-[80px]"
                value={formData.description || generateDescriptionAI()}
                onChange={e => handleInputChange('description', e.target.value)}
                placeholder="La IA generará una descripción creativa..."
              />
              <Button
                type="button"
                className="mt-2"
                onClick={() => handleInputChange('description', generateDescriptionAI())}
              >Generar Descripción IA</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (USD) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="29.99"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                variant="primary" 
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.description || !formData.price || !formData.category}
              >
                Siguiente →
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Detalles y variantes */}
      {step === 2 && (
        <Card className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Detalles y Variantes</h2>
          
          <div className="space-y-8">
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tags (Selecciona los que apliquen)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleArrayToggle('tags', tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.tags.includes(tag)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Colores Disponibles
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {availableColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleArrayToggle('colors', color)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.colors.includes(color)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Tallas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tallas Disponibles
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleArrayToggle('sizes', size)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.sizes.includes(size)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Materiales */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Materiales
              </label>
              <div className="flex flex-wrap gap-2">
                {availableMaterials.map(material => (
                  <button
                    key={material}
                    type="button"
                    onClick={() => handleArrayToggle('materials', material)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.materials.includes(material)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(1)}>
                ← Anterior
              </Button>
              <Button variant="primary" onClick={() => setStep(3)}>
                Siguiente →
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Imágenes y publicación */}
      {step === 3 && (
        <Card className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Imágenes y Publicación</h2>
          
          <div className="space-y-8">
            {/* Upload de imágenes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Imágenes del Producto *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <div className="space-y-4">
                  <div className="text-4xl">📸</div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">Sube las imágenes de tu producto</p>
                    <p className="text-sm text-gray-600">PNG, JPG hasta 10MB cada una. Mínimo 3 imágenes.</p>
                  </div>
                  <input
                    type="file"
                    id="product-images"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="product-images"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
                  >
                    📁 Seleccionar Archivos
                  </label>
                  {formData.images.length > 0 && (
                    <p className="text-green-600 font-medium">
                      ✅ {formData.images.length} imágenes seleccionadas
                    </p>
                  )}
                </div>
              </div>

              {/* Vista previa de imágenes */}
              {imagePreviews.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Vista Previa</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          Imagen {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Vista Previa del Producto */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    {imagePreviews.length > 0 ? (
                      <img 
                        src={imagePreviews[0]} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400">📸</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">
                      {formData.name || 'Nombre del producto'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Categoría: {formData.category || 'Sin categoría'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {formData.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {formData.colors.length > 0 && (
                          <p className="text-xs text-gray-500">
                            Colores: {formData.colors.join(', ')}
                          </p>
                        )}
                        {formData.sizes.length > 0 && (
                          <p className="text-xs text-gray-500">
                            Tallas: {formData.sizes.join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${formData.price || '0.00'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de Analizar con IA */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Análisis con IA</h4>
                  <p className="text-sm text-gray-600">
                    Obtén sugerencias para optimizar tu producto antes de publicar
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={handleAIAnalysis}
                  disabled={!formData.name || !formData.category}
                >
                  🤖 Analizar con IA
                </Button>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(2)}>
                ← Anterior
              </Button>
              <div className="space-x-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    // Guardar como borrador
                    alert('Producto guardado como borrador 📝');
                    router.push('/dashboard/designer/products');
                  }}
                >
                  💾 Guardar Borrador
                </Button>
                <Button
                  variant="primary"
                  onClick={handlePublish}
                  disabled={!formData.name || !formData.description || !formData.category || publishing}
                >
                  {publishing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publicando...
                    </>
                  ) : (
                    '🚀 Publicar Producto'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Modal de análisis IA */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Análisis con IA de tu Producto"
      >
        <div className="space-y-6">
          {analyzingWithAI ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analizando tu producto con IA...</p>
            </div>
          ) : aiAnalysis ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{aiAnalysis.marketPotential}%</div>
                  <div className="text-sm text-gray-600">Potencial de Mercado</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">${aiAnalysis.suggestedPrice.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Precio Sugerido</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Análisis de Competencia</h4>
                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                  {aiAnalysis.competitorAnalysis}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recomendaciones de IA</h4>
                <div className="space-y-2">
                  {aiAnalysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-gray-600">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={() => {
                  handleInputChange('price', aiAnalysis.suggestedPrice);
                  setModalOpen(false);
                  alert('✨ Precio optimizado aplicado');
                }}>
                  Aplicar Sugerencias
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>

      {/* Editor visual mock */}
      {/*
        Este editor visual es solo una simulación (mock) para la maqueta.
        Aquí se puede integrar un editor real de imágenes/productos, por ejemplo:
        - react-easy-crop para recorte y zoom
        - fabric.js para edición avanzada
        - Integración con backend para procesamiento de imágenes
        - O un widget de personalización 3D
      */}
      <Card className="mb-8 p-4">
        <h2 className="text-lg font-bold mb-2">Editor Visual de Prenda (Mock)</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Preview de imagen */}
          <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border">
            {imagePreviews[0] ? (
              <img src={imagePreviews[0]} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400">Sin imagen</span>
            )}
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Selector de color */}
            <div>
              <label className="block font-semibold mb-1">Color</label>
              <select
                className="w-full border rounded p-2"
                value={formData.colors[0] || ''}
                onChange={e => handleInputChange('colors', [e.target.value])}
              >
                <option value="">Selecciona un color</option>
                {availableColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            {/* Selector de talle */}
            <div>
              <label className="block font-semibold mb-1">Talle</label>
              <select
                className="w-full border rounded p-2"
                value={formData.sizes[0] || ''}
                onChange={e => handleInputChange('sizes', [e.target.value])}
              >
                <option value="">Selecciona un talle</option>
                {availableSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            {/* Selector de material */}
            <div>
              <label className="block font-semibold mb-1">Material</label>
              <select
                className="w-full border rounded p-2"
                value={formData.materials[0] || ''}
                onChange={e => handleInputChange('materials', [e.target.value])}
              >
                <option value="">Selecciona un material</option>
                {availableMaterials.map(mat => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 