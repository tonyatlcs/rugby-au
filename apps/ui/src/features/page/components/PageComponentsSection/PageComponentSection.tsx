"use client";

import React from "react";
import { Grid2X2, LayoutPanelTop, Lock, Plus } from "lucide-react";
import { Button } from "@/components/controls/Button";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { usePageEditorManager } from "@/providers/PageEditor";
import styles from "./PageComponentSection.module.scss";

interface PageComponentSectionProps {
  onAddSection?: () => void;
}

export const PageComponentSection: React.FC<PageComponentSectionProps> = ({
  onAddSection,
}) => {
  const { componentTree } = usePageEditorManager();
  const hasSection = componentTree.some((component) => component.type === "section");

  return (
  <SideNavSection
    primaryTitle="Components"
    secondaryTitle={<span className={styles.count}>{onAddSection ? 1 : 0} of 2 available</span>}
  >
    <div className={styles.components}>
      <div className={styles.card}>
        <div className={styles.content}>
          <span className={styles.icon} aria-hidden="true"><LayoutPanelTop size={28} /></span>
          <div className={styles.text}>
            <h4>Section</h4>
            <p>Group content and choose a layout and background.</p>
          </div>
        </div>
        <Button
          type="button"
          buttonColor="primary"
          buttonSize="medium"
          fullWidth
          disabled={!onAddSection}
          onClick={onAddSection}
          startAdornment={<Plus size={16} />}
        >
          Add Section
        </Button>
        {!onAddSection && <p className={styles.notice}>Adding sections is coming soon.</p>}
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <span className={styles.lockedIcon} aria-hidden="true"><Grid2X2 size={28} /></span>
          <div className={styles.text}>
            <h4 className={styles.muted}>Card Grid</h4>
            <p>Display a heading and a collection of image cards.</p>
          </div>
        </div>
        <p className={styles.lockedMessage}>
          <Lock size={16} aria-hidden="true" />
          <span>{hasSection
            ? "Card Grids live inside a section. Adding them is coming soon."
            : "Card Grids live inside a section. Add a section first to unlock."}</span>
        </p>
      </div>
    </div>
  </SideNavSection>
  );
};
