"use client";

import type { PageInformation } from "@/lib/server/schemas/page.schema";
import styles from "@/features/site/pages/SiteEditorPage/components/PageEntryRow/PageEntryRow.module.scss";
import React from "react";
import { Check, FileChartColumn } from "lucide-react";
import clsx from "clsx";

interface PageEntryRowProps {
  id: string;
  page: PageInformation;
  depth: number;
  isSelected: boolean;
  onSelect: (pageId: string) => void;
}

export const PageEntryRow: React.FC<PageEntryRowProps> = (props) => {
  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.activeWrapper]: props.isSelected,
      })}
      onClick={() => props.onSelect(props.page.id)}
    >
      <div className={styles.content}>
        <div
          className={clsx(styles.iconContainer, {
            [styles.activeIconContainer]: props.isSelected,
          })}
        >
          <FileChartColumn
            size={16}
            color={
              props.isSelected
                ? "var(--color-greyscale-0)"
                : "var(--color-greyscale-500)"
            }
          />
        </div>
        <div
          className={clsx(styles.contents, {
            [styles.activeContents]: props.isSelected,
          })}
        >
          <h4>{props.page.title}</h4>
          <span>{props.page.path}</span>
        </div>
      </div>
      {props.isSelected && <Check color="var(--color-primary-500)" size={16} />}
    </div>
  );
};
