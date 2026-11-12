"use client";

import { X } from 'lucide-react'
import styles from '@/components/elements/Modal/ModalHeader/ModalHeader.module.scss'
import type { ReactNode } from 'react'

export interface ModalHeaderProps {
  headerIcon?: ReactNode
  isModalCentered?: boolean
  showCloseButton?: boolean
  onClose?: () => void
  headerCta?: ReactNode
  title?: ReactNode | string
  subtitle?: ReactNode | string
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ showCloseButton, onClose, title, subtitle }) => {
  return (
    <div className={styles.modalHeader}>
      <div className={styles.headerContianer}>
        <div className={styles.headerContents}>
          <span className={styles.headingTitle}>{title}</span>
          <span className={styles.headingSubtitle}>{subtitle}</span>
        </div>

        {showCloseButton && (
          <button type='button' aria-label='Close modal' onClick={onClose} className={styles.closeButton}>
            <X size={20} color='var(--color-greyscale-500)' />
          </button>
        )}
      </div>
    </div>
  )
}
