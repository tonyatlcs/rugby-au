"use client";

import { TopNav } from "@/components/elements/TopNav/TopNav";
import { Tag } from "@/components/elements/Tag/Tag";
import { usePageEditorManager } from "@/providers/PageEditor";
import React, { type ReactNode } from "react";
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
  const { summary } = usePageEditorManager();

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
              <Button buttonColor="secondary" buttonSize="medium" type="button">
                <Eye size={24} />
                <span>View Public Page</span>
              </Button>
              <Button
                buttonColor="primary"
                buttonSize="medium"
                type="button"
                onClick={
                  () => {}
                  // setActiveModal(
                  //   <CreatePageModal
                  //     sitePath={siteInformation.url || ""}
                  //     siteId={siteInformation.id}
                  //     pages={pageInformation}
                  //   />,
                  // )
                }
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
