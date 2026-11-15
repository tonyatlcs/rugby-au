"use client";

import React from "react";
import { Section } from "@/components/elements/Section/Section";
import { PageEditorFrame } from "@/features/page/components/PageEditorFrame/PageEditorFrame";
import { usePageEditorManager } from "@/providers/PageEditor";
import type { ComponentNode, SiteTheme } from "@rugby-au/contracts";
import { PageEditorCardGrid, PageEditorNode } from "@/features/page/pages/PageEditor/PageEditorNode";
import styles from "@/features/page/pages/PageEditor/PageEditor.module.scss";

const renderComponent = (
  component: ComponentNode,
  selectedComponentId: string | null,
  siteStyle: SiteTheme["style"],
): React.ReactNode => {
  const isSelected = component.id === selectedComponentId;
  if (component.type === "card-grid") {
    return (
      <PageEditorCardGrid key={component.id} component={component} selected={isSelected} siteStyle={siteStyle} />
    );
  }

  return (
    <PageEditorNode key={component.id} selected={isSelected} label="Section">
      <Section
        {...component.props}
        renderEmptySlot={(index, columnCount) => (
          <div key={`empty-${index}`} className={styles.placeholder}>
            {columnCount === 1 ? "Empty section" : "Empty column"}
          </div>
        )}
      >
        {component.children.map((child) =>
          renderComponent(child, selectedComponentId, siteStyle),
        )}
      </Section>
    </PageEditorNode>
  );
};

export const PageEditor: React.FC = () => {
  const { summary, componentTree, siteTheme, selectedComponentId } =
    usePageEditorManager();

  return (
    <PageEditorFrame title={summary.title} theme={siteTheme}>
      {componentTree.map((component) =>
        renderComponent(component, selectedComponentId, siteTheme.style),
      )}
    </PageEditorFrame>
  );
};
