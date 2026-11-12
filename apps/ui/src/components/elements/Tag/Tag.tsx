"use client";

import React, { ReactNode } from "react";
import styles from "@/components/elements/Tag/Tag.module.scss";
import clsx from "clsx";

interface TagProps {
  variant: "default" | "neutral";
  tagColor: "greyscale" | "primary";
  size: "small" | "large";
  children: ReactNode;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  className,
  variant,
  tagColor,
  size,
}) => {
  return (
    <div
      className={clsx(styles.wrapper, className, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
        [styles.neutral]: variant === "neutral" && tagColor === "greyscale",
        [styles.default]: variant === "default" && tagColor === "primary",
      })}
    >
      {children}
    </div>
  );
};
