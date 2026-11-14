import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps extends Omit<ComponentPropsWithoutRef<"progress">, "value" | "max"> {
  value: number;
  max?: number;
}

export const ProgressBar = ({
  value,
  max = 100,
  className,
  ...progressProps
}: ProgressBarProps) => {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = Number.isFinite(value) ? value : 0;
  const progress = Math.min(safeMax, Math.max(0, safeValue));

  return (
    <progress
      {...progressProps}
      className={clsx(styles.progressBar, className)}
      value={progress}
      max={safeMax}
    />
  );
};
