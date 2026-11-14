import { SiteEditorPage } from "@/features/site/pages/SiteEditorPage/SiteEditorPage";
import { getSite } from "@/lib/server/sites/retrieve-site/retrieve-site";
import { buildPageTree } from "@/lib/utils/build-page-tree";
import type { SiteParam } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import { Suspense } from "react";

type SiteDetailsPageProps = {
  params: Promise<SiteParam>;
};

export default function SiteDetailsPage(props: SiteDetailsPageProps) {
  return (
    <Suspense fallback={<p>Loading website details…</p>}>
      <SiteDetailsContent {...props} />
    </Suspense>
  );
}

async function SiteDetailsContent({ params }: SiteDetailsPageProps) {
  const siteParam = await params;
  const { siteInformation, pageInformation } = await getSite(siteParam);
  const pageTree = buildPageTree(pageInformation);

  return (
    <SiteEditorPage
      siteInformation={siteInformation}
      pageTree={pageTree}
    />
  );
}
