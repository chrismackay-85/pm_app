"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AddCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, details: string) => void;
}

export function AddCardDialog({ open, onOpenChange, onSubmit }: AddCardDialogProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function reset() {
    setTitle("");
    setDetails("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim(), details.trim());
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-dark-primary/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-card bg-white p-6 shadow-brand-lg">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-h5 text-dark-primary">New card</Dialog.Title>
            <Dialog.Close aria-label="Close" className="text-muted-gray hover:text-dark-primary">
              <X size={18} />
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="rounded-button border border-muted-gray px-3 py-2 text-body-2 outline-none focus:border-brand-blue"
            />
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Details"
              rows={3}
              className="rounded-button border border-muted-gray px-3 py-2 text-body-3 outline-none focus:border-brand-blue"
            />
            <div className="mt-2 flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={!title.trim()}>
                Add card
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
