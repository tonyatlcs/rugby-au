import { listSites } from "@/lib/server/sites/list-sites/list-sites";
import { SiteOverviewPage } from "@/features/site/SiteOverviewPage/SiteOverviewPage";
import { Suspense } from "react";

async function SiteContents() {
  const siteList = await listSites();

  return (
    <div>
      <SiteOverviewPage sites={siteList} />
    </div>
  );
}

export default function SitePage() {
  return (
    <Suspense fallback={<p>Loading websites…</p>}>
      <SiteContents />
    </Suspense>
  );
}
