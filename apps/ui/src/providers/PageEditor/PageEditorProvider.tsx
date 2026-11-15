"use client";

import type { PageResponse } from "@/lib/server/pages/retrieve-page/retrieve-page.schema";
import { PageEditorContext } from "@/providers/PageEditor/PageEditorContext";
import type { ReactNode } from "react";

interface PageEditorProviderProps extends PageResponse {
  children: ReactNode;
}

export const PageEditorProvider: React.FC<PageEditorProviderProps> = ({
  children,
  summary,
  componentTree,
}) => (
  <PageEditorContext.Provider value={{ summary, componentTree }}>
    {children}
  </PageEditorContext.Provider>
);
