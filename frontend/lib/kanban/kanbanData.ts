import type { KanbanBoardState } from "./types";

const DUMMY_STATE: KanbanBoardState = {
  columns: [
    {
      id: "col-backlog",
      title: "Backlog",
      cards: [
        { id: "card-1", title: "Design spec", details: "Write the initial product spec." },
        { id: "card-2", title: "User stories", details: "Capture key workflows and edge cases." }
      ]
    },
    {
      id: "col-in-progress",
      title: "In Progress",
      cards: [
        { id: "card-3", title: "Kanban board UI", details: "Build columns + cards layout." }
      ]
    },
    {
      id: "col-review",
      title: "Review",
      cards: [
        { id: "card-4", title: "Component polish", details: "Refine spacing, typography, and colors." }
      ]
    },
    {
      id: "col-testing",
      title: "Testing",
      cards: [
        { id: "card-5", title: "Reducer unit tests", details: "Cover rename/add/delete/move actions." }
      ]
    },
    {
      id: "col-done",
      title: "Done",
      cards: [
        { id: "card-6", title: "Initial scaffold", details: "Set up Next.js + Tailwind foundation." }
      ]
    }
  ]
};

export function createInitialBoardState(): KanbanBoardState {
  return JSON.parse(JSON.stringify(DUMMY_STATE)) as KanbanBoardState;
}

