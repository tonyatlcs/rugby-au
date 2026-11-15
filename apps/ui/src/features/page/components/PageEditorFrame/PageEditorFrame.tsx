import React, { type ReactNode } from "react";
import { FileText } from "lucide-react";
import styles from "./PageEditorFrame.module.scss";

interface PageEditorFrameProps {
  title: string;
  children?: ReactNode;
}

export const PageEditorFrame: React.FC<PageEditorFrameProps> = ({ title, children }) => (
  <div className={styles.wrapper}>
    <div className={styles.pageTab}>
      <FileText size={14} aria-hidden="true" />
      <span>{title}</span>
    </div>
    <div className={styles.page}>{children}</div>
  </div>
);
