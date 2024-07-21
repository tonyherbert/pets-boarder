// src/components/Modal.tsx
import React, { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMainStore } from "@/stores/main-store";
import { IoIosCloseCircle } from "react-icons/io";
import "./GenericModal.scss";
import Button from "../button/Button";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const isSmallScreen = useMediaQuery(768);
  const { closeModal } = useMainStore().actions;

  return (
    <div className={`modal ${isSmallScreen ? "small" : ""}`}>
      <div className="modal-content">
        <button className="modal-close" onClick={() => closeModal()}>
          <IoIosCloseCircle />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
