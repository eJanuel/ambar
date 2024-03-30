import { TRAITS_ENUM } from "../types/enums/Traits.enum";
import { TraitEffectMap } from "../types/Pawn.types";

export const traitEffects: TraitEffectMap = {
    [TRAITS_ENUM.SHARPSHOOTER]: { ranged: 1 },
    [TRAITS_ENUM.TOUGH]: { melee: 1, mining: 1 },
    [TRAITS_ENUM.FAST_LEARNER]: { research: 1 },
    [TRAITS_ENUM.HANDY]: { crafting: 1, construction: 1 },
    [TRAITS_ENUM.GREEN_THUMB]: { plants: 1 },
    [TRAITS_ENUM.HEALER]: { medicine: 1 },
    [TRAITS_ENUM.CHARISMATIC]: { social: 1 },
    [TRAITS_ENUM.ANIMAL_WHISPERER]: { animals: 1 },
    [TRAITS_ENUM.MINER]: { mining: 2 },
    [TRAITS_ENUM.SCIENTIST]: { research: 2 },
    [TRAITS_ENUM.ATHLETE]: { melee: 1, ranged: 1 },
    [TRAITS_ENUM.ARTISAN]: { crafting: 2 },
    [TRAITS_ENUM.SNEAKY]: { melee: 1, ranged: 1 },
    [TRAITS_ENUM.LUCKY]: { social: 1 },
    [TRAITS_ENUM.TECHNICIAN]: { crafting: 1, research: 1 },
    [TRAITS_ENUM.DIPLOMAT]: { social: 2 },
    [TRAITS_ENUM.MUSICIAN]: { social: 1, animals: 1 },
    [TRAITS_ENUM.NURTURER]: { plants: 1, animals: 1 },
    [TRAITS_ENUM.MYSTERIOUS]: { research: 1 },
    [TRAITS_ENUM.JOKER]: { social: 1 },
};