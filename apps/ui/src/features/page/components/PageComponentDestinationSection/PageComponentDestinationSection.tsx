"use client";

import React from "react";
import { FileText } from "lucide-react";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { usePageEditorManager } from "@/providers/PageEditor";
import styles from "@/features/page/components/PageComponentDestinationSection/PageComponentDestination.module.scss";

export const PageComponentDestinationSection: React.FC = () => {
  const { summary, componentTree } = usePageEditorManager();

  return (
    <SideNavSection primaryTitle="Destination">
      <div className={styles.destination}>
        <span className={styles.label}>Add to</span>
        <div className={styles.target}>
          <span className={styles.icon} aria-hidden="true">
            <FileText size={16} />
          </span>
          <span>{summary.title} · top level</span>
        </div>
        <p className={styles.description}>
          {componentTree.length === 0
            ? "This page is empty, so components are added at the top level."
            : "Components are added at the top level of this page."}
        </p>
      </div>
    </SideNavSection>
  );
};
