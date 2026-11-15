"use client";

import { TopNav } from "@/components/elements/TopNav/TopNav";
import type { ReactNode } from "react";
import { SideNav } from "@/components/elements/SideNav/SideNav";
import styles from "./SiteEditorLayout.module.scss";
import { useSiteEditorManager } from "@/providers/SiteEditor";
import { EditPageInformationSection } from "@/features/site/pages/SiteEditorPage/components/EditPageInformationSection/EditPageInformationSection";
import { PageStructureSection } from "@/features/site/pages/SiteEditorPage/components/PageStructureSection/PageStructureSection";
import { Button } from "@/components/controls/Button";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, Plus } from "lucide-react";
import { Tag } from "@/components/elements/Tag/Tag";
import { useModalManager } from "@/providers/Modal";
import { CreatePageModal } from "@/features/site/pages/SiteEditorPage/components/CreatePageModal/CreatePageModal";

interface SideEditorLayoutProps {
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
}) => {
  const { siteInformation, pageInformation, selectedPage, setSelectedPage } =
    useSiteEditorManager();
  const { setActiveModal } = useModalManager();
  const renderDescription = () => (
    <>
      <span>{siteInformation.siteName}</span>
      <span>&middot;</span>
      <span>
        {siteInformation.pageCount > 0
          ? `${siteInformation.pageCount} pages`
          : "No pages"}
      </span>
    </>
  );

  const renderPath = () => (
    <Tag variant="neutral" tagColor="greyscale" size="large">
      <span>{siteInformation.url}</span>
      <span className={styles.urlSeparator}>/</span>
      <span className={styles.pagesText}>pages</span>
    </Tag>
  );

  const renderActions = () => (
    <>
      <Button buttonColor="secondary" buttonSize="medium" type="button">
        <Eye size={24} />
        <span>View Public Site</span>
      </Button>
      <Button
        buttonColor="primary"
        buttonSize="medium"
        type="button"
        onClick={() =>
          setActiveModal(
            <CreatePageModal
              sitePath={siteInformation.url || ""}
              siteId={siteInformation.id}
              pages={pageInformation}
            />,
          )
        }
      >
        <Plus size={20} />
        <span>Create page</span>
      </Button>
    </>
  );

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <TopNav
          title="Page Overview"
          description={renderDescription()}
          path={renderPath()}
          actions={renderActions()}
        />
      </div>
      <div className={styles.body}>
        <SideNav
          orientation="left"
          footer={<SiteEditorSideNavFooter pageId={selectedPage?.id} />}
        >
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
