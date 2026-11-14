"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, CircleExclamationPoint } from "lucide-react";
import { useId, useRef, useState, type ReactNode } from "react";
import styles from "./DropdownInput.module.scss";

export type DropdownInputOption<T extends string | number = string | number> = {
  label: string;
  value: T;
};

export interface DropdownInputProps<
  T extends string | number = string | number,
> {
  label?: string;
  options: DropdownInputOption<T>[];
  value: T | undefined;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  onOpen?: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  errorMsg?: ReactNode;
}

export function DropdownInput<T extends string | number>({
  label,
  options,
  value,
  onChange,
  onBlur,
  onOpen,
  placeholder,
  required,
  disabled,
  fullWidth,
  errorMsg,
}: DropdownInputProps<T>) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const reduceMotion = useReducedMotion();
  const selected = options.find((option) => option.value === value);
  const motionConfig = {
    chevron: {
      animate: { rotate: open ? 180 : 0 },
      transition: { duration: reduceMotion ? 0 : 0.2 },
    },
    options: {
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -4 },
      initial: { opacity: 0, y: -4 },
      transition: { duration: reduceMotion ? 0 : 0.15 },
    },
  };

  return (
    <div
      className={[styles.wrapper, fullWidth && styles.fullWidth]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <div
        className={styles.dropdown}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            triggerRef.current?.focus();
          }
        }}
      >
        <button
          className={styles.trigger}
          disabled={disabled}
          id={id}
          onBlur={onBlur}
          onClick={() => {
            if (!open) onOpen?.();
            setOpen(!open);
          }}
          ref={triggerRef}
          type="button"
        >
          <span className={!selected ? styles.placeholder : undefined}>
            {selected?.label ?? placeholder}
          </span>
          <motion.span
            {...motionConfig.chevron}
            className={styles.chevron}
          >
            <ChevronDown size={20} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && !disabled && (
            <motion.div
              {...motionConfig.options}
              className={styles.options}
            >
              {options.map((option) => (
                <button
                  className={styles.option}
                  key={String(option.value)}
                  onClick={() => {
                    onChange?.(option.value);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {errorMsg && (
        <div className={styles.error}>
          <CircleExclamationPoint size={20} strokeWidth={1.5} />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
