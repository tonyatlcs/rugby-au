"use client";

import type { PageResponse } from "@/lib/server/pages/retrieve-page/retrieve-page.schema";
import {
  PageEditorContext,
  type PageEditorLeftPanelView,
  type PageEditorRightPanelViewType,
} from "@/providers/PageEditor/PageEditorContext";
import { useState, type ReactNode } from "react";
import type { ComponentNode, SectionComponent } from "@rugby-au/contracts";
import {
  findComponent,
  updateSectionInTree,
  type SectionUpdates,
} from "@/lib/utils/component-tree-utils";

interface PageEditorProviderProps extends PageResponse {
  children: ReactNode;
}

export const PageEditorProvider: React.FC<PageEditorProviderProps> = ({
  children,
  summary,
  siteTheme,
  componentTree: initialComponentTree,
}) => {
  const [componentTree, setComponentTree] =
    useState<ComponentNode[]>(initialComponentTree);

  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null,
  );
  const selectedComponent = selectedComponentId
    ? findComponent(componentTree, selectedComponentId)
    : null;

  const [pageEditorRightPanelView, setPageEditorRightPanelView] =
    useState<PageEditorRightPanelViewType>("empty");

  const [pageEditorLeftPanelView, setPageEditorLeftPanelView] =
    useState<PageEditorLeftPanelView>("pageStructure");

  const addNewSection = () => {
    const section: SectionComponent = {
      id: crypto.randomUUID(),
      name: "New section",
      type: "section",
      props: { layout: "full", themeType: "none" },
      children: [],
    };

    setComponentTree((currentTree) => [...currentTree, section]);
    setSelectedComponentId(section.id);
    setPageEditorRightPanelView("sectionConfig");
    setPageEditorLeftPanelView("pageStructure");
  };

  const selectComponent = (component: ComponentNode) => {
    setSelectedComponentId(component.id);
    setPageEditorRightPanelView(
      component.type === "section" ? "sectionConfig" : "cardGridConfig",
    );
  };

  const updateSection = (id: string, updates: SectionUpdates) => {
    setComponentTree((currentTree) =>
      updateSectionInTree(currentTree, id, updates),
    );
  };

  return (
    <PageEditorContext.Provider
      value={{
        summary,
        siteTheme,
        componentTree,
        addNewSection,
        selectedComponent,
        selectedComponentId,
        selectComponent,
        updateSection,
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
