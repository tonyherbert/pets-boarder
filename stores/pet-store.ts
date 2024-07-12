// usePetStore.ts

import create from 'zustand';
import { PetForm, Pet } from '@/types/Pets';
import { getPetsByUser, createPet, getPetById } from '@/services/firebase/pet/pet_service';

interface PetStoreState {
  selectedPet: Pet | null;
  pets: Pet[];
  loading: boolean;
  error: string | null;
  actions: {
    setPets: (pets: Pet[]) => void;
  };
}

const usePetStore = create<PetStoreState>((set) => ({
  selectedPet: null,
  pets: [],
  loading: false,
  error: null,
  actions: {
     setPets: (pets: Pet[]) => set({ pets }),  
}}),);

export default usePetStore;
