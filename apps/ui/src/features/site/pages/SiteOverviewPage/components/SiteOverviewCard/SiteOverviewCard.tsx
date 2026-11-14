"use client";

import React, { type CSSProperties } from "react";
import styles from "@/features/site/pages/SiteOverviewPage/components/SiteOverviewCard/SiteOverviewCard.module.scss";
import type { SiteListItem } from "@/lib/server/sites/list-sites/list-sites.schema";
import { StatusBadge } from "@/components/elements/StatusBadge/StatusBadge";
import { ArrowRight, Link } from "lucide-react";
import { Tag } from "@/components/elements/Tag/Tag";
import { useRouter } from "next/navigation";

interface SiteOverviewCardProps {
  cardItems: SiteListItem;
}

export const SiteOverviewCard: React.FC<SiteOverviewCardProps> = (props) => {
  const themeStyle = {
    "--site-overview-card-theme-color": props.cardItems.themeColor,
  } as CSSProperties;
  const router = useRouter();

  const handleClick = (siteId: string) => {
    router.push(`/site/${encodeURIComponent(siteId)}`);
  };

  return (
    <div className={styles.wrapper} style={themeStyle}>
      <section className={styles.header}>
        <div className={styles.siteLogo}>
          <h4>{props.cardItems.name.charAt(0).toUpperCase()}</h4>
        </div>
        <StatusBadge
          variant={props.cardItems.status}
          label={props.cardItems.status}
        />
      </section>
      <section className={styles.body}>
        <div className={styles.bodyHeading}>
          <h5>{props.cardItems.name}</h5>
          <div className={styles.siteLink}>
            <Link
              size={14}
              color={"var(--color-greyscale-600)"}
              strokeWidth={3}
            />
            <span>{props.cardItems.url}</span>
          </div>
        </div>
        <div className={styles.bodyContents}>
          <Tag className={styles.pageCountTag} variant="default" tagColor="primary" size="small">
            <span>
              {props.cardItems.pageCount > 0
                ? `${props.cardItems.pageCount} pages`
                : "No Pages"}
            </span>
          </Tag>
          {/* TODO: update edited time of time allows */}
          {/* <span>Last edited 2h ago</span> */}
        </div>
      </section>
      <hr />
      <section
        className={styles.footer}
        onClick={() => handleClick(props.cardItems.id)}
      >
        <span>
          {props.cardItems.pageCount === 0
            ? "Create your first page"
            : "Manage pages"}
        </span>
        <ArrowRight
          size={16}
          color={"var(--color-primary-500)"}
          strokeWidth={3}
        />
      </section>
    </div>
  );
};
