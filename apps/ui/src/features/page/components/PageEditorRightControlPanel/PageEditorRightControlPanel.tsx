"use client";

import React from "react";
import { SideNav } from "@/components/elements/SideNav/SideNav";
import { PagePropertiesEmptyState } from "@/features/page/components/PagePropertiesEmptyState/PagePropertiesEmptyState";
import { usePageEditorManager } from "@/providers/PageEditor";
import { PageSectionConfigPanel } from "@/features/page/components/PageSectionConfigPanel/PageSectionConfigPanel";

export const PageEditorRightControlPanel: React.FC = () => {
  const { pageEditorRightPanelView } = usePageEditorManager();
  return (
    <SideNav orientation="right">
      {pageEditorRightPanelView === "sectionConfig" ? (
        <PageSectionConfigPanel />
      ) : (
        <PagePropertiesEmptyState />
      )}
    </SideNav>
  );
};
