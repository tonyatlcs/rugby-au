import type { Db } from "mongodb";

export const up = async (db: Db) => {
  await db
    .collection("sites")
    .updateMany(
      { "theme.lightBackgroundColor": { $exists: false } },
      { $set: { "theme.lightBackgroundColor": "#EEF5FF" } },
    );
};

export const down = async (db: Db) => {
  await db
    .collection("sites")
    .updateMany({}, { $unset: { "theme.lightBackgroundColor": "" } });
};
