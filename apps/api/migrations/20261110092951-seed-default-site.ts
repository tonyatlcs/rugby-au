import type { Db } from "mongodb";
import { randomUUID } from "node:crypto";

const sites = [
  {
    _id: randomUUID(),
    name: "Rugby AU",
    siteKey: "rugby-au",
    description: "The Rugby AU website.",
    theme: {
      primaryColor: "#fa4602",
      backgroundColor: "#FFFFFF",
      textColor: "#202536",
      fontFamily: "Inter",
    },
  },
  {
    _id: randomUUID(),
    name: "Wallabies",
    siteKey: "wallabies",
    description: "The Wallabies website.",
    theme: {
      primaryColor: "#FFCD00",
      backgroundColor: "#FFFFFF",
      textColor: "#202536",
      fontFamily: "Inter",
    },
  },
];

export const up = async (db: Db) => {
  const now = new Date();

  // Native MongoDB writes bypass the model's defaults and timestamps.
  for (const site of sites) {
    await db.collection<{ _id: string }>("sites").updateOne(
      { siteKey: site.siteKey },
      {
        $setOnInsert: {
          ...site,
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true },
    );
  }
};

export const down = async (db: Db) => {
  // Rollback removes matching site keys, including sites that predated this seed.
  await db
    .collection("sites")
    .deleteMany({ siteKey: { $in: sites.map((site) => site.siteKey) } });
};
