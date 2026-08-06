import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ColumnHeader } from "@/components/ColumnHeader";
import { AddCardForm } from "@/components/AddCardForm";
import { Card } from "@/components/Card";

describe("ColumnHeader", () => {
  it("renames on Enter", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();

    render(<ColumnHeader title="Backlog" onRename={onRename} />);

    await user.click(screen.getByRole("button", { name: "Backlog" }));
    const input = screen.getByLabelText("Column title");
    await user.clear(input);
    await user.type(input, "Ideas{Enter}");

    expect(onRename).toHaveBeenCalledWith("Ideas");
  });
});

describe("AddCardForm", () => {
  it("submits with title and details", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<AddCardForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText("Card title"), "New card");
    await user.type(screen.getByLabelText("Card details"), "Details here");
    await user.click(screen.getByRole("button", { name: "Add card" }));

    expect(onAdd).toHaveBeenCalledWith("New card", "Details here");
  });

  it("does not submit with empty title", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<AddCardForm onAdd={onAdd} />);

    expect(screen.getByRole("button", { name: "Add card" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Add card" }));

    expect(onAdd).not.toHaveBeenCalled();
  });
});

describe("Card", () => {
  it("calls onDelete when delete is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <DndContext>
        <SortableContext items={["card-1"]}>
          <Card
            card={{ id: "card-1", title: "Test card", details: "Details" }}
            onDelete={onDelete}
          />
        </SortableContext>
      </DndContext>,
    );

    await user.click(screen.getByRole("button", { name: "Delete Test card" }));

    expect(onDelete).toHaveBeenCalledWith("card-1");
  });
});
