import { GEAR_SLOT_ENUM } from "./enums/Inventory.enum";
import { ITEMS_TYPES_ENUM, ITEM_NAME } from "./enums/Items.enum";

export interface Item {
    name: ITEM_NAME;
    type: ITEMS_TYPES_ENUM;
}

export interface DestroyableItem extends Item {
    condition: number;
    maxCondition: number;
}

export interface QuestItem extends Item {
    questId: string; //TODO: Create Quest type
}

export interface EquippableItem extends DestroyableItem {
    slot: GEAR_SLOT_ENUM;
}

export interface HandItem extends EquippableItem {
    isTwoHanded: boolean;
}

export interface WeaponItem extends HandItem {
    attackSpeed: number;
    accuracy: number;
    idealRange: number;
    maxRange: number;
    damage: number;
}

export interface RangedWeaponItem extends WeaponItem {
    ammoType: string; //TODO: Create Ammo type
    ammoCapacity: number;
}

export interface MeleeWeaponItem extends WeaponItem {
    bluntPercent: number;
    slashPercent: number;
    piercePercent: number;
}

export interface ToolItem extends HandItem {
    materialTier: number;
    skillType: string; //TODO: Create Skill type
    minSkillLevel: number;
    harvestSpeed: number;
}

export interface ArmorItem extends EquippableItem {
    frostResist: number;
    heatResist: number;
    bluntResist: number;
    slashResist: number;
    pierceResist: number;
    beauty: number;
    speedReduction: number;
}