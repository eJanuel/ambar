import { createAction } from "@reduxjs/toolkit";
import { Pawn } from "../../game/types/Pawn.types";

export const populatePawns = createAction<Pawn[]>('pawn/populatePawns');
export const movePawn = createAction<{ pawnId: string, x: number, z: number, y: number }>('pawn/movePawn');