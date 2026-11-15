"use client";

import React from "react";
import { Grid2X2, LayoutPanelTop, Lock, Plus } from "lucide-react";
import { Button } from "@/components/controls/Button";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { PageComponentCard } from "@/features/page/components/PageComponentCard/PageComponentCard";
import { usePageEditorManager } from "@/providers/PageEditor";
import { findParentSection } from "@/lib/utils/component-tree-utils";
import styles from "./PageComponentSection.module.scss";

interface PageComponentSectionProps {
  onAddSection?: () => void;
}

export const PageComponentSection: React.FC<PageComponentSectionProps> = ({
  onAddSection,
}) => {
  const { componentTree, selectedComponent, addComponent } =
    usePageEditorManager();
  const firstSection = componentTree.find(
    (component) => component.type === "section",
  );
  const getDestination = () => {
    if (selectedComponent?.type === "section") return selectedComponent;
    if (selectedComponent) {
      return (
        findParentSection(componentTree, selectedComponent.id) ?? firstSection
      );
    }
    return firstSection;
  };
  const destination = getDestination();
  const hasSectionComponent = Boolean(firstSection);

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
            <div className={styles.addCardGrid}>
              <Button
                type="button"
                buttonColor="secondary"
                buttonSize="medium"
                fullWidth
                onClick={() => {
                  if (destination) addComponent("card-grid", destination.id);
                }}
                startAdornment={<Plus size={16} aria-hidden="true" />}
              >
                Add Card Grid
              </Button>
            </div>
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
