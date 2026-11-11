import { expect, it } from "vitest";
import Home from "./page";

it("redirects the homepage to /site", () => {
  expect(Home).toThrow(
    expect.objectContaining({ digest: "NEXT_REDIRECT;replace;/site;307;" }),
  );
});
