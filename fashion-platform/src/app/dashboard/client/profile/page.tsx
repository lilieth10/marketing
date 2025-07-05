"use client";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserProfileStore } from "@/store/userProfile.store";
import { useAuthStore } from "@/store/auth.store";
import { useGamificationStore } from "@/store/gamification.store";
import { CommunityPost, useCommunityStore } from "@/store/community.store";
import { useDesignerRequestsStore } from "@/store/designerRequests.store";
import { mockHomeFeedPosts } from "@/lib/mocks/homeFeed";
import { 
  Heart, MessageCircle, Link as LinkIcon, Crown, MapPin, Mail, Phone, Star, Calendar, ShoppingBag, MoreHorizontal, Camera, Edit3, UploadCloud, Trophy, Zap, Gift, Award, Target, Flame, Plus, Send, Lock, Trash
} from "lucide-react";
import { Recommendations } from '@/components/modules/Recommendations';
import { showError, showSuccess, showDeleteConfirmation } from '@/lib/sweetAlert';

const TABS = [
  { label: "Creaciones", key: "creaciones", icon: Camera },
  { label: "Favoritos", key: "favoritos", icon: Heart },
  { label: "Eventos", key: "eventos", icon: Calendar },
  { label: "Mis compras", key: "compras", icon: ShoppingBag },
  { label: "Mensajes", key: "mensajes", icon: MessageCircle },
];

const mockFavorites = [
  { id: 1, type: 'product', name: 'Blazer Minimalista', price: 220, image: '/images/products/blazer1.jpg', likedAt: '2h' },
  { id: 2, type: 'post', content: 'Look perfecto para la oficina', author: 'Sofia M.', image: '/images/products/shirt1.jpg', likedAt: '1d' },
  { id: 3, type: 'product', name: 'Pantalón Palazzo', price: 140, image: '/images/products/jeans1.jpg', likedAt: '3d' },
];

const mockEvents = [
  { id: 1, title: 'Fashion Week Digital', date: '15 Ene', time: '19:00', status: 'upcoming', attendees: 1200 },
  { id: 2, title: 'Workshop: Estilo Minimalista', date: '18 Ene', time: '15:30', status: 'upcoming', attendees: 45 },
  { id: 3, title: 'Networking Fashion', date: '10 Ene', time: '20:00', status: 'attended', attendees: 89 },
];

const mockPurchases = [
  { id: 1, product: 'Blazer Elegante', price: 180, date: '12 Ene', status: 'delivered', image: '/images/products/blazer1.jpg' },
  { id: 2, product: 'Camisa Premium', price: 95, date: '8 Ene', status: 'shipped', image: '/images/products/shirt1.jpg' },
  { id: 3, product: 'Pantalón Palazzo', price: 140, date: '5 Ene', status: 'delivered', image: '/images/products/jeans1.jpg' },
];

const mockMessages = [
  { id: 1, sender: 'Sofia Martinez', avatar: '/images/placeholder1.png', message: '¡Me encanta tu estilo!', time: '2h', unread: true },
  { id: 2, sender: 'Elena Rodriguez', avatar: '/images/placeholder2.png', message: '¿Dónde compraste ese blazer?', time: '5h', unread: false },
  { id: 3, sender: 'Carmen Valdez', avatar: '/images/placeholder3.png', message: 'Gracias por la recomendación', time: '1d', unread: false },
];

// Toast component acorde al estilo de la plataforma - Responsive optimizado
function Toast({ message, icon, onClose }: { message: string; icon?: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-3 sm:px-6 rounded-xl shadow-lg animate-fade-in-up max-w-sm sm:max-w-none mx-auto sm:mx-0">
      {icon && <span className="text-xl sm:text-2xl flex-shrink-0">{icon}</span>}
      <span className="font-semibold text-sm sm:text-base leading-tight">{message}</span>
    </div>
  );
}

export default function UserProfilePage() {
  const { profile, updateProfile, initializeFromUser } = useUserProfileStore();
  const { user } = useAuthStore();
  const { points, level, pointsToNextLevel, achievements, rewards, streak, claimReward, addPoints, updateStreak } = useGamificationStore();
  const { posts, addPost, getPostsByCategory, likePost, unlikePost, setPosts, deletePost } = useCommunityStore();
  const { addRequest, getUserRequest } = useDesignerRequestsStore();
  const [activeTab, setActiveTab] = useState("creaciones");
  const [isClient, setIsClient] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedPostImage, setSelectedPostImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [showDesignerRequest, setShowDesignerRequest] = useState(false);
  const [designerFormData, setDesignerFormData] = useState({
    portfolioUrl: '',
    experience: '',
    motivation: ''
  });
  const [submittingRequest, setSubmittingRequest] = useState(false);
  const router = useRouter();
  const recommendationTitle = profile.interests && profile.interests.length > 0 
    ? "Recomendado para Ti" 
    : "Tendencias del Momento";

  // Estados locales para las imágenes que se actualizan inmediatamente
  const [currentCover, setCurrentCover] = useState<string>(profile.coverImage || '');
  const [currentAvatar, setCurrentAvatar] = useState<string>(typeof profile.avatar === 'string' ? profile.avatar : '/images/placeholder1.png');
  const [showCoverEdit, setShowCoverEdit] = useState(false);
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);

  const [toasts, setToasts] = useState<{ id: number; message: string; icon?: React.ReactNode }[]>([]);
  const prevAchievements = useRef(achievements);
  const prevLevel = useRef(level);

  const searchParams = useSearchParams();

  // Efecto separado para cliente
  useEffect(() => {
    setIsClient(true);
    // Si viene de la URL, abrir el modal automáticamente
    if (searchParams && searchParams.get('solicitarDisenador') === '1') {
      setShowDesignerRequest(true);
    }
  }, []);

  // Efecto separado para inicialización del usuario
  useEffect(() => {
    if (user && isClient) {
      console.log('Initializing profile for user:', user.name, user.id);
      initializeFromUser(user);
    }
  }, [user, isClient, initializeFromUser]);

  // Efecto para limpiar posts con IDs duplicados (ejecutar una sola vez)
  useEffect(() => {
    if (isClient && posts.length > 0) {
      console.log('🧹 Verificando IDs duplicados en posts...');
      
      const seenIds = new Set();
      let hasProblems = false;
      
      const cleanedPosts = posts.map((post) => {
        const idStr = String(post.id);
        // Buscar IDs específicos problemáticos o duplicados
        if (seenIds.has(idStr) || idStr === '1751322571217' || idStr === '1751322571212' || idStr.includes('e+')) {
          hasProblems = true;
          const newId = `post_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
          console.log(`🔧 Cambiando ID problemático ${post.id} → ${newId}`);
          seenIds.add(newId);
          return { ...post, id: newId };
        }
        seenIds.add(idStr);
        return post;
      });
      
      if (hasProblems) {
        console.log('✅ Aplicando corrección de IDs...');
        setPosts(cleanedPosts);
      }
    }
  }, [isClient, posts.length > 0]); // Solo cuando hay posts cargados

  // Efecto separado para sincronizar estados visuales
  useEffect(() => {
    if (profile.id) {
      setCurrentCover(profile.coverImage || '');
      setCurrentAvatar(typeof profile.avatar === 'string' ? profile.avatar : '/images/placeholder1.png');
    }
  }, [profile.coverImage, profile.avatar, profile.id]);

  // Función para generar IDs únicos simples
  const generateUniqueId = () => {
    return `post_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setCurrentCover(result); // Actualiza inmediatamente la vista
        updateProfile({ coverImage: result }); // Guarda en el store
        setShowCoverEdit(false); // Cierra el modal
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setCurrentAvatar(result); // Actualiza inmediatamente la vista
        updateProfile({ avatar: result }); // Guarda en el store
        setShowAvatarEdit(false); // Cierra el modal
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;
    setIsPosting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const authorName = profile.name || user?.name || user?.email?.split('@')[0] || "Usuario Anónimo";
    console.log('Creating post with author name:', authorName);
    const newPost = {
      id: generateUniqueId(), // ID único garantizado
      author: {
        name: authorName,
        avatar: (profile.avatar as string) || "/images/placeholder1.png",
        verified: false,
        badge: "Mi Estilo"
      },
      content: postContent,
      image: selectedPostImage || "/images/products/blazer1.jpg",
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: "",
      tags: ["#MiCreacion", "#Perfil"],
      category: 'profile' as const,
              aiAnalysis: {
          sentiment: "Positivo",
          styleMatch: 89, // Valor fijo para evitar problemas de hidratación
          trendAlignment: 85 // Valor fijo para evitar problemas de hidratación
        },
      createdAt: Date.now()
    };
    addPost(newPost);
    console.log('Post added to store. New post:', newPost);
    addPoints(25, 'post_creation');
    updateStreak();
    setPostContent('');
    setSelectedPostImage(null);
    setIsPosting(false);
    setShowCreatePost(false);
    setTimeout(() => {
      console.log('Posts after adding:', posts);
    }, 100);
  };

  const handleDesignerRequest = async () => {
    if (!designerFormData.experience.trim() || !designerFormData.motivation.trim()) {
      await showError({
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos requeridos antes de enviar la solicitud.',
        confirmText: 'Entendido'
      });
      return;
    }

    setSubmittingRequest(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    addRequest({
      userId: user?.id || '',
      userName: profile.name || user?.name || '',
      userEmail: profile.email || user?.email || '',
      userAvatar: (profile.avatar as string) || '/images/placeholder1.png',
      portfolioUrl: designerFormData.portfolioUrl,
      experience: designerFormData.experience,
      motivation: designerFormData.motivation
    });

    // Reward points for application
    addPoints(50, 'designer_application');

    setSubmittingRequest(false);
    setShowDesignerRequest(false);
    setDesignerFormData({
      portfolioUrl: '',
      experience: '',
      motivation: ''
    });

    await showSuccess({
      title: '¡Solicitud enviada exitosamente!',
      text: 'Tu solicitud ha sido enviada al equipo de administración. Recibirás una respuesta en 24-48 horas y se han agregado +50 puntos a tu perfil.',
      timer: 5000
    });
  };

  // Get only profile posts for current user - Using user name for matching
  const userName = profile.name || user?.name || user?.email?.split('@')[0] || '';
  const userPosts = userName ? getPostsByCategory('profile', userName) : [];
  
  // Debug logs
  console.log('Current user name for filtering:', userName);
  console.log('All posts in store:', posts);
  console.log('Filtered user posts:', userPosts);
  
  // Agregar posts de ejemplo si no tiene ninguno (solo para mostrar el diseño)
  const examplePosts: CommunityPost[] = userPosts.length === 0 ? [
    {
      id: 9001,
      author: {
        name: userName,
        avatar: (profile.avatar as string) || "/images/placeholder1.png",
        verified: false,
        badge: "Mi Estilo"
      },
      content: "Mi look favorito para el otoño 🍂 Combinando colores tierra con toques dorados",
      image: "/images/products/blazer1.jpg",
      likes: 24,
      comments: 3,
      shares: 1,
      timestamp: "2d",
      tags: ["#MiEstilo", "#Otoño"],
      category: 'profile',
      isLiked: true,
      aiAnalysis: {
        sentiment: "Positivo",
        styleMatch: 89,
        trendAlignment: 85
      },
      createdAt: 1704067200000 - 1000 * 60 * 60 * 24 * 3 // Fecha fija - 3 días atrás
    },
    {
      id: 9002,
      author: {
        name: userName,
        avatar: (profile.avatar as string) || "/images/placeholder1.png",
        verified: false,
        badge: "Mi Estilo"
      },
      content: "Casual pero elegante ✨ Perfect para una tarde de compras",
      image: "/images/products/jeans1.jpg",
      likes: 31,
      comments: 7,
      shares: 2,
      timestamp: "1w",
      tags: ["#Casual", "#Elegante"],
      category: 'profile',
      isLiked: false,
      aiAnalysis: {
        sentiment: "Muy Positivo",
        styleMatch: 92,
        trendAlignment: 88
      },
      createdAt: 1704067200000 - 1000 * 60 * 60 * 24 * 2 // Fecha fija - 2 días atrás
    },
    {
      id: 9003,
      author: {
        name: userName,
        avatar: (profile.avatar as string) || "/images/placeholder1.png",
        verified: false,
        badge: "Mi Estilo"
      },
      content: "Vestido de noche para ocasión especial 💫",
      image: "/images/products/dress1.jpg",
      likes: 48,
      comments: 12,
      shares: 5,
      timestamp: "2w",
      tags: ["#Elegante", "#Noche"],
      category: 'profile',
      isLiked: true,
      aiAnalysis: {
        sentiment: "Positivo",
        styleMatch: 95,
        trendAlignment: 91
      },
      createdAt: 1704067200000 - 1000 * 60 * 60 * 24 // Fecha fija - 1 día atrás
    }
  ] : [];
  
  // Ordenar los posts reales por createdAt descendente (más nuevo primero)
  const orderedUserPosts = [...userPosts].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  
  // Mostrar solo posts reales si existen, si no, mostrar los de ejemplo
  const displayPosts = orderedUserPosts.length > 0
    ? orderedUserPosts
    : examplePosts;

  // Toast helpers
  const showToast = (message: string, icon?: React.ReactNode) => {
    const id = Date.now() + Math.floor(Math.random() * 1000); // ID único simple
    setToasts((prev) => [...prev, { id, message, icon }]);
  };
  const removeToast = (id: number) => setToasts((prev) => prev.filter(t => t.id !== id));

  // Detectar logros desbloqueados
  useEffect(() => {
    if (prevAchievements.current) {
      achievements.forEach((ach) => {
        const prev = prevAchievements.current.find(a => a.id === ach.id);
        if (!prev?.unlocked && ach.unlocked) {
          showToast(`¡Logro desbloqueado: ${ach.title}!`, ach.icon);
        }
      });
    }
    prevAchievements.current = achievements;
  }, [achievements]);

  // Detectar subida de nivel
  useEffect(() => {
    if (prevLevel.current && level > prevLevel.current) {
      showToast(`¡Nivel ${level} alcanzado!`, <Star className="inline-block text-yellow-300" size={22} />);
    }
    prevLevel.current = level;
  }, [level]);

  const handleDeletePost = async (postId: number) => {
    const result = await showDeleteConfirmation('esta publicación');
    
    if (result.isConfirmed) {
      deletePost(postId);
      addPoints(5, 'content_creation');
      showToast('Publicación eliminada', <Trash className="text-red-500" size={18} />);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Toasts visuales - Responsive */}
      <div className="fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} icon={toast.icon} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
      {/* Portada editable */}
      <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8 shadow-sm border border-gray-100 flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100">
        {currentCover ? (
          <Image src={currentCover} alt="Portada del perfil" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <UploadCloud size={48} className="mx-auto mb-2 text-purple-300" />
              <span className="text-sm">Sin portada</span>
            </div>
          </div>
        )}
        <button
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-purple-700 rounded-full p-2 shadow-md flex items-center gap-1 transition-all"
          onClick={() => setShowCoverEdit(true)}
        >
          <Edit3 size={16} />
          <span className="text-xs font-semibold hidden md:block">Cambiar portada</span>
        </button>
        {showCoverEdit && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4 shadow-2xl w-full max-w-md">
              <UploadCloud size={40} className="text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800 text-center">Cambiar Portada</h3>
              <p className="text-sm text-gray-600 text-center">Sube una imagen para personalizar tu perfil</p>
              
              <div className="w-full space-y-3">
                <label className="w-full block">
                  <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
                  <div className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 px-4 text-center cursor-pointer transition-colors font-semibold">
                    📁 Seleccionar archivo
                  </div>
                </label>
                
                <button 
                  onClick={() => setShowCoverEdit(false)} 
                  className="w-full px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300"
                >
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header perfil */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-sm border border-gray-100 -mt-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-32 md:w-36 md:h-36 -mt-24 border-4 border-white rounded-full shadow-lg bg-gray-100">
              <Image src={currentAvatar} alt="Avatar del perfil" fill className="object-cover rounded-full" />
              <button
                className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 shadow-lg transition-colors"
                title="Cambiar foto de perfil"
                onClick={() => setShowAvatarEdit(true)}
              >
                <Edit3 size={16} />
              </button>
              {showAvatarEdit && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 rounded-full">
                  <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4 shadow-2xl w-64">
                    <UploadCloud size={40} className="text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-800 text-center">Cambiar Avatar</h3>
                    <p className="text-sm text-gray-600 text-center">Sube tu foto de perfil</p>
                    
                    <div className="w-full space-y-3">
                      <label className="w-full block">
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        <div className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 px-4 text-center cursor-pointer transition-colors font-semibold">
                          📷 Seleccionar foto
                        </div>
                      </label>
                      
                      <button 
                        onClick={() => setShowAvatarEdit(false)} 
                        className="w-full px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300"
                      >
                        ❌ Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col items-center md:items-start w-full">
              <div className="flex flex-col md:flex-row items-center justify-between w-full mb-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                  <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200">
                    <Crown size={14} className="text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700">Fashionista</span>
                  </div>
                </div>
              </div>
              {profile.username && (
                <p className="text-md font-mono text-gray-500 mb-3">@{profile.username}</p>
              )}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-3 w-full">
                {profile.location && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={16} className="text-purple-500" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.interests && profile.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span key={interest} className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-200">{interest}</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic">Sin intereses seleccionados</span>
                )}
                {profile.stylePreference && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star size={16} className="text-yellow-500" />
                    <span className="font-medium">Estilo:</span>
                    <span className="font-semibold text-gray-800 capitalize">{profile.stylePreference}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6 mb-3 w-full">
                {profile.email && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Mail size={14} />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Phone size={14} />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                <div className="text-center">
                  <p className="font-bold text-lg text-gray-800">{profile.posts}</p>
                  <span>publicaciones</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-gray-800">{profile.followers}</p>
                  <span>seguidores</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-gray-800">{profile.following}</p>
                  <span>siguiendo</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-2 text-center md:text-left max-w-xl">{profile.bio}</p>
              <Link href="https://www.loremipsum.com" target="_blank" className="inline-flex items-center gap-1 text-purple-600 hover:underline text-xs font-medium"><LinkIcon size={14} /> www.loremipsum.com</Link>
            </div>
          </div>
        </div>

        {/* Gamification Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Trophy className="text-yellow-500" size={24} />
              Tu Progreso
            </h3>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
              <Zap className="text-purple-600" size={16} />
              <span className="font-bold text-purple-700">Nivel {level}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Points */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-3">
                <Gift size={32} className="mx-auto mb-2" />
                <div className="text-2xl font-bold">{points}</div>
                <div className="text-sm opacity-90">Puntos</div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-6 text-white mb-3">
                <Target size={32} className="mx-auto mb-2" />
                <div className="text-2xl font-bold">{pointsToNextLevel}</div>
                <div className="text-sm opacity-90">Para siguiente nivel</div>
              </div>
            </div>

            {/* Streak */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-3">
                <Flame size={32} className="mx-auto mb-2" />
                <div className="text-2xl font-bold">{streak.current}</div>
                <div className="text-sm opacity-90">Días seguidos</div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="text-purple-600" size={20} />
              Logros Recientes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {achievements.slice(0, 6).map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    achievement.unlocked
                      ? 'border-yellow-200 bg-yellow-50 shadow-md animate-pulse'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className="text-xs font-semibold text-gray-800">{achievement.title}</div>
                  <div className="text-xs text-purple-600 font-bold">+{achievement.points}pts</div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rewards */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Gift className="text-pink-600" size={20} />
              Recompensas Disponibles
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.filter(r => r.available && !r.claimed).slice(0, 3).map((reward) => (
                <div
                  key={reward.id}
                  className={`border rounded-xl p-4 transition-all relative ${
                    points >= reward.cost 
                      ? 'border-gray-200 hover:border-purple-300' 
                      : 'border-gray-300 bg-gray-50 opacity-75'
                  }`}
                >
                  {/* Lock Icon for Blocked Rewards */}
                  {points < reward.cost && (
                    <div className="absolute top-3 right-3">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`font-semibold ${points >= reward.cost ? 'text-gray-800' : 'text-gray-500'}`}>
                      {reward.title}
                    </h5>
                    <span className={`text-sm font-bold ${points >= reward.cost ? 'text-purple-600' : 'text-gray-400'}`}>
                      {reward.cost}pts
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${points >= reward.cost ? 'text-gray-600' : 'text-gray-500'}`}>
                    {reward.description}
                  </p>
                  <button
                    onClick={() => {
                      if (points >= reward.cost) {
                        claimReward(reward.id);
                        showToast(`¡${reward.title} canjeado exitosamente!`, <Gift className="inline-block text-pink-200" size={22} />);
                      }
                    }}
                    className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      points >= reward.cost
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={points < reward.cost}
                  >
                    {points < reward.cost && <Lock size={14} />}
                    {points >= reward.cost ? 'Canjear' : 'Bloqueado'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-6 border-b border-gray-200 bg-white rounded-t-2xl p-4 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 focus:outline-none ${
                activeTab === tab.key 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md" 
                  : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
        {/* Content based on active tab */}
        <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          {activeTab === "creaciones" && (
            <>
              {/* Create Post Button - Responsive */}
              <div className="mb-6 flex justify-center sm:justify-start">
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base shadow-md"
                >
                  <Plus size={18} />
                  <span>Nueva Publicación</span>
                </button>
              </div>

              {/* Create Post Modal - Responsive */}
              {showCreatePost && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
                  <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl max-h-[95vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">Nueva Publicación</h3>
                      <button
                        onClick={() => {
                          setShowCreatePost(false);
                          setPostContent('');
                          setSelectedPostImage(null);
                        }}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Comparte tu creación o look de moda..."
                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-purple-300 focus:outline-none resize-none text-sm sm:text-base"
                        rows={4}
                        disabled={isPosting}
                      />

                      {selectedPostImage && (
                        <div className="relative">
                          <Image 
                            src={selectedPostImage} 
                            alt="Selected" 
                            width={200} 
                            height={200} 
                            className="rounded-lg object-cover w-full h-32 sm:h-48"
                          />
                          <button 
                            onClick={() => setSelectedPostImage(null)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-sm transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <label className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer border border-purple-200">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const result = ev.target?.result as string;
                                  setSelectedPostImage(result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            disabled={isPosting}
                          />
                          <Camera size={16} />
                          <span>Agregar Foto</span>
                        </label>

                        <button
                          onClick={handleCreatePost}
                          disabled={isPosting || !postContent.trim()}
                          className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-semibold"
                        >
                          {isPosting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Publicando...</span>
                            </>
                          ) : (
                            <>
                              <Send size={16} />
                              <span>Publicar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* User's Posts - Instagram-style Grid */}
              {displayPosts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2 mb-6">
                  {displayPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="relative aspect-square group cursor-pointer rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Imagen principal */}
                      <div className="relative w-full h-full">
                        <Image 
                          src={post.image || '/images/placeholder1.png'} 
                          alt="Post" 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      
                      {/* Overlay con información al hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="text-white text-center space-y-3 p-3">
                          <div className="flex items-center justify-center space-x-6 text-sm font-semibold">
                            <div className="flex items-center space-x-1">
                              <Heart size={18} className={post.isLiked ? 'fill-current text-pink-400' : 'text-white'} />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle size={18} />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                          {post.content && (
                            <p className="text-xs px-2 line-clamp-2 opacity-90 leading-relaxed">
                              {post.content.substring(0, 80)}...
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Botón eliminar SOLO para el autor */}
                      {user && post.author.name === (profile.name || user.name || user.email?.split('@')[0]) && (
                        <button
                          onClick={() => handleDeletePost(typeof post.id === 'string' ? parseInt(post.id) : post.id)}
                          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center z-20 shadow-lg"
                          title="Eliminar publicación"
                        >
                          <Trash size={16} />
                        </button>
                      )}

                      {/* Badge de tiempo: solo para posts de ejemplo */}
                      {examplePosts.some(ex => ex.id === post.id) && (
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                          {post.timestamp}
                        </div>
                      )}

                      {/* Like button absoluto */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (post.isLiked) {
                            unlikePost(post.id);
                          } else {
                            likePost(post.id);
                            addPoints(5, 'like_post');
                          }
                        }}
                        className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 shadow-md z-10 ${
                          post.isLiked 
                            ? 'bg-pink-500 text-white scale-110' 
                            : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-pink-500 hover:text-white hover:scale-110'
                        }`}
                      >
                        <Heart size={14} className={post.isLiked ? 'fill-current' : ''} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border border-gray-200">
                  <div className="max-w-sm mx-auto px-4">
                    <Camera size={40} className="sm:hidden mx-auto text-gray-400 mb-3" />
                    <Camera size={48} className="hidden sm:block mx-auto text-gray-400 mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">¡Crea tu primera publicación!</h3>
                    <p className="text-sm sm:text-base text-gray-500 mb-4 leading-relaxed">
                      Comparte tus looks, outfits y creaciones de moda con la comunidad
                    </p>
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="w-full sm:w-auto px-4 py-2 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm sm:text-base font-semibold shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Plus size={16} />
                        Comenzar a publicar
                      </span>
                    </button>
                  </div>
                </div>
              )}

              <Recommendations title={recommendationTitle} strict={true} from="profile" />
            </>
          )}
          {activeTab === "favoritos" && (
            <div className="space-y-3 sm:space-y-4">
              {mockFavorites.map((item) => (
                <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name || item.content || 'Favorito'} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.name || item.content}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{item.type === 'product' ? `$${item.price}` : `por ${item.author}`}</p>
                    <p className="text-xs text-gray-500">Guardado hace {item.likedAt}</p>
                  </div>
                  <button className="text-pink-500 hover:text-pink-600 p-1 flex-shrink-0">
                    <Heart size={18} className="sm:hidden fill-current" />
                    <Heart size={20} className="hidden sm:block fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {activeTab === "eventos" && (
            <div className="space-y-3 sm:space-y-4">
              {mockEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    event.status === 'upcoming' ? 'bg-purple-100' : 'bg-emerald-100'
                  }`}>
                    <Calendar size={20} className={`sm:hidden ${event.status === 'upcoming' ? 'text-purple-600' : 'text-emerald-600'}`} />
                    <Calendar size={24} className={`hidden sm:block ${event.status === 'upcoming' ? 'text-purple-600' : 'text-emerald-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{event.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{event.date} • {event.time}</p>
                    <p className="text-xs text-gray-500">{event.attendees} asistentes</p>
                  </div>
                  <span className={`px-2 py-1 sm:px-3 rounded-full text-xs font-semibold flex-shrink-0 ${
                    event.status === 'upcoming' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {event.status === 'upcoming' ? 'Próximo' : 'Asistido'}
                  </span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "compras" && (
            <div className="space-y-3 sm:space-y-4">
              {mockPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={purchase.image} alt={purchase.product} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{purchase.product}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">${purchase.price}</p>
                    <p className="text-xs text-gray-500">Comprado el {purchase.date}</p>
                  </div>
                  <span className={`px-2 py-1 sm:px-3 rounded-full text-xs font-semibold flex-shrink-0 ${
                    purchase.status === 'delivered' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {purchase.status === 'delivered' ? 'Entregado' : 'En camino'}
                  </span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "mensajes" && (
            <div className="space-y-3 sm:space-y-4">
              {mockMessages.map((message) => (
                <div key={message.id} className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-colors ${
                  message.unread ? 'border-purple-200 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                }`}>
                  <div className="relative flex-shrink-0">
                    <Image 
                      src={message.avatar} 
                      alt={message.sender} 
                      width={40} 
                      height={40} 
                      className="sm:hidden rounded-full object-cover" 
                    />
                    <Image 
                      src={message.avatar} 
                      alt={message.sender} 
                      width={48} 
                      height={48} 
                      className="hidden sm:block rounded-full object-cover" 
                    />
                    {message.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-purple-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{message.sender}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{message.message}</p>
                    <p className="text-xs text-gray-500">Hace {message.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0">
                    <MoreHorizontal size={14} className="sm:hidden" />
                    <MoreHorizontal size={16} className="hidden sm:block" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para solicitar ser diseñador */}
      {showDesignerRequest && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowDesignerRequest(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              title="Cerrar"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-purple-700 mb-4">Solicitar ser Diseñador</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleDesignerRequest();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Portafolio (opcional)</label>
                <input
                  type="url"
                  value={designerFormData.portfolioUrl}
                  onChange={e => setDesignerFormData(f => ({ ...f, portfolioUrl: e.target.value }))}
                  className="w-full border rounded-lg p-2"
                  placeholder="https://miportafolio.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experiencia</label>
                <textarea
                  value={designerFormData.experience}
                  onChange={e => setDesignerFormData(f => ({ ...f, experience: e.target.value }))}
                  className="w-full border rounded-lg p-2"
                  rows={2}
                  required
                  placeholder="Ej: 2 años diseñando ropa urbana"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Motivación</label>
                <textarea
                  value={designerFormData.motivation}
                  onChange={e => setDesignerFormData(f => ({ ...f, motivation: e.target.value }))}
                  className="w-full border rounded-lg p-2"
                  rows={2}
                  required
                  placeholder="¿Por qué quieres ser diseñador en la plataforma?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg mt-2 transition-colors"
                disabled={submittingRequest}
              >
                {submittingRequest ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 