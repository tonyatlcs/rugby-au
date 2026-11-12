"use client";

import { ModalManagerContext } from '@/providers/Modal/ModalManagerContext'
import { AnimatePresence } from 'framer-motion'
import { useCallback, useState, type ReactNode } from 'react'

export const ModalManagerProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null)

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  return (
    <ModalManagerContext.Provider value={{ activeModal, setActiveModal, closeModal }}>
      {children}
      <AnimatePresence>{activeModal}</AnimatePresence>
    </ModalManagerContext.Provider>
  )
}
