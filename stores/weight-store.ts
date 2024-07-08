import { WeightChart, WeightForm } from '@/types/Weight';
// usePetStore.ts

import create from 'zustand';
import { addPetWeight, getPetWeights } from '@/services/pet/weight_service';
import { getCurrentUserId }    from '@/services/user/user_service';
import { SimplifyToWeigthsArray } from '@/utils/convert';

interface WeightStoreState {
  weights: WeightChart[];
  loading: boolean;
  error: string | null;
  actions: {
    fetchWeights: (petId: string) => Promise<void>;
    createWeight: (userId: string, petId: string, weightForm: WeightForm) => Promise<void>;
  };
}

const useWeightStore = create<WeightStoreState>((set) => ({
  weights: [],
  loading: false,
  error: null,
  actions: {
    fetchWeights: async (petId: string) => {
      set({ loading: true, error: null });
      try {
        const userId = getCurrentUserId();
        const weights = await getPetWeights(userId!, petId);
        set({weights: SimplifyToWeigthsArray(weights), loading: false });        
      } catch (error) {
        if(error instanceof Error) {
             console.error('Error fetching weights:', error);
        set({ error: error.message, loading: false });
        }
       
      }
    },
    createWeight: async (userId: string, petId:string, WeightForm: WeightForm) => {
      set({ loading: true, error: null });
      try {
        await addPetWeight(userId,petId, WeightForm);
        await useWeightStore.getState().actions.fetchWeights(petId);
      } catch (error) {
        if(error instanceof Error) {
             console.error('Error creating pet:', error);
        set({ error: error.message, loading: false });
        }
       
      }
    },
  
  },
}));

export default useWeightStore;
