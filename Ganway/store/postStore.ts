import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Post {
  id: string
  image: string
  title: string
  user: {
    name: string
    username: string
    avatar: string
    verified?: boolean
  }
  likes: number
  comments: number
  height: number
  category: string
  isLiked: boolean
  isSaved: boolean
  type: "photo" | "video" | "event" | "article"
  userId: string
  description?: string
}

export interface ProductData {
  id: string
  name: string
  price: string
  rating: number
  reviews: number
  description: string
  image: string
  features: string[]
  sizes: string[]
  sentimentMetrics: { label: string; value: number }[]
  styleMetrics: { label: string; value: number }[]
}

export interface Article {
  id: string
  title: string
  author: string
  date: string
  readTime: string
  image: string
  content: string[]
  relatedArticles: { id: string; title: string; image: string }[]
}

interface PostState {
  posts: Post[]
  products: ProductData[]
  articles: Article[]
  addPost: (post: Omit<Post, "id" | "likes" | "comments" | "isLiked" | "isSaved">) => void
  deletePost: (postId: string, userId: string) => void
  toggleLike: (postId: string) => void
  toggleSave: (postId: string) => void
  getProductById: (id: string) => ProductData | undefined
  getArticleById: (id: string) => Article | undefined
  getPostById: (id: string) => Post | undefined
  searchPosts: (query: string) => Post[]
}

// Mock Data for Products
const initialProducts: ProductData[] = [
  {
    id: "p1",
    name: "Vestido de Noche Elegante",
    price: "$350.00",
    rating: 4.9,
    reviews: 120,
    description: "Un vestido de noche deslumbrante, perfecto para eventos formales.",
    image: "/images/dashboard/woman-black-suit-spotlight.jpg",
    features: ["Seda 100% natural", "Diseño exclusivo", "Ajuste perfecto", "Ideal para galas"],
    sizes: ["XS", "S", "M", "L"],
    sentimentMetrics: [
      { label: "Confianza", value: 97 },
      { label: "Satisfacción", value: 95 },
      { label: "Originalidad", value: 90 },
      { label: "Exclusividad", value: 96 },
    ],
    styleMetrics: [
      { label: "Elegancia", value: 98 },
      { label: "Versatilidad", value: 70 },
      { label: "Exclusividad", value: 95 },
      { label: "Tendencia", value: 80 },
    ],
  },
  {
    id: "p2",
    name: "Blazer Casual Chic",
    price: "$180.00",
    rating: 4.5,
    reviews: 80,
    description: "Un blazer versátil que combina elegancia con comodidad.",
    image: "/images/dashboard/beige-elegant-blazer.jpg",
    features: ["Tejido transpirable", "Corte moderno", "Fácil de combinar", "Perfecto para primavera"],
    sizes: ["S", "M", "L", "XL"],
    sentimentMetrics: [
      { label: "Confianza", value: 90 },
      { label: "Satisfacción", value: 88 },
      { label: "Originalidad", value: 75 },
      { label: "Exclusividad", value: 60 },
    ],
    styleMetrics: [
      { label: "Elegancia", value: 85 },
      { label: "Versatilidad", value: 95 },
      { label: "Exclusividad", value: 70 },
      { label: "Tendencia", value: 90 },
    ],
  },
  {
    id: "p3",
    name: "Jumpsuit Turquesa Urbano",
    price: "$220.00",
    rating: 4.7,
    reviews: 65,
    description: "Jumpsuit moderno en tono turquesa vibrante, perfecto para un estilo urbano.",
    image: "/images/dashboard/turquoise-jumpsuit.jpg",
    features: ["Tejido elástico", "Diseño contemporáneo", "Ideal para el día a día", "Fácil de cuidar"],
    sizes: ["XS", "S", "M"],
    sentimentMetrics: [
      { label: "Confianza", value: 92 },
      { label: "Satisfacción", value: 90 },
      { label: "Originalidad", value: 85 },
      { label: "Exclusividad", value: 70 },
    ],
    styleMetrics: [
      { label: "Elegancia", value: 75 },
      { label: "Versatilidad", value: 88 },
      { label: "Exclusividad", value: 65 },
      { label: "Tendencia", value: 92 },
    ],
  },
  {
    id: "p5",
    name: "Mono Gris de Noche",
    price: "$280.00",
    rating: 4.6,
    reviews: 70,
    description: "Mono elegante en tono gris oscuro, ideal para eventos nocturnos.",
    image: "/images/dashboard/grey-night-jumpsuit.jpg",
    features: ["Tejido de crepé", "Diseño de una sola pieza", "Cierre invisible", "Perfecto para cenas"],
    sizes: ["XS", "S", "M", "L"],
    sentimentMetrics: [
      { label: "Confianza", value: 93 },
      { label: "Satisfacción", value: 91 },
      { label: "Originalidad", value: 80 },
      { label: "Exclusividad", value: 75 },
    ],
    styleMetrics: [
      { label: "Elegancia", value: 90 },
      { label: "Versatilidad", value: 75 },
      { label: "Exclusividad", value: 80 },
      { label: "Tendencia", value: 85 },
    ],
  },
]

// NUEVOS ARTÍCULOS PARA LAS RECOMENDACIONES DE IA
const initialArticles: Article[] = [
  {
    id: "a1",
    title: "Descubre el lujo del bienestar en la moda",
    author: "Ganway Blog",
    date: "5 de febrero de 2024",
    readTime: "8 min de lectura",
    image: "/placeholder.svg?height=400&width=800",
    content: [
      "La moda y el bienestar siempre han estado intrínsecamente conectados.",
      "Grandes diseñadores como Stella McCartney han llevado al extremo la idea de moda sostenible.",
      "Hoy en día, la moda bienestar es más popular que nunca.",
    ],
    relatedArticles: [
      { id: "a2", title: "El regreso del Y2K", image: "/placeholder.svg?height=150&width=150" },
      { id: "a3", title: "Streetwear: Guía definitiva", image: "/placeholder.svg?height=150&width=150" },
    ],
  },
  // ARTÍCULO PARA ai-1 (Tendencia: Colores Vibrantes 2024)
  {
    id: "ai-1",
    title: "Tendencia: Colores Vibrantes 2024",
    author: "IA Fashion Trends",
    date: "20 de mayo de 2024",
    readTime: "5 min de lectura",
    image: "/images/dashboard/colorful-avant-garde.jpg",
    content: [
      "Los colores neón y vibrantes están dominando las pasarelas este 2024. Esta tendencia representa una ruptura audaz con los tonos neutros que han prevalecido en temporadas anteriores.",
      "Desde el fucsia eléctrico hasta el verde lima, estos colores no solo llaman la atención, sino que también reflejan una actitud optimista y enérgica que resuena con la generación actual.",
      "Los diseñadores más influyentes han incorporado estas paletas vibrantes en sus colecciones, creando piezas que son verdaderas declaraciones de estilo.",
      "Para incorporar esta tendencia en tu guardarropa, comienza con accesorios pequeños como bolsos o zapatos, y gradualmente añade piezas más llamativas como blazers o vestidos.",
    ],
    relatedArticles: [
      { id: "ai-2", title: "Minimalismo Elegante", image: "/images/dashboard/beige-elegant-blazer.jpg" },
      { id: "ai-4", title: "Streetwear Urbano", image: "/images/dashboard/yellow-sportwear-outfit.jpg" },
    ],
  },
  // ARTÍCULO PARA ai-2 (Estilo Recomendado: Minimalismo Elegante)
  {
    id: "ai-2",
    title: "Estilo Recomendado: Minimalismo Elegante",
    author: "IA Style Guide",
    date: "18 de mayo de 2024",
    readTime: "6 min de lectura",
    image: "/images/dashboard/beige-elegant-blazer.jpg",
    content: [
      "El minimalismo elegante se ha convertido en la filosofía de estilo preferida para quienes buscan sofisticación sin complicaciones.",
      "Este enfoque se basa en líneas limpias, colores neutros y piezas de alta calidad que pueden combinarse fácilmente entre sí.",
      "La clave del minimalismo elegante radica en la selección cuidadosa de cada prenda, priorizando la calidad sobre la cantidad.",
      "Un guardarropa minimalista típico incluye blazers bien estructurados, pantalones de corte perfecto, camisas de seda y accesorios discretos pero impactantes.",
      "Esta filosofía no solo simplifica las decisiones matutinas, sino que también crea un estilo personal coherente y atemporal.",
    ],
    relatedArticles: [
      { id: "ai-1", title: "Colores Vibrantes 2024", image: "/images/dashboard/colorful-avant-garde.jpg" },
      { id: "p2", title: "Blazer Casual Chic", image: "/images/dashboard/beige-elegant-blazer.jpg" },
    ],
  },
  // ARTÍCULO PARA ai-4 (Tendencia: Streetwear Urbano)
  {
    id: "ai-4",
    title: "Tendencia: Streetwear Urbano",
    author: "Urban Fashion Collective",
    date: "15 de mayo de 2024",
    readTime: "7 min de lectura",
    image: "/images/dashboard/yellow-sportwear-outfit.jpg",
    content: [
      "El streetwear urbano continúa evolucionando, fusionando la comodidad de la ropa deportiva con elementos de alta costura.",
      "Esta tendencia nació en las calles y ha conquistado las pasarelas más prestigiosas del mundo, demostrando que el estilo casual puede ser igualmente sofisticado.",
      "Los elementos clave incluyen sudaderas oversized, sneakers statement, accesorios llamativos y la superposición creativa de prendas.",
      "Las marcas de lujo han adoptado códigos del streetwear, creando colaboraciones que elevan este estilo a nuevas alturas.",
      "Para dominar el streetwear urbano, es esencial entender el equilibrio entre comodidad y estilo, siempre manteniendo una actitud auténtica y personal.",
    ],
    relatedArticles: [
      { id: "ai-1", title: "Colores Vibrantes 2024", image: "/images/dashboard/colorful-avant-garde.jpg" },
      { id: "ai-6", title: "Comfy Chic", image: "/placeholder.svg?height=150&width=150" },
    ],
  },
  // ARTÍCULO PARA ai-6 (Estilo Recomendado: Comfy Chic)
  {
    id: "ai-6",
    title: "Estilo Recomendado: Comfy Chic",
    author: "Comfort Style Expert",
    date: "12 de mayo de 2024",
    readTime: "5 min de lectura",
    image: "/placeholder.svg?height=400&width=800",
    content: [
      "El estilo Comfy Chic representa la perfecta armonía entre comodidad y elegancia, ideal para el ritmo de vida moderno.",
      "Esta tendencia surgió como respuesta a la necesidad de verse bien sin sacrificar la comodidad en nuestro día a día.",
      "Las piezas clave incluyen tejidos suaves, cortes relajados pero favorecedores, y colores que transmiten calma y sofisticación.",
      "Desde pantalones de punto elegantes hasta blazers en tejidos técnicos, el Comfy Chic redefine lo que significa vestirse bien.",
      "La versatilidad es fundamental: las mismas piezas pueden funcionar para una reunión de trabajo, una cita casual o un día de compras.",
    ],
    relatedArticles: [
      { id: "ai-2", title: "Minimalismo Elegante", image: "/images/dashboard/beige-elegant-blazer.jpg" },
      { id: "ai-4", title: "Streetwear Urbano", image: "/images/dashboard/yellow-sportwear-outfit.jpg" },
    ],
  },
]

// POSTS ACTUALIZADOS CON LOS NUEVOS ARTÍCULOS
const initialPosts: Post[] = [
  {
    id: "p1",
    image: "/images/dashboard/woman-black-suit-spotlight.jpg",
    title: "Poder y estilo en blanco y negro",
    user: {
      name: "Moda Editorial",
      username: "@moda_editorial",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    likes: 350,
    comments: 25,
    height: 410,
    category: "Editorial",
    isLiked: false,
    isSaved: false,
    type: "photo",
    userId: "2",
    description: "Un look que combina poder y elegancia, perfecto para destacar en cualquier evento formal.",
  },
  {
    id: "p2",
    image: "/images/dashboard/beige-elegant-blazer.jpg",
    title: "Blazer y bella con estilo",
    user: {
      name: "Estilo Único y Personal",
      username: "@estilo_unico",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    likes: 189,
    comments: 8,
    height: 320,
    category: "Elegante",
    isLiked: false,
    isSaved: false,
    type: "photo",
    userId: "2",
    description:
      "La elegancia se encuentra en los detalles. Este blazer beige es la pieza perfecta para un look sofisticado.",
  },
  {
    id: "p3",
    image: "/images/dashboard/turquoise-jumpsuit.jpg",
    title: "Navegando por el mundo de la moda",
    user: {
      name: "Moda Estilo y Creatividad",
      username: "@moda_estilo",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
    },
    likes: 456,
    comments: 23,
    height: 480,
    category: "Formal",
    isLiked: false,
    isSaved: false,
    type: "photo",
    userId: "2",
    description:
      "Un jumpsuit que redefine la elegancia moderna. Perfecto para la mujer contemporánea que busca estilo y comodidad.",
  },
  {
    id: "p4",
    image: "/images/dashboard/beige-casual-chic.jpg",
    title: "Estilo chic en un entorno elegante",
    user: {
      name: "Inspirador de Estilo",
      username: "@inspirador_estilo",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    likes: 167,
    comments: 15,
    height: 360,
    category: "Casual Chic",
    isLiked: false,
    isSaved: false,
    type: "photo",
    userId: "2",
    description: "El casual chic en su máxima expresión. Un look que funciona tanto para el día como para la noche.",
  },
  {
    id: "p5",
    image: "/images/dashboard/grey-night-jumpsuit.jpg",
    title: "Destacando las piezas contemporáneas",
    user: {
      name: "Estilo Urbano",
      username: "@estilo_urbano",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    likes: 298,
    comments: 19,
    height: 420,
    category: "Nocturno",
    isLiked: false,
    isSaved: false,
    type: "photo",
    userId: "2",
    description:
      "La sofisticación nocturna redefinida. Este mono gris es la elección perfecta para eventos especiales.",
  },
  // POSTS PARA LAS RECOMENDACIONES DE IA
  {
    id: "ai-1",
    image: "/images/dashboard/colorful-avant-garde.jpg",
    title: "Tendencia: Colores Vibrantes 2024",
    user: {
      name: "IA Fashion Trends",
      username: "@ia_fashion",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
    },
    likes: 567,
    comments: 89,
    height: 400,
    category: "Tendencia",
    isLiked: false,
    isSaved: false,
    type: "article",
    userId: "1",
    description: "Los colores neón y vibrantes están dominando las pasarelas. Perfecto para tu estilo audaz.",
  },
  {
    id: "ai-2",
    image: "/images/dashboard/beige-elegant-blazer.jpg",
    title: "Estilo Recomendado: Minimalismo Elegante",
    user: {
      name: "IA Style Guide",
      username: "@ia_style",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
    },
    likes: 423,
    comments: 67,
    height: 380,
    category: "Estilo",
    isLiked: false,
    isSaved: false,
    type: "article",
    userId: "1",
    description: "Basado en tus preferencias, el minimalismo elegante complementará tu guardarropa.",
  },
  {
    id: "ai-4",
    image: "/images/dashboard/yellow-sportwear-outfit.jpg",
    title: "Tendencia: Streetwear Urbano",
    user: {
      name: "Urban Fashion Collective",
      username: "@urban_fashion",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
    },
    likes: 389,
    comments: 45,
    height: 360,
    category: "Tendencia",
    isLiked: false,
    isSaved: false,
    type: "article",
    userId: "1",
    description: "El streetwear sigue siendo una tendencia fuerte. Ideal para looks casuales con personalidad.",
  },
  {
    id: "ai-6",
    image: "/placeholder.svg?height=400&width=300",
    title: "Estilo Recomendado: Comfy Chic",
    user: {
      name: "Comfort Style Expert",
      username: "@comfort_style",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
    },
    likes: 312,
    comments: 28,
    height: 350,
    category: "Estilo",
    isLiked: false,
    isSaved: false,
    type: "article",
    userId: "1",
    description: "La comodidad se une al estilo en esta tendencia perfecta para el día a día.",
  },
]

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: initialPosts,
      products: initialProducts,
      articles: initialArticles,
      addPost: (newPost) => {
        set((state) => ({
          posts: [
            {
              ...newPost,
              id: `post_${Date.now()}`,
              likes: 0,
              comments: 0,
              isLiked: false,
              isSaved: false,
            },
            ...state.posts,
          ],
        }))
      },
      deletePost: (postId, userId) => {
        set((state) => {
          const postToDelete = state.posts.find((p) => p.id === postId)
          if (postToDelete && postToDelete.userId === userId) {
            return {
              posts: state.posts.filter((post) => post.id !== postId),
            }
          }
          return state
        })
      },
      toggleLike: (postId) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, isLiked: !post.isLiked, likes: post.likes + (post.isLiked ? -1 : 1) }
              : post,
          ),
        }))
      },
      toggleSave: (postId) => {
        set((state) => ({
          posts: state.posts.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)),
        }))
      },
      getProductById: (id) => {
        return get().products.find((product) => product.id === id)
      },
      getArticleById: (id) => {
        return get().articles.find((article) => article.id === id)
      },
      getPostById: (id) => {
        return get().posts.find((post) => post.id === id)
      },
      searchPosts: (query) => {
        const { posts } = get()
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.description?.toLowerCase().includes(query.toLowerCase()) ||
            post.category.toLowerCase().includes(query.toLowerCase()),
        )
      },
    }),
    {
      name: "post-storage",
      partialize: (state) => ({
        posts: state.posts,
        products: state.products,
        articles: state.articles,
      }),
    },
  ),
)
