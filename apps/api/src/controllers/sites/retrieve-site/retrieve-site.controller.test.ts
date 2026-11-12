import { app } from "@test/setup";
import { Page, Site } from "@/models/model";
import type { RetrieveSiteResponse } from "@rugby-au/contracts";
import { describe, expect, it } from "vitest";

describe("retireveSiteController", () => {
  it("returns a site and its pages with mapped components", async () => {
    const site = await Site.create({ name: "Rugby AU", siteKey: "rugby-au" });
    const page = await Page.create({
      siteId: site._id,
      title: "Home",
      path: "/",
      components: [
        {
          _id: "section-1",
          type: "section",
          props: { heading: "Welcome" },
          children: [{ _id: "grid-1", type: "card-grid", props: {} }],
        },
      ],
    });
    await Page.create({ siteId: "other-site", title: "Other", path: "/" });

    const response = await app.inject({
      method: "GET",
      url: `/sites/${site._id}`,
    });

    expect(response.statusCode, response.body).toBe(200);
    expect(response.json()).toEqual({
      siteInfo: {
        id: site._id,
        name: site.name,
        siteKey: site.siteKey,
        status: "draft",
        pageCount: 1,
        createdAt: site.createdAt.toISOString(),
        updatedAt: site.updatedAt.toISOString(),
        theme: {
          primaryColor: "#fa4602",
          backgroundColor: "#FFFFFF",
          textColor: "#202536",
          fontFamily: "Inter",
        },
      },
      pageInfo: [
        {
          id: page._id,
          siteId: site._id,
          title: "Home",
          path: "/",
          parentId: "",
          order: 0,
          componentNode: {
            id: page._id,
            type: "section",
            props: {},
            children: [
              {
                id: "section-1",
                type: "section",
                props: { heading: "Welcome" },
                children: [
                  { id: "grid-1", type: "card-grid", props: {}, children: [] },
                ],
              },
            ],
          },
          createdAt: page.createdAt.toISOString(),
          updatedAt: page.updatedAt.toISOString(),
        },
      ],
    });
  });

  it("returns an empty page list for a site without pages", async () => {
    const site = await Site.create({ name: "Empty", siteKey: "empty" });

    const response = await app.inject({
      method: "GET",
      url: `/sites/${site._id}`,
    });

    expect(response.statusCode).toBe(200);
    const body = response.json<RetrieveSiteResponse>();
    expect(body.siteInfo.pageCount).toBe(0);
    expect(body.pageInfo).toEqual([]);
  });

  it("returns an error when the site does not exist", async () => {
    const response = await app.inject({ method: "GET", url: "/sites/missing" });

    expect(response.statusCode).toBe(500);
    expect(response.json<{ message: string }>().message).toBe(
      "Failed to retrieve requested site information",
    );
  });
});
