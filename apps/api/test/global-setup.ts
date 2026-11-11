import { MongoMemoryServer } from "mongodb-memory-server";
import type { TestProject } from "vitest/node";

declare module "vitest" {
  export interface ProvidedContext {
    mongoUri: string;
  }
}

export default async function setup({ provide }: TestProject) {
  const server = await MongoMemoryServer.create();
  provide("mongoUri", server.getUri());

  return async () => {
    await server.stop();
  };
}
