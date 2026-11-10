import type { Db } from "mongodb";

const renameField = async (
  db: Db,
  from: "slug" | "siteKey",
  to: "slug" | "siteKey",
) => {
  const sites = db.collection("sites");
  const oldIndexName = `sites_${from}_unique`;
  // Remove the old unique index before unsetting its field on multiple sites.
  if (await sites.indexExists(oldIndexName)) {
    await sites.dropIndex(oldIndexName);
  }

  await sites.updateMany(
    { [from]: { $exists: true } },
    { $rename: { [from]: to } },
  );
  await sites.createIndex(
    { [to]: 1 },
    { unique: true, name: `sites_${to}_unique` },
  );
};

export const up = async (db: Db) => {
  await renameField(db, "slug", "siteKey");
};

export const down = async (db: Db) => {
  await renameField(db, "siteKey", "slug");
};
