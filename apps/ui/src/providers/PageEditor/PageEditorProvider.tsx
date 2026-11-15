"use client";

import type { PageResponse } from "@/lib/server/pages/retrieve-page/retrieve-page.schema";
import {
  PageEditorContext,
  type PageEditorLeftPanelView,
  type PageEditorRightPanelViewType,
  type SectionConfig,
} from "@/providers/PageEditor/PageEditorContext";
import { useState, type ReactNode } from "react";
import type {
  ComponentNode,
  SectionComponent,
} from "@rugby-au/contracts";

interface PageEditorProviderProps extends PageResponse {
  children: ReactNode;
}

export const PageEditorProvider: React.FC<PageEditorProviderProps> = ({
  children,
  summary,
  componentTree: initialComponentTree,
}) => {
  const [componentTree, setComponentTree] =
    useState<ComponentNode[]>(initialComponentTree);
  const [sectionConfig, setSectionConfig] = useState<SectionConfig>({
    layout: "full",
    themeType: "none",
  });
  const [pageEditorRightPanelView, setPageEditorRightPanelView] =
    useState<PageEditorRightPanelViewType>("empty");
  const [pageEditorLeftPanelView, setPageEditorLeftPanelView] =
    useState<PageEditorLeftPanelView>("pageStructure");
  const addNewSection = () => {
    const section: SectionComponent = {
      id: crypto.randomUUID(),
      name: "New section",
      type: "section",
      props: { ...sectionConfig },
      children: [],
    };

    setComponentTree((currentTree) => [...currentTree, section]);
    setPageEditorLeftPanelView("pageStructure");
  };

  return (
    <PageEditorContext.Provider
      value={{
        summary,
        componentTree,
        addNewSection,
        sectionConfig,
        setSectionConfig,
        pageEditorLeftPanelView,
        setPageEditorLeftPanelView,
        pageEditorRightPanelView,
        setPageEditorRightPanelView,
      }}
    >
      {children}
    </PageEditorContext.Provider>
  );
};
