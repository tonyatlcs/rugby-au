import type {
  ComponentNode as StoredComponent,
  PageModel,
} from "@/models/page.model";
import type { ComponentNode, RetrievePageResponse } from "@rugby-au/contracts";
import type { SiteModel } from "@/models/site.model";
import { transformSite } from "@/dto/transform-retrieve-site-response.dto";

export type PageWithSite = PageModel & {
  site: SiteModel;
  pageCounts: { total: number }[];
};

const transformComponent = (component: StoredComponent): ComponentNode => {
  switch (component.type) {
    case "section":
      return {
        id: component._id,
        type: "section",
        props: component.props,
        children: (component.children ?? []).map(transformComponent),
      };
    case "card-grid":
      return {
        id: component._id,
        type: "card-grid",
        props: component.props,
        children: component.children ?? [],
      };
  }
};

export const transformRetrievePageResponse = (
  page: PageWithSite,
): RetrievePageResponse => ({
  id: page._id,
  site: transformSite(page.site, page.pageCounts[0]?.total ?? 0),
  title: page.title,
  path: page.path,
  parentId:
    typeof page.parentId === "string"
      ? page.parentId
      : (page.parentId?._id ?? ""),
  order: page.order,
  components: page.components.map(transformComponent),
  createdAt: page.createdAt.toISOString(),
  updatedAt: page.updatedAt.toISOString(),
});
