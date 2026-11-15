import { notFound } from "next/navigation";
import { ComponentTree } from "@/features/page/components/ComponentTree/ComponentTree";
import { SiteThemeWrapper } from "@/features/page/components/SiteThemeWrapper/SiteThemeWrapper";
import { getPageBySiteAndPath } from "@/lib/server/pages/retrieve-page-by-path/retrieve-page-by-path";

// Resolve the current saved page on each request before rendering its content.
export const instant = false;

export default async function PublicPage({
  params,
}: PageProps<"/public/[siteKey]/[[...path]]">) {
  const { siteKey, path } = await params;

  const pagePath = path?.length ? `/${path.join("/")}` : "/";
  const page = await getPageBySiteAndPath(siteKey, pagePath);
  if (!page) notFound();

  return (
    <SiteThemeWrapper theme={page.site.theme}>
      <ComponentTree
        components={page.components ?? []}
        siteStyle={page.site.theme.style}
      />
    </SiteThemeWrapper>
  );
}
