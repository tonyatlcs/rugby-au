"use client";

import type { PageResponse } from "@/lib/server/pages/retrieve-page/retrieve-page.schema";
import type { SectionComponent } from "@rugby-au/contracts";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type SectionConfig = SectionComponent["props"];

export type PageEditorLeftPanelView = "pageStructure" | "addComponents";

export type PageEditorRightPanelViewType =
  | "empty"
  | "sectionConfig"
  | "cardGridConfig";

export type PageEditorContextProps = PageResponse & {
  sectionConfig: SectionConfig;
  pageEditorLeftPanelView: PageEditorLeftPanelView;
  setPageEditorLeftPanelView: (view: PageEditorLeftPanelView) => void;
  pageEditorRightPanelView: PageEditorRightPanelViewType;
  setPageEditorRightPanelView: (view: PageEditorRightPanelViewType) => void;
  addNewSection: () => void;
  setSectionConfig: Dispatch<SetStateAction<SectionConfig>>;
};

export const PageEditorContext = createContext<PageEditorContextProps | null>(
  null,
);
