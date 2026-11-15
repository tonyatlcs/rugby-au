"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/controls/Button";
import { SideNav } from "@/components/elements/SideNav/SideNav";
import { PagePropertiesEmptyState } from "@/features/page/components/PagePropertiesEmptyState/PagePropertiesEmptyState";
import { usePageEditorManager } from "@/providers/PageEditor";
import { PageSectionConfigPanel } from "@/features/page/components/PageSectionConfigPanel/PageSectionConfigPanel";
import styles from "./PageEditorRightControlPanel.module.scss";

export const PageEditorRightControlPanel: React.FC = () => {
  const { pageEditorRightPanelView, selectedComponent, deleteComponent } =
    usePageEditorManager();
  return (
    <SideNav
      orientation="right"
      footer={
        selectedComponent && (
          <div className={styles.footer}>
            <Button
              type="button"
              buttonColor="alert"
              buttonSize="medium"
              fullWidth
              startAdornment={<Trash2 size={16} aria-hidden="true" />}
              onClick={() => deleteComponent(selectedComponent.id)}
            >
              Remove{" "}
              {selectedComponent.type === "section" ? "section" : "card grid"}
            </Button>
          </div>
        )
      }
    >
      {pageEditorRightPanelView === "sectionConfig" ? (
        <PageSectionConfigPanel />
      ) : pageEditorRightPanelView === "cardGridConfig" ? (
        <p style={{ padding: "var(--spacing-16)" }}>
          Card Grid settings are coming soon.
        </p>
      ) : (
        <PagePropertiesEmptyState />
      )}
    </SideNav>
  );
};
