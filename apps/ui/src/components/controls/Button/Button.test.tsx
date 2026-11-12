import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from ".";
import styles from "./Button.module.scss";

describe("Button", () => {
  it("renders its content and responds to clicks", () => {
    const onClick = vi.fn();
    render(
      <Button buttonColor="primary" buttonSize="medium" onClick={onClick} startAdornment={<span>+</span>} type="submit">
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "+Save" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(button.getAttribute("type")).toBe("submit");
    expect(button.classList.contains(styles.filled)).toBe(true);
  });

  it("disables interaction and shows a sized indicator while loading", () => {
    const onClick = vi.fn();
    render(<Button buttonColor="primary" buttonSize="small" isLoading onClick={onClick} type="button">Save</Button>);
    const button = screen.getByRole("button") as HTMLButtonElement;
    fireEvent.click(button);
    expect(button.disabled).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("progressbar", { name: "Loading" }).style.width).toBe("16px");
  });

  it("lets fullWidth take precedence over a custom width", () => {
    render(<Button buttonColor="primary" buttonSize="large" fullWidth type="button" variant="outlined" width={320}>Save</Button>);
    const button = screen.getByRole("button");
    expect(button.classList.contains(styles.fullWidth)).toBe(true);
    expect(button.classList.contains(styles.outlined)).toBe(true);
    expect(button.style.width).toBe("");
  });
});
