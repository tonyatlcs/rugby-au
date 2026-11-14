"use client";

import { Network, Plus, Scan } from "lucide-react";
import { Bubble } from "@/components/elements/Bubble/Bubble";
import styles from "./SiteEditorPage.module.scss";
import { PageNode } from "@/components/elements/PageNode/PageNode";
import type { SiteInformation } from "@/lib/server/schemas/site.schema";
import type { PageTree } from "@/lib/server/schemas/page.schema";
import { Button } from "@/components/controls/Button";
import { useModalManager } from "@/providers/Modal";
import { CreatePageModal } from "@/features/site/pages/SiteEditorPage/components/CreatePageModal/CreatePageModal";

import { SiteMapTreeLayout } from "@/features/site/layouts/SiteMapTreeLayout/SiteMapTreeLayout";
import { usePageEditorManager } from "@/providers/PageEditor";

interface SiteEditorPageProps {
  siteInformation: SiteInformation;
  pageTree: PageTree;
}

export const SiteEditorPage: React.FC<SiteEditorPageProps> = ({
  siteInformation,
  pageTree,
}) => {
  const { selectedPage, setSelectedPage } = usePageEditorManager();
  return (
    <div className={styles.canvas}>
      <section className={styles.header}>
        <Bubble
          icon={<Network color="var(--color-primary-500)" strokeWidth={2} />}
          title="Site map"
          description="View and organise your pages."
        />
        <Bubble
          variant="action"
          icon={<Scan strokeWidth={2} size={16} />}
          label="Fit to view"
        />
      </section>

      <section className={styles.body}>
        {pageTree.length > 0 ? (
          <SiteMapTreeLayout
            siteName={siteInformation.siteName}
            url={siteInformation.url || ""}
            pages={pageTree}
            selectedPage={selectedPage}
            onSelectPage={setSelectedPage}
          />
        ) : (
          <PageEmptyState
            siteInformation={siteInformation}
            pageTree={pageTree}
          />
        )}
      </section>
    </div>
  );
};

const PageEmptyState: React.FC<SiteEditorPageProps> = ({
  siteInformation,
  pageTree,
}) => {
  const { setActiveModal } = useModalManager();

  return (
    <>
      <PageNode
        variant="website"
        title={siteInformation.siteName}
        description={siteInformation.url}
      />
      <div className={styles.emptyChild}>
        <PageNode
          variant="add"
          title="Add your first page"
          description="Placed under website root"
        />
      </div>

      <div className={styles.disclainerText}>
        <h2>This website has no pages yet</h2>
        <span>
          Create a page to start building Youth Academy. You can organise pages
          and add content once they&rsquo;re created.
        </span>
      </div>
      <Button
        buttonColor="primary"
        buttonSize="medium"
        type="button"
        onClick={() =>
          setActiveModal(
            <CreatePageModal
              sitePath={siteInformation.url || ""}
              siteId={siteInformation.id}
              pages={pageTree.map((page) => ({
                id: page.attributes.id,
                title: page.name,
              }))}
            />,
          )
        }
      >
        <Plus size={20} />
        <span>Create page</span>
      </Button>
    </>
  );
};
