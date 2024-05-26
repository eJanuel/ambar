import { FloorBlock } from "../../types/Map.types";
import { FLOOR_TYPES_ENUM } from "../../types/enums/Cells.enum";

const HAY_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.HAY_FLOOR,
    condition: 50,
    maxCondition: 50,
    workToBuild: 5,
    supportTerrainType: "light",
};

const WOOD_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.WOOD_FLOOR,
    condition: 100,
    maxCondition: 100,
    workToBuild: 10,
    supportTerrainType: "light",
};

const STONE_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.STONE_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

const COBBLESTONE_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.COBBLESTONE_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

const SANDSTONE_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.SANDSTONE_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

const ANDESITE_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.ANDESITE_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

const DIORITE_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.DIORITE_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

const GRANITE_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.GRANITE_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

const MARBLE_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.MARBLE_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

const LIMESTONE_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.LIMESTONE_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

const CONCRETE_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.CONCRETE_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

const BRICK_FLOOR: FloorBlock = {
    type: FLOOR_TYPES_ENUM.BRICK_FLOOR,
    condition: 150,
    maxCondition: 150,
    workToBuild: 15,
    supportTerrainType: "heavy",
};

export const FLOORS = {
    HAY_FLOOR,
    WOOD_FLOOR,
    STONE_FLOOR,
    COBBLESTONE_FLOOR,
    SANDSTONE_FLOOR,
    ANDESITE_FLOOR,
    DIORITE_FLOOR,
    GRANITE_FLOOR,
    MARBLE_FLOOR,
    LIMESTONE_FLOOR,
    CONCRETE_FLOOR,
    BRICK_FLOOR,
};