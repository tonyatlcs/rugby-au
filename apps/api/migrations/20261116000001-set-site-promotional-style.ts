import type { Db } from "mongodb";

const siteId = "24382bb3-fb3b-4dca-82b1-0e19c1916aad";

export const up = async (db: Db) => {
  await db.collection<{ _id: string }>("sites").updateOne(
    { _id: siteId },
    { $set: { "theme.style": "promotional" } },
  );
};

// The previous style is unknown, so rollback leaves the site unchanged.
export const down = async () => {};
