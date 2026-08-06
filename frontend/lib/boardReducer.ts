import type { BoardAction, BoardState } from "./types";

function removeCardFromColumn(
  columns: BoardState["columns"],
  columnId: string,
  cardId: string,
) {
  return columns.map((column) =>
    column.id === columnId
      ? { ...column, cardIds: column.cardIds.filter((id) => id !== cardId) }
      : column,
  );
}

function insertCardIntoColumn(
  columns: BoardState["columns"],
  columnId: string,
  cardId: string,
  index: number,
) {
  return columns.map((column) => {
    if (column.id !== columnId) {
      return column;
    }

    const nextCardIds = [...column.cardIds];
    nextCardIds.splice(index, 0, cardId);
    return { ...column, cardIds: nextCardIds };
  });
}

export function boardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  switch (action.type) {
    case "RENAME_COLUMN":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, title: action.title }
            : column,
        ),
      };

    case "ADD_CARD":
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.cardId]: {
            id: action.cardId,
            title: action.title,
            details: action.details,
          },
        },
        columns: state.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, cardIds: [...column.cardIds, action.cardId] }
            : column,
        ),
      };

    case "DELETE_CARD": {
      const { [action.cardId]: removed, ...remainingCards } = state.cards;
      void removed;

      return {
        cards: remainingCards,
        columns: state.columns.map((column) => ({
          ...column,
          cardIds: column.cardIds.filter((id) => id !== action.cardId),
        })),
      };
    }

    case "MOVE_CARD": {
      if (action.fromColumnId === action.toColumnId) {
        return {
          ...state,
          columns: state.columns.map((column) => {
            if (column.id !== action.fromColumnId) {
              return column;
            }

            const oldIndex = column.cardIds.indexOf(action.cardId);
            if (oldIndex === -1) {
              return column;
            }

            const nextCardIds = [...column.cardIds];
            nextCardIds.splice(oldIndex, 1);
            nextCardIds.splice(action.toIndex, 0, action.cardId);
            return { ...column, cardIds: nextCardIds };
          }),
        };
      }

      const withoutCard = removeCardFromColumn(
        state.columns,
        action.fromColumnId,
        action.cardId,
      );

      return {
        ...state,
        columns: insertCardIntoColumn(
          withoutCard,
          action.toColumnId,
          action.cardId,
          action.toIndex,
        ),
      };
    }

    default:
      return state;
  }
}
