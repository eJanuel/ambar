import { DiggableBlock } from "../types/Map.types";
import { DIGGABLE_TYPES_ENUM } from "../types/enums/Cells.enum";

const GRASS_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.GRASS,
    condition: 50,
    maxCondition: 50,
    isTransparent: false,
    workToBuild: 5,
    skillToDig: 0,
};

const DIRT_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.DIRT,
    condition: 50,
    maxCondition: 50,
    isTransparent: false,
    workToBuild: 5,
    skillToDig: 0,
};

const SAND_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.SAND,
    condition: 30,
    maxCondition: 30,
    isTransparent: false,
    workToBuild: 5,
    skillToDig: 2,
};

const STONE_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.STONE,
    condition: 100,
    maxCondition: 100,
    isTransparent: false,
    workToBuild: 10,
    skillToDig: 0,
};

const ANDESITE_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.ANDESITE,
    condition: 150,
    maxCondition: 150,
    isTransparent: false,
    workToBuild: 15,
    skillToDig: 2,
};

const DIORITE_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.DIORITE,
    condition: 150,
    maxCondition: 150,
    isTransparent: false,
    workToBuild: 15,
    skillToDig: 2,
};

const GRANITE_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.GRANITE,
    condition: 150,
    maxCondition: 150,
    isTransparent: false,
    workToBuild: 15,
    skillToDig: 2,
};

const MARBLE_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.MARBLE,
    condition: 200,
    maxCondition: 200,
    isTransparent: false,
    workToBuild: 20,
    skillToDig: 3,
};

const LIMESTONE_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.LIMESTONE,
    condition: 200,
    maxCondition: 200,
    isTransparent: false,
    workToBuild: 20,
    skillToDig: 3,
};

const COAL_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.COAL,
    condition: 100,
    maxCondition: 100,
    isTransparent: false,
    workToBuild: 10,
    skillToDig: 5,
};

const IRON_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.IRON,
    condition: 200,
    maxCondition: 200,
    isTransparent: false,
    workToBuild: 20,
    skillToDig: 5,
};

const GOLD_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.GOLD,
    condition: 300,
    maxCondition: 300,
    isTransparent: false,
    workToBuild: 30,
    skillToDig: 10,
};

const DIAMOND_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.DIAMOND,
    condition: 400,
    maxCondition: 400,
    isTransparent: false,
    workToBuild: 40,
    skillToDig: 20,
};

const EMERALD_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.EMERALD,
    condition: 500,
    maxCondition: 500,
    isTransparent: false,
    workToBuild: 50,
    skillToDig: 15,
};

const RUBY_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.RUBY,
    condition: 500,
    maxCondition: 500,
    isTransparent: false,
    workToBuild: 50,
    skillToDig: 15,
};

const SAPPHIRE_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.SAPPHIRE,
    condition: 500,
    maxCondition: 500,
    isTransparent: false,
    workToBuild: 50,
    skillToDig: 15,
};

const COPPER_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.COPPER,
    condition: 200,
    maxCondition: 200,
    isTransparent: false,
    workToBuild: 20,
    skillToDig: 5,
};

const TIN_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.TIN,
    condition: 200,
    maxCondition: 200,
    isTransparent: false,
    workToBuild: 20,
    skillToDig: 10,
};

const SILVER_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.SILVER,
    condition: 300,
    maxCondition: 300,
    isTransparent: false,
    workToBuild: 30,
    skillToDig: 10,
};

const LEAD_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.LEAD,
    condition: 300,
    maxCondition: 300,
    isTransparent: false,
    workToBuild: 30,
    skillToDig: 15,
};

const NICKEL_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.NICKEL,
    condition: 300,
    maxCondition: 300,
    isTransparent: false,
    workToBuild: 30,
    skillToDig: 15,
};

const ALUMINIUM_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.ALUMINIUM,
    condition: 300,
    maxCondition: 300,
    isTransparent: false,
    workToBuild: 30,
    skillToDig: 15,
};

const ZINC_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.ZINC,
    condition: 300,
    maxCondition: 300,
    isTransparent: false,
    workToBuild: 30,
    skillToDig: 15,
};

const PLATINIUM_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.PLATINIUM,
    condition: 400,
    maxCondition: 400,
    isTransparent: false,
    workToBuild: 40,
    skillToDig: 25,
};

const TITANIUM_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.TITANIUM,
    condition: 400,
    maxCondition: 400,
    isTransparent: false,
    workToBuild: 40,
    skillToDig: 25,
};

const URANIUM_BLOCK: DiggableBlock = {
    type: DIGGABLE_TYPES_ENUM.URANIUM,
    condition: 500,
    maxCondition: 500,
    isTransparent: false,
    workToBuild: 50,
    skillToDig: 20,
};

export const DIGGABLES = {
    GRASS_BLOCK,
    DIRT_BLOCK,
    SAND_BLOCK,
    STONE_BLOCK,
    ANDESITE_BLOCK,
    DIORITE_BLOCK,
    GRANITE_BLOCK,
    MARBLE_BLOCK,
    LIMESTONE_BLOCK,
    COAL_BLOCK,
    IRON_BLOCK,
    GOLD_BLOCK,
    DIAMOND_BLOCK,
    EMERALD_BLOCK,
    RUBY_BLOCK,
    SAPPHIRE_BLOCK,
    COPPER_BLOCK,
    TIN_BLOCK,
    SILVER_BLOCK,
    LEAD_BLOCK,
    NICKEL_BLOCK,
    ALUMINIUM_BLOCK,
    ZINC_BLOCK,
    PLATINIUM_BLOCK,
    TITANIUM_BLOCK,
    URANIUM_BLOCK,
};