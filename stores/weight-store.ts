import { WeightFromFirestore } from '@/types/Weight';
import {create} from 'zustand';


interface WeightStoreState {
  weights: WeightFromFirestore[];
  loading: boolean;
  error: string | null;
  actions: {
    setWeights: (weights: WeightFromFirestore[]) => void;
  };
}

const useWeightStore = create<WeightStoreState>((set) => ({
  weights: [],
  loading: false,
  error: null,
  actions: {
    setWeights: (weights: WeightFromFirestore[]) => set({ weights }),
  },
}));

export default useWeightStore;
