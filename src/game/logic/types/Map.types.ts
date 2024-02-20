import { DEPLOYABLE_TYPES_ENUM, DIGGABLE_TYPES_ENUM, FLOOR_TYPES_ENUM, DEPLOYABLE_MULTI_TYPES_ENUM, STRUCTURE_TYPES_ENUM, VOID_TYPES_ENUM } from "./enums/Cells.enum";

export interface Map {
  seed: string;
  dimensions: {
    size: number;
    height: number;
  }
  cells: MapCell[][][];
}

export interface MapCell {
  coordinates: {
    x: number;
    y: number;
    z: number;
  }
  floor?: FloorBlock;
  surface: Block | VoidBlock;
}

export interface VoidBlock {
  type: VOID_TYPES_ENUM;
}

export interface Block {
  type: FLOOR_TYPES_ENUM | DIGGABLE_TYPES_ENUM | STRUCTURE_TYPES_ENUM | DEPLOYABLE_TYPES_ENUM | DEPLOYABLE_MULTI_TYPES_ENUM;
  condition: number;
  maxCondition: number;
  workToBuild: number;
}

export interface FloorBlock extends Block {
  supportTerrainType: "heavy" | "light";
}

export interface SurfaceBlock extends Block {
  isTransparent: boolean;
}

export interface DiggableBlock extends SurfaceBlock {
  skillToDig: number;
}

export interface StructureBlock extends SurfaceBlock {
  stability: number;
}

export interface DeployableBlock extends SurfaceBlock {
  workToUninstall: number;
  isMovable: boolean;
  isRemovable: boolean;
}

export interface DeployableMultiBlock extends DeployableBlock {
  size: number;
  height: number;
}


