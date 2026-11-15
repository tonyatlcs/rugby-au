import type { Db } from "mongodb";

// Stable IDs allow rollback to remove only pages inserted by this migration.
const examples = [
  {
    siteKey: "rugby-au",
    pageId: "4b941e3d-84ca-4c84-a5c6-6a2a333ce001",
    title: "Home",
    heading: "Welcome to Rugby AU",
    cards: [
      {
        id: "rugby-card-1",
        variant: "icon",
        icon: "🏉",
        heading: "Get involved",
        subHeading: "Discover rugby in Australia.",
      },
      {
        id: "rugby-card-2",
        variant: "icon",
        icon: "🏆",
        heading: "Our teams",
        subHeading: "Explore Australian rugby.",
      },
    ],
  },
  {
    siteKey: "wallabies",
    pageId: "4b941e3d-84ca-4c84-a5c6-6a2a333ce002",
    title: "Home",
    heading: "Welcome to the Wallabies",
    cards: [
      {
        id: "wallabies-card-1",
        variant: "icon",
        icon: "🏉",
        heading: "The Wallabies",
        subHeading: "Meet Australia's national rugby team.",
      },
      {
        id: "wallabies-card-2",
        variant: "icon",
        icon: "🌏",
        heading: "Our journey",
        subHeading: "Follow the team on and off the field.",
      },
    ],
  },
];

export const up = async (db: Db) => {
  const sites = db.collection<{ _id: string; siteKey: string }>("sites");
  const pages = db.collection<{ _id: string }>("pages");

  for (const example of examples) {
    const site = await sites.findOne({ siteKey: example.siteKey });
    if (!site) throw new Error(`Site not found: ${example.siteKey}`);

    const now = new Date();
    const sectionId = `${example.siteKey}-section`;
    const gridId = `${example.siteKey}-grid`;
    await pages.updateOne(
      { siteId: site._id, path: "/" },
      {
        $setOnInsert: {
          _id: example.pageId,
          siteId: site._id,
          title: example.title,
          path: "/",
          parentId: null,
          order: 0,
          components: [
            {
              _id: sectionId,
              name: example.heading,
              type: "section",
              props: {
                headerLabel: example.heading,
                layout: "full",
                themeType: "none",
              },
              children: [
                {
                  _id: gridId,
                  name: "Highlights",
                  type: "card-grid",
                  props: {
                    id: gridId,
                    title: "Highlights",
                    cards: example.cards,
                  },
                  children: [],
                },
              ],
            },
          ],
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true },
    );
  }
};

export const down = async (db: Db) => {
  await db.collection<{ _id: string }>("pages").deleteMany({
    _id: { $in: examples.map((example) => example.pageId) },
  });
};
