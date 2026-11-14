"use client";

import React from "react";
import styles from "@/components/elements/TopNav/TopNav.module.scss";
import { ArrowLeft, Eye, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tag } from "@/components/elements/Tag/Tag";
import { Button } from "@/components/controls/Button";
import { useModalManager } from "@/providers/Modal";
import type { PageInformation } from "@/lib/server/schemas/page.schema";
import type { SiteInformation } from "@/lib/server/schemas/site.schema";
import { CreatePageModal } from "@/features/site/pages/SiteEditorPage/components/CreatePageModal/CreatePageModal";

interface TopNavProps {
  siteInformation: SiteInformation;
  pageInformation: PageInformation[];
  saveStatus?: "saving" | "saved" | "error";
}

export const TopNav: React.FC<TopNavProps> = (props) => {
  const router = useRouter();
  const { setActiveModal } = useModalManager();
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <button
          aria-label="Go back"
          type="button"
          className={styles.backCta}
          onClick={() => router.back()}
        >
          <ArrowLeft
            className={styles.backBtn}
            size={20}
            strokeWidth={2}
            color="currentColor"
          />
        </button>
        <div>
          <h3>Page Overview</h3>
          <div className={styles.overviewDescripton}>
            <span>{props.siteInformation.siteName}</span>
            <span>&middot;</span>
            <span>
              {props.siteInformation.pageCount > 0
                ? `${props.siteInformation.pageCount} pages`
                : "No pages"}
            </span>
          </div>
        </div>
      </div>
      <Tag variant="neutral" tagColor="greyscale" size="large">
        <span>{props.siteInformation.url}</span>
        <span className={styles.urlSeparator}>/</span>
        <span className={styles.pagesText}>pages</span>
      </Tag>
      <div className={styles.pageActionContainer}>
        <Button buttonColor="secondary" buttonSize="medium" type="button">
          <Eye size={24} />
          <span>View Pulbic Site</span>
        </Button>
        <Button
          buttonColor="primary"
          buttonSize="medium"
          type="button"
          onClick={() =>
            setActiveModal(
              <CreatePageModal
                sitePath={props.siteInformation.url || ""}
                siteId={props.siteInformation.id}
                pages={props.pageInformation}
              />,
            )
          }
        >
          <Plus size={20} />
          <span>Create page</span>
        </Button>
      </div>
    </div>
  );
};
