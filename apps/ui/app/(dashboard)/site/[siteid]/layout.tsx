import { TopNav } from "@/components/elements/TopNav/TopNav";
import type { ReactNode } from "react";
import { getSite } from "@/lib/server/sites/retrieve-site/retrieve-site";
import { SideNav } from "@/components/elements/SideNav/SideNav";
import styles from "./layout.module.scss";
import { PageStructureSection } from "@/features/site/SiteEditorPage/components/PageStructureSection/PageStructureSection";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ siteid: string }>;
}

export default async function SiteEditorLayout({
  children,
  params,
}: LayoutProps) {
  const { siteid } = await params;
  const { siteInformation, pageInformation } = await getSite({
    siteId: siteid,
  });

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <TopNav
          siteName={siteInformation.siteName}
          pageCount={siteInformation.pageCount}
          publicSiteUrl={siteInformation.url}
        />
      </div>
      <div className={styles.body}>
        <SideNav title="" headerNode={undefined}>
          <PageStructureSection
            pageCount={siteInformation.pageCount}
            pageList={pageInformation}
          />
        </SideNav>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
