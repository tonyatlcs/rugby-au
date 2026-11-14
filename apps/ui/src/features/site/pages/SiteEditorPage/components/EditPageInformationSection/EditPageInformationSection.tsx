"use client";

import React from "react";
import { DropdownInput } from "@/components/controls/DropdownInput";
import { TextInput } from "@/components/controls/TextInput";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import type { PageInformation } from "@/lib/server/schemas/page.schema";
import styles from "./EditPageInformationSection.module.scss";

interface EditPageInformationSectionProps {
  page: PageInformation;
  pages: PageInformation[];
  onCancel?: () => void;
}

export const EditPageInformationSection: React.FC<
  EditPageInformationSectionProps
> = ({ page, pages }) => {
  const parentPage = pages.find((candidate) => candidate.id === page.parentId);

  return (
    <SideNavSection primaryTitle="Page Details">
      <div className={styles.wrapper}>
        <TextInput
          label="Page title"
          value={page.title}
          disabled
          variant="outlined"
        />

        <div className={styles.address}>
          <h5>Page Address</h5>
          <p>{page.path}</p>
        </div>
        <DropdownInput
          options={[]}
          disabled
          value={undefined}
          label="Organise under"
          fullWidth
          placeholder={
            parentPage?.title ??
            (page.parentId ? "Unknown page" : "Website root")
          }
        />
      </div>
    </SideNavSection>
  );
};
