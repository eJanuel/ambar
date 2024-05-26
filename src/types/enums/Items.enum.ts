export enum ITEMS_TYPES_ENUM {
    ARMOR = "Armor",
    CURRENCY = "Currency",
    FOOD = "Food",
    MATERIAL = "Material",
    MISC = "Misc",
    TOOL = "Tool",
    WEAPON = "Weapon",
}

export type ITEM_NAME = ARMOR_ITEMS_ENUM | CURRENCY_ITEMS_ENUM | FOOD_ITEMS_ENUM | MATERIAL_ITEMS_ENUM | MISC_ITEMS_ENUM | TOOL_ITEMS_ENUM | WEAPON_ITEMS_ENUM;

export enum ARMOR_ITEMS_ENUM {
    LEATHER_HELMET = "Leather Helmet",
    LEATHER_TUNIC = "Leather Tunic",
    LEATHER_LEGGINGS = "Leather Leggings",
    LEATHER_BOOTS = "Leather Boots",
}

export enum CURRENCY_ITEMS_ENUM {
    COIN = "Coin",
    GEM = "Gem",
}

export enum FOOD_ITEMS_ENUM {
    APPLE = "Apple",
    BREAD = "Bread",
    CHEESE = "Cheese",
    FISH = "Fish",
    MEAT = "Meat",
}

export enum MATERIAL_ITEMS_ENUM {
    WOOD = "Wood",
    STONE = "Stone",
}

export enum MISC_ITEMS_ENUM {
    LOCKPICK = "Lockpick",
}

export enum TOOL_ITEMS_ENUM {
    STONE_AXE = "Stone Axe",
    STONE_PICKAXE = "Stone Pickaxe",
    WOODEN_SHOVEL = "Wooden Shovel",
}

export enum WEAPON_ITEMS_ENUM {
    WOODEN_CLUB = "Wooden Club",
    WOODEN_SWORD = "Wooden Sword",
    WOOD_BOW = "Wood Bow",
    WOOD_CROSSBOW = "Wood Crossbow",
}