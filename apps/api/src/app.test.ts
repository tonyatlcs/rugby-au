import { buildApp } from "@/app";
import { describe, expect, it, onTestFinished } from "vitest";

describe("GET /health", () => {
  it("returns the API health status as JSON", async () => {
    const app = buildApp();
    onTestFinished(async () => {
      await app.close();
    });

    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.json<{ status: string }>()).toEqual({ status: "ok" });
  });
});
