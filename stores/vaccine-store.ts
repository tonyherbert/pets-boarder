import { VaccineFromFirestore } from '@/types/Vaccines';
import {create} from 'zustand';


interface VaccineStoreState {
  vaccines: VaccineFromFirestore[];
  loading: boolean;
  error: string | null;
  actions: {
    setVaccines: (vaccines: VaccineFromFirestore[]) => void;
  };
}

const useVaccineStore = create<VaccineStoreState>((set) => ({
  vaccines: [],
  loading: false,
  error: null,
  actions: {
    setVaccines: (vaccines: VaccineFromFirestore[]) => set({ vaccines }),
  },
}));

export default useVaccineStore;
