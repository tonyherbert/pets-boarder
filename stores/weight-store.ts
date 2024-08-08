import {create} from 'zustand';
import { Weight } from '@/types/Weight';
import { endpoints, methods } from '@/config/api-config';

interface WeightStoreState {
  weights: Weight[];
  loading: boolean;
  error: string | null;
  actions: {
    fetchWeights: (petId: string) => Promise<void>;
    createWeight: (data: Weight, petId: string) => Promise<void>;
  };
}

const useWeightStore = create<WeightStoreState>((set, get) => ({
  weights: [],
  loading: false,
  error: null,
  actions: {
    setWeights: (weights: Weight[]) => set({ weights }),
    fetchWeights: async (petId) => {
      console.log("petId///////", petId);
      
      set({ loading: true, error: null });
      try {
        const response = await fetch(endpoints.weights.list, {
          method: methods.get,
          headers: {
            'Content-Type': 'application/json',
            "X-Pet-Id": petId
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching weights: ${response.statusText}`);
        }

        const weights: Weight[] = await response.json();
        console.log("response///////", response);
        
        set({ weights });
      } catch (error) {
        set({ error: error instanceof Error ? error.message : String(error) });
      } finally {
        set({ loading: false });
      }
    },
     createWeight: async (data: Weight, petId: string) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(endpoints.weights.create, {
          method: methods.post,
          headers: {
            'Content-Type': 'application/json',
                        "X-Pet-Id": petId

          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Error creating pet: ${response.statusText}`);
        }

        await get().actions.fetchWeights(petId);
      } catch (error) {
        set({ error: error instanceof Error ? error.message : String(error) });
      } finally {
        set({ loading: false });
      }
    },
  },
}));

export default useWeightStore;
