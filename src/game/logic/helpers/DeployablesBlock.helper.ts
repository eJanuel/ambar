import { DeployableBlock } from "../types/Map.types";
import { DEPLOYABLE_TYPES_ENUM } from "../types/enums/Cells.enum";

const CAMPFIRE: DeployableBlock = {
    type: DEPLOYABLE_TYPES_ENUM.CAMPFIRE,
    condition: 50,
    maxCondition: 50,
    isTransparent: false,
    workToBuild: 10,
    workToUninstall: 5,
    isMovable: false,
    isRemovable: false,
};

const WORKBENCH: DeployableBlock = {
    type: DEPLOYABLE_TYPES_ENUM.WORKBENCH,
    condition: 100,
    maxCondition: 100,
    isTransparent: false,
    workToBuild: 10,
    workToUninstall: 5,
    isMovable: true,
    isRemovable: true,
};

const ALTAR: DeployableBlock = {
    type: DEPLOYABLE_TYPES_ENUM.ALTAR,
    condition: 50,
    maxCondition: 50,
    isTransparent: false,
    workToBuild: 10,
    workToUninstall: 5,
    isMovable: true,
    isRemovable: false,
};

export const DEPLOYABLES: DeployableBlock[] = [
    CAMPFIRE,
    WORKBENCH,
    ALTAR,
];