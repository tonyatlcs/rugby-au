import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ModalManagerProvider } from "@/providers/Modal";
import { TopNav } from "./TopNav";

vi.mock("next/navigation", () => ({ useRouter: () => ({ back: vi.fn() }) }));

describe("TopNav", () => {
  it("opens and closes the create page modal", async () => {
    render(
      <ModalManagerProvider>
        <TopNav siteName="Example" pageCount={0} />
      </ModalManagerProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Create page" }));
    expect(screen.getByRole("dialog", { name: "Create page" })).toBeDefined();
    expect(screen.getByText("Page creation is coming soon.")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
