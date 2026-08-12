import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-gradient-cta text-white shadow-brand hover:opacity-90",
  secondary: "bg-light-gray text-dark-primary hover:bg-muted-gray/40",
  ghost: "text-dark-primary hover:bg-light-gray",
  danger: "text-brand-purple hover:bg-light-gray",
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-button px-4 py-2 text-body-3 font-medium uppercase tracking-wide transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
