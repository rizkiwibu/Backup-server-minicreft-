import { Database } from "./lib/Database.js"

const enables = new Database('enableDB')
const ranks = new Database('rankDB')
const lobby = new Database('lobbyDB')



/**
 * @prefix of custom command try to change whatever you like
 */
export const prefix = "."

/**
 * @description Chat Format %level% = Level Player, %title% = Rank Player, %player% = Nama Player, %msg% = Pesan Player
 */
export const chatFormat = `[Lv.%level%§r] [%title%§r] %player% §7%clan% >>§f %msg%`

/**
 * @chat cooldown to avoid spam
 */
export const chatCD = 5 //in second

/**
 * @default rank of member
 */
export const default_rank = '§7Guest'
export const rank_prefix = 'rank:' //dont change

/**
 * @message for announcement to yourself if you is levelup!
 */
export const levelUpMsg = `>> §bSelamat! Anda telah naik level menjadi §aLv.%level%!`;

/**
 * @chance for you can get xp at place, break, and chat
 */
export const chanceXp = 5

/**
 * @text above item drop to countdown when its de spawned!
 */
export const clearitem = false

/**
 * @rewards for certain levels certain level
 */
export const specialLevelMappings = {
    5: {
        text: ">> §aDapat hadiah spesial level 5 iron sword!",
        handler: ["give @s iron_sword"]
    },
    10: {
        text: ">> §aDapat hadiah spesial level 10 bow!",
        handler: ["give @s bow"],
    },
    15: {
        text: ">> §aDapat hadiah spesial level 15 iron pickaxe!",
        handler: ["give @s iron_pickaxe"]
    },
    20: {
        text: ">> §aDapat hadiah spesial level 20 shield!",
        handler: ["give @s shield"]
    },
    25: {
        text: ">> §aDapat hadiah spesial level 25 brewing stand!",
        handler: ["give @s brewing_stand"]
    },
    30: {
        text: ">> §aDapat hadiah spesial level 30 ender chest!",
        handler: ["give @s ender_chest"]
    },
    35: {
        text: ">> §aDapat hadiah spesial level 35 netheritr chestplate!",
        handler: ["give @s netherite_chestplate"]
    },
    40: {
        text: ">> §aDapat hadiah spesial level 40 trident!",
        handler: ["give @s trident"]
    },
    50: {
        text: ">> §aDapat hadiah spesial level 50 elytra!",
        handler: ["give @s elytra"]
    },
    60: {
        text: ">> §aDapat hadiah spesial level 60 totem of undying!",
        handler: ["give @s totem_of_undying"]
    },
    70: {
        text: ">> §aDapat hadiah spesial level 70 netherite chestplate!",
        handler: ["give @s netherite_chestplate"]
    },
    80: {
        text: ">> §aDapat hadiah spesial level 80 beacon!",
        handler: ["give @s beacon"]
    },
    100: {
        text: ">> §aDapat hadiah spesial level 100 nether star!",
        handler: ["give @s nether_star"]
    },
}


export { enables, ranks, lobby }