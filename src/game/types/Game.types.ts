import { Clock } from "./Clock.types";
import { Map } from "./Map.types";
import { Pawn } from "./Pawn.types";

export interface GameSaveFolder {
    id: number,
    name: string,
    saves: GameSave[],
}

export interface GameSave {
    clock: Clock,
    map: Map,
    pawns: Pawn[],
    settings: GameSettings,
}

export interface GameSettings {
    narrator: string,
    difficulty: string,
}