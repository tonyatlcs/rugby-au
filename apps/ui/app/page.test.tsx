import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Home from "./page";

it("renders the Rugby AU homepage heading", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", { level: 1, name: "Rugby AU" }),
  ).toBeDefined();
});
