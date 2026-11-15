"use client";

import { FileText, Layers, Plus } from "lucide-react";
import type { ComponentNode } from "@rugby-au/contracts";
import { Button } from "@/components/controls/Button";
import { PageTreeNode } from "@/features/page/components/PageTreeNode/PageTreeNode";
import React from "react";
import styles from "@/features/page/components/PageTree/PageTree.module.scss";

interface PageTreeProps {
  title: string;
  components: ComponentNode[];
  onAddSection: () => void;
}

export const PageTree: React.FC<PageTreeProps> = ({
  title,
  components,
  onAddSection,
}) => (
  <div className={styles.tree}>
    <div className={styles.page}>
      <span className={styles.pageIcon}>
        <FileText size={16} />
      </span>
      <span>{title}</span>
    </div>
    {components.length > 0 ? (
      <ul className={styles.children}>
        {components.map((component) => (
          <PageTreeNode key={component.id} component={component} />
        ))}
      </ul>
    ) : (
      <div className={styles.emptyBranch}>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">
            <Layers size={24} />
          </span>
          <h3>No components yet</h3>
          <p>
            Sections you add will appear here as a tree you can reorder and
            edit.
          </p>
          <Button
            type="button"
            buttonColor="primary"
            buttonSize="small"
            onClick={onAddSection}
            startAdornment={<Plus size={16} />}
          >
            Add a section
          </Button>
        </div>
      </div>
    )}
    <></>
  </div>
);
