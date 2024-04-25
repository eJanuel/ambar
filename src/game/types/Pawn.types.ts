import { BONES_ENUM } from "./enums/Bones.enum";

export interface Pawn {
    entity: Entity;
    infos: Infos;
    body: Body;
    faction: Faction;
    skills: Skills;
    inventory: Inventory;
    gear: Gear;
    traits: Trait[];
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
    melee: Skill;
    ranged: Skill;
    crafting: Skill;
    construction: Skill;
    cooking: Skill;
    medicine: Skill;
    social: Skill;
    animals: Skill;
    plants: Skill;
    mining: Skill;
    research: Skill;
}

export interface Skill {
    level: 0,
    experience: 0,
    affection: 0
}

interface TraitEffect {
    [key: string]: number;
};

export interface Trait {
    id: number;
    name: string;
    effect: TraitEffect;
};

export interface Inventory {
    [key: string]: number;
}

export interface Gear {
    [key: string]: number;
}