"use client";

import type { PageResponse } from "@/lib/server/pages/retrieve-page/retrieve-page.schema";
import type { ComponentNode, SectionComponent } from "@rugby-au/contracts";
import { createContext } from "react";
import type { CardGridUpdates, SectionUpdates } from "@/lib/utils/component-tree-utils";

export type SectionConfig = SectionComponent["props"];

export type PageEditorLeftPanelView = "pageStructure" | "addComponents";

export type PageEditorRightPanelViewType =
  | "empty"
  | "sectionConfig"
  | "cardGridConfig";

export type PageEditorContextProps = PageResponse & {
  selectedComponent: ComponentNode | null;
  selectedComponentId: string | null;
  pageEditorLeftPanelView: PageEditorLeftPanelView;
  pageEditorRightPanelView: PageEditorRightPanelViewType;
  setPageEditorLeftPanelView: (view: PageEditorLeftPanelView) => void;
  setPageEditorRightPanelView: (view: PageEditorRightPanelViewType) => void;
  addComponent: (...args: [type: "section", sectionId?: string] | [type: "card-grid", sectionId: string]) => void;
  selectComponent: (component: ComponentNode) => void;
  updateSection: (id: string, updates: SectionUpdates) => void;
  updateCardGrid: (id: string, updates: CardGridUpdates) => void;
  deleteComponent: (id: string) => void;
};

export const PageEditorContext = createContext<PageEditorContextProps | null>(
  null,
);
