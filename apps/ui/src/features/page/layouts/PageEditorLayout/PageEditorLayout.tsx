"use client";

import { TopNav } from "@/components/elements/TopNav/TopNav";
import { Tag } from "@/components/elements/Tag/Tag";
import { usePageEditorManager } from "@/providers/PageEditor";
import React, { useState, type ReactNode } from "react";
import styles from "@/features/page/layouts/PageEditorLayout/PageEditorLayout.module.scss";
import { Button } from "@/components/controls/Button";
import { Eye } from "lucide-react";
import { SideNav } from "@/components/elements/SideNav/SideNav";
import { Tab } from "@/components/elements/Tabs/Tab";
import { PageEditorLeftControlPanel } from "@/features/page/components/PageEditorLeftControlPanel/PageEditorLeftControlPanel";

interface PageEditorLayoutProps {
  children: ReactNode;
}

export const PageEditorLayout: React.FC<PageEditorLayoutProps> = ({
  children,
}) => {
  const { summary } = usePageEditorManager();
  const [rightTab, setRightTab] = useState("addComponents");

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
        <SideNav orientation="right" footer={<>Footer</>}>
          <Tab
            tabs={[
              { label: "Page Structure", value: "pageStructure" },
              { label: "Add components", value: "addComponents" },
            ]}
            value={rightTab}
            onChange={setRightTab}
          />
        </SideNav>
      </div>
    </div>
  );
};
