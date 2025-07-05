'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import { useUserProfileStore } from '@/store/userProfile.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'designer'>('client');
  const [error, setError] = useState('');
  const { register } = useAuthStore();
  const { clearCart } = useCartStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Solo limpiar el carrito al registrarse (nuevo usuario)
      clearCart();
      
      const success = await register(name, email, password, role);
      if (success) {
        // Inicializar el perfil con datos básicos
        const user = useAuthStore.getState().user;
        if (user) {
          // Solo resetear el perfil para usuarios nuevos (no tocar posts ni gamificación)
          useUserProfileStore.getState().initializeFromUser(user);
        }
        
        if (role === 'designer') {
          router.push('/dashboard/designer');
        } else {
          router.push('/dashboard/client');
        }
      } else {
        setError('Error al registrar usuario');
      }
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-white to-secondary-light animate-fade-in-up">
      <div className="w-full max-w-3xl bg-white/90 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row animate-fadeIn">
        {/* Imagen lateral */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-main to-primary-light items-center justify-center p-8">
          <Image
            src="/images/campera.png"
            alt="Registro visual"
            width={320}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>
        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo.svg"
              alt="Ganway Logo"
              width={120}
              height={40}
              className="drop-shadow-md"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-center mb-6 text-primary-dark tracking-tight">Crea tu cuenta</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md shadow animate-fadeIn">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-secondary-dark mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-primary-light rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main bg-white text-gray-800 placeholder-gray-400 transition-all shadow-sm"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-secondary-dark mb-1">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-primary-light rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main bg-white text-gray-800 placeholder-gray-400 transition-all shadow-sm"
                placeholder="tucorreo@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-secondary-dark mb-1">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-primary-light rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main bg-white text-gray-800 placeholder-gray-400 transition-all shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary-dark mb-2">¿Cuál es tu rol?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`p-3 border-2 rounded-lg text-left transition-all font-medium shadow-sm ${role === 'client' ? 'border-primary-main bg-primary-light/20 text-primary-dark' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                >
                  <span className="text-lg">🛍️ Cliente</span>
                  <div className="text-xs">Comprar productos</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('designer')}
                  className={`p-3 border-2 rounded-lg text-left transition-all font-medium shadow-sm ${role === 'designer' ? 'border-primary-main bg-primary-light/20 text-primary-dark' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                >
                  <span className="text-lg">🎨 Diseñador</span>
                  <div className="text-xs">Vender mis diseños</div>
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full mt-2 shadow-md hover:scale-[1.02] transition-transform" variant="primary" size="lg">
              Crear cuenta <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="mt-4 text-center text-gray-500 text-sm">O regístrate con:</div>
            <div className="flex justify-center gap-3 mt-2">
              <Button variant="outline" className="flex items-center gap-2 px-6 py-2 shadow-sm hover:bg-gray-50">
                <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} />
                <span>Google</span>
              </Button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="font-semibold text-primary-main hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 