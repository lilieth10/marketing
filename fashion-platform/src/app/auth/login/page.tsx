'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const { clearCart } = useCartStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Solo limpiar el carrito al hacer login
      clearCart();
      
      const success = await login(email.trim(), password);
      if (success) {
        // Obtener el usuario actual del store
        const currentUser = useAuthStore.getState().user;
        
        // Redirigir según el rol
        if (currentUser) {
          switch (currentUser.role) {
            case 'admin':
              router.push('/dashboard/admin');
              break;
            case 'designer':
              router.push('/dashboard/designer');
              break;
            case 'client':
              router.push('/dashboard/client');
              break;
            default:
              router.push('/dashboard/client');
          }
        }
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-white to-secondary-light animate-fade-in-up">
      <div className="w-full max-w-3xl bg-white/90 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row animate-fadeIn">
        {/* Imagen lateral */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-main to-primary-light items-center justify-center p-8">
          <Image
            src="/images/hombres.webp"
            alt="Login visual"
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
          <h2 className="text-3xl font-extrabold text-center mb-6 text-primary-dark tracking-tight">Bienvenido de nuevo</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md shadow animate-fadeIn">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-secondary-dark mb-1">Correo electrónico</label>
              <div className="relative">
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
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-secondary-dark mb-1">Contraseña</label>
              <div className="relative">
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
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Recordarme</label>
              </div>
              <a href="#" className="text-sm font-medium text-primary-main hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <Button type="submit" className="w-full mt-2 shadow-md hover:scale-[1.02] transition-transform" variant="primary" size="lg">
              Iniciar sesión <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="mt-4 text-center text-gray-500 text-sm">O inicia sesión con:</div>
            <div className="flex justify-center gap-3 mt-2">
              <Button variant="outline" className="flex items-center gap-2 px-6 py-2 shadow-sm hover:bg-gray-50">
                <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} />
                <span>Google</span>
              </Button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/register" className="font-semibold text-primary-main hover:underline">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 