import { Sparkles } from "lucide-react";

export function AiNotesPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card bg-white p-12 text-center shadow-brand">
      <Sparkles size={24} className="text-brand-blue" />
      <p className="text-body-1 font-medium text-dark-primary">AI Notes coming soon</p>
      <p className="max-w-sm text-body-3 text-dark-primary/60">
        This tab is a placeholder until the AI notes spec is defined.
      </p>
    </div>
  );
}
