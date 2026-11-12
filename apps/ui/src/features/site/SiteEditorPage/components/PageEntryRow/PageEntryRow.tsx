"use client";

import { PageInformation } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import styles from "@/features/site/SiteEditorPage/components/PageEntryRow/PageEntryRow.module.scss";
import React from "react";

interface PageEntryRowProps {
  page: PageInformation;
  depth: number;
  isSelected: boolean;
  onSelect: (pageId: string) => void;
}

export const PageEntryRow: React.FC<PageEntryRowProps> = (props) => {
  return <div className={styles.wrapper}>{props.depth}</div>;
};
