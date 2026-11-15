import type { PageModel } from "@/models/page.model";
import type { SiteModel } from "@/models/site.model";
import type { RetrieveSiteResponse, Site } from "@rugby-au/contracts";

export type SiteWithPages = SiteModel & { pages: PageModel[] };

export const transformSite = (site: SiteModel, pageCount: number): Site => ({
  id: site._id,
  name: site.name,
  siteKey: site.siteKey,
  ...(site.description === undefined ? {} : { description: site.description }),
  status: "draft",
  theme: site.theme,
  pageCount,
  createdAt: site.createdAt.toISOString(),
  updatedAt: site.updatedAt.toISOString(),
});

/**
 * Maps a site aggregation and its pages to the retrieve-site response.
 *
 * @param site - The site and its associated pages from the aggregation.
 * @returns The site information and mapped pages for the API response.
 */
export const transformRetrieveSiteResponse = (
  site: SiteWithPages | undefined,
): RetrieveSiteResponse | undefined => {
  if (!site) return undefined;
  const siteInfo = transformSite(site, site.pages.length);
  return {
    siteInfo,
    pageInfo: site.pages.map((page) => ({
      id: page._id,
      site: siteInfo,
      title: page.title,
      path: page.path,
      parentId:
        typeof page.parentId === "string"
          ? page.parentId
          : (page.parentId?._id ?? ""),
      order: page.order,
      createdAt: page.createdAt.toISOString(),
      updatedAt: page.updatedAt.toISOString(),
    })),
  };
};
