"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  data: any;
  openModal: (data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  const openModal = (modalData?: any) => {
    setData(modalData);
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setData(null), 300); // Clear data after animation
  };

  return (
    <ModalContext.Provider value={{ isOpen, data, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
