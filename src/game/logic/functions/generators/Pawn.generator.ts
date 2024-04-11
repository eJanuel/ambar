import { Body, Entity, Faction, Gear, Infos, Inventory, Pawn, Relationships, Skills, Trait } from "../../types/Pawn.types";
import { MasculineFirstNames, FeminineFirstNames, LastNames } from "../../datas/Names.list";
import { Traits } from "../../datas/Traits.list";

export const generateRandomPawn = (id: string, position: { x: number; y: number; z: number }): Pawn => {
  let bioAge: number = generateRandomBioAge();

  let minSkillPointsToGenerate = Math.floor(bioAge / 5);
  let maxSkillPointsToGenerate = Math.floor(bioAge / 3);
  let totalGeneratedSkillPoints = minSkillPointsToGenerate + Math.floor(Math.random() * (maxSkillPointsToGenerate - minSkillPointsToGenerate + 1));

  const entity: Entity = {
    id,
    position,
  };
  const body: Body = { type: 'humanoid', skeleton: [] }
  const infos: Infos = { firstName: generateRandomFirstName(Math.random() < 0.5), lastName: generateRandomLastName(), biologicalAge: bioAge, chronologicalAge: generateRandomChronoAge(bioAge), experience: 0, level: 0 };
  const faction: Faction = { name: 'test', reputation: 0 };
  const traits: Trait[] = generateRandomTraits();
  const skills: Skills = generateRandomSkills(totalGeneratedSkillPoints);
  const relationships: Relationships = {};
  const inventory: Inventory = {};
  const gear: Gear = {};

  return {
    entity,
    body,
    infos,
    faction,
    skills,
    relationships,
    inventory,
    gear,
    traits,
  };
}

export const generateRandomFirstName = (type: boolean): string => {
  if (type) {
    return MasculineFirstNames[Math.floor(Math.random() * MasculineFirstNames.length)];
  } else {
    return FeminineFirstNames[Math.floor(Math.random() * FeminineFirstNames.length)];
  }
}

export const generateRandomLastName = (): string => {
  return LastNames[Math.floor(Math.random() * LastNames.length)];
}

export const generateRandomBioAge = (): number => {
  return Math.floor(Math.random() * 100);
}

export const generateRandomChronoAge = (bioAge: number) => {
  return bioAge + Math.floor(Math.random() * 10);
}

export const generateRandomSkills = (skillPoints: number): Skills => {
  let randomizedSkills: Skills = {
    melee: {
      level: 0,
      experience: 0,
      affection: 0
    },
    ranged: {
      level: 0,
      experience: 0,
      affection: 0
    },
    crafting: {
      level: 0,
      experience: 0,
      affection: 0
    },
    construction: {
      level: 0,
      experience: 0,
      affection: 0
    },
    cooking: {
      level: 0,
      experience: 0,
      affection: 0
    },
    medicine: {
      level: 0,
      experience: 0,
      affection: 0
    },
    social: {
      level: 0,
      experience: 0,
      affection: 0
    },
    animals: {
      level: 0,
      experience: 0,
      affection: 0
    },
    plants: {
      level: 0,
      experience: 0,
      affection: 0
    },
    mining: {
      level: 0,
      experience: 0,
      affection: 0
    },
    research: {
      level: 0,
      experience: 0,
      affection: 0
    }
  };

  let previousSkill: keyof Skills | null = null;
  let skillWeight = 1;

  const skillsKeys: (keyof Skills)[] = Object.keys(randomizedSkills) as (keyof Skills)[];

  for (let i = 0; i < skillPoints; i++) {
    let randomSkill: keyof Skills;

    if (previousSkill && Math.random() < skillWeight) {
      randomSkill = previousSkill;
      skillWeight *= 0.9; // Reduce the weight for adding a point to the same previous skill
    } else {
      randomSkill = skillsKeys[Math.floor(Math.random() * skillsKeys.length)];
      previousSkill = randomSkill;
      skillWeight = 1; // Reset the weight to initial if a different skill is randomized
    }

    randomizedSkills[randomSkill].level++;
  }

  return randomizedSkills;
}

export const generateRandomTraits = (): Trait[] => {
  let traits: Trait[] = [];
  let traitCount = Math.random() < 0.6 ? 2 : Math.floor(Math.random() * 3) + 1;
  const traitsKeys = Object.keys(Traits);

  for (let i = 0; i < traitCount;) {
    let randomIndex = Math.floor(Math.random() * traitsKeys.length);
    let trait = traitsKeys[randomIndex];
    if (traits.includes(Traits[trait])) {
      continue;
    } else {
      i++;
      traits.push(Traits[trait]);
    }
  }

  return traits;
}