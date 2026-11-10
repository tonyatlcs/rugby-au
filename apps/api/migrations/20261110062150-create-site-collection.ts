import type { Db } from "mongodb";

/**
 * @param db {import('mongodb').Db}
 * @returns {Promise<void>}
 */
export const up = async (db: Db) => {
  await db.createCollection("sites");

  await db
    .collection("sites")
    .createIndex({ slug: 1 }, { unique: true, name: "sites_slug_unique" });
};

/**
 * @param db {import('mongodb').Db}
 * @returns {Promise<void>}
 */
export const down = async (db: Db) => {
  await db.dropCollection("sites");
};
