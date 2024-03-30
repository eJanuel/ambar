import { BONES_ENUM } from "./enums/Bones.enum";
import { TRAITS_ENUM } from "./enums/Traits.enum";

export interface Pawn {
    entity: Entity;
    infos: Infos;
    body: Body;
    faction: Faction;
    skills: Skills;
    customSkills: CustomSkills;
    relationships: Relationships;
    inventory: Inventory;
    gear: Gear;
    traits: Traits;
}

export interface Entity {
    id: string;
    position: { x: number; y: number; z: number };
}

export interface Infos {
    firstName: string,
    lastName: string,
    biologicalAge: number,
    chronologicalAge: number,
    experience: number,
    level: number
}

export interface Body {
    type: string;
    skeleton: Bones[];
}

export interface Bones {
    name: BONES_ENUM
    efficiency: number;
    wounds: Wound[];
    linkedBones: Bones[];
}

export interface Wound {
    type: string;
    severity: number;
    bleeding: number;
    pain: number;
    healing: number;
}

export interface Faction {
    name: string;
    reputation: number;
}

export interface Skills {
    melee: number;
    ranged: number;
    crafting: number;
    construction: number;
    cooking: number;
    medicine: number;
    social: number;
    animals: number;
    plants: number;
    mining: number;
    research: number;
}

export interface CustomSkills {
    [key: string]: number;
}

export interface Relationships {
    [key: string]: number;
}

export interface Inventory {
    [key: string]: number;
}

export interface Gear {
    [key: string]: number;
}

export type Traits = TRAITS_ENUM[];

export interface TraitEffectMap {
    [key: string]: Partial<Skills>;
}