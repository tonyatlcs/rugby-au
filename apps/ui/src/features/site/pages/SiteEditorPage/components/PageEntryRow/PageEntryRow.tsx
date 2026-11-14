"use client";

import type { PageInformation } from "@/lib/server/schemas/page.schema";
import styles from "@/features/site/pages/SiteEditorPage/components/PageEntryRow/PageEntryRow.module.scss";
import React from "react";

interface PageEntryRowProps {
  page: PageInformation;
  depth: number;
  isSelected: boolean;
  onSelect: (pageId: string) => void;
}

export const PageEntryRow: React.FC<PageEntryRowProps> = (props) => {
  return <div className={styles.wrapper}>{props.page.title}</div>;
};
