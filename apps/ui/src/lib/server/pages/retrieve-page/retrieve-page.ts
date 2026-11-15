import "server-only";

import type { RetrievePageResponse } from "@rugby-au/contracts";
import type {
  PageParams,
  PageResponse,
} from "@/lib/server/pages/retrieve-page/retrieve-page.schema";

import { backendFetch } from "@/lib/server/backend-fetch";
import createHttpError from "http-errors";

export const getPage = async (param: PageParams): Promise<PageResponse> => {
  try {
    const response = await backendFetch(
      `/pages/${encodeURIComponent(param.pageId)}`,
    );
    if (!response.ok) {
      const message = "There is something wrong with the upstream service";
      throw createHttpError(response.status, message);
    }

    const rawPageInformation: RetrievePageResponse = await response.json();

    const page: PageResponse = {
      summary: {
        id: rawPageInformation.id,
        title: rawPageInformation.title,
        siteName: rawPageInformation.site.name,
        siteKey: rawPageInformation.site.siteKey,
        path: rawPageInformation.path,
      },
      componentTree: rawPageInformation.components ?? [],
      siteTheme: rawPageInformation.site.theme,
    };

    return page;
  } catch (error) {
    if (createHttpError.isHttpError(error)) {
      throw error;
    }

    throw createHttpError.InternalServerError("Something went wrong");
  }
};
