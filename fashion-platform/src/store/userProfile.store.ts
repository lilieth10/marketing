import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StaticImageData } from 'next/image';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string | StaticImageData;
  coverImage?: string; // Imagen de portada editable
  interests: string[];
  stylePreference: string;
  location: string;
  followers: number;
  following: number;
  posts: number;
  notifications: {
    news: boolean;
    promotions: boolean;
    community: boolean;
  };
}

interface UserProfileState {
  profile: UserProfile;
  updateProfile: (newProfileData: Partial<UserProfile>) => void;
  resetProfile: () => void;
  initializeFromUser: (user: { id: string; name: string; email: string }) => void;
}

const defaultProfile: UserProfile = {
  id: '',
  name: '',
  username: '',
  email: '',
  phone: '',
  avatar: '/images/placeholder1.png',
  coverImage: '',
  bio: '',
  interests: [],
  followers: 0,
  following: 0,
  posts: 0,
  notifications: {
    news: true,
    promotions: false,
    community: true,
  },
  stylePreference: '',
  location: '',
};

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      updateProfile: (newProfileData) => {
        const updatedProfile = { ...get().profile, ...newProfileData };
        set({ profile: updatedProfile });
        // Guardar en localStorage específico del usuario
        if (updatedProfile.id) {
          localStorage.setItem(`user-profile-${updatedProfile.id}`, JSON.stringify(updatedProfile));
        }
      },
      resetProfile: () => {
        set({ profile: defaultProfile });
      },
      initializeFromUser: (user) => {
        const currentProfile = get().profile;
        
        // Prevenir múltiples inicializaciones del mismo usuario
        if (currentProfile.id === user.id) {
          console.log('Profile already initialized for user:', user.id);
          return;
        }
        
        console.log('Initializing profile for user:', user.id, user.name);
        
        const storedProfile = localStorage.getItem(`user-profile-${user.id}`);
        if (storedProfile) {
          try {
            const profile = JSON.parse(storedProfile);
            console.log('Loading stored profile:', profile);
            set({ profile });
          } catch (error) {
            console.warn('Error loading stored profile, creating new one');
            // Si hay error al cargar, crear uno nuevo
            const newProfile = {
              ...defaultProfile,
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.email.split('@')[0],
            };
            set({ profile: newProfile });
            localStorage.setItem(`user-profile-${user.id}`, JSON.stringify(newProfile));
          }
        } else {
          // Crear nuevo perfil
          console.log('Creating new profile for user:', user.id);
          const newProfile = {
            ...defaultProfile,
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.email.split('@')[0],
          };
          set({ profile: newProfile });
          localStorage.setItem(`user-profile-${user.id}`, JSON.stringify(newProfile));
        }
      },
    }),
    {
      name: 'user-profile-storage',
      partialize: (state) => ({ profile: state.profile }),
      // Hidratación controlada
      skipHydration: false,
    }
  )
); 