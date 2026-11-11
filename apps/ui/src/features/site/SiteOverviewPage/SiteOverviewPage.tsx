"use client";
import type { SiteListResponse } from "@/lib/server/sites/list-sites/list-sites.schema";
import React from "react";
import styles from "@/features/site/SiteOverviewPage/SiteOverviewPage.module.scss";
import { SiteOverviewCard } from "@/features/site/SiteOverviewPage/components/SiteOverviewCard/SiteOverviewCard";

export interface SiteOverviewPageProps {
  sites: SiteListResponse;
}

export const SiteOverviewPage: React.FC<SiteOverviewPageProps> = ({
  sites,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Select a website</h1>
        <span>Choose a website to manage its pages and content</span>
      </div>
      <div className={styles.contents}>
        {sites.map((site) => (
          <SiteOverviewCard key={site.id} cardItems={site} />
        ))}
      </div>
    </div>
  );
};
