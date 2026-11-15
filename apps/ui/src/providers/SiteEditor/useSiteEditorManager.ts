"use client";

import {
  SiteEditorContext,
  type SiteEditorContextProps,
} from "@/providers/SiteEditor/SiteEditorContext";
import { useContext } from "react";

export const useSiteEditorManager = (): SiteEditorContextProps => {
  const context = useContext(SiteEditorContext);

  if (!context) {
    throw new Error(
      "useSiteEditorManager must be used within a SiteEditorProvider",
    );
  }

  return context;
};
