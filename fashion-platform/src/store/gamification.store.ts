import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  type: 'purchase' | 'social' | 'creation' | 'milestone';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  type: 'discount' | 'early_access' | 'exclusive' | 'physical';
  value: string;
  available: boolean;
  claimed: boolean;
  expiresAt?: Date;
}

export interface GamificationState {
  points: number;
  level: number;
  pointsToNextLevel: number;
  totalEarned: number;
  achievements: Achievement[];
  rewards: Reward[];
  badges: string[];
  streak: {
    current: number;
    longest: number;
    lastActionDate?: Date;
  };
  // Actions
  addPoints: (points: number, reason: string) => void;
  unlockAchievement: (achievementId: string) => void;
  claimReward: (rewardId: string) => void;
  updateStreak: () => void;
  reset: () => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first_purchase',
    title: 'Primera Compra',
    description: 'Realiza tu primera compra en la plataforma',
    icon: '🛍️',
    points: 100,
    unlocked: false,
    type: 'purchase'
  },
  {
    id: 'social_butterfly',
    title: 'Mariposa Social',
    description: 'Recibe 100 likes en tus posts',
    icon: '🦋',
    points: 150,
    unlocked: false,
    type: 'social'
  },
  {
    id: 'trendsetter',
    title: 'Creador de Tendencias',
    description: 'Crea 10 posts que reciban más de 50 likes',
    icon: '🔥',
    points: 300,
    unlocked: false,
    type: 'creation'
  },
  {
    id: 'ai_explorer',
    title: 'Explorador IA',
    description: 'Usa 5 herramientas de IA diferentes',
    icon: '🤖',
    points: 200,
    unlocked: false,
    type: 'milestone'
  },
  {
    id: 'community_champion',
    title: 'Campeón de Comunidad',
    description: 'Participa en 20 eventos de la comunidad',
    icon: '👑',
    points: 500,
    unlocked: false,
    type: 'social'
  },
  {
    id: 'fashion_guru',
    title: 'Gurú de la Moda',
    description: 'Alcanza 1000 seguidores',
    icon: '✨',
    points: 1000,
    unlocked: false,
    type: 'milestone'
  }
];

const defaultRewards: Reward[] = [
  {
    id: 'discount_10',
    title: 'Descuento 10%',
    description: 'Descuento del 10% en tu próxima compra',
    cost: 500,
    type: 'discount',
    value: '10%',
    available: true,
    claimed: false
  },
  {
    id: 'early_access',
    title: 'Acceso Anticipado',
    description: 'Acceso 24h antes a nuevas colecciones',
    cost: 750,
    type: 'early_access',
    value: '24h anticipación',
    available: true,
    claimed: false
  },
  {
    id: 'exclusive_design',
    title: 'Sesión de Diseño Exclusiva',
    description: 'Consulta 1:1 con un diseñador experto',
    cost: 1200,
    type: 'exclusive',
    value: '60 min consulta',
    available: true,
    claimed: false
  },
  {
    id: 'premium_badge',
    title: 'Badge Premium',
    description: 'Badge exclusivo para tu perfil por 30 días',
    cost: 300,
    type: 'exclusive',
    value: '30 días premium',
    available: true,
    claimed: false
  },
  {
    id: 'fashion_box',
    title: 'Fashion Box Sorpresa',
    description: 'Caja sorpresa con accesorios de temporada',
    cost: 2000,
    type: 'physical',
    value: 'Box físico',
    available: true,
    claimed: false
  }
];

const calculateLevel = (totalPoints: number): number => {
  if (totalPoints < 500) return 1;
  if (totalPoints < 1500) return 2;
  if (totalPoints < 3000) return 3;
  if (totalPoints < 5000) return 4;
  if (totalPoints < 8000) return 5;
  return Math.floor(totalPoints / 2000) + 3;
};

const getPointsToNextLevel = (currentLevel: number, totalPoints: number): number => {
  const levelThresholds = [0, 500, 1500, 3000, 5000, 8000];
  if (currentLevel < levelThresholds.length) {
    return levelThresholds[currentLevel] - totalPoints;
  }
  return 2000 - (totalPoints % 2000);
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      points: 0,
      level: 1,
      pointsToNextLevel: 500,
      totalEarned: 0,
      achievements: defaultAchievements,
      rewards: defaultRewards,
      badges: [],
      streak: {
        current: 0,
        longest: 0
      },

      addPoints: (points: number, reason: string) => {
        set((state) => {
          const newTotal = state.totalEarned + points;
          const newPoints = state.points + points;
          const newLevel = calculateLevel(newTotal);
          const pointsToNext = getPointsToNextLevel(newLevel, newTotal);

          // Check for achievements
          const updatedAchievements = state.achievements.map(achievement => {
            if (!achievement.unlocked) {
              // Simple achievement logic - could be more complex
              if (achievement.id === 'first_purchase' && reason === 'purchase') {
                return { ...achievement, unlocked: true, unlockedAt: new Date() };
              }
              if (achievement.id === 'ai_explorer' && reason === 'ai_usage') {
                return { ...achievement, unlocked: true, unlockedAt: new Date() };
              }
            }
            return achievement;
          });

          return {
            ...state,
            points: newPoints,
            totalEarned: newTotal,
            level: newLevel,
            pointsToNextLevel: pointsToNext,
            achievements: updatedAchievements
          };
        });
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          ...state,
          achievements: state.achievements.map(achievement =>
            achievement.id === achievementId
              ? { ...achievement, unlocked: true, unlockedAt: new Date() }
              : achievement
          )
        }));
      },

      claimReward: (rewardId: string) => {
        set((state) => {
          const reward = state.rewards.find(r => r.id === rewardId);
          if (!reward || reward.claimed || state.points < reward.cost) {
            return state;
          }

          return {
            ...state,
            points: state.points - reward.cost,
            rewards: state.rewards.map(r =>
              r.id === rewardId ? { ...r, claimed: true } : r
            )
          };
        });
      },

      updateStreak: () => {
        set((state) => {
          const today = new Date();
          const lastAction = state.streak.lastActionDate;
          
          if (!lastAction) {
            return {
              ...state,
              streak: {
                current: 1,
                longest: Math.max(1, state.streak.longest),
                lastActionDate: today
              }
            };
          }

          // Convert to Date object if it's a string (from localStorage)
          const lastActionDate = typeof lastAction === 'string' ? new Date(lastAction) : lastAction;
          const daysDiff = Math.floor((today.getTime() - lastActionDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysDiff === 1) {
            // Consecutive day
            const newCurrent = state.streak.current + 1;
            return {
              ...state,
              streak: {
                current: newCurrent,
                longest: Math.max(newCurrent, state.streak.longest),
                lastActionDate: today
              }
            };
          } else if (daysDiff > 1) {
            // Streak broken
            return {
              ...state,
              streak: {
                ...state.streak,
                current: 1,
                lastActionDate: today
              }
            };
          }

          return state; // Same day, no change
        });
      },

      reset: () => set({
        points: 0,
        level: 1,
        pointsToNextLevel: 500,
        totalEarned: 0,
        achievements: defaultAchievements,
        rewards: defaultRewards,
        badges: [],
        streak: { current: 0, longest: 0 }
      })
    }),
    {
      name: 'gamification-storage',
      // Persistencia específica por usuario
      storage: {
        getItem: (name) => {
          try {
            // Obtener el usuario actual desde auth store
            const authData = localStorage.getItem('auth-storage');
            if (!authData) return null;
            let state;
            try {
              ({ state } = JSON.parse(authData));
            } catch (e) {
              console.warn('auth-storage corrupto o inválido:', e);
              return null;
            }
            const userId = state?.user?.id;
            if (userId) {
              const userKey = `${name}-${userId}`;
              const item = localStorage.getItem(userKey);
              return item ? JSON.parse(item) : null;
            }
            return null;
          } catch (error) {
            console.warn('Error reading gamification data:', error);
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
                localStorage.setItem(userKey, JSON.stringify(value));
              }
            }
          } catch (error) {
            console.warn('Error saving gamification data:', error);
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
            console.warn('Error removing gamification data:', error);
          }
        },
      },
    }
  )
); 