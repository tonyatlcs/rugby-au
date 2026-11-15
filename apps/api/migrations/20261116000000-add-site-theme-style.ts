import type { Db } from "mongodb";

export const up = async (db: Db) => {
  const sites = db.collection("sites");
  await sites.updateMany(
    { siteKey: "wallabies", "theme.style": { $exists: false } },
    { $set: { "theme.style": "promotional" } },
  );
  await sites.updateMany(
    { "theme.style": { $exists: false } },
    { $set: { "theme.style": "editorial" } },
  );
};

export const down = async (db: Db) => {
  await db.collection("sites").updateMany({}, { $unset: { "theme.style": "" } });
};
