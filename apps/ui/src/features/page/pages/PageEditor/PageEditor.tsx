"use client";

import React from "react";
import { PageEditorFrame } from "@/features/page/components/PageEditorFrame/PageEditorFrame";
import { usePageEditorManager } from "@/providers/PageEditor";

export const PageEditor: React.FC = () => {
  const { summary } = usePageEditorManager();

  return <PageEditorFrame title={summary.title} />;
};
