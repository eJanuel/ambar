import { Body, CustomSkills, Entity, Faction, Gear, Infos, Inventory, Pawn, Relationships, Skills, Traits } from "../../types/Pawn.types";
import { masculineFirstNames, feminineFirstNames } from "../../datas/firstNames.list";
import { lastNames } from "../../datas/lastNames.list";
import { traitEffects } from "../../helpers/TraitEffects.helper";
import { TRAITS } from "../../types/enums/Traits.enum";

const skillsKeys: (keyof Skills)[] = ['melee', 'ranged', 'crafting', 'construction', 'cooking', 'medicine', 'social', 'animals', 'plants', 'mining', 'research'];

export const generateRandomPawn = (id: string, position: { x: number; y: number; z: number }): Pawn => {
  let bioAge: number = generateRandomBioAge();

  let minSkillPoints = Math.floor(bioAge / 5);
  let maxSkillPoints = Math.floor(bioAge / 3);
  let totalSkillPoints = minSkillPoints + Math.floor(Math.random() * (maxSkillPoints - minSkillPoints + 1));

  const entity: Entity = {
    id,
    position,
  };
  const body: Body = { type: 'humanoid', skeleton: [] }
  const infos: Infos = { firstName: generateRandomFirstName(Math.random() < 0.5), lastName: generateRandomLastName(), biologicalAge: bioAge, chronologicalAge: generateRandomChronoAge(bioAge), experience: 0, level: 0 };
  const faction: Faction = { name: 'test', reputation: 0 };
  const traits: Traits = generateRandomTraits();
  const skills: Skills = generateRandomSkills(totalSkillPoints, traits);
  const customSkills: CustomSkills = {};
  const relationships: Relationships = {};
  const inventory: Inventory = {};
  const gear: Gear = {};

  return {
    entity,
    body,
    infos,
    faction,
    skills,
    customSkills,
    relationships,
    inventory,
    gear,
    traits,
  };
}

export const generateRandomFirstName = (type: boolean): string => {
  if (type) {
    return masculineFirstNames[Math.floor(Math.random() * masculineFirstNames.length)];
  } else {
    return feminineFirstNames[Math.floor(Math.random() * feminineFirstNames.length)];
  }
}

export const generateRandomLastName = (): string => {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

export const generateRandomBioAge = (): number => {
  return Math.floor(Math.random() * 100);
}

export const generateRandomChronoAge = (bioAge: number) => {
  return bioAge + Math.floor(Math.random() * 10);
}

export const generateRandomSkills = (skillPoints: number, traits: Traits): Skills => {
  let randomizedSkills: Skills = {
    melee: 0,
    ranged: 0,
    crafting: 0,
    construction: 0,
    cooking: 0,
    medicine: 0,
    social: 0,
    animals: 0,
    plants: 0,
    mining: 0,
    research: 0,
  };

  for (let trait of traits) {
    const effect = traitEffects[trait];
    if (effect) {
      for (let skill in effect) {
        randomizedSkills[skill as keyof Skills] += effect[skill as keyof Skills]!;
      }
    }
  }

  for (let i = 0; i < skillPoints; i++) {
    const randomSkill = skillsKeys[Math.floor(Math.random() * skillsKeys.length)] as keyof Skills;
    randomizedSkills[randomSkill]++;
  }

  return randomizedSkills;
}

export const generateRandomTraits = (): Traits => {
  const traitsKeys = Object.values(TRAITS);
  let traits: Traits = [];
  let traitCount = Math.floor(Math.random() * 3);

  for (let i = 0; i < traitCount;) {
    let randomIndex = Math.floor(Math.random() * traitsKeys.length);
    if (traits.includes(traitsKeys[randomIndex])) {
      continue;
    } else {
      i++;
      traits.push(traitsKeys[randomIndex]);
    }
  }

  return traits;
}