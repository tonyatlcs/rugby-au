"use client";
import { PageInformation } from "@/lib/server/schemas/page.schema";
import { PageEditorContext } from "@/providers/PageEditor/PageEditorContext";
import { useState, type ReactNode } from "react";

interface PageEditorProviderProps {
  children: ReactNode;
}

export const PageEditorProvider: React.FC<PageEditorProviderProps> = ({
  children,
}) => {
  const [selectedPage, setSelectedPage] = useState<PageInformation | null>(
    null,
  );

  return (
    <PageEditorContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </PageEditorContext.Provider>
  );
};
