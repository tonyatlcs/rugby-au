"use client";

import { TopNav } from "@/components/elements/TopNav/TopNav";
import type { ReactNode } from "react";
import type { SiteResponse } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import { SideNav } from "@/components/elements/SideNav/SideNav";
import styles from "./SiteEditorLayout.module.scss";
import { usePageEditorManager } from "@/providers/PageEditor";
import { EditPageInformationSection } from "@/features/site/pages/SiteEditorPage/components/EditPageInformationSection/EditPageInformationSection";
import { PageStructureSection } from "@/features/site/pages/SiteEditorPage/components/PageStructureSection/PageStructureSection";
import { Button } from "@/components/controls/Button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface SideEditorLayoutProps extends SiteResponse {
  children: ReactNode;
}

const SiteEditorSideNavFooter = ({ pageId }: { pageId?: string }) => {
  const router = useRouter();
  return (
    <>
      {pageId && (
        <div className={styles.footerWrapper}>
          <Button
            type={"button"}
            buttonColor={"primary"}
            variant={"filled"}
            buttonSize={"large"}
            fullWidth
            onClick={() => {
              router.push(`/page/${encodeURIComponent(pageId)}`);
            }}
          >
            <span>Edit Content</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </>
  );
};

export const SiteEditorLayout: React.FC<SideEditorLayoutProps> = ({
  children,
  siteInformation,
  pageInformation,
}) => {
  const { selectedPage, setSelectedPage } = usePageEditorManager();
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <TopNav
          siteInformation={siteInformation}
          pageInformation={pageInformation}
        />
      </div>
      <div className={styles.body}>
        <SideNav footer={<SiteEditorSideNavFooter pageId={selectedPage?.id} />}>
          <PageStructureSection
            pageCount={siteInformation.pageCount}
            pageList={pageInformation}
          />
          {selectedPage && (
            <EditPageInformationSection
              key={selectedPage.id}
              page={selectedPage}
              pages={pageInformation}
              onCancel={() => setSelectedPage(null)}
            />
          )}
        </SideNav>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
