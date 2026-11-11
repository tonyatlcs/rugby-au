import { buildApp } from "@/app";
import { MongoClient } from "mongodb";
import { afterAll, afterEach, beforeAll, inject, vi } from "vitest";

const mongoUri = inject("mongoUri");
const client = new MongoClient(mongoUri);
vi.stubEnv("MONGODB_URI", mongoUri);

export const app = buildApp();

beforeAll(async () => {
  await app.ready();
});

afterEach(async () => {
  const collections = await client.db().collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  try {
    await Promise.all([app.close(), client.close()]);
  } finally {
    vi.unstubAllEnvs();
  }
});
