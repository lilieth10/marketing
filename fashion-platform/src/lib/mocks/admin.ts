// ===== INTERFACES PARA DASHBOARD DE ADMIN =====

export interface AdminStats {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  aiInsight?: string;
  icon: string;
  color: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'designer' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActivity: string;
  riskScore: number;
  totalOrders: number;
  totalSpent: number;
  avatar: string;
  location: string;
  aiFlags: string[];
}

export interface ActivityMetric {
  id: string;
  type: 'login' | 'purchase' | 'upload' | 'review' | 'message';
  user: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
  impact: 'low' | 'medium' | 'high';
  location: string;
  device: string;
}

export interface ContentItem {
  id: string;
  type: 'post' | 'product' | 'review' | 'event' | 'blog';
  title: string;
  author: string;
  authorId: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  createdAt: string;
  aiAnalysis: {
    sentimentScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    flaggedReasons: string[];
  };
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: 'technical' | 'billing' | 'account' | 'product' | 'other';
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  aiSuggestedResponse?: string;
  estimatedResolutionTime?: number; // en horas
}

export interface AIAlert {
  id: string;
  type: 'security' | 'performance' | 'anomaly' | 'user_behavior' | 'content';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  affectedUsers: number;
  potentialImpact: string;
  recommendedAction: string;
  status: 'new' | 'investigating' | 'resolved';
}

// ===== DATOS MOCK =====

export const getMockAdminStats = (): AdminStats[] => {
  return [
    {
      id: 'users_total',
      label: 'Usuarios Totales',
      value: '12,847',
      change: 12,
      trend: 'up',
      aiInsight: 'Crecimiento orgánico del 15% este mes. Retención mejorada.',
      icon: 'users',
      color: 'blue'
    },
    {
      id: 'revenue_monthly',
      label: 'Ingresos Mensuales',
      value: 87240,
      unit: '€',
      change: 8,
      trend: 'up',
      aiInsight: 'Algoritmo de precios optimizado incrementó conversión 23%.',
      icon: 'trending-up',
      color: 'green'
    },
    {
      id: 'orders_today',
      label: 'Pedidos Hoy',
      value: 234,
      change: -5,
      trend: 'down',
      aiInsight: 'Bajada temporal. Patrón normal para miércoles según IA.',
      icon: 'shopping-bag',
      color: 'orange'
    },
    {
      id: 'ai_accuracy',
      label: 'Precisión IA',
      value: '94.7',
      unit: '%',
      change: 3,
      trend: 'up',
      aiInsight: 'Modelos de recomendación mejoraron con nuevos datos.',
      icon: 'brain',
      color: 'purple'
    },
    {
      id: 'content_moderated',
      label: 'Contenido Moderado',
      value: 1847,
      change: 15,
      trend: 'up',
      aiInsight: 'Sistema IA detectó 23% más contenido inapropiado.',
      icon: 'shield',
      color: 'red'
    },
    {
      id: 'response_time',
      label: 'Tiempo Respuesta',
      value: '1.2',
      unit: 's',
      change: -8,
      trend: 'up',
      aiInsight: 'Optimización de servidores redujo latencia significativamente.',
      icon: 'clock',
      color: 'cyan'
    }
  ];
};

// Helper para IA: genera insight según datos
function generateUserAIFlags(user: AdminUser): string[] {
  const flags: string[] = [];
  if (user.riskScore > 70) flags.push('Riesgo de fraude detectado por IA');
  if (user.totalOrders > 100) flags.push('Cliente VIP según IA');
  if (user.role === 'designer' && user.totalOrders === 0) flags.push('Diseñador nuevo, IA recomienda seguimiento');
  return flags;
}

export const getMockAdminUsers = (): AdminUser[] => {
  const users: AdminUser[] = [
    {
      id: 'user1',
      name: 'Ana García',
      email: 'ana.garcia@email.com',
      role: 'client',
      status: 'active',
      joinDate: '2023-08-15',
      lastActivity: '2024-01-15T10:30:00Z',
      riskScore: 12,
      totalOrders: 47,
      totalSpent: 2340,
      avatar: '/images/products/dress1.jpg',
      location: 'Madrid, ES',
      aiFlags: []
    },
    {
      id: 'user2',
      name: 'Carlos Ruiz',
      email: 'carlos.ruiz@email.com',
      role: 'designer',
      status: 'active',
      joinDate: '2023-06-22',
      lastActivity: '2024-01-15T14:20:00Z',
      riskScore: 8,
      totalOrders: 0,
      totalSpent: 0,
      avatar: '/images/products/shirt1.jpg',
      location: 'Barcelona, ES',
      aiFlags: []
    },
    {
      id: 'user3',
      name: 'María López',
      email: 'maria.lopez@email.com',
      role: 'client',
      status: 'suspended',
      joinDate: '2023-12-01',
      lastActivity: '2024-01-10T09:15:00Z',
      riskScore: 78,
      totalOrders: 3,
      totalSpent: 89,
      avatar: '/images/products/blazer1.jpg',
      location: 'Valencia, ES',
      aiFlags: []
    },
    {
      id: 'user4',
      name: 'David Sánchez',
      email: 'david.sanchez@email.com',
      role: 'client',
      status: 'active',
      joinDate: '2023-09-10',
      lastActivity: '2024-01-15T16:45:00Z',
      riskScore: 25,
      totalOrders: 156,
      totalSpent: 8920,
      avatar: '/images/products/jeans1.jpg',
      location: 'Sevilla, ES',
      aiFlags: []
    },
    {
      id: 'user5',
      name: 'Elena Martín',
      email: 'elena.martin@email.com',
      role: 'designer',
      status: 'active',
      joinDate: '2023-07-18',
      lastActivity: '2024-01-15T11:30:00Z',
      riskScore: 5,
      totalOrders: 0,
      totalSpent: 0,
      avatar: '/images/products/dress1.jpg',
      location: 'Bilbao, ES',
      aiFlags: []
    }
  ];
  // Asignar flags IA dinámicos
  return users.map(u => ({ ...u, aiFlags: generateUserAIFlags(u) })) as AdminUser[];
};

export const getMockActivityMetrics = (): ActivityMetric[] => {
  return [
    {
      id: 'activity1',
      type: 'purchase',
      user: 'Ana García',
      userId: 'user1',
      action: 'Compró vestido de verano',
      timestamp: '2024-01-15T15:30:00Z',
      details: 'Vestido floral - €89.99',
      impact: 'medium',
      location: 'Madrid, ES',
      device: 'Mobile'
    },
    {
      id: 'activity2',
      type: 'upload',
      user: 'Carlos Ruiz',
      userId: 'user2',
      action: 'Subió nuevo diseño',
      timestamp: '2024-01-15T14:15:00Z',
      details: 'Colección primavera - 12 piezas',
      impact: 'high',
      location: 'Barcelona, ES',
      device: 'Desktop'
    },
    {
      id: 'activity3',
      type: 'login',
      user: 'María López',
      userId: 'user3',
      action: 'Intento de login fallido',
      timestamp: '2024-01-15T13:45:00Z',
      details: 'Cuenta suspendida - 3 intentos',
      impact: 'low',
      location: 'Valencia, ES',
      device: 'Mobile'
    },
    {
      id: 'activity4',
      type: 'review',
      user: 'David Sánchez',
      userId: 'user4',
      action: 'Dejó reseña 5 estrellas',
      timestamp: '2024-01-15T12:20:00Z',
      details: 'Blazer premium - Excelente calidad',
      impact: 'medium',
      location: 'Sevilla, ES',
      device: 'Desktop'
    },
    {
      id: 'activity5',
      type: 'message',
      user: 'Elena Martín',
      userId: 'user5',
      action: 'Envió mensaje a cliente',
      timestamp: '2024-01-15T11:10:00Z',
      details: 'Consulta sobre personalización',
      impact: 'low',
      location: 'Bilbao, ES',
      device: 'Mobile'
    }
  ];
};

// IA para análisis de contenido
function generateContentAIAnalysis(content: ContentItem): ContentItem['aiAnalysis'] {
  if (content.author === 'María López') {
    return {
      sentimentScore: 0.15,
      riskLevel: 'high',
      flaggedReasons: ['Lenguaje negativo extremo', 'Posible review spam', 'Usuario con historial sospechoso']
    };
  }
  if (content.status === 'flagged') {
    return {
      sentimentScore: 0.5,
      riskLevel: 'medium',
      flaggedReasons: ['Posible contenido promocional excesivo', 'Precios no verificados']
    };
  }
  return {
    sentimentScore: 0.9,
    riskLevel: 'low',
    flaggedReasons: []
  };
}

export const getMockContentItems = (): ContentItem[] => {
  const contents: ContentItem[] = [
    {
      id: 'content1',
      type: 'post',
      title: 'Nueva colección de invierno disponible',
      author: 'Ana García',
      authorId: 'user1',
      status: 'pending',
      createdAt: '2024-01-15T16:30:00Z',
      content: '¡Emocionada de compartir mi nueva colección de invierno! Inspirada en los paisajes nórdicos...',
      aiAnalysis: { sentimentScore: 0.9, riskLevel: 'low', flaggedReasons: [] },
      engagement: { likes: 234, shares: 45, comments: 67 }
    },
    {
      id: 'content2',
      type: 'product',
      title: 'Blazer ejecutivo premium',
      author: 'Carlos Ruiz',
      authorId: 'user2',
      status: 'flagged',
      createdAt: '2024-01-15T15:45:00Z',
      content: 'Blazer de alta calidad para profesionales. Corte impecable, tela italiana premium...',
      aiAnalysis: { sentimentScore: 0.9, riskLevel: 'low', flaggedReasons: [] },
      engagement: { likes: 89, shares: 12, comments: 23 }
    },
    {
      id: 'content3',
      type: 'review',
      title: 'Reseña: Vestido de gala',
      author: 'María López',
      authorId: 'user3',
      status: 'rejected',
      createdAt: '2024-01-15T14:20:00Z',
      content: 'Terrible calidad, no se parece a las fotos. Estafa total, no lo recomiendo para nada...',
      aiAnalysis: { sentimentScore: 0.9, riskLevel: 'low', flaggedReasons: [] },
      engagement: { likes: 3, shares: 1, comments: 8 }
    },
    {
      id: 'content4',
      type: 'blog',
      title: 'Tendencias de moda para primavera 2024',
      author: 'Elena Martín',
      authorId: 'user5',
      status: 'approved',
      createdAt: '2024-01-15T13:10:00Z',
      content: 'La primavera 2024 trae consigo una revolución en colores pastel y siluetas fluidas...',
      aiAnalysis: { sentimentScore: 0.9, riskLevel: 'low', flaggedReasons: [] },
      engagement: { likes: 189, shares: 34, comments: 45 }
    },
    {
      id: 'content5',
      type: 'event',
      title: 'Fashion Week Madrid - Evento Exclusivo',
      author: 'Eva Rodriguez',
      authorId: 'user5',
      status: 'approved',
      createdAt: '2024-01-15T14:10:00Z',
      content: 'Te invitamos a nuestro evento exclusivo durante la Fashion Week de Madrid. Descubre las últimas tendencias...',
      aiAnalysis: { sentimentScore: 0.9, riskLevel: 'low', flaggedReasons: [] },
      engagement: { likes: 156, shares: 28, comments: 32 }
    }
  ];
  return contents.map(c => ({ ...c, aiAnalysis: generateContentAIAnalysis(c) })) as ContentItem[];
};

// IA para respuestas sugeridas en soporte
function generateAISuggestedResponse(ticket: SupportTicket): string {
  if (ticket.priority === 'critical') {
    return 'La IA recomienda atención prioritaria: posible bloqueo injustificado. Revisar historial y contactar al usuario urgentemente.';
  }
  if (ticket.category === 'billing') {
    return 'La IA sugiere revisar el historial de pagos y enviar un desglose detallado al usuario.';
  }
  if (ticket.subject.toLowerCase().includes('imagen')) {
    return 'La IA detecta un error común de subida de imágenes. Sugerir formatos compatibles y revisar logs del servidor.';
  }
  return 'La IA recomienda responder en menos de 24h para mantener la satisfacción del usuario.';
}

export const getMockSupportTickets = (): SupportTicket[] => {
  const tickets: SupportTicket[] = [
    {
      id: 'ticket1',
      userId: 'user2',
      userName: 'Bob Johnson',
      userEmail: 'bob.j@example.com',
      priority: 'high',
      status: 'open',
      category: 'technical',
      subject: 'No puedo subir imágenes a mi perfil',
      description: 'Cuando intento subir imágenes aparece un error 500. He probado diferentes formatos (JPG, PNG) y todos me dan el mismo error. El problema empezó hace 3 días.',
      createdAt: '2024-01-15T15:30:00Z',
      updatedAt: '2024-01-15T15:30:00Z',
      aiSuggestedResponse: undefined,
      estimatedResolutionTime: 2
    },
    {
      id: 'ticket2',
      userId: 'user4',
      userName: 'Diana Prince',
      userEmail: 'diana.p@example.com',
      priority: 'critical',
      status: 'in_progress',
      category: 'account',
      subject: 'Mi cuenta ha sido suspendida injustamente',
      description: 'No entiendo por qué mi cuenta está suspendida. Solo publiqué contenido normal sobre moda. Necesito acceso urgente porque tengo clientes esperando.',
      createdAt: '2024-01-15T12:00:00Z',
      updatedAt: '2024-01-15T14:00:00Z',
      aiSuggestedResponse: undefined,
      estimatedResolutionTime: 24
    },
    {
      id: 'ticket3',
      userId: 'user5',
      userName: 'Eva Rodriguez',
      userEmail: 'eva.r@example.com',
      priority: 'medium',
      status: 'resolved',
      category: 'billing',
      subject: 'Consulta sobre comisiones de diseñador',
      description: '¿Podrían explicarme cómo se calculan las comisiones por diseño vendido? Me parece que hay una discrepancia en mi último pago.',
      createdAt: '2024-01-14T10:00:00Z',
      updatedAt: '2024-01-14T16:30:00Z',
      aiSuggestedResponse: undefined,
      estimatedResolutionTime: 4
    },
    {
      id: 'ticket4',
      userId: 'user1',
      userName: 'Alice Smith',
      userEmail: 'alice.s@example.com',
      priority: 'low',
      status: 'open',
      category: 'other',
      subject: 'Sugerencia: Mejorar filtros de búsqueda',
      description: 'Sería genial poder filtrar diseños por estilo específico (bohemio, minimalista, etc.) y no solo por categoría general.',
      createdAt: '2024-01-15T09:15:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      aiSuggestedResponse: undefined,
      estimatedResolutionTime: 168
    },
    {
      id: 'ticket5',
      userId: 'user6',
      userName: 'Frank Miller',
      userEmail: 'frank.m@example.com',
      priority: 'medium',
      status: 'in_progress',
      category: 'billing',
      subject: 'Problema con el pago de mi suscripción',
      description: 'Mi tarjeta fue rechazada pero tengo fondos suficientes. Ya probé con otra tarjeta y sigue fallando.',
      createdAt: '2024-01-15T11:45:00Z',
      updatedAt: '2024-01-15T13:20:00Z',
      aiSuggestedResponse: undefined,
      estimatedResolutionTime: 8
    }
  ];
  return tickets.map(t => ({ ...t, aiSuggestedResponse: generateAISuggestedResponse(t) })) as SupportTicket[];
};

export const getMockAIAlerts = (): AIAlert[] => {
  return [
    {
      id: "alert1",
      type: "anomaly",
      severity: "critical",
      title: "Múltiples transacciones sospechosas detectadas",
      description: "Se detectaron 47 transacciones de alta valor desde una misma dirección IP en un periodo de 15 minutos. Patrón inconsistente con el comportamiento normal de usuarios.",
      timestamp: "2024-01-15T19:23:00Z",
      affectedUsers: 47,
      potentialImpact: "Pérdida financiera estimada: €12,450. Posible fraude con tarjetas robadas.",
      recommendedAction: "Bloquear IP inmediatamente, revisar todas las transacciones relacionadas y contactar a los usuarios afectados para verificar la legitimidad.",
      status: "new"
    },
    {
      id: "alert2",
      type: "security",
      severity: "high",
      title: "Actividad de scraping masivo detectada",
      description: "Bot realizando scraping sistemático de precios y productos desde São Paulo, Brasil. Velocidad de requests 12x superior al usuario promedio.",
      timestamp: "2024-01-15T18:45:00Z",
      affectedUsers: 1,
      potentialImpact: "Fuga de inteligencia comercial. Competencia podría estar recopilando datos de precios y catálogo.",
      recommendedAction: "Implementar CAPTCHA y rate limiting en endpoints de productos. Bloquear IP si persiste la actividad.",
      status: "investigating"
    },
    {
      id: "alert3",
      type: "content",
      severity: "medium",
      title: "Aumento en contenido flagged por IA",
      description: "Incremento del 23% en contenido marcado como negativo/inapropiado esta semana comparado con la semana anterior.",
      timestamp: "2024-01-15T17:00:00Z",
      affectedUsers: 156,
      potentialImpact: "Degradación de experiencia de usuario. Posible aumento en churn rate.",
      recommendedAction: "Revisar y ajustar políticas de moderación automática. Considerar implementar filtros más estrictos temporalmente.",
      status: "resolved"
    },
    {
      id: "alert4",
      type: "performance",
      severity: "medium",
      title: "Degradación en velocidad de carga de imágenes",
      description: "Tiempo de carga de imágenes 34% más lento en las últimas 6 horas. Afectando principalmente a usuarios en Europa.",
      timestamp: "2024-01-15T16:30:00Z",
      affectedUsers: 892,
      potentialImpact: "Aumento estimado del 15% en bounce rate. UX comprometida en región clave.",
      recommendedAction: "Optimizar configuración de CDN para Europa, implementar compresión adicional de imágenes y revisar balanceadores de carga.",
      status: "investigating"
    },
    {
      id: "alert5",
      type: "user_behavior",
      severity: "medium",
      title: "Patrón inusual en registro masivo de cuentas",
      description: "89 nuevas cuentas registradas en 2 horas con patrones similares (emails temporales, mismo proveedor de internet).",
      timestamp: "2024-01-15T15:15:00Z",
      affectedUsers: 89,
      potentialImpact: "Posible creación de cuentas bot para manipular métricas o preparar spam masivo.",
      recommendedAction: "Implementar verificación adicional por email/SMS para nuevas cuentas. Monitorear actividad de estas cuentas por 48h.",
      status: "new"
    },
    {
      id: "alert6",
      type: "performance",
      severity: "low",
      title: "Uso elevado de CPU en servidores de recomendaciones",
      description: "Los algoritmos de IA de recomendaciones están utilizando 15% más CPU de lo normal.",
      timestamp: "2024-01-15T14:45:00Z",
      affectedUsers: 0,
      potentialImpact: "Posible lentitud en recomendaciones personalizadas si continúa la tendencia.",
      recommendedAction: "Optimizar consultas de base de datos en algoritmos de recomendación. Considerar escalado horizontal.",
      status: "resolved"
    },
    {
      id: "alert7",
      type: "security",
      severity: "low",
      title: "Intentos fallidos de login aumentaron 8%",
      description: "Incremento gradual en intentos fallidos de autenticación durante la última semana.",
      timestamp: "2024-01-15T13:30:00Z",
      affectedUsers: 234,
      potentialImpact: "Posibles ataques de fuerza bruta coordinados o usuarios olvidando contraseñas.",
      recommendedAction: "Reforzar sistema de bloqueo temporal después de múltiples intentos. Enviar recordatorios de seguridad a usuarios.",
      status: "resolved"
    }
  ];
}; 