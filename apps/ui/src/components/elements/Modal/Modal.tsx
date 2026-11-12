"use client";

import styles from '@/components/elements/Modal/Modal.module.scss'
import { ModalHeader, type ModalHeaderProps } from '@/components/elements/Modal/ModalHeader'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useId, type ReactNode } from 'react'

export interface ModalProps extends ModalHeaderProps {
  children: ReactNode
  showCloseButton?: boolean
  className?: string
  defaultWidth?: string
  onClose: () => void
  canClose: () => boolean
}

const getMotionConfig = (reduceMotion: boolean | null) => {
  const transition = { duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' as const }

  return {
    backdrop: {
      initial: 'hidden',
      animate: 'visible',
      exit: 'hidden',
      variants: {
        hidden: { backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' },
        visible: { backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' },
      },
      transition,
    },
    container: {
      variants: {
        hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 12 },
        visible: { opacity: 1, scale: 1, y: 0 },
      },
      transition,
    },
  }
}

export const Modal: React.FC<ModalProps> = ({ defaultWidth, ...props }) => {
  const titleId = useId()
  const reduceMotion = useReducedMotion()
  const motionConfig = getMotionConfig(reduceMotion)
  const { canClose } = props
  const handleClose = useCallback(() => {
    props.onClose?.()
  }, [props])

  const handleClickAwayOrClose = useCallback(() => {
    if (canClose && !canClose()) return

    handleClose?.()
  }, [handleClose, canClose])
  return (
    <div className={styles.wrapper}>
      <motion.div
        {...motionConfig.backdrop}
        className={styles.splash}
        onClick={handleClickAwayOrClose}
      >
        <motion.div
          {...motionConfig.container}
          className={clsx(styles.container, props.className)}
          style={{ width: defaultWidth }}
          role='dialog'
          aria-modal='true'
          aria-labelledby={props.title ? titleId : undefined}
          onClick={(event) => event.stopPropagation()}
        >
          <div id={titleId} className={styles.header}>
            <ModalHeader
              title={props.title}
              subtitle={props.subtitle}
              showCloseButton={props.showCloseButton}
              onClose={handleClickAwayOrClose}
            />
          </div>
          {props.children}
        </motion.div>
      </motion.div>
    </div>
  )
}
