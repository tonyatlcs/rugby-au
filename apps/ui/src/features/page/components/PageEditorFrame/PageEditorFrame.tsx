import React, { type CSSProperties, type ReactNode } from "react";
import { FileText } from "lucide-react";
import type { SiteTheme } from "@rugby-au/contracts";
import styles from "./PageEditorFrame.module.scss";

interface PageEditorFrameProps {
  title: string;
  children?: ReactNode;
  theme: SiteTheme;
}

export const PageEditorFrame: React.FC<PageEditorFrameProps> = ({ title, theme, children }) => (
  <div className={styles.wrapper}>
    <div className={styles.pageTab}>
      <FileText size={14} aria-hidden="true" />
      <span>{title}</span>
    </div>
    <div className={styles.page} style={{
      "--site-background-color": theme.backgroundColor,
      "--site-primary-color": theme.primaryColor,
      "--site-light-background-color": theme.lightBackgroundColor,
      "--site-text-color": theme.textColor,
      "--site-light-text-color": theme.lightTextColor,
      "--site-brand-text-color": theme.brandTextColor,
      "--site-font-family": theme.fontFamily,
    } as CSSProperties}>{children}</div>
  </div>
);
