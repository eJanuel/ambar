import { Trait } from "../types/Pawn.types";

export const Traits: { [key: string]: Trait } = {
    SHARPSHOOTER: {
        id: 1,
        name: "Sharpshooter",
        effect: { ranged: 1 }
    },
    TOUGH: {
        id: 2,
        name: "Tough",
        effect: { melee: 1, mining: 1 }
    },
    FAST_LEARNER: {
        id: 3,
        name: "Fast Learner",
        effect: { research: 1 }
    },
    HANDY: {
        id: 4,
        name: "Handy",
        effect: { crafting: 1, construction: 1 }
    },
    GREEN_THUMB: {
        id: 5,
        name: "Green Thumb",
        effect: { plants: 1 }
    },
    HEALER: {
        id: 6,
        name: "Healer",
        effect: { medicine: 1 }
    },
    CHARISMATIC: {
        id: 7,
        name: "Charismatic",
        effect: { social: 1 }
    },
    ANIMAL_WHISPERER: {
        id: 8,
        name: "Animal Whisperer",
        effect: { animals: 1 }
    },
    MINER: {
        id: 9,
        name: "Miner",
        effect: { mining: 2 }
    },
    SCIENTIST: {
        id: 10,
        name: "Scientist",
        effect: { research: 2 }
    },
    ATHLETE: {
        id: 11,
        name: "Athlete",
        effect: { melee: 1, ranged: 1 }
    },
    ARTISAN: {
        id: 12,
        name: "Artisan",
        effect: { crafting: 2 }
    },
    SNEAKY: {
        id: 13,
        name: "Sneaky",
        effect: { melee: 1, ranged: 1 }
    },
    LUCKY: {
        id: 14,
        name: "Lucky",
        effect: { social: 1 }
    },
    TECHNICIAN: {
        id: 15,
        name: "Technician",
        effect: { crafting: 1, research: 1 }
    },
    DIPLOMAT: {
        id: 16,
        name: "Diplomat",
        effect: { social: 2 }
    },
    MUSICIAN: {
        id: 17,
        name: "Musician",
        effect: { social: 1, animals: 1 }
    },
    NURTURER: {
        id: 18,
        name: "Nurturer",
        effect: { plants: 1, animals: 1 }
    },
    MYSTERIOUS: {
        id: 19,
        name: "Mysterious",
        effect: { research: 1 }
    },
    JOKER: {
        id: 20,
        name: "Joker",
        effect: { social: 1 }
    }
};
