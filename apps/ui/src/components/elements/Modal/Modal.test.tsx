import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from ".";
import { ModalManagerProvider, useModalManager } from "@/providers/Modal";
import styles from "./Modal.module.scss";

describe("Modal", () => {
  it("respects canClose for the close button and backdrop", () => {
    const onClose = vi.fn();
    const canClose = vi.fn(() => false);
    const { container, rerender } = render(
      <Modal canClose={canClose} onClose={onClose} showCloseButton title="Example">Content</Modal>,
    );
    expect(screen.getByRole("dialog", { name: "Example" })).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));
    fireEvent.click(container.querySelector(`.${styles.splash}`)!);
    expect(onClose).not.toHaveBeenCalled();

    canClose.mockReturnValue(true);
    rerender(<Modal canClose={canClose} onClose={onClose} showCloseButton title="Example">Content</Modal>);
    fireEvent.click(screen.getByText("Content"));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(container.querySelector(`.${styles.splash}`)!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("opens and closes a modal through the manager", async () => {
    function Trigger() {
      const { setActiveModal, closeModal } = useModalManager();
      return <button onClick={() => setActiveModal(
        <Modal canClose={() => true} onClose={closeModal} showCloseButton title="Managed">Body</Modal>,
      )}>Open</button>;
    }
    render(<ModalManagerProvider><Trigger /></ModalManagerProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog", { name: "Managed" })).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
