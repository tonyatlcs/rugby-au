"use client";

import { PageInformation } from "@/lib/server/schemas/page.schema";
import type { SiteResponse } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import { createContext } from "react";

export interface SiteEditorContextProps extends SiteResponse {
  selectedPage: PageInformation | null;
  setSelectedPage: (page: PageInformation | null) => void;
}

export const SiteEditorContext = createContext<SiteEditorContextProps | null>(
  null,
);
