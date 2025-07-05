'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Search, Filter, Grid, List, Trash2, Edit3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DesignerProducts } from '@/components/designer/DesignerProducts';
import { useProductsStore } from '@/store/products.store';

type FilterType = 'todos' | 'activos' | 'borradores' | 'agotados';

export default function DesignerProductsPage() {
  const router = useRouter();
  const { products } = useProductsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('todos');

  // Función para obtener estado del producto si no tiene status
  const getProductStatus = (product: any) => {
    if (product.status) return product.status;
    
    // Generar status basado en ID para consistencia
    const id = parseInt(product.id) || 0;
    if (id % 4 === 0) return 'agotados';
    if (id % 3 === 0) return 'borradores';
    return 'activos';
  };

  // Productos con status normalizado
  const productsWithStatus = useMemo(() => {
    return products.map(product => ({
      ...product,
      status: getProductStatus(product)
    }));
  }, [products]);

  // Filtrar productos basado en el filtro activo y término de búsqueda
  const filteredProducts = useMemo(() => {
    let filtered = productsWithStatus;

    // Aplicar filtro por estado
    if (filter !== 'todos') {
      filtered = filtered.filter(product => product.status === filter);
    }

    // Aplicar filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [productsWithStatus, filter, searchTerm]);

  // Calcular conteos correctos
  const productCounts = useMemo(() => {
    const counts = {
      todos: productsWithStatus.length,
      activos: productsWithStatus.filter(p => p.status === 'activos').length,
      borradores: productsWithStatus.filter(p => p.status === 'borradores').length,
      agotados: productsWithStatus.filter(p => p.status === 'agotados').length
    };
    return counts;
  }, [productsWithStatus]);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header con botón de volver */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Volver</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Productos 🛍️</h1>
          <p className="text-gray-600">Gestiona tus productos con análisis IA avanzado</p>
        </div>
      </div>

      {/* Stats Cards Corregidas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Productos</p>
              <p className="text-2xl font-bold text-blue-900">{productCounts.todos}</p>
            </div>
            <div className="p-2 bg-blue-200 rounded-full">
              <span className="text-lg">📦</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Activos</p>
              <p className="text-2xl font-bold text-green-900">{productCounts.activos}</p>
            </div>
            <div className="p-2 bg-green-200 rounded-full">
              <span className="text-lg">✅</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-medium">Borradores</p>
              <p className="text-2xl font-bold text-yellow-900">{productCounts.borradores}</p>
            </div>
            <div className="p-2 bg-yellow-200 rounded-full">
              <span className="text-lg">📝</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-red-50 to-pink-50 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 font-medium">Agotados</p>
              <p className="text-2xl font-bold text-red-900">{productCounts.agotados}</p>
            </div>
            <div className="p-2 bg-red-200 rounded-full">
              <span className="text-lg">❌</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Controles de filtrado y búsqueda */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Barra de búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => handleFilterChange('todos')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  filter === 'todos'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Todos ({productCounts.todos})
              </button>
              <button
                onClick={() => handleFilterChange('activos')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                  filter === 'activos'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Activos ({productCounts.activos})
              </button>
              <button
                onClick={() => handleFilterChange('borradores')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                  filter === 'borradores'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Borradores ({productCounts.borradores})
              </button>
              <button
                onClick={() => handleFilterChange('agotados')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                  filter === 'agotados'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Agotados ({productCounts.agotados})
              </button>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Edit3 size={16} className="mr-2" />
                Editar
              </Button>
              <Button variant="secondary" size="sm">
                <Trash2 size={16} className="mr-2" />
                Eliminar
              </Button>
            </div>
          </div>
        </div>

        {/* Información de resultados */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {filteredProducts.length} de {productCounts.todos} productos
            {searchTerm && (
              <span> para "{searchTerm}"</span>
            )}
          </p>
          {filteredProducts.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              No se encontraron productos con los filtros aplicados
            </p>
          )}
        </div>
      </Card>

      {/* Componente DesignerProducts */}
      <DesignerProducts 
        products={filteredProducts}
        showTitle={false}
      />

      {/* Mensaje cuando no hay productos */}
      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? `No hay productos que coincidan con "${searchTerm}"`
              : `No tienes productos en estado "${filter}"`
            }
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="secondary" onClick={() => setSearchTerm('')}>
              Limpiar búsqueda
            </Button>
            <Button variant="primary" onClick={() => setFilter('todos')}>
              Ver todos los productos
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
} 