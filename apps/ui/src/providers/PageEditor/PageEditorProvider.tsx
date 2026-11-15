"use client";

import type { PageResponse } from "@/lib/server/pages/retrieve-page/retrieve-page.schema";
import {
  PageEditorContext,
  type PageEditorContextProps,
  type PageEditorLeftPanelView,
  type PageEditorRightPanelViewType,
} from "@/providers/PageEditor/PageEditorContext";
import { useState, type ReactNode } from "react";
import type { CardGridComponent, ComponentNode, SectionComponent } from "@rugby-au/contracts";
import {
  findComponent,
  deleteComponentFromTree,
  updateNodeInTree,
  type CardGridUpdates,
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

  const selectComponent = (component: ComponentNode) => {
    setSelectedComponentId(component.id);
    setPageEditorRightPanelView(
      component.type === "section" ? "sectionConfig" : "cardGridConfig",
    );
  };

  const addComponent: PageEditorContextProps["addComponent"] = (...[type, sectionId]) => {
    const id = crypto.randomUUID();

    if (type === "section") {
      if (sectionId) {
        const parent = findComponent(componentTree, sectionId);
        if (!parent || parent.type !== "section") return;
      }
      const section: SectionComponent = {
        id,
        name: "New section",
        type: "section",
        props: { layout: "full", themeType: "none" },
        children: [],
      };
      setComponentTree((currentTree) => {
        if (!sectionId) return [...currentTree, section];
        const parent = findComponent(currentTree, sectionId);
        if (!parent || parent.type !== "section") return currentTree;
        return updateNodeInTree(currentTree, sectionId, {
          type: "section",
          updates: { children: [...parent.children, section] },
        });
      });
      selectComponent(section);
    } else {
      const section = findComponent(componentTree, sectionId);
      if (!section || section.type !== "section") return;

      const grid: CardGridComponent = {
        id,
        type: "card-grid",
        name: "New card grid",
        props: { id, title: "New card grid", cards: [] },
        children: [],
      };
      setComponentTree((currentTree) => {
        const currentSection = findComponent(currentTree, sectionId);
        if (!currentSection || currentSection.type !== "section") return currentTree;
        return updateNodeInTree(currentTree, sectionId, {
          type: "section",
          updates: { children: [...currentSection.children, grid] },
        });
      });
      selectComponent(grid);
    }

    setPageEditorLeftPanelView("pageStructure");
  };

  const updateSection = (id: string, updates: SectionUpdates) => {
    setComponentTree((currentTree) =>
      updateNodeInTree(currentTree, id, { type: "section", updates }),
    );
  };

  const updateCardGrid = (id: string, updates: CardGridUpdates) => {
    setComponentTree((currentTree) => updateNodeInTree(currentTree, id, { type: "card-grid", updates }));
  };

  const deleteComponent = (id: string) => {
    const deletedComponent = findComponent(componentTree, id);
    const removesSelection = selectedComponentId !== null && deletedComponent !== null && (
      deletedComponent.id === selectedComponentId ||
      (deletedComponent.type === "section" && findComponent(deletedComponent.children, selectedComponentId) !== null)
    );
    setComponentTree((currentTree) => deleteComponentFromTree(currentTree, id));
    if (removesSelection) {
      setSelectedComponentId(null);
      setPageEditorRightPanelView("empty");
    }
  };

  return (
    <PageEditorContext.Provider
      value={{
        summary,
        siteTheme,
        componentTree,
        addComponent,
        selectedComponent,
        selectedComponentId,
        selectComponent,
        updateSection,
        updateCardGrid,
        deleteComponent,
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
