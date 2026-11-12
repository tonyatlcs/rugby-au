"use client";

import styles from "./Button.module.scss"
import clsx from 'clsx'
import {
  type CSSProperties,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactNode,
} from 'react'

export type ButtonColour = 'primary' | 'secondary' | 'tertiary' | 'alert' | 'success' | 'warning' | 'successDark'

export interface ButtonProps {
  type: 'button' | 'submit'
  buttonColor: ButtonColour
  disabled?: boolean
  isLoading?: boolean
  children: ReactNode
  variant?: 'filled' | 'outlined' | 'outlinedDark' | 'tertiary'
  buttonSize: 'large' | 'medium' | 'small'
  onClick?: MouseEventHandler<HTMLButtonElement>
  onFocus?: FocusEventHandler
  onBlur?: FocusEventHandler
  fullWidth?: boolean
  width?: CSSProperties['width']
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  className?: string
  alignment?: 'left' | 'center' | 'right'
}

const loadingIndicatorSize = {
  small: 16,
  medium: 20,
  large: 24,
} satisfies Record<ButtonProps['buttonSize'], number>

export const Button: React.FC<ButtonProps> = ({
  buttonColor,
  buttonSize,
  children,
  disabled,
  isLoading,
  onBlur,
  onClick,
  onFocus,
  type,
  variant = 'filled',
  startAdornment,
  endAdornment,
  fullWidth,
  width,
  className,
  alignment = 'center',
}) => {
  return (
    <button
      className={clsx(styles.container, {
        [styles.small]: buttonSize === 'small',
        [styles.medium]: buttonSize === 'medium',
        [styles.large]: buttonSize === 'large',
        [styles.filled]: variant === 'filled',
        [styles.outlined]: variant === 'outlined',
        [styles.tertiary]: variant === 'tertiary',
        [styles.outlinedDark]: variant === 'outlinedDark',
        [styles.alignLeft]: alignment === 'left',
        [styles.alignRight]: alignment === 'right',
        [styles.secondary]: buttonColor === 'secondary',
        [styles.alert]: buttonColor === 'alert',
        [styles.success]: buttonColor === 'success',
        [styles.successDark]: buttonColor === 'successDark',
        [styles.warning]: buttonColor === 'warning',
        [styles.disabled]: disabled,
        [styles.fullWidth]: fullWidth,
      })}
      disabled={disabled || isLoading}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus}
      style={{ width: fullWidth ? undefined : width }}
      type={type}
    >
      {isLoading ? (
        <span
          aria-label="Loading"
          className={styles.loadingIndicator}
          role="progressbar"
          style={{ height: loadingIndicatorSize[buttonSize], width: loadingIndicatorSize[buttonSize] }}
        />
      ) : (
        <div className={styles.content}>
          {startAdornment != null && <span className={styles.adornment}>{startAdornment}</span>}
          <span className={clsx(styles.label, className)}>{children}</span>
          {endAdornment != null && <span className={styles.adornment}>{endAdornment}</span>}
        </div>
      )}

    </button>
  )
}
