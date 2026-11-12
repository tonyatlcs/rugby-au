"use client";

import React from "react";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { Tag } from "@/components/elements/Tag/Tag";
import type { PageInformation } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import { PageEntryRow } from "@/features/site/SiteEditorPage/components/PageEntryRow/PageEntryRow";

interface PageStructureSectionProps {
  pageCount: number;
  pageList: PageInformation[];
}

export const PageStructureSection: React.FC<PageStructureSectionProps> = ({
  pageCount,
  pageList,
}) => (
  <SideNavSection
    primaryTitle="pages"
    secondaryTitle={
      <Tag variant="default" tagColor="primary" size="small">
        {pageCount > 0 ? pageCount : "No"} Pages
      </Tag>
    }
  >
    {pageList.map((page) => (
      <PageEntryRow
        page={page}
        depth={0}
        isSelected={false}
        onSelect={function (pageId: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    ))}
  </SideNavSection>
);
