// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import type { ListSitesResponse } from "@rugby-au/contracts";
import { backendFetch } from "../../backend-fetch";
import { listSites } from "./list-sites";

vi.mock("server-only", () => ({}));
vi.mock("../../backend-fetch", () => ({ backendFetch: vi.fn() }));

afterEach(() => {
  vi.resetAllMocks();
});

it("returns site list data directly for a Server Component", async () => {
  vi.mocked(backendFetch).mockResolvedValue(
    Response.json([
      {
        id: "rugby-au",
        name: "Rugby AU",
        siteKey: "rugby-au",
        pageCount: 2,
        status: "draft",
        theme: {
          primaryColor: "#005A30",
          backgroundColor: "#FFFFFF",
          textColor: "#111111",
          fontFamily: "Arial",
        },
      },
    ] satisfies ListSitesResponse),
  );

  const sites = await listSites();

  expect(sites).toEqual([
    {
      id: "rugby-au",
      name: "Rugby AU",
      url: "rugby-au",
      pageCount: 2,
      logo: undefined,
      status: "draft",
      themeColor: "#005A30",
    },
  ]);
});

it("throws a backend error instead of returning error data as sites", async () => {
  const body = { message: "Service unavailable" };
  vi.mocked(backendFetch).mockResolvedValue(
    Response.json(body, { status: 503 }),
  );

  await expect(listSites()).rejects.toMatchObject({ statusCode: 503, body });
});
