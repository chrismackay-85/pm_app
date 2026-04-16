"use client";

import { useMemo, useState } from "react";
import type { Dispatch } from "react";
import type { KanbanAction } from "../../lib/kanban/types";

export default function AddCardForm(props: {
  columnId: string;
  dispatch: Dispatch<KanbanAction>;
}) {
  const { columnId, dispatch } = props;
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const canSubmit = useMemo(() => title.trim().length > 0, [title]);

  return (
    <form
      className="space-y-2 border-t border-accentYellow/30 pt-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;

        const id = crypto.randomUUID();
        dispatch({
          type: "addCard",
          columnId,
          card: { id, title: title.trim(), details: details.trim() }
        });
        setTitle("");
        setDetails("");
      }}
    >
      <div className="space-y-1">
        <label className="block text-xs font-medium text-grayText" htmlFor={`add-title-${columnId}`}>
          Add card
        </label>
        <input
          id={`add-title-${columnId}`}
          data-testid={`add-title-${columnId}`}
          className="w-full rounded-md border border-accentYellow/30 bg-white px-3 py-2 text-sm text-darkNavy outline-none focus:ring-2 focus:ring-accentYellow/40"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <textarea
        data-testid={`add-details-${columnId}`}
        className="w-full resize-none rounded-md border border-accentYellow/30 bg-white px-3 py-2 text-sm text-darkNavy outline-none focus:ring-2 focus:ring-accentYellow/40"
        rows={3}
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      <button
        type="submit"
        data-testid={`add-button-${columnId}`}
        disabled={!canSubmit}
        className="w-full rounded-md bg-purpleSecondary px-3 py-2 text-sm font-semibold text-white/95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}

