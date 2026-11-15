import "server-only";

import type { RetrievePageResponse } from "@rugby-au/contracts";
import { backendFetch } from "@/lib/server/backend-fetch";

export const getPageBySiteAndPath = async (
  siteKey: string,
  path: string,
): Promise<RetrievePageResponse | undefined> => {
  const query = new URLSearchParams({ path });
  const response = await backendFetch(
    `/sites/${encodeURIComponent(siteKey)}/page?${query}`,
  );

  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(`Failed to retrieve public page (HTTP ${response.status})`);
  }

  return (await response.json()) as RetrievePageResponse;
};
