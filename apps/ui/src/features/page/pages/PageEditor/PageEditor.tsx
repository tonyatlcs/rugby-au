"use client";

import React from "react";
import { ComponentTree } from "@/features/page/components/ComponentTree/ComponentTree";
import { PageEditorFrame } from "@/features/page/components/PageEditorFrame/PageEditorFrame";
import { usePageEditorManager } from "@/providers/PageEditor";
import { PageEditorNode } from "@/features/page/pages/PageEditor/PageEditorNode";
import styles from "@/features/page/pages/PageEditor/PageEditor.module.scss";

export const PageEditor: React.FC = () => {
  const { summary, componentTree, siteTheme, selectedComponentId } =
    usePageEditorManager();

  return (
    <PageEditorFrame title={summary.title} theme={siteTheme}>
      <ComponentTree
        components={componentTree}
        siteStyle={siteTheme.style}
        renderNode={(component, content) => (
          <PageEditorNode
            selected={component.id === selectedComponentId}
            label={component.type === "section" ? "Section" : "Card Grid"}
          >
            {component.type === "card-grid" ? (
              <div onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) event.preventDefault();
              }}>
                {content}
              </div>
            ) : content}
          </PageEditorNode>
        )}
        renderEmptySlot={(index, columnCount) => (
          <div key={`empty-${index}`} className={styles.placeholder}>
            {columnCount === 1 ? "Empty section" : "Empty column"}
          </div>
        )}
        renderEmptyCardGrid={() => (
          <div className={styles.placeholder}>Add a card to this grid</div>
        )}
      />
    </PageEditorFrame>
  );
};
