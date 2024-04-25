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
  
  export interface GameLoadPayload {
    id: number;
    name: string;
    save: GameSave;
  }

export const populateGame = createAction<GamePopulatePayload>('game/populateGame');
export const startGame = createAction('game/startGame');
export const createGame = createAction<GameCreatePayload>('game/createGame');
export const loadGame = createAction<GameLoadPayload>('game/loadGame');
export const saveGame = createAction('game/saveGame');