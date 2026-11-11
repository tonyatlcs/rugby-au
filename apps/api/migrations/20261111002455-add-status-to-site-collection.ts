import { Db } from "mongodb";

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const up = async (db: Db) => {
  await db
    .collection("sites")
    .updateMany({ status: { $exists: false } }, { $set: { status: "draft" } });
};

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const down = async (db: Db) => {
  await db.collection("sites").updateMany({}, { $unset: { status: "" } });
};
