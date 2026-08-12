import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { KanbanCard, KanbanColumn } from "./types";
import { createSeedCardOrder, createSeedCards, seedColumns } from "./seedKanban";

function makeId() {
  return `card-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function makeColumnId() {
  return `column-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

interface KanbanState {
  columns: KanbanColumn[];
  cards: Record<string, KanbanCard>;
  cardOrder: Record<string, string[]>;
  archivedCardIds: string[];
  searchQuery: string;

  addCard: (columnId: string, title: string, details: string) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, toColumnId: string, toIndex: number) => void;
  archiveCard: (cardId: string) => void;
  unarchiveCard: (cardId: string) => void;
  renameColumn: (columnId: string, name: string) => void;
  addColumn: (name: string) => void;
  setSearchQuery: (query: string) => void;
}

const seedCards = createSeedCards();

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      columns: seedColumns,
      cards: seedCards,
      cardOrder: createSeedCardOrder(seedCards),
      archivedCardIds: [],
      searchQuery: "",

      addCard: (columnId, title, details) =>
        set((state) => {
          const id = makeId();
          const card: KanbanCard = { id, title, details, columnId, archived: false };
          return {
            cards: { ...state.cards, [id]: card },
            cardOrder: {
              ...state.cardOrder,
              [columnId]: [...state.cardOrder[columnId], id],
            },
          };
        }),

      deleteCard: (cardId) =>
        set((state) => {
          const remainingCards = { ...state.cards };
          delete remainingCards[cardId];
          const cardOrder: Record<string, string[]> = {};
          for (const [columnId, ids] of Object.entries(state.cardOrder)) {
            cardOrder[columnId] = ids.filter((id) => id !== cardId);
          }
          return {
            cards: remainingCards,
            cardOrder,
            archivedCardIds: state.archivedCardIds.filter((id) => id !== cardId),
          };
        }),

      moveCard: (cardId, toColumnId, toIndex) =>
        set((state) => {
          const fromColumnId = state.cards[cardId]?.columnId;
          if (!fromColumnId) return state;

          const cardOrder: Record<string, string[]> = {};
          for (const [columnId, ids] of Object.entries(state.cardOrder)) {
            cardOrder[columnId] = ids.filter((id) => id !== cardId);
          }
          const targetOrder = [...cardOrder[toColumnId]];
          const clampedIndex = Math.max(0, Math.min(toIndex, targetOrder.length));
          targetOrder.splice(clampedIndex, 0, cardId);
          cardOrder[toColumnId] = targetOrder;

          return {
            cardOrder,
            cards: {
              ...state.cards,
              [cardId]: { ...state.cards[cardId], columnId: toColumnId },
            },
          };
        }),

      archiveCard: (cardId) =>
        set((state) => {
          const card = state.cards[cardId];
          if (!card || card.archived) return state;
          const cardOrder: Record<string, string[]> = {};
          for (const [columnId, ids] of Object.entries(state.cardOrder)) {
            cardOrder[columnId] = ids.filter((id) => id !== cardId);
          }
          return {
            cardOrder,
            cards: { ...state.cards, [cardId]: { ...card, archived: true } },
            archivedCardIds: [...state.archivedCardIds, cardId],
          };
        }),

      unarchiveCard: (cardId) =>
        set((state) => {
          const card = state.cards[cardId];
          if (!card || !card.archived) return state;
          return {
            cards: { ...state.cards, [cardId]: { ...card, archived: false } },
            archivedCardIds: state.archivedCardIds.filter((id) => id !== cardId),
            cardOrder: {
              ...state.cardOrder,
              [card.columnId]: [...state.cardOrder[card.columnId], cardId],
            },
          };
        }),

      renameColumn: (columnId, name) =>
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId ? { ...column, name } : column
          ),
        })),

      addColumn: (name) =>
        set((state) => {
          const id = makeColumnId();
          return {
            columns: [...state.columns, { id, name }],
            cardOrder: { ...state.cardOrder, [id]: [] },
          };
        }),

      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: "pattern-pm-kanban",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function matchesQuery(card: KanbanCard, query: string) {
  if (!query.trim()) return true;
  const haystack = `${card.title} ${card.details}`.toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

export function visibleCardIds(
  cardOrder: Record<string, string[]>,
  cards: Record<string, KanbanCard>,
  columnId: string,
  query: string
) {
  return (cardOrder[columnId] ?? []).filter((id) => {
    const card = cards[id];
    return card && matchesQuery(card, query);
  });
}
