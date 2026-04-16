export type Card = {
  id: string;
  title: string;
  details: string;
};

export type Column = {
  id: string;
  title: string;
  cards: Card[];
};

export type KanbanBoardState = {
  columns: Column[];
};

export type RenameColumnAction = {
  type: "renameColumn";
  columnId: string;
  title: string;
};

export type AddCardAction = {
  type: "addCard";
  columnId: string;
  card: Card;
};

export type DeleteCardAction = {
  type: "deleteCard";
  cardId: string;
};

export type MoveCardAction = {
  type: "moveCard";
  cardId: string;
  toColumnId: string;
};

export type KanbanAction =
  | RenameColumnAction
  | AddCardAction
  | DeleteCardAction
  | MoveCardAction;

