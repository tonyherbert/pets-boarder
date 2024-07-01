import { create } from "zustand";

interface UserState {
  id: string | null;
  email: string | null;
  actions: {
    setId: (id: string) => void;
    setEmail: (email: string) => void;
  };
}

const useUserStore = create<UserState>((set) => ({
  actions: {
    setId: (id: string) => set(() => ({ id })),
    setEmail: (email: string) => set(() => ({ email })),
  },
  id: null,
  email: null,
}));

export default useUserStore;
