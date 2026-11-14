"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { CircleExclamationPoint } from "lucide-react";
import {
  useId,
  type ComponentPropsWithRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./BaseInput.module.scss";

export interface BaseInputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "height" | "width"
> {
  type?: "text" | "email" | "password" | "number" | "search" | "url" | "tel";
  variant?: "outlined" | "filled";
  label?: string;
  width?: CSSProperties["width"];
  errorMsg?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export function BaseInput({
  id,
  label,
  type = "text",
  variant = "outlined",
  width,
  errorMsg,
  startAdornment,
  endAdornment,
  required,
  ...inputProps
}: BaseInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = Boolean(errorMsg);
  const shouldReduceMotion = useReducedMotion();
  const collapsedError = {
    height: 0,
    marginTop: "calc(var(--spacing-12) * -1)",
    opacity: 0,
    y: shouldReduceMotion ? 0 : -4,
  };

  return (
    <div className={styles.container} style={{ width }}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required && (
            <span className={styles.requiredMarker}>
              *
            </span>
          )}
        </label>
      )}
      <div
        className={clsx(
          styles.inputContainer,
          {
            [styles.hasStartAdornment]: startAdornment,
            [styles.filled]: variant === "filled",
          },
        )}
      >
        {startAdornment}
        <input
          {...inputProps}
          id={inputId}
          required={required}
          type={type}
        />
        {endAdornment}
      </div>
      <AnimatePresence initial={false}>
        {hasError && (
          <motion.div
            key="error"
            animate={{ height: "auto", marginTop: 0, opacity: 1, y: 0 }}
            className={styles.errorWrapper}
            role="alert"
            exit={collapsedError}
            initial={collapsedError}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.1,
              ease: "easeOut",
            }}
          >
            <div className={styles.errorMessage}>
              <CircleExclamationPoint size={20} strokeWidth={1.5} />
              <span>{errorMsg}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
