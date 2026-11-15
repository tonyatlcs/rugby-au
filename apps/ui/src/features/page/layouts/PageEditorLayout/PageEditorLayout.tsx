"use client";

import { TopNav } from "@/components/elements/TopNav/TopNav";
import { Tag } from "@/components/elements/Tag/Tag";
import { usePageEditorManager } from "@/providers/PageEditor";
import React, { useState, type ReactNode } from "react";
import type { ComponentNode } from "@rugby-au/contracts";
import styles from "@/features/page/layouts/PageEditorLayout/PageEditorLayout.module.scss";
import { Button } from "@/components/controls/Button";
import { Eye } from "lucide-react";
import { PageEditorLeftControlPanel } from "@/features/page/components/PageEditorLeftControlPanel/PageEditorLeftControlPanel";
import { PageEditorRightControlPanel } from "@/features/page/components/PageEditorRightControlPanel/PageEditorRightControlPanel";

interface PageEditorLayoutProps {
  children: ReactNode;
}

export const PageEditorLayout: React.FC<PageEditorLayoutProps> = ({
  children,
}) => {
  const { summary, componentTree } = usePageEditorManager();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [savedTree, setSavedTree] = useState<ComponentNode[] | null>(null);

  const saveChanges = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const response = await fetch(
        `/api/pages/${encodeURIComponent(summary.id)}/components`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ components: componentTree }),
        },
      );
      if (!response.ok) throw new Error("Failed to save components");
      setSavedTree(componentTree);
    } catch {
      setSaveError("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <TopNav
          title={summary.title}
          description={
            <>
              <span>{summary.siteName}</span>
              <span>&middot;</span>
              <span>{summary.path}</span>
            </>
          }
          path={
            <Tag variant="neutral" tagColor="greyscale" size="large">
              {summary.path}
            </Tag>
          }
          actions={
            <>
              {saveError ? (
                <span role="alert">{saveError}</span>
              ) : (
                <span role="status">
                  {savedTree === componentTree ? "Changes saved" : ""}
                </span>
              )}
              <Button buttonColor="secondary" buttonSize="medium" type="button">
                <Eye size={24} />
                <span>View Public Page</span>
              </Button>
              <Button
                buttonColor="primary"
                buttonSize="medium"
                type="button"
                onClick={saveChanges}
                isLoading={saving}
              >
                <span>Save changes</span>
              </Button>
            </>
          }
        />
      </div>

      <div className={styles.body}>
        <PageEditorLeftControlPanel />
        <main className={styles.body}>{children}</main>
        <PageEditorRightControlPanel />
      </div>
    </div>
  );
};
