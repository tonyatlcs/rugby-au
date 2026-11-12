import "server-only";

import type { ListSitesResponse } from "@rugby-au/contracts";
import createHttpError from "http-errors";
import type { SiteListResponse } from "@/lib/server/sites/list-sites/list-sites.schema";
import { backendFetch } from "@/lib/server/backend-fetch";

export const listSites = async (): Promise<SiteListResponse> => {
  try {
    const response = await backendFetch("/sites");

    if (!response.ok) {
      const body: unknown = await response.json();
      throw createHttpError(response.status, { body });
    }

    const sites: ListSitesResponse = await response.json();

    const siteList: SiteListResponse = sites.map((site) => ({
      id: site.id,
      name: site.name,
      url: site.siteKey,
      pageCount: site.pageCount,
      logo: undefined,
      status: site.status,
      themeColor: site.theme.primaryColor,
    }));

    return siteList;
  } catch (error) {
    if (createHttpError.isHttpError(error)) {
      throw error;
    }

    throw createHttpError.InternalServerError("Something went wrong");
  }
};
