"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface SectionTabDropdownOption {
  value: string;
  label: string;
}

interface SectionTabDropdownProps {
  options: SectionTabDropdownOption[];
  value: string;
  placeholder: string;
  ariaLabel: string;
  onChange: (value: string) => void;
}

export function SectionTabDropdown({
  options,
  value,
  placeholder,
  ariaLabel,
  onChange,
}: SectionTabDropdownProps) {
  const active = value !== "";

  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "appearance-none rounded-button border py-1.5 pr-8 pl-3 text-body-3 font-medium outline-none transition-colors",
          active
            ? "border-brand-blue text-brand-blue"
            : "border-muted-gray/60 text-dark-primary/70 hover:bg-light-gray"
        )}
      >
        {!active && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-dark-primary/50"
      />
    </div>
  );
}
