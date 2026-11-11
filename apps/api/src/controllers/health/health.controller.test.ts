import { app } from "@test/setup";
import { describe, expect, it } from "vitest";

describe("healthController", () => {
  it("responds with HTTP 200 and the healthy status as JSON", async () => {
    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.json<{ status: string }>()).toEqual({ status: "ok" });
  });
});
