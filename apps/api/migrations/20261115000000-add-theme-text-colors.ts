import type { Db } from "mongodb";

export const up = async (db: Db) => {
  await db
    .collection("sites")
    .updateMany(
      { "theme.brandTextColor": { $exists: false } },
      { $set: { "theme.brandTextColor": "#000000" } },
    );
  await db
    .collection("sites")
    .updateMany(
      { "theme.lightTextColor": { $exists: false } },
      { $set: { "theme.lightTextColor": "#202536" } },
    );
};

export const down = async (db: Db) => {
  await db
    .collection("sites")
    .updateMany(
      {},
      { $unset: { "theme.brandTextColor": "", "theme.lightTextColor": "" } },
    );
};
