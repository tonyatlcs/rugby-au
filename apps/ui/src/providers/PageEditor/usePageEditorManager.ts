"use client";

import {
  PageEditorContext,
  type PageEditorContextProps,
} from "@/providers/PageEditor/PageEditorContext";
import { useContext } from "react";

export const usePageEditorManager = (): PageEditorContextProps => {
  const context = useContext(PageEditorContext);

  if (!context) {
    throw new Error(
      "usePageEditorManager must be used within a PageEditorProvider",
    );
  }

  return context;
};
