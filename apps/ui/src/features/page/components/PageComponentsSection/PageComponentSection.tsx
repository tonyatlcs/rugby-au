"use client";

import React from "react";
import { Grid2X2, LayoutPanelTop, Lock, Plus } from "lucide-react";
import { Button } from "@/components/controls/Button";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { PageComponentCard } from "@/features/page/components/PageComponentCard/PageComponentCard";
import { usePageEditorManager } from "@/providers/PageEditor";
import styles from "./PageComponentSection.module.scss";

interface PageComponentSectionProps {
  onAddSection?: () => void;
}

export const PageComponentSection: React.FC<PageComponentSectionProps> = ({
  onAddSection,
}) => {
  const { componentTree } = usePageEditorManager();
  const hasSectionComponent = componentTree.some(
    (component) => component.type === "section",
  );

  return (
    <SideNavSection
      primaryTitle="Components"
      secondaryTitle={
        <span className={styles.count}>
          {(onAddSection ? 1 : 0) + (hasSectionComponent ? 1 : 0)} of 2 eligible
        </span>
      }
    >
      <div className={styles.components}>
        <PageComponentCard
          title="Section"
          description="Group content and choose a layout and background."
          icon={<LayoutPanelTop size={28} />}
        >
          <Button
            type="button"
            buttonColor="primary"
            buttonSize="medium"
            className={styles.buttonLabel}
            fullWidth
            disabled={!onAddSection}
            onClick={onAddSection}
            startAdornment={<Plus size={16} />}
          >
            Add Section
          </Button>
          {!onAddSection && (
            <p className={styles.notice}>Adding sections is coming soon.</p>
          )}
        </PageComponentCard>
        <PageComponentCard
          title="Card Grid"
          description="Display a heading and a collection of image cards."
          icon={<Grid2X2 size={28} />}
          locked={!hasSectionComponent}
        >
          {hasSectionComponent ? (
            <p className={styles.notice}>Adding Card Grids is coming soon.</p>
          ) : (
            <p className={styles.lockedMessage}>
              <Lock size={16} aria-hidden="true" />
              <span>
                Card Grids live inside a section. Add a section first to unlock.
              </span>
            </p>
          )}
        </PageComponentCard>
      </div>
    </SideNavSection>
  );
};
