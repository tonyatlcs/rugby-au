"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { BaseInput, type BaseInputProps } from "../BaseInput";
import styles from "./TextInput.module.scss";

export interface TextInputProps extends Omit<
  BaseInputProps,
  "type" | "endAdornment" | "variant"
> {
  type?: "text";
  variant?: BaseInputProps["variant"] | "pageAddress";
  clearable?: boolean;
  onClear?: () => void;
}

export function TextInput({
  type = "text",
  variant = "outlined",
  clearable = true,
  value,
  defaultValue,
  onInput,
  startAdornment,
  onClear,
  disabled,
  readOnly,
  ...props
}: TextInputProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const currentValue = value ?? uncontrolledValue;
  const showClear =
    clearable &&
    String(currentValue).length > 0 &&
    !disabled &&
    !readOnly;

  return (
    <BaseInput
      {...props}
      defaultValue={defaultValue}
      disabled={disabled}
      endAdornment={
        showClear && (
          <button
            className={styles.clearButton}
            onClick={() => {
              onClear?.();
              if (value == null) setUncontrolledValue("");
            }}
            type="button"
          >
            <X size={20} />
          </button>
        )
      }
      readOnly={readOnly}
      onInput={(event) => {
        if (value == null) setUncontrolledValue(event.currentTarget.value);
        onInput?.(event);
      }}
      startAdornment={
        variant === "pageAddress" && startAdornment != null ? (
          <span className={styles.pageAddressAdornment}>{startAdornment}</span>
        ) : startAdornment
      }
      type={type}
      value={value}
      variant={variant === "pageAddress" ? "outlined" : variant}
    />
  );
}
