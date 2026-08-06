"use client";

import { useState } from "react";

type AddCardFormProps = {
  onAdd: (title: string, details: string) => void;
};

export function AddCardForm({ onAdd }: AddCardFormProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    onAdd(trimmedTitle, details.trim());
    setTitle("");
    setDetails("");
  };

  return (
    <form className="mt-3 space-y-2" onSubmit={handleSubmit}>
      <input
        aria-label="Card title"
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-navy outline-none transition focus:border-primary"
        placeholder="Card title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        aria-label="Card details"
        className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray outline-none transition focus:border-primary"
        placeholder="Details (optional)"
        rows={2}
        value={details}
        onChange={(event) => setDetails(event.target.value)}
      />
      <button
        type="submit"
        className="w-full rounded-md bg-secondary px-3 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!title.trim()}
      >
        Add card
      </button>
    </form>
  );
}
