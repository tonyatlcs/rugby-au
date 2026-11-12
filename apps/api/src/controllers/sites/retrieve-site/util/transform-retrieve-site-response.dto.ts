import type {
  ComponentNode as StoredComponent,
  PageModel,
} from "@/models/page.model";
import type { SiteModel } from "@/models/site.model";
import type { ComponentNode, RetrieveSiteResponse } from "@rugby-au/contracts";

export type SiteWithPages = SiteModel & { pages: PageModel[] };

/** Maps a stored component and its children to the response shape. */
const transformComponent = (component: StoredComponent): ComponentNode => {
  return {
    id: component._id,
    type: component.type as ComponentNode["type"],
    props: component.props ?? {},
    children: (component.children ?? []).map(transformComponent),
  };
};

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
  return {
    siteInfo: {
      id: site._id,
      name: site.name,
      siteKey: site.siteKey,
      ...(site.description === undefined
        ? {}
        : { description: site.description }),
      status: "draft",
      theme: site.theme,
      pageCount: site.pages.length,
      createdAt: site.createdAt.toISOString(),
      updatedAt: site.updatedAt.toISOString(),
    },
    pageInfo: site.pages.map((page) => ({
      id: page._id,
      siteId: page.siteId as string,
      title: page.title,
      path: page.path,
      parentId:
        page.parentId === null
          ? ""
          : typeof page.parentId === "string"
            ? page.parentId
            : page.parentId._id,
      order: page.order,
      componentNode: {
        id: page._id,
        type: "section",
        props: {},
        children: page.components.map(transformComponent),
      },
      createdAt: page.createdAt.toISOString(),
      updatedAt: page.updatedAt.toISOString(),
    })),
  };
};
