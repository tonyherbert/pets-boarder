import create from 'zustand';
import { Pet } from '@/types/Pets';
import { endpoints, methods } from '@/config/api-config';

interface PetStoreState {
  selectedPet: Pet | null;
  pets: Pet[];
  loading: boolean;
  error: string | null;
  actions: {
    setPets: (pets: Pet[]) => void;
    setSelectedPet: (pet: Pet) => void;
    fetchPets: () => Promise<void>;
    createPet: (data: any) => Promise<void>;
  };
}

const usePetStore = create<PetStoreState>((set, get) => ({
  selectedPet: null,
  pets: [],
  loading: false,
  error: null,
  actions: {
    setPets: (pets: Pet[]) => set({ pets }),
    setSelectedPet: (pet: Pet) => set({ selectedPet: pet }),
    fetchPets: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(endpoints.pets.list, {
          method: methods.get,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching pets: ${response.statusText}`);
        }

        const pets: Pet[] = await response.json();
        set({ pets });
      } catch (error) {
        set({ error: error instanceof Error ? error.message : String(error) });
      } finally {
        set({ loading: false });
      }
    },
    createPet: async (data: any) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(endpoints.pets.create, {
          method: methods.post,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Error creating pet: ${response.statusText}`);
        }

        // Fetch the updated list of pets after successful creation
        await get().actions.fetchPets();
      } catch (error) {
        set({ error: error instanceof Error ? error.message : String(error) });
      } finally {
        set({ loading: false });
      }
    },
  },
}));

export default usePetStore;
