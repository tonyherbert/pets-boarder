// src/components/Modal.tsx
import React, { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./GenericModal.module.scss";
import { useMainStore } from "@/stores/main-store";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const isSmallScreen = useMediaQuery(768);
  const { closeModal } = useMainStore().actions;

  return (
    <div className={`${styles.modal} ${isSmallScreen ? styles.small : ""}`}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={() => closeModal()}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
