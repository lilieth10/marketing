import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'draft';
  targetAudience: string;
  startDate: string;
  endDate: string;
  budget?: number;
  platform?: string[];
  clicks?: number;
  impressions?: number;
  conversions?: number;
  designerId?: string;
  objective?: string;
  createdAt: string;
}

interface CampaignsStore {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  getCampaignsByDesigner: (designerId: string) => Campaign[];
  publishCampaign: (id: string) => void;
}

// Tipado correcto para persistencia
// https://docs.pmnd.rs/zustand/integrations/persisting-store-data

export const useCampaignsStore = create(
  persist<CampaignsStore>(
    (set, get) => ({
      campaigns: [
        // Campañas de ejemplo iniciales
        {
          id: 'campaign-1',
          name: 'Colección Verano 2024',
          status: 'active',
          targetAudience: 'Mujeres 25-35',
          startDate: '2024-01-15',
          endDate: '2024-03-15',
          budget: 2500,
          platform: ['Instagram', 'Facebook'],
          clicks: 1240,
          impressions: 25600,
          conversions: 89,
          designerId: 'designer-1',
          objective: 'Aumentar ventas',
          createdAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'campaign-2',
          name: 'Lanzamiento Eco-Friendly',
          status: 'active',
          targetAudience: 'Millennials conscientes',
          startDate: '2024-01-20',
          endDate: '2024-02-20',
          budget: 1800,
          platform: ['TikTok', 'Instagram'],
          clicks: 890,
          impressions: 18400,
          conversions: 45,
          designerId: 'designer-1',
          objective: 'Generar awareness',
          createdAt: '2024-01-20T14:30:00Z'
        },
        {
          id: 'campaign-3',
          name: 'Black Friday Special',
          status: 'draft',
          targetAudience: 'Compradores frecuentes',
          startDate: '2024-11-25',
          endDate: '2024-11-30',
          budget: 5000,
          platform: ['Facebook', 'Google'],
          clicks: 0,
          impressions: 0,
          conversions: 0,
          designerId: 'designer-1',
          objective: 'Aumentar ventas',
          createdAt: '2024-01-25T09:15:00Z'
        }
      ],

      addCampaign: (campaignData) => {
        const newCampaign: Campaign = {
          ...campaignData,
          id: `campaign-${Date.now()}`,
          createdAt: new Date().toISOString(),
          clicks: 0,
          impressions: 0,
          conversions: 0,
          status: 'draft' // Las nuevas campañas empiezan como borrador
        };

        set((state) => ({
          campaigns: [newCampaign, ...state.campaigns]
        }));
      },

      updateCampaign: (id, updates) => {
        set((state) => ({
          campaigns: state.campaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, ...updates } : campaign
          )
        }));
      },

      deleteCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.filter((campaign) => campaign.id !== id)
        }));
      },

      getCampaignsByDesigner: (designerId) => {
        return get().campaigns.filter((campaign) => campaign.designerId === designerId);
      },

      publishCampaign: (id: string) => {
        set((state) => ({
          campaigns: state.campaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, status: 'active' } : campaign
          )
        }));
      }
    }),
    {
      name: 'campaigns-storage',
    }
  )
); 