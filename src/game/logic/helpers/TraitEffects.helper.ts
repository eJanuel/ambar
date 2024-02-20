import { TRAITS } from "../types/enums/Traits.enum";
import { TraitEffects } from "../types/Pawn.types";

export const traitEffects: TraitEffects = {
    [TRAITS.SHARPSHOOTER]: { ranged: 1 },
    [TRAITS.TOUGH]: { melee: 1, mining: 1 },
    [TRAITS.FAST_LEARNER]: { research: 1 },
    [TRAITS.HANDY]: { crafting: 1, construction: 1 },
    [TRAITS.GREEN_THUMB]: { plants: 1 },
    [TRAITS.HEALER]: { medicine: 1 },
    [TRAITS.CHARISMATIC]: { social: 1 },
    [TRAITS.ANIMAL_WHISPERER]: { animals: 1 },
    [TRAITS.MINER]: { mining: 2 },
    [TRAITS.SCIENTIST]: { research: 2 },
    [TRAITS.ATHLETE]: { melee: 1, ranged: 1 },
    [TRAITS.ARTISAN]: { crafting: 2 },
    [TRAITS.SNEAKY]: { melee: 1, ranged: 1 },
    [TRAITS.LUCKY]: { social: 1 },
    [TRAITS.TECH_SAVVY]: { crafting: 1, research: 1 },
    [TRAITS.DIPLOMAT]: { social: 2 },
    [TRAITS.MUSICIAN]: { social: 1, animals: 1 },
    [TRAITS.NURTURER]: { plants: 1, animals: 1 },
    [TRAITS.MYSTERIOUS]: { research: 1 },
    [TRAITS.JOKER]: { social: 1 },
};