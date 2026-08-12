"use client";

import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="relative w-64">
      <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-gray" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search cards"
        className="w-full rounded-button border border-muted-gray bg-white py-2 pr-3 pl-9 text-body-3 outline-none focus:border-brand-blue"
      />
    </div>
  );
}
