import type { Db } from "mongodb";

/**
 * @param db {import('mongodb').Db}
 * @returns {Promise<void>}
 */
export const up = async (db: Db) => {
  await db.createCollection("pages");

  /**
   * This prevents two pages within the same site from sharing an address,
   * while allowing different sites to both have same address
   */
  await db
    .collection("pages")
    .createIndex(
      { siteId: 1, path: 1 },
      { unique: true, name: "pages_siteId_path_unique" },
    );
};

/**
 * @param db {import('mongodb').Db}
 * @returns {Promise<void>}
 */
export const down = async (db: Db) => {
  await db.dropCollection("pages");
};
