"use client";

import { PageInformation } from "@/lib/server/schemas/page.schema";
import { createContext } from "react";

export interface PageEditorContextProps {
  selectedPage: PageInformation | null;
  setSelectedPage: (page: PageInformation | null) => void;
}

export const PageEditorContext = createContext<PageEditorContextProps | null>(
  null,
);
