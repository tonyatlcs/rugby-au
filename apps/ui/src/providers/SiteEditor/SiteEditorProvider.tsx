"use client";
import { PageInformation } from "@/lib/server/schemas/page.schema";
import { SiteEditorContext } from "@/providers/SiteEditor/SiteEditorContext";
import type { SiteResponse } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import { useState, type ReactNode } from "react";

interface SiteEditorProviderProps extends SiteResponse {
  children: ReactNode;
}

export const SiteEditorProvider: React.FC<SiteEditorProviderProps> = ({
  children,
  siteInformation,
  pageInformation,
}) => {
  const [selectedPage, setSelectedPage] = useState<PageInformation | null>(
    null,
  );

  return (
    <SiteEditorContext.Provider
      value={{ siteInformation, pageInformation, selectedPage, setSelectedPage }}
    >
      {children}
    </SiteEditorContext.Provider>
  );
};
