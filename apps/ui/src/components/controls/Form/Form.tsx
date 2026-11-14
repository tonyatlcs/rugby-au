"use client";

import clsx from "clsx";
import type { ComponentProps, CSSProperties } from "react";
import styles from "./Form.module.scss";

export interface FormProps extends ComponentProps<"form"> {
  disabled?: boolean;
  canSubmit?: boolean;
  maxWidth?: CSSProperties["maxWidth"];
}

export function Form({
  children,
  className,
  disabled,
  canSubmit = true,
  maxWidth,
  onSubmit,
  style,
  ...props
}: FormProps) {
  return (
    <form
      {...props}
      className={clsx(styles.form, className)}
      style={{ ...style, maxWidth: maxWidth ?? style?.maxWidth }}
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit && !disabled) onSubmit?.(event);
      }}
    >
      <fieldset disabled={disabled}>
        <div className={styles.contents}>{children}</div>
      </fieldset>
    </form>
  );
}
