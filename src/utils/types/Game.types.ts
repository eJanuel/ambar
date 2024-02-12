import { Map } from "./Map.types";
import { Pawn } from "./Pawn.types";

export interface Game {
  map: Map;
  pawns: Pawn[];
}