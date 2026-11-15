"use client";

import type { PageResponse } from "@/lib/server/pages/retrieve-page/retrieve-page.schema";
import { createContext } from "react";

export type PageEditorContextProps = PageResponse;

export const PageEditorContext = createContext<PageEditorContextProps | null>(
  null,
);
