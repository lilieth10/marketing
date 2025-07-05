import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CommunityPost {
  id: string | number;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    badge: string;
  };
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  category: 'general' | 'events' | 'profile';
  isLiked?: boolean;
  aiAnalysis: {
    sentiment: string;
    styleMatch: number;
    trendAlignment: number;
  };
  createdAt?: number;
}

interface CommunityState {
  posts: CommunityPost[];
  initialized: boolean;
  addPost: (post: Omit<CommunityPost, 'id'>) => void;
  likePost: (postId: string | number) => void;
  unlikePost: (postId: string | number) => void;
  deletePost: (postId: string | number) => void;
  setPosts: (posts: CommunityPost[]) => void;
  getPostsByCategory: (category: 'general' | 'events' | 'profile', userId?: string) => CommunityPost[];
  initializePosts: () => void;
  clearUserPosts: (userName: string) => void;
}

// Posts iniciales solo para demostración (se cargan bajo demanda)
const getDemoPosts = (): CommunityPost[] => [
  {
    id: 1,
    author: {
      name: "Isabella Chen",
      avatar: "/images/placeholder1.png",
      verified: true,
      badge: "Influencer de Estilo"
    },
    content: "Acabo de descubrir este increíble blazer sostenible que captura perfectamente la tendencia de lujo minimalista. ¡El análisis de estilo de la IA es muy preciso! 💫",
    image: "/images/products/blazer1.jpg",
    likes: 847,
    comments: 156,
    shares: 89,
    timestamp: "hace 2 horas",
    tags: ["#ModaSostenible", "#LujoMinimal", "#EstiloIA"],
    category: 'general',
    isLiked: false,
    aiAnalysis: {
      sentiment: "Muy Positivo",
      styleMatch: 96,
      trendAlignment: 94
    }
  },
  {
    id: 2,
    author: {
      name: "Valentina Torres",
      avatar: "/images/placeholder2.png",
      verified: false,
      badge: "Entusiasta de Moda"
    },
    content: "¡El análisis de impacto emocional de este vestido es increíble! 95% de aumento de confianza - exactamente lo que necesitaba para mi presentación de hoy ✨",
    image: "/images/products/dress1.jpg",
    likes: 634,
    comments: 98,
    shares: 45,
    timestamp: "hace 4 horas",
    tags: ["#PowerDressing", "#ModaEmocional", "#AumentoConfianza"],
    category: 'general',
    isLiked: false,
    aiAnalysis: {
      sentiment: "Inspirador",
      styleMatch: 92,
      trendAlignment: 88
    }
  },
  {
    id: 3,
    author: {
      name: "Carlos Mendoza",
      avatar: "/images/placeholder3.png",
      verified: true,
      badge: "Experto en Tendencias"
    },
    content: "¡Milano Fashion Week fue increíble! El evento de sostenibilidad superó mis expectativas. Conocí diseñadores increíbles y aprendí mucho sobre moda circular 🌱",
    image: "/images/products/blazer1.jpg",
    likes: 423,
    comments: 67,
    shares: 34,
    timestamp: "hace 6 horas",
    tags: ["#MilanoFashionWeek", "#Sostenibilidad", "#ModaCircular"],
    category: 'events',
    isLiked: false,
    aiAnalysis: {
      sentiment: "Muy Positivo",
      styleMatch: 94,
      trendAlignment: 97
    }
  },
  {
    id: 4,
    author: {
      name: "Ana Sofía López",
      avatar: "/images/placeholder4.png",
      verified: false,
      badge: "Fashion Blogger"
    },
    content: "El workshop de IA para diseño fue mind-blowing! 🤯 Nunca pensé que la tecnología podría ser tan creativa. Ya tengo ideas para mi próxima colección",
    image: "/images/campera.png",
    likes: 289,
    comments: 45,
    shares: 22,
    timestamp: "hace 8 horas",
    tags: ["#WorkshopIA", "#Diseño", "#Innovación"],
    category: 'events',
    isLiked: false,
    aiAnalysis: {
      sentiment: "Emocionado",
      styleMatch: 89,
      trendAlignment: 93
    }
  }
];

// Función para generar IDs únicos simples
const generateUniqueId = () => {
  return `post_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      posts: [], // Empezar vacío para usuarios nuevos
      initialized: false,
  
  initializePosts: () => {
    const { initialized } = get();
    if (!initialized) {
      set({ 
        posts: getDemoPosts(),
        initialized: true 
      });
    }
  },
  
  addPost: (postData) => {
    const newPost: CommunityPost = {
      ...postData,
      id: generateUniqueId(), // ID único garantizado
      isLiked: false,
    };
    set((state) => ({
      posts: [newPost, ...state.posts],
    }));
  },
  
  likePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId 
          ? { ...post, likes: post.likes + 1, isLiked: true }
          : post
      ),
    }));
  },

  unlikePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId 
          ? { ...post, likes: Math.max(0, post.likes - 1), isLiked: false }
          : post
      ),
    }));
  },
  
  deletePost: (postId) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    }));
  },
  
  setPosts: (posts) => {
    set({ posts });
  },

  clearUserPosts: (userName) => {
    set((state) => ({
      posts: state.posts.filter(post => 
        post.author.name.toLowerCase() !== userName.toLowerCase()
      ),
    }));
  },

  getPostsByCategory: (category, userId) => {
    const { posts } = get();
    if (category === 'profile' && userId) {
      return posts.filter(post => 
        post.category === 'profile' && 
        (post.author.name.toLowerCase().includes(userId.toLowerCase()) || 
         post.author.name === userId ||
         post.author.name.toLowerCase() === userId.toLowerCase())
      );
    }
    return posts.filter(post => post.category === category);
  }
    }),
    {
      name: 'community-posts-storage',
      // Persistencia específica por usuario y manejo seguro del localStorage
      storage: {
        getItem: (name) => {
          try {
            // Obtener el usuario actual desde auth store
            const authData = localStorage.getItem('auth-storage');
            if (authData) {
              const { state } = JSON.parse(authData);
              const userId = state?.user?.id;
              if (userId) {
                const userKey = `${name}-${userId}`;
                const item = localStorage.getItem(userKey);
                return item ? JSON.parse(item) : null;
              }
            }
            return null;
          } catch (error) {
            console.warn('Error reading community posts:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            // Obtener el usuario actual desde auth store
            const authData = localStorage.getItem('auth-storage');
            if (authData) {
              const { state } = JSON.parse(authData);
              const userId = state?.user?.id;
              if (userId) {
                const userKey = `${name}-${userId}`;
                
                // Verificar tamaño antes de guardar
                const stringValue = JSON.stringify(value);
                if (stringValue.length > 4000000) { // 4MB límite
                  // Solo guardar los posts más recientes
                  const trimmedValue = {
                    ...value,
                    state: {
                      ...value.state,
                      posts: value.state.posts.slice(0, 50) // Solo los primeros 50 posts
                    }
                  };
                  localStorage.setItem(userKey, JSON.stringify(trimmedValue));
                } else {
                  localStorage.setItem(userKey, stringValue);
                }
              }
            }
          } catch (error) {
            console.warn('Error saving community posts:', error);
          }
        },
        removeItem: (name) => {
          try {
            const authData = localStorage.getItem('auth-storage');
            if (authData) {
              const { state } = JSON.parse(authData);
              const userId = state?.user?.id;
              if (userId) {
                const userKey = `${name}-${userId}`;
                localStorage.removeItem(userKey);
              }
            }
          } catch (error) {
            console.warn('Error removing community posts:', error);
          }
        },
      },
    }
  )
); 