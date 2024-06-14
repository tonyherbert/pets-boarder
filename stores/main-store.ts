// src/stores/modalStore.ts
import create from "zustand";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface ModalState {
  modal?: ReactJSXElement;
  actions: {
    closeModal: () => void;
    openModal: (modalComponent: ReactJSXElement) => void;
  };
}

export const useMainStore = create<ModalState>((set) => ({
  actions: {
    closeModal: () => {
      set({ modal: undefined });
    },
    openModal: (modalComponent: ReactJSXElement) => {
      set({ modal: modalComponent });
    },
  },
}));
