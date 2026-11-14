"use client";

import React, { ReactNode } from "react";
import styles from "@/components/elements/SideNav/SideNavSection/SideNavSection.module.scss";

interface SideNavSectionProps {
  primaryTitle: string;
  secondaryTitle?: ReactNode;
  children: ReactNode;
  titleIcon?: ReactNode;
  className?: string;
}

export const SideNavSection: React.FC<SideNavSectionProps> = (props) => {
  return (
    <div className={[styles.wrapper, props.className].filter(Boolean).join(" ")}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>
          {props.titleIcon}
          {props.primaryTitle}
        </h4>
        {props.secondaryTitle}
      </div>
      {props.children}
    </div>
  );
};
