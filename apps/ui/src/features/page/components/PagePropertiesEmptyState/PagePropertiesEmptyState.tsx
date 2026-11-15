"use client";

import React from "react";
import {
  FileText,
  Grid2X2,
  Pointer,
  SlidersHorizontal,
  Square,
} from "lucide-react";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { usePageEditorManager } from "@/providers/PageEditor";
import { PageStructureGuideRow } from "../PageStructureGuideRow/PageStructureGuideRow";
import styles from "./PagePropertiesEmptyState.module.scss";

export const PagePropertiesEmptyState: React.FC = () => {
  const { summary } = usePageEditorManager();
  const guideRows: React.ComponentProps<typeof PageStructureGuideRow>[] = [
    {
      title: "Page",
      description: `The whole page, e.g. ${summary.title}`,
      icon: <FileText size={16} />,
      variant: "page",
    },
    {
      title: "Section",
      description: "Sets layout and background",
      icon: <Square size={16} />,
      indent: 1,
    },
    {
      title: "Card Grid",
      description: "Heading plus image cards",
      icon: <Grid2X2 size={16} />,
      indent: 2,
    },
  ];

  return (
    <div className={styles.panel}>
      <SideNavSection
        className={styles.header}
        primaryTitle="Properties"
        titleIcon={
          <span className={styles.headerIcon} aria-hidden="true">
            <SlidersHorizontal size={16} />
          </span>
        }
      >
        <p>No component selected</p>
      </SideNavSection>
      <div className={styles.body}>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">
            <Pointer size={24} />
          </span>
          <h3>Nothing selected</h3>
          <p>
            Add a component to the page, then select it to edit its settings
            here.
          </p>
        </div>
        <div className={styles.guide}>
          <h3>How pages are built</h3>
          <ul className={styles.levels}>
            {guideRows.map((row) => (
              <PageStructureGuideRow key={row.title} {...row} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
