import { healthController } from "@/controllers/health/health.controller";
import Fastify from "fastify";
import { describe, expect, it, onTestFinished } from "vitest";

describe("healthController", () => {
  it("responds with HTTP 200 and the healthy status as JSON", async () => {
    const app = Fastify();
    onTestFinished(async () => {
      await app.close();
    });
    app.get("/health", healthController);

    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.json<{ status: string }>()).toEqual({ status: "ok" });
  });
});
