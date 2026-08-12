"use client";

import type { ReactNode } from "react";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { TopNav } from "./TopNav";
import { AppSkeleton } from "./AppSkeleton";

export function AppShell({ children }: { children: ReactNode }) {
  const hydrated = useHasHydrated();

  if (!hydrated) {
    return <AppSkeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      {children}
    </div>
  );
}
