import React, { type ReactNode } from "react";
import { FileText } from "lucide-react";
import type { SiteTheme } from "@rugby-au/contracts";
import styles from "@/features/page/components/PageEditorFrame/PageEditorFrame.module.scss";
import { SiteThemeWrapper } from "@/features/page/components/SiteThemeWrapper/SiteThemeWrapper";

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
    <SiteThemeWrapper theme={theme} className={styles.page}>{children}</SiteThemeWrapper>
  </div>
);
