"use client";

import React from "react";
import type { SiteStatus } from "@rugby-au/contracts";
import clsx from "clsx";
import styles from "@/components/elements/StatusBadge/StatusBadge.module.scss";

interface StatusBadgeProps {
  variant: SiteStatus;
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ variant, label }) => {
  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.published]: variant === "published",
        [styles.draft]: variant === "draft",
      })}
    >
      <div
        className={clsx(styles.dot, {
          [styles.publishedDot]: variant === "published",
          [styles.draftDot]: variant === "draft",
        })}
      />
      <span
        className={clsx({
          [styles.publishedLabel]: variant === "published",
          [styles.draftLabel]: variant === "draft",
        })}
      >
        {label}
      </span>
    </div>
  );
};
