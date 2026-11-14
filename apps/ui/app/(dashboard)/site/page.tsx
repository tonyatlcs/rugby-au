import { listSites } from "@/lib/server/sites/list-sites/list-sites";
import { SiteOverviewPage } from "@/features/site/pages/SiteOverviewPage/SiteOverviewPage";

export default async function SitePage() {
  const siteList = await listSites();
  return <SiteOverviewPage sites={siteList} />;
}
