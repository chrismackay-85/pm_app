import { AiNotesPlaceholder } from "@/components/notes/AiNotesPlaceholder";

export default function AiNotesPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <h1 className="text-h4 text-dark-primary">AI Notes</h1>
      <AiNotesPlaceholder />
    </div>
  );
}
