import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { BaseInput } from ".";

describe("BaseInput", () => {
  it("associates labels with custom and generated ids", () => {
    render(
      <>
        <BaseInput id="email" label="Email" required type="email" />
        <BaseInput label="Page title" />
        <BaseInput label="Site name" />
      </>,
    );

    const email = screen.getByRole("textbox", { name: "Email*" });
    const pageTitle = screen.getByRole("textbox", { name: "Page title" });
    const siteName = screen.getByRole("textbox", { name: "Site name" });

    expect(email.id).toBe("email");
    expect(email.getAttribute("type")).toBe("email");
    expect(email.hasAttribute("required")).toBe(true);
    expect(pageTitle.id).toBeTruthy();
    expect(pageTitle.id).not.toBe(siteName.id);
  });

  it("shows and clears error messages", async () => {
    const { rerender } = render(
      <BaseInput
        errorMsg="Enter a valid email address."
        label="Email"
        type="email"
      />,
    );

    expect(screen.getByText("Enter a valid email address.")).toBeDefined();

    rerender(<BaseInput label="Email" type="email" />);

    await waitFor(() => {
      expect(screen.queryByText("Enter a valid email address.")).toBeNull();
    });
  });

  it("supports native form attributes, events, refs, and adornments", () => {
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();

    render(
      <BaseInput
        defaultValue="Rugby"
        endAdornment={<button type="button">Search</button>}
        label="Search sites"
        name="query"
        onChange={onChange}
        ref={ref}
        startAdornment={<span aria-hidden="true">⌕</span>}
        type="search"
        variant="filled"
      />,
    );

    const input = screen.getByRole("searchbox", { name: "Search sites" });
    fireEvent.change(input, { target: { value: "Wallabies" } });

    expect(ref.current).toBe(input);
    expect(ref.current?.value).toBe("Wallabies");
    expect(input.getAttribute("name")).toBe("query");
    expect(onChange).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Search" })).toBeDefined();
  });
});
