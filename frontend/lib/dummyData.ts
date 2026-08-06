import type { BoardState } from "./types";

export const initialBoardState: BoardState = {
  cards: {
    "card-1": {
      id: "card-1",
      title: "Design board layout",
      details: "Sketch the five-column layout and card hierarchy.",
    },
    "card-2": {
      id: "card-2",
      title: "Pick color palette",
      details: "Apply navy, blue, purple, yellow, and gray tokens.",
    },
    "card-3": {
      id: "card-3",
      title: "Set up Next.js project",
      details: "Scaffold frontend with TypeScript and Tailwind.",
    },
    "card-4": {
      id: "card-4",
      title: "Implement drag and drop",
      details: "Use @dnd-kit for moving cards between columns.",
    },
    "card-5": {
      id: "card-5",
      title: "Write unit tests",
      details: "Cover reducer actions and key UI interactions.",
    },
    "card-6": {
      id: "card-6",
      title: "Add Playwright E2E",
      details: "Verify rename, add, delete, and drag flows.",
    },
    "card-7": {
      id: "card-7",
      title: "Polish card hover states",
      details: "Refine shadows, spacing, and delete button visibility.",
    },
    "card-8": {
      id: "card-8",
      title: "Review MVP scope",
      details: "Confirm no archive, search, or persistence features.",
    },
    "card-9": {
      id: "card-9",
      title: "Demo walkthrough",
      details: "Prepare a quick tour of the single-board experience.",
    },
    "card-10": {
      id: "card-10",
      title: "Ship MVP",
      details: "Run lint, build, unit, and E2E checks before handoff.",
    },
  },
  columns: [
    {
      id: "col-1",
      title: "Backlog",
      cardIds: ["card-1", "card-2", "card-3"],
    },
    {
      id: "col-2",
      title: "Ready",
      cardIds: ["card-4", "card-5"],
    },
    {
      id: "col-3",
      title: "In Progress",
      cardIds: ["card-6", "card-7"],
    },
    {
      id: "col-4",
      title: "Review",
      cardIds: ["card-8"],
    },
    {
      id: "col-5",
      title: "Done",
      cardIds: ["card-9", "card-10"],
    },
  ],
};
