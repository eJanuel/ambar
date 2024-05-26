import { Action, createAction } from "@reduxjs/toolkit";
import { Map } from "../../types/Map.types";
import { Pawn } from "../../types/Pawn.types";
import { GameSettings } from "../../types/Game.types";

export interface GamePopulatePayload {
    id: string;
    name: string;
    settings: GameSettings;
}

export interface GameCreatePayload {
    name: string;
    map: Map;
    pawns: Pawn[];
    settings: GameSettings;
  }

export const populateGame = createAction<GamePopulatePayload>('game/populateGame');
export const startGame = createAction('game/startGame');
export const createGame = createAction<GameCreatePayload>('game/createGame');
export const loadSave = createAction<string>('game/loadSave');
export const createSave = createAction<string>('game/createSave');
export const deleteSave = createAction<string>('game/deleteSave');

export interface CreateGameAction extends Action {
  type: typeof createGame.type;
  payload: GameCreatePayload
};

export interface LoadSaveAction extends Action {
  type: typeof loadSave.type;
  payload: string;
};

export interface CreateSaveAction extends Action {
  type: typeof createSave.type;
  payload: string;
};

export interface DeleteSaveAction extends Action {
  type: typeof deleteSave.type;
  payload: string;
};
