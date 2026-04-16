"use client";

import { useReducer } from "react";
import { kanbanReducer } from "../../lib/kanban/reducer";
import { createInitialBoardState } from "../../lib/kanban/kanbanData";
import type { KanbanAction, KanbanBoardState } from "../../lib/kanban/types";
import Board from "./Board";

export default function KanbanApp() {
  const [state, dispatch] = useReducer(kanbanReducer, undefined, createInitialBoardState);

  return <Board state={state} dispatch={dispatch} />;
}

