import { Body, CustomSkills, Faction, Gear, Infos, Inventory, Relationships, Skills, Traits } from "../types/Pawn.types";
import { Entity } from "./Entity";

export class Pawn extends Entity {
    infos: Infos;
    body: Body;
    faction: Faction;
    skills: Skills;
    customSkills: CustomSkills;
    relationships: Relationships;
    inventory: Inventory;
    gear: Gear;
    traits: Traits;
    constructor(entity: Entity, infos: Infos, body: Body, faction: Faction, skills: Skills, customSkills: CustomSkills, relationships: Relationships, inventory: Inventory, gear: Gear, traits: Traits) {
        super(entity.id, entity.position);
        this.infos = infos;
        this.body = body;
        this.faction = faction;
        this.skills = skills;
        this.customSkills = customSkills;
        this.relationships = relationships;
        this.inventory = inventory;
        this.gear = gear;
        this.traits = traits;
    }
}