// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { backendFetch } from "@/lib/server/backend-fetch";
import type { ListSitesResponse } from "@rugby-au/contracts";
import { GET } from "./route";

vi.mock("@/lib/server/backend-fetch", () => ({ backendFetch: vi.fn() }));
vi.mock("server-only", () => ({}));

afterEach(() => {
  vi.resetAllMocks();
});

it("maps backend sites and their page counts into the frontend response", async () => {
  const sites = [
    {
      id: "site-1",
      name: "Rugby AU",
      siteKey: "rugby-au",
      status: "draft",
      pageCount: 3,
      theme: {
        primaryColor: "#fa4602",
        backgroundColor: "#FFFFFF",
        textColor: "#202536",
        fontFamily: "Inter",
      },
    },
  ] satisfies ListSitesResponse;
  vi.mocked(backendFetch).mockResolvedValue(Response.json(sites));

  const response = await GET();

  expect(backendFetch).toHaveBeenCalledWith("/sites");
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual([
    {
      name: "Rugby AU",
      url: "rugby-au",
      status: "draft",
      pageCount: 3,
    },
  ]);
});

it("preserves a backend error status and JSON body", async () => {
  const body = { message: "Service unavailable" };
  vi.mocked(backendFetch).mockResolvedValue(
    Response.json(body, { status: 503 }),
  );

  const response = await GET();

  expect(response.status).toBe(503);
  expect(await response.json()).toEqual(body);
});

it("throws a server error when the backend cannot be reached", async () => {
  vi.mocked(backendFetch).mockRejectedValue(new Error("Connection refused"));

  await expect(GET()).rejects.toMatchObject({
    statusCode: 500,
    message: "Something went wrong",
  });
});
