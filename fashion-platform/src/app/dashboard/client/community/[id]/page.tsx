'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Users, Heart, MessageSquare, Share2, 
  Crown, Verified, MapPin, Calendar, Plus, Eye
} from 'lucide-react';
import Image from 'next/image';
import { useCommunityStore } from '@/store/community.store';
import { useAuthStore } from '@/store/auth.store';

export default function CommunityProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const { posts } = useCommunityStore();
  const { user: currentUser } = useAuthStore();

  // Buscar el usuario por nombre o id en los posts reales
  const userPosts = posts.filter(
    (p) =>
      p.author.name.toLowerCase().replace(/\s/g, '') === userId.toLowerCase().replace(/\s/g, '') ||
      p.author.name.toLowerCase().includes(userId.toLowerCase())
  );
  const user = userPosts.length > 0
    ? {
        id: userId,
        name: userPosts[0].author.name,
        username: '@' + userPosts[0].author.name.toLowerCase().replace(/\s/g, '_'),
        bio: 'Apasionado por la moda y la creatividad. Comparte tus looks y conecta con la comunidad.',
        avatar: userPosts[0].author.avatar,
        verified: userPosts[0].author.verified,
        followers: '-',
        following: '-',
        posts: userPosts.length,
        location: 'Desconocida',
        joinDate: '2024',
        badge: userPosts[0].author.badge,
        recentPosts: userPosts.map((p) => ({
          id: p.id,
          image: p.image,
          caption: p.content,
          likes: p.likes,
          comments: p.comments,
          timestamp: p.timestamp
        }))
      }
    : null;

  // Persistencia de seguidores por usuario autenticado
  const [isFollowing, setIsFollowing] = useState(() => {
    if (!currentUser || !user) return false;
    const key = `following_${currentUser.id}`;
    const following = JSON.parse(localStorage.getItem(key) || '[]');
    return following.includes(user.id);
  });

  const handleFollow = () => {
    if (!currentUser || !user) return;
    const key = `following_${currentUser.id}`;
    const following = JSON.parse(localStorage.getItem(key) || '[]');
    let updated;
    if (isFollowing) {
      updated = following.filter((id: string) => id !== user.id);
    } else {
      updated = [...following, user.id];
    }
    localStorage.setItem(key, JSON.stringify(updated));
    setIsFollowing(!isFollowing);
  };

  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <div>
          <h2 className="text-2xl font-bold mb-2">Usuario no encontrado</h2>
          <button onClick={() => router.back()} className="text-purple-600 underline">Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Volver a Comunidad</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:border-purple-200 transition-all">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 sticky top-24">
              {/* Avatar & Basic Info */}
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {user.verified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                      <Verified size={16} className="text-white" />
                    </div>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                <p className="text-purple-600 font-medium mb-2">{user.username}</p>
                
                {user.badge && (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Crown size={14} />
                    {user.badge}
                  </span>
                )}
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-center leading-relaxed mb-6">{user.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.posts}</div>
                  <div className="text-sm text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followers}</div>
                  <div className="text-sm text-gray-500">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.following}</div>
                  <div className="text-sm text-gray-500">Siguiendo</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleFollow}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Users size={16} />
                      Siguiendo
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Seguir
                    </>
                  )}
                </button>
                
                <button className="w-full py-3 px-6 rounded-xl font-semibold border border-purple-200 text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                  <MessageSquare size={16} />
                  Mensaje
                </button>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{user.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">Se unió en {user.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                {[
                  { key: 'posts', label: 'Posts' },
                  { key: 'about', label: 'Acerca de' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all flex-1 justify-center ${
                      activeTab === key
                        ? 'bg-white text-purple-700 shadow-md'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'posts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.recentPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-64">
                      <Image
                        src={post.image}
                        alt={post.caption}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-gray-800 mb-2">{post.caption}</p>
                      <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <span><Heart size={16} className="inline mr-1" /> {post.likes}</span>
                        <span><MessageSquare size={16} className="inline mr-1" /> {post.comments}</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {user.recentPosts.length === 0 && (
                  <div className="col-span-2 text-center text-gray-400 py-12">Este usuario aún no tiene publicaciones.</div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Acerca de {user.name}</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Información</h3>
                    <p className="text-gray-600">Expert en moda sostenible con más de 5 años de experiencia en el diseño de colecciones eco-friendly.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Estadísticas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600">2.3M</div>
                        <div className="text-sm text-gray-600">Total de Likes</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">45.6M</div>
                        <div className="text-sm text-gray-600">Total de Vistas</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 