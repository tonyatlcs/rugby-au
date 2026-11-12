"use client";

import React, { ReactNode } from "react";
import styles from "@/components/elements/SideNav/SideNavSection/SideNavSection.module.scss";

interface SideNavSectionProps {
  primaryTitle: string;
  secondaryTitle?: ReactNode;
  children: ReactNode;
}

export const SideNavSection: React.FC<SideNavSectionProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <h4>{props.primaryTitle}</h4>
        {props.secondaryTitle}
      </div>
      {props.children}
    </div>
  );
};
