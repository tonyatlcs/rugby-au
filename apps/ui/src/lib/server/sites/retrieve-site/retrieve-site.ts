import "server-only";

import type { RetrieveSiteResponse } from "@rugby-au/contracts";
import createHttpError from "http-errors";
import type {
  SiteParam,
  SiteResponse,
} from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import { backendFetch } from "@/lib/server/backend-fetch";
import { cache } from "react";

export const getSite = cache(
  async (param: SiteParam): Promise<SiteResponse> => {
    try {
      const response = await backendFetch(
        `/sites/${encodeURIComponent(param.siteId)}`,
      );

      if (!response.ok) {
        const message = "There is something wrong with the upstream service";
        throw createHttpError(response.status, message);
      }

      const rawSiteInformation: RetrieveSiteResponse = await response.json();

      const siteInformation: SiteResponse = {
        siteInformation: {
          id: rawSiteInformation.siteInfo.id,
          siteName: rawSiteInformation.siteInfo.name,
          pageCount:
            rawSiteInformation.siteInfo.pageCount ??
            rawSiteInformation.pageInfo.length,
          status: rawSiteInformation.siteInfo.status,
          url: rawSiteInformation.siteInfo.siteKey,
        },
        pageInformation: rawSiteInformation.pageInfo.map((rawPage) => ({
          id: rawPage.id,
          title: rawPage.title,
          path: rawPage.path,
          parentId: rawPage.parentId,
          order: rawPage.order,
        })),
      };

      return siteInformation;
    } catch (error) {
      if (createHttpError.isHttpError(error)) {
        throw error;
      }

      throw createHttpError.InternalServerError("Something went wrong");
    }
  },
);
