import { Database } from "./@modules/Database.js"

export const MoneyDB = new Database("moneyDB");
//GERENAL


//SETTING
export const ServerSetDB = new Database("settingDB");

//BANNED
export const BanDB = new Database("banDB");

//Home zmekimek
export const homeDB = new Database("homeDB");

//warp mmemeg
export const warpDB = new Database("WarpDB");

//Guild Mekimek
export const guildDB = new Database("GuildDB");

export const playerOnline = [];
export let Gmax = 20;
export const backCooldown = [];
export const rewardCooldown = [];
export const tpaCooldown = [];
export const homeCooldown = [];
export const ghomeCD = [];
export const warpCooldown = [];
export const commandCooldown = [];
export const pwarpCooldown = [];