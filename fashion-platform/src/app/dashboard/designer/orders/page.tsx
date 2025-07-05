'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ArrowLeft, Search, Eye, Package, Truck, CheckCircle, AlertCircle, Brain, Clock, DollarSign, Calendar, User, MapPin, Phone, Mail, MessageSquare, Star, TrendingUp, Zap, Target, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { showSuccess } from '@/lib/sweetAlert';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  address: string;
  paymentMethod: string;
  notes?: string;
}

type FilterType = 'todos' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export default function DesignerOrdersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('todos');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [analyticsModal, setAnalyticsModal] = useState(false);
  const [analyzingOrder, setAnalyzingOrder] = useState(false);
  const [orderAnalysis, setOrderAnalysis] = useState<any>(null);

  // Estado mutable para pedidos
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'María González',
      customerEmail: 'maria@email.com',
      productName: 'Vestido Floral de Verano',
      productImage: '/images/verano.jpg',
      quantity: 1,
      price: 89.99,
      total: 89.99,
      status: 'processing',
      orderDate: '2024-01-15',
      address: 'Calle 123, Madrid, España',
      paymentMethod: 'Tarjeta de crédito',
      notes: 'Entrega urgente por favor'
    },
    {
      id: 'ORD-002',
      customerName: 'Carlos Ruiz',
      customerEmail: 'carlos@email.com',
      productName: 'Jeans Rotos Street Style',
      productImage: '/images/jeans_mock.jpg',
      quantity: 2,
      price: 79.99,
      total: 159.98,
      status: 'shipped',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-18',
      address: 'Av. Principal 456, Barcelona, España',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-003',
      customerName: 'Ana Martín',
      customerEmail: 'ana@email.com',
      productName: 'Blazer de Lino Beige',
      productImage: '/images/products/blazer1.jpg',
      quantity: 1,
      price: 129.99,
      total: 129.99,
      status: 'delivered',
      orderDate: '2024-01-08',
      deliveryDate: '2024-01-14',
      address: 'Plaza Central 789, Valencia, España',
      paymentMethod: 'Transferencia'
    },
    {
      id: 'ORD-004',
      customerName: 'Luis Torres',
      customerEmail: 'luis@email.com',
      productName: 'Camiseta Básica Orgánica',
      productImage: '/images/camiseta_mock.jpg',
      quantity: 3,
      price: 29.99,
      total: 89.97,
      status: 'pending',
      orderDate: '2024-01-16',
      address: 'Sector Norte 321, Sevilla, España',
      paymentMethod: 'Tarjeta de débito',
      notes: 'Cliente nuevo - verificar datos'
    },
    {
      id: 'ORD-005',
      customerName: 'Elena Vargas',
      customerEmail: 'elena@email.com',
      productName: 'Sudadera Limited Edition',
      productImage: '/images/sudadera_mock.jpg',
      quantity: 1,
      price: 89.99,
      total: 89.99,
      status: 'cancelled',
      orderDate: '2024-01-10',
      address: 'Zona Sur 654, Bilbao, España',
      paymentMethod: 'Tarjeta de crédito',
      notes: 'Cliente canceló por cambio de talla'
    }
  ]);

  // Filtrar pedidos
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'todos' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Contar pedidos por estado (calculado dinámicamente)
  const orderCounts = {
    todos: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock size={16} />,
      processing: <Package size={16} />,
      shipped: <Truck size={16} />,
      delivered: <CheckCircle size={16} />,
      cancelled: <AlertCircle size={16} />
    };
    return icons[status as keyof typeof icons] || <Package size={16} />;
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pendiente',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setOrderAnalysis(null);
    setModalOpen(true);
  };

  const handleAnalyzeOrder = (order: Order) => {
    setSelectedOrder(order);
    setAnalyzingOrder(true);
    setModalOpen(true);
    
    setTimeout(() => {
      setOrderAnalysis({
        customerProfile: {
          type: 'Cliente frecuente',
          spendingTier: 'Premium',
          preferences: ['Moda sostenible', 'Colores neutros', 'Tallas estándar'],
          predictedLifetimeValue: 450
        },
        recommendations: [
          'Cliente leal - considerar descuento de fidelización',
          'Prefiere productos sostenibles - destacar materiales eco-friendly',
          'Historial de compras en temporada alta',
          'Recomendar productos relacionados: accesorios, zapatos'
        ],
        riskAnalysis: {
          returnProbability: 15,
          satisfactionScore: 92,
          deliverySuccess: 98
        }
      });
      setAnalyzingOrder(false);
    }, 1500);
  };

  // Función mejorada para actualizar estados
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: newStatus as Order['status'],
              deliveryDate: newStatus === 'delivered' ? new Date().toISOString().split('T')[0] : order.deliveryDate
            }
          : order
      )
    );
    
    // Actualizar el pedido seleccionado si está abierto
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { 
        ...prev, 
        status: newStatus as Order['status'],
        deliveryDate: newStatus === 'delivered' ? new Date().toISOString().split('T')[0] : prev.deliveryDate
      } : null);
    }
    
    // Mostrar notificación de éxito
    const statusText = getStatusText(newStatus);
    
    await showSuccess({
      title: '¡Estado actualizado!',
      text: `Pedido ${orderId} ahora está en estado: ${statusText}`,
      timer: 3000
    });
    
    setModalOpen(false);
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pedidos 📦</h1>
          <p className="text-gray-600">Administra y analiza los pedidos de tus productos con IA</p>
        </div>
        <div className="mt-4 lg:mt-0 flex gap-3">
          <Button 
            variant="secondary"
            onClick={() => setAnalyticsModal(true)}
          >
            <Brain size={18} className="mr-2" />
            Análisis IA
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Total</p>
              <p className="text-2xl font-bold text-blue-900">{orderCounts.todos}</p>
            </div>
            <Package className="text-blue-600" size={24} />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-medium">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-900">{orderCounts.pending}</p>
            </div>
            <Clock className="text-yellow-600" size={24} />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Procesando</p>
              <p className="text-2xl font-bold text-blue-900">{orderCounts.processing}</p>
            </div>
            <Package className="text-blue-600" size={24} />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium">Enviados</p>
              <p className="text-2xl font-bold text-purple-900">{orderCounts.shipped}</p>
            </div>
            <Truck className="text-purple-600" size={24} />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Entregados</p>
              <p className="text-2xl font-bold text-green-900">{orderCounts.delivered}</p>
            </div>
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-red-50 to-pink-50 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 font-medium">Cancelados</p>
              <p className="text-2xl font-bold text-red-900">{orderCounts.cancelled}</p>
            </div>
            <AlertCircle className="text-red-600" size={24} />
          </div>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            {Object.entries(orderCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => setFilter(status as FilterType)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  status !== 'todos' ? 'border-l border-gray-300' : ''
                } ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Lista de pedidos */}
      <Card className="p-6">
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div 
              key={order.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-purple-200 transition-all"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={order.productImage} 
                  alt={order.productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customerName} - {order.productName}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>Cantidad: {order.quantity}</span>
                    <span className="font-bold text-green-600">${order.total.toFixed(2)}</span>
                    <span>{order.orderDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleViewOrder(order)}
                >
                  <Eye size={16} className="mr-1" />
                  Ver
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAnalyzeOrder(order)}
                >
                  <Brain size={16} className="mr-1" />
                  IA
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron pedidos</h3>
            <p className="text-gray-600">No hay pedidos que coincidan con los filtros aplicados</p>
          </div>
        )}
      </Card>

      {/* Modal de detalles del pedido */}
      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={selectedOrder ? `Pedido ${selectedOrder.id}` : 'Detalles del Pedido'}
      >
        {selectedOrder && (
          <div className="space-y-6">
            {analyzingOrder ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600 mb-2">Analizando pedido con IA...</p>
                <div className="text-sm text-gray-500">
                  <p>• Analizando perfil del cliente</p>
                  <p>• Evaluando riesgo de retorno</p>
                  <p>• Generando recomendaciones</p>
                </div>
              </div>
            ) : orderAnalysis ? (
              <div className="space-y-6">
                {/* Análisis IA */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                    <Brain size={20} className="text-purple-600" />
                    Análisis IA del Cliente
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Tipo</div>
                      <div className="font-bold text-purple-700">{orderAnalysis.customerProfile.type}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Tier</div>
                      <div className="font-bold text-purple-700">{orderAnalysis.customerProfile.spendingTier}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Valor Predicho</div>
                      <div className="font-bold text-green-600">${orderAnalysis.customerProfile.predictedLifetimeValue}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-900">Recomendaciones IA:</h4>
                    {orderAnalysis.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-gray-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={() => setOrderAnalysis(null)}>
                    Ver Detalles del Pedido
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Estado actual */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Estado actual</div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        {getStatusText(selectedOrder.status)}
                      </div>
                    </div>
                    {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">Actualizar a:</div>
                        <div className="flex gap-2">
                          {selectedOrder.status === 'pending' && (
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleUpdateStatus(selectedOrder.id, 'processing')}
                            >
                              Procesando
                            </Button>
                          )}
                          {selectedOrder.status === 'processing' && (
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')}
                            >
                              Enviado
                            </Button>
                          )}
                          {selectedOrder.status === 'shipped' && (
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered')}
                            >
                              Entregado
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Información del cliente */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Información del Cliente</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Nombre</div>
                      <div className="font-medium">{selectedOrder.customerName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{selectedOrder.customerEmail}</div>
                    </div>
                  </div>
                </div>

                {/* Producto */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Producto</h3>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedOrder.productImage} 
                      alt={selectedOrder.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{selectedOrder.productName}</div>
                      <div className="text-sm text-gray-500">Cantidad: {selectedOrder.quantity}</div>
                      <div className="text-sm text-gray-500">Precio: ${selectedOrder.price}</div>
                      <div className="font-bold text-green-600">Total: ${selectedOrder.total}</div>
                    </div>
                  </div>
                </div>

                {/* Dirección de envío */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Envío</h3>
                  <div className="text-gray-700">{selectedOrder.address}</div>
                  {selectedOrder.deliveryDate && (
                    <div className="text-sm text-gray-500 mt-1">
                      Fecha de entrega: {selectedOrder.deliveryDate}
                    </div>
                  )}
                </div>

                {/* Notas */}
                {selectedOrder.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Notas</h3>
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <div className="text-yellow-800">{selectedOrder.notes}</div>
                    </div>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>
                    Cerrar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modal de Analytics IA */}
      <Modal 
        open={analyticsModal} 
        onClose={() => setAnalyticsModal(false)}
        title="📊 Análisis IA de Pedidos"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">${orders.reduce((acc, order) => acc + order.total, 0).toFixed(2)}</div>
              <div className="text-sm text-gray-600">Ingresos Totales</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Pedidos</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">${(orders.reduce((acc, order) => acc + order.total, 0) / orders.length).toFixed(2)}</div>
              <div className="text-sm text-gray-600">Valor Promedio</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Predicciones IA para la próxima semana:</h3>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Ingresos estimados:</span>
                  <span className="font-bold text-green-600">$750</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Productos trending:</span>
                  <span className="font-medium text-indigo-600">Vestidos, Jeans, Blazers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Días pico:</span>
                  <span className="font-medium text-purple-600">Viernes, Sábado, Domingo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
} 