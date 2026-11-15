"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./ComponentEditorDetails.module.scss";

interface ComponentEditorDetailsProps {
  title: string;
  children: ReactNode;
}

export const ComponentEditorDetails = ({ title, children }: ComponentEditorDetailsProps) => {
  return (
    <details className={styles.group} open>
      <summary>
        {title} <ChevronDown size={16} aria-hidden="true" />
      </summary>
      {children}
    </details>
  );
};
