// usePetStore.ts

import create from 'zustand';
import { PetForm, Pet } from '@/types/Pets';
import { getPetsByUser, createPet, getPetById } from '@/services/firebase/pet/pet_service';

interface PetStoreState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  actions: {
    fetchPets: () => Promise<void>;
    createPet: (userId: string, petDetails: PetForm) => Promise<void>;
    getPetById: (id: string) => Promise<Pet | undefined>;
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
        console.error('Error fetching pets:', error);
        set({ error: error.message, loading: false });
      }
    },
    createPet: async (userId: string, petDetails: PetForm) => {
      set({ loading: true, error: null });
      try {
        await createPet(userId, petDetails);
        await actions.fetchPets(); // Rafraîchir les pets après la création
      } catch (error) {
        console.error('Error creating pet:', error);
        set({ error: error.message, loading: false });
      }
    },
    getPetById: async (id: string) => {
      set({ loading: true, error: null });
      try {
        const pet = await getPetById(id);
        set({loading: false });     
         return pet;
      } catch (error) {
        console.error('Error fetching pet by id:', error);
        set({ error: error.message, loading: false });
      }
    },
  },
}));

export default usePetStore;
