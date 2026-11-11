import { app } from "@test/setup";
import { Page, Site } from "@/models/model";
import type { ListSitesResponse } from "@rugby-au/contracts";
import { describe, expect, it } from "vitest";

describe("listSitesController", () => {
  it("returns persisted sites with model defaults and API field mapping", async () => {
    const site = await Site.create({ name: "Rugby AU", siteKey: "rugby-au" });

    const response = await app.inject({ method: "GET", url: "/sites" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([
      {
        id: site._id,
        name: "Rugby AU",
        siteKey: "rugby-au",
        description: "",
        status: "draft",
        pageCount: 0,
        theme: {
          primaryColor: "#fa4602",
          backgroundColor: "#FFFFFF",
          textColor: "#202536",
          fontFamily: "Inter",
        },
      },
    ]);
  });

  it("counts only each site's pages and includes sites without pages", async () => {
    const firstSite = await Site.create({ name: "First", siteKey: "first" });
    const secondSite = await Site.create({ name: "Second", siteKey: "second" });
    const emptySite = await Site.create({ name: "Empty", siteKey: "empty" });

    await Page.create([
      { siteId: firstSite._id, title: "Home", path: "/" },
      { siteId: firstSite._id, title: "About", path: "/about" },
      { siteId: secondSite._id, title: "Home", path: "/" },
      { siteId: "another-site", title: "Unrelated", path: "/" },
    ]);

    const response = await app.inject({ method: "GET", url: "/sites" });

    expect(response.statusCode).toBe(200);
    const sites = response.json<ListSitesResponse>();
    expect(sites).toHaveLength(3);
    expect(sites).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: firstSite._id, pageCount: 2 }),
        expect.objectContaining({ id: secondSite._id, pageCount: 1 }),
        expect.objectContaining({ id: emptySite._id, pageCount: 0 }),
      ]),
    );
    for (const site of sites) {
      expect(site).not.toHaveProperty("pageCounts");
      expect(site).not.toHaveProperty("_id");
    }
  });

  it("starts with a clean database and returns an empty list", async () => {
    const response = await app.inject({ method: "GET", url: "/sites" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([]);
  });
});
