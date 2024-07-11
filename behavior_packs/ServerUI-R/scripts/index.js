import { world, system } from "@minecraft/server"
import { getScore, getRank } from "./lib/game.js";
import "./mainMenu/admin.js";
import "./mainMenu/players.js";
import "./mainMenu/buttons.js";
import { prefix } from "./config.js";

//System Import\\
import "./system/lag.js";
import "./JUSTSKYLAND_NPERMA/system.js";

system.runInterval(() => {
for (let player of world.getPlayers()) {

const nickname = player
  .getTags()
  .find((tag) => tag.startsWith(
    "nick:"))?.slice(5) ?? player.name;
    
const bannedTag = player.getTags().find((tag) => tag.startsWith('banned:'));
const banned = bannedTag ? "§4§lBANNED!" + '\n' : '';
    
const ping = getScore(player, 'ping')

let playerHealth = player.getComponent("minecraft:health").currentValue.toFixed(0)
     
     player.nameTag = `${banned} §7[ §r${getRank(player)}§7 ]§r §f${nickname}\n§c${playerHealth}/20`
 }
});

system.runInterval(() => {
  world.getDimension('overworld').runCommandAsync('gamerule sendcommandfeedback false')
  world.getDimension('overworld').runCommandAsync('gamerule commandblockoutput false')
});

world.beforeEvents.chatSend.subscribe(data => {
  const { sender, message } = data;   
  let prefix = "."
  if (message.startsWith(prefix + "menu")) {
    data.cancel = true;
   system.runTimeout(() => {
    sender.runCommandAsync('give @s mcc:menu')
   }, 1)
  }
});