"use client";

import React from "react";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { Tag } from "@/components/elements/Tag/Tag";
import type { PageInformation } from "@/lib/server/schemas/page.schema";
import { PageEntryRow } from "@/features/site/pages/SiteEditorPage/components/PageEntryRow/PageEntryRow";
import { EmptyPageBanner } from "@/features/site/pages/SiteEditorPage/components/EmptyPageBanner/EmptyPageBanner";
import styles from "@/features/site/pages/SiteEditorPage/components/PageStructureSection/PageStructureSection.module.scss";
import { usePageEditorManager } from "@/providers/PageEditor";

interface PageStructureSectionProps {
  pageCount: number;
  pageList: PageInformation[];
}

export const PageStructureSection: React.FC<PageStructureSectionProps> = ({
  pageCount,
  pageList,
}) => {
  const { selectedPage, setSelectedPage } = usePageEditorManager();
  const renderSectionContents = () => {
    if (pageList.length === 0) {
      return <EmptyPageBanner />;
    } else {
      return pageList.map((page) => (
        <PageEntryRow
          key={page.id}
          id={page.id}
          page={page}
          depth={0}
          isSelected={page.id === selectedPage?.id}
          onSelect={() => setSelectedPage(page)}
        />
      ));
    }
  };

  return (
    <SideNavSection
      className={styles.section}
      primaryTitle="Pages"
      secondaryTitle={
        <Tag variant="default" tagColor="primary" size="small">
          {pageCount > 0 ? pageCount : "No"} Pages
        </Tag>
      }
    >
      <div className={styles.wrapper}>{renderSectionContents()}</div>
    </SideNavSection>
  );
};
