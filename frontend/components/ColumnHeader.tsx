"use client";

import { useState } from "react";

type ColumnHeaderProps = {
  title: string;
  onRename: (title: string) => void;
};

export function ColumnHeader({ title, onRename }: ColumnHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const commit = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onRename(trimmed);
      setValue(trimmed);
    } else {
      setValue(title);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        aria-label="Column title"
        autoFocus
        className="w-full rounded-md border border-primary/30 bg-white px-2 py-1 text-sm font-semibold text-navy outline-none focus:border-primary"
        value={value}
        onBlur={commit}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commit();
          }
          if (event.key === "Escape") {
            setValue(title);
            setIsEditing(false);
          }
        }}
      />
    );
  }

  return (
    <button
      type="button"
      className="w-full truncate text-left text-sm font-semibold text-navy transition-colors hover:text-primary"
      onClick={() => {
        setValue(title);
        setIsEditing(true);
      }}
    >
      {title}
    </button>
  );
}
