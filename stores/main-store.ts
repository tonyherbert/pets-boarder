import { ReactElement } from "react";
import { create } from "zustand";

interface ModalState {
  modal?: ReactElement;
  actions: {
    closeModal: () => void;
    openModal: (modalComponent: ReactElement) => void;
  };
}

export const useMainStore = create<ModalState>((set) => ({
  actions: {
    closeModal: () => {
      set({ modal: undefined });
    },
    openModal: (modalComponent: ReactElement) => {
      set({ modal: modalComponent });
    },
  },
}));
