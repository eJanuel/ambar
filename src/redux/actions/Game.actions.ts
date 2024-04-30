import { createAction } from "@reduxjs/toolkit";
import { Map } from "../../game/types/Map.types";
import { Pawn } from "../../game/types/Pawn.types";
import { GameSave, GameSettings } from "../../game/types/Game.types";

export interface GamePopulatePayload {
    id: number;
    name: string;
    settings: GameSettings;
}

export interface GameCreatePayload {
    name: string;
    map: Map;
    pawns: Pawn[];
    settings: GameSettings;
  }
  
  export interface SavePayload {
    id: number;
    name: string;
    save: GameSave;
  }

  export interface SaveIdentifierPayload {
    id: number;
    index: number;
  }

export const populateGame = createAction<GamePopulatePayload>('game/populateGame');
export const startGame = createAction('game/startGame');
export const createGame = createAction<GameCreatePayload>('game/createGame');
export const loadSave = createAction<SavePayload>('game/loadSave');
export const createSave = createAction('game/createSave');
export const deleteSave = createAction<SaveIdentifierPayload>('game/deleteSave');