import { create } from 'zustand';
import { PetForm, Pet } from '@/types/Pets';
import { createPet, getPetsByUser } from '@/services/pet/pet_service';

interface PetStoreState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  actions: {
    fetchPets: () => Promise<void>;
    createPet: (userId: string, petDetails: PetForm) => Promise<void>;
  };
}

const usePetStore = create<PetStoreState>((set) => ({
  pets: [],
  loading: false,
  error: null,
  actions: {
    fetchPets: async () => {
      set({ loading: true, error: null });
      try {
        const pets = await getPetsByUser();
        set({ pets, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
    createPet: async (userId: string, petDetails: PetForm) => {
      try {
        set({ loading: true, error: null });
        await createPet(userId, petDetails);
        const pets = await getPetsByUser();
        set({ pets, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
  },
}));

export default usePetStore;
