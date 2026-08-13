"use client";

import { Plus, Trash2 } from "lucide-react";
import { useNotesStore } from "@/lib/notesStore";
import { Button } from "@/components/ui/Button";

export function MeetingNotesView() {
  const meetingNotes = useNotesStore((s) => s.meetingNotes);
  const addMeetingNote = useNotesStore((s) => s.addMeetingNote);
  const updateMeetingNote = useNotesStore((s) => s.updateMeetingNote);
  const deleteMeetingNote = useNotesStore((s) => s.deleteMeetingNote);

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={addMeetingNote} className="self-start normal-case">
        <Plus size={14} /> Add meeting note
      </Button>

      {meetingNotes.length === 0 ? (
        <p className="text-body-3 text-dark-primary/60">No meeting notes yet.</p>
      ) : (
        meetingNotes.map((entry) => (
          <div key={entry.id} className="rounded-card bg-white p-4 shadow-brand">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                <input
                  type="date"
                  defaultValue={entry.date}
                  onChange={(e) => updateMeetingNote(entry.id, "date", e.target.value)}
                  className="rounded-button border border-muted-gray/60 px-2 py-1 text-body-3 text-dark-primary outline-none focus:border-brand-blue"
                />
                <input
                  defaultValue={entry.title}
                  onBlur={(e) => updateMeetingNote(entry.id, "title", e.target.value)}
                  placeholder="Meeting title"
                  className="flex-1 min-w-[160px] rounded-button border border-transparent px-2 py-1 text-body-1 font-medium text-dark-primary outline-none hover:border-muted-gray/60 focus:border-brand-blue"
                />
              </div>
              <button
                type="button"
                onClick={() => deleteMeetingNote(entry.id)}
                aria-label="Delete meeting note"
                className="rounded-button p-1.5 text-muted-gray hover:bg-light-gray hover:text-brand-purple"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <textarea
              defaultValue={entry.notes}
              onBlur={(e) => updateMeetingNote(entry.id, "notes", e.target.value)}
              placeholder="Notes…"
              rows={3}
              className="mt-3 w-full resize-y rounded-button border border-muted-gray/60 bg-light-gray px-3 py-2 text-body-3 text-dark-primary outline-none focus:border-brand-blue"
            />
          </div>
        ))
      )}
    </div>
  );
}
