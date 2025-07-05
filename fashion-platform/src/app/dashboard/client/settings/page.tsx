'use client';

import React, { useState, useEffect } from 'react';
import { useUserProfileStore } from '@/store/userProfile.store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { toast } from 'sonner';
import { CheckCircle, User, Heart, Image as ImageIcon, Bell, ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  { id: 1, name: 'Información Personal', icon: User },
  { id: 2, name: 'Tus Intereses', icon: Heart },
  { id: 3, name: 'Preferencias de Estilo', icon: ImageIcon },
  { id: 4, name: 'Notificaciones', icon: Bell },
];

const interestOptions = [
  'Moda Sostenible', 'Ropa Vintage', 'Streetwear', 'Alta Costura',
  'Minimalismo', 'Accesorios', 'Calzado', 'Moda Circular',
  'DIY (Hazlo tú mismo)', 'Marcas de Lujo', 'Moda Local', 'Tendencias'
];

const stylePreferences = [
  { id: 'style1', name: 'Clásico Atemporal', image: 'https://placehold.co/400x400/EFEFEF/333333?text=Estilo+1' },
  { id: 'style2', name: 'Moderno y Urbano', image: 'https://placehold.co/400x400/EFEFEF/333333?text=Estilo+2' },
  { id: 'style3', name: 'Bohemio y Relajado', image: 'https://placehold.co/400x400/EFEFEF/333333?text=Estilo+3' },
  { id: 'style4', name: 'Minimalista y Chic', image: 'https://placehold.co/400x400/EFEFEF/333333?text=Estilo+4' },
];

export default function UserSettingsPage() {
  const { profile, updateProfile } = useUserProfileStore();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    // Sincronizar el estado local si el perfil del store cambia por alguna razón externa
    setFormData(profile);
  }, [profile]);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  
  const handleSave = () => {
    updateProfile(formData);
    toast.success('¡Perfil actualizado con éxito!');
    router.push('/dashboard/client/profile');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleInterest = (interest: string) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const toggleNotification = (key: keyof typeof formData.notifications) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl bg-gray-50 rounded-2xl">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-800">Configura tu Perfil</h1>
      <p className="text-center text-gray-500 mb-10">Personaliza tu experiencia para recibir las mejores recomendaciones.</p>
      
      {/* Progress Bar */}
      <div className="mb-12 px-4">
        <ol className="flex items-center w-full">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <li className="flex w-full items-center">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep > step.id ? 'bg-purple-600' : currentStep === step.id ? 'bg-purple-500 scale-110' : 'bg-gray-300'} text-white transition-all duration-300`}>
                    {currentStep > step.id ? <CheckCircle size={24} /> : <step.icon size={20} />}
                  </div>
                  <div className="ml-4">
                    <h3 className={`font-medium ${currentStep >= step.id ? 'text-gray-800' : 'text-gray-500'}`}>{step.name}</h3>
                  </div>
                </div>
              </li>
              {index < steps.length - 1 && <li className="flex-auto"><div className={`border-t-2 h-0 ${currentStep > step.id ? 'border-purple-600' : 'border-gray-300'} transition-all duration-300`}></div></li>}
            </React.Fragment>
          ))}
        </ol>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 min-h-[400px]">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Información Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Nombre" name="name" value={formData.name || ''} onChange={handleInputChange} />
              <InputField label="Nombre de Usuario" name="username" value={formData.username || ''} onChange={handleInputChange} />
              <InputField label="Correo Electrónico" name="email" value={formData.email || ''} onChange={handleInputChange} type="email" />
              <InputField label="Teléfono" name="phone" value={formData.phone || ''} onChange={handleInputChange} />
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Tus Intereses</h2>
            <p className="text-gray-600 mb-6">Selecciona tus intereses para personalizar el contenido que ves.</p>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map(interest => (
                <Chip key={interest} label={interest} selected={formData.interests.includes(interest)} onClick={() => toggleInterest(interest)} />
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Style Preferences */}
        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Preferencias de Estilo</h2>
            <p className="text-gray-600 mb-6">Elige el estilo que mejor te representa.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stylePreferences.map(style => (
                <StyleCard key={style.id} {...style} selected={formData.stylePreference === style.id} onClick={() => setFormData(p => ({...p, stylePreference: style.id}))} />
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Notifications */}
        {currentStep === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Notificaciones</h2>
            <p className="text-gray-600 mb-6">Gestiona cómo y cuándo te notificamos.</p>
            <div className="space-y-4 max-w-md">
              <NotificationToggle label="Nuevos lanzamientos y colecciones" enabled={formData.notifications.news} onToggle={() => toggleNotification('news')} />
              <NotificationToggle label="Promociones y ofertas especiales" enabled={formData.notifications.promotions} onToggle={() => toggleNotification('promotions')} />
              <NotificationToggle label="Actividad de la comunidad (nuevos seguidores, comentarios)" enabled={formData.notifications.community} onToggle={() => toggleNotification('community')} />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <div>
          {currentStep > 1 && (
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Anterior
            </Button>
          )}
        </div>
        <div>
          {currentStep < steps.length && (
            <Button onClick={handleNext} variant="primary" className="flex items-center gap-2">
              Siguiente
              <ArrowRight size={16} />
            </Button>
          )}
          {currentStep === steps.length && (
            <Button onClick={handleSave} variant="primary" className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <CheckCircle size={16} />
              Guardar Cambios
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Sub-components for better structure ---

const InputField = ({ label, name, value, onChange, type = 'text' }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input type={type} id={name} name={name} value={value} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"/>
  </div>
);

const Chip = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${selected ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:border-purple-500'}`}>
    {label}
  </button>
);

const StyleCard = ({ name, image, selected, onClick }: { name: string, image: string, selected: boolean, onClick: () => void }) => (
  <div onClick={onClick} className={`relative rounded-lg overflow-hidden cursor-pointer border-4 ${selected ? 'border-purple-600' : 'border-transparent'} transition-all duration-200 bg-gray-200`}>
    <img src={image} alt={name} className="object-cover w-full h-40" />
    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
      <h4 className="text-white text-sm font-bold drop-shadow-sm">{name}</h4>
    </div>
    {selected && (
      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white">
        <CheckCircle size={16} />
      </div>
    )}
  </div>
);

const NotificationToggle = ({ label, enabled, onToggle }: { label: string, enabled: boolean, onToggle: () => void }) => (
  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
    <span className="text-gray-800">{label}</span>
    <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-purple-600' : 'bg-gray-300'}`}>
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);