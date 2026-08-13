import { MeetingNotesView } from "@/components/notes/MeetingNotesView";

export default function MeetingNotesPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <h1 className="text-h4 text-dark-primary">Meeting Notes</h1>
      <MeetingNotesView />
    </div>
  );
}
