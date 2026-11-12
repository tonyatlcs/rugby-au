"use client";

import { createContext, type ReactNode } from 'react'

export interface ModalContextProps {
  activeModal: ReactNode | null
  setActiveModal: (modal: ReactNode | null) => void
  closeModal: () => void
}

export const ModalManagerContext = createContext<ModalContextProps | undefined>(undefined)
