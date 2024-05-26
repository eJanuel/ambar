import { Clock } from "./Clock.types";
import { MapCell } from "./Map.types";
import { Pawn } from "./Pawn.types";

export interface GameSave {
    gameID: string,
    gameName: string,
    saveName: string,
    clock: Clock,
    map: {
        seed: string,
        height: number,
        size: number,
        cells: [{
            data: MapCell;
            coordinates: { x: number; y: number; z: number; };
        
        }],
    
    },
    pawns: Pawn[],
    settings: GameSettings,
}

export interface GameSettings {
    narrator: string,
    difficulty: string,
}