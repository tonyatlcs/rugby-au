"use client";

import React from "react";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { Tag } from "@/components/elements/Tag/Tag";
import type { PageInformation } from "@/lib/server/schemas/page.schema";
import { PageEntryRow } from "@/features/site/pages/SiteEditorPage/components/PageEntryRow/PageEntryRow";
import { EmptyPageBanner } from "@/features/site/pages/SiteEditorPage/components/EmptyPageBanner/EmptyPageBanner";

interface PageStructureSectionProps {
  pageCount: number;
  pageList: PageInformation[];
}

export const PageStructureSection: React.FC<PageStructureSectionProps> = ({
  pageCount,
  pageList,
}) => {
  const renderSectionContents = () => {
    if (pageList.length === 0) {
      return <EmptyPageBanner />;
    } else {
      return pageList.map((page) => (
        <PageEntryRow
          key={page.id}
          page={page}
          depth={0}
          isSelected={false}
          onSelect={() => {}}
        />
      ));
    }
  };

  return (
    <SideNavSection
      primaryTitle="Pages"
      secondaryTitle={
        <Tag variant="default" tagColor="primary" size="small">
          {pageCount > 0 ? pageCount : "No"} Pages
        </Tag>
      }
    >
      {renderSectionContents()}
    </SideNavSection>
  );
};
