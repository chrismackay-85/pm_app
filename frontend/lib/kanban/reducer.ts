import type { KanbanAction, KanbanBoardState, MoveCardAction } from "./types";

function findCardLocation(
  state: KanbanBoardState,
  cardId: string
): { fromColumnIndex: number; fromCardIndex: number } | null {
  for (let ci = 0; ci < state.columns.length; ci += 1) {
    const col = state.columns[ci];
    const cardIndex = col.cards.findIndex((c) => c.id === cardId);
    if (cardIndex !== -1) return { fromColumnIndex: ci, fromCardIndex: cardIndex };
  }
  return null;
}

function moveCard(state: KanbanBoardState, action: MoveCardAction): KanbanBoardState {
  const fromLocation = findCardLocation(state, action.cardId);
  if (!fromLocation) return state;

  const toColumnIndex = state.columns.findIndex((c) => c.id === action.toColumnId);
  if (toColumnIndex === -1) return state;
  if (fromLocation.fromColumnIndex === toColumnIndex) return state;

  const card = state.columns[fromLocation.fromColumnIndex].cards[fromLocation.fromCardIndex];

  const nextColumns = state.columns.map((col, ci) => {
    if (ci === fromLocation.fromColumnIndex) {
      return {
        ...col,
        cards: col.cards.filter((c) => c.id !== action.cardId)
      };
    }
    if (ci === toColumnIndex) {
      return {
        ...col,
        cards: [...col.cards, card]
      };
    }
    return col;
  });

  return { columns: nextColumns };
}

export function kanbanReducer(
  state: KanbanBoardState,
  action: KanbanAction
): KanbanBoardState {
  switch (action.type) {
    case "renameColumn": {
      const nextColumns = state.columns.map((col) =>
        col.id === action.columnId ? { ...col, title: action.title } : col
      );
      return { columns: nextColumns };
    }

    case "addCard": {
      const nextColumns = state.columns.map((col) =>
        col.id === action.columnId ? { ...col, cards: [...col.cards, action.card] } : col
      );
      return { columns: nextColumns };
    }

    case "deleteCard": {
      const nextColumns = state.columns.map((col) => ({
        ...col,
        cards: col.cards.filter((c) => c.id !== action.cardId)
      }));
      return { columns: nextColumns };
    }

    case "moveCard": {
      return moveCard(state, action);
    }

    default:
      return state;
  }
}

