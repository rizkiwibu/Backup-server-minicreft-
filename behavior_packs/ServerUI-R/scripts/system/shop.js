import { world, system } from "@minecraft/server"
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui"
import { ForceOpen, getScore, metricNumbers } from "../lib/game.js";
import { itemBlock, itemBlockColor, itemLog, itemFurniture, itemGlass, itemArmor, itemFarm, itemFood, itemOres, itemSpawner, itemSword, itemPickaxe, itemAxe, itemShovel } from "../shop.js";
import { enables } from "../config.js";

export async function ShopSystem(player) {
if (enables.get("shop") === 1) {
    player.sendMessage("§cFitur Dinonaktifkan oleh administrator!")
    return;
  } else {
const form = new ActionFormData()
.title(`Shop | Main`)
.body(`§7Want to buy?\nYour money : §r§g${metricNumbers(getScore(player, "money"))}`)
.button('§lBLOCK\n§r§oClick Or Tap', 'textures/blocks/cobblestone.png')
.button('§lBLOCK COLOR\n§r§oClick Or Tap', 'textures/blocks/wool_colored_pink.png')
.button('§lWOOD\n§r§oClick Or Tap', 'textures/blocks/log_oak.png')
.button('§lFURNITURE\n§r§oClick Or Tap', 'textures/blocks/chest_front.png')
.button('§lGLASS\n§r§oClick Or Tap', 'textures/blocks/glass_lime.png')
.button('§lTOOLS\n§r§oClick Or Tap', 'textures/items/iron_sword.png')
.button('§lARMOR\n§r§oClick Or Tap', 'textures/items/iron_helmet.png')
.button('§lFARM\n§r§oClick Or Tap', 'textures/items/carrot.png')
.button('§lFOOD\n§r§oClick Or Tap', 'textures/items/beef_cooked.png')
.button('§lORES\n§r§oClick Or Tap', 'textures/items/iron_ingot.png')
.button('§lSPAWNER\n§r§oClick Or Tap', 'textures/blocks/mob_spawner.png')
.button("§l§cCLOSE\n§r§oClick To Back")
let result = await ForceOpen(player, form)
if (result.selection === 0) {
buySell(player, itemBlock);
}
if (result.selection === 1) {
buySell(player, itemBlockColor);
}
if (result.selection === 2) {
buySell(player, itemLog);
}
if (result.selection === 3) {
buySell(player, itemFurniture);
}
if (result.selection === 4) {
buySell(player, itemGlass);
}
if (result.selection === 5) {
Tools(player);
}
if (result.selection === 6) {
buySell(player, itemArmor);
}
if (result.selection === 7) {
buySell(player, itemFarm);
}
if (result.selection === 8) {
buySell(player, itemFood);
}
if (result.selection === 9) {
buySell(player, itemOres);
}
if (result.selection === 10) {
buySell(player, itemSpawner);
}
if (result.selection === 11) {
}
}
}

function Tools(player) {
const gui = new ActionFormData()
.title(`Main | Shop`)
.button(`§lSword\n§r§oClick Or Tap`, `textures/items/iron_sword.png`)
.button(`§lAxe\n§r§oClick Or Tap`, `textures/items/iron_axe.png`)
.button(`§lPickaxe\n§r§oClick Or Tap`, `textures/items/iron_pickaxe.png`)
.button(`§lShovel\n§r§oClick Or Tap`, `textures/items/iron_shovel.png`)
.button("§l§cBACK\n§r§oClick To Back")
.show(player).then(result => {
if (result.canceled) 
return;
if (result.selection == 0) {
buySell(player, itemSword);
}
if (result.selection == 1) {
buySell(player, itemAxe);
}
if (result.selection == 2) {
buySell(player, itemPickaxe);
}
if (result.selection == 3) {
buySell(player, itemShovel);
}
if (result.selection == 4) {
Shop(player)
}
})
}

function buySell(player, itemName) {
const gui = new ActionFormData();
gui.title(`BuySell | Shop`);
for (const item of itemName) {
gui.button(`§l${item.name}\n§r§7Cost: §g${item.cost}`, 
`${item.textures}`);
}
gui.button("§l§cBACK\n§r§oClick To Back")
gui.show(player).then(result => {
if (result.canceled) 
return;
if (itemName[result.selection] ? true : false) {
const item = itemName[result.selection];
var money = getScore(player, "money") 
let brick = new ModalFormData() 
.title(`BuySell | Main`) 
.textField(`\n§7Your Money : §g${money}\n§7Buy x1 ${item.name} : §g${item.cost}\n§7Sell x1 ${item.name} : §g${item.sell}\n\n§7Amount`, `The Amount you want to Buy or Sell`)
.toggle('§fSell / Buy', true);
brick.show(player).then(res => {
if (res.canceled) return
let dataCost = item.cost * res.formValues[0];
let dataSell = item.sell * res.formValues[0];
if (!res.formValues[0]) return player.sendMessage(`§cPlease enter the amount you want to Transfer`) && player.playSound(`note.bass`)
if (res.formValues[0].startsWith("-")) return player.sendMessage(`§cCannot be prefixed with -, must fill in with numbers`) && player.playSound(`note.bass`)
if (res.formValues[0].startsWith("+")) return player.sendMessage(`§cCannot be prefixed with +, must fill in with numbers`) && player.playSound(`note.bass`)
if (isNaN(res.formValues[0])) return player.sendMessage(`§cYou can only enter numbers, not other characters`) && player.playSound(`note.bass`)
if (res.formValues[1] == true) {
if (money < dataCost) {
player.sendMessage(`§cYour money is not enough, you need ${dataCost} money to buy`)
player.playSound(`note.bass`)
} else {
player.runCommandAsync(`scoreboard players remove @s[scores={money=${dataCost}..}] money ${dataCost}`);
player.runCommandAsync(`give @s ${item.item} ${res.formValues[0]} ${item.data}`);
player.sendMessage(`§7You have bought §ex${res.formValues[0]} ${item.name}`)
player.playSound(`random.orb`)
}
}
if (res.formValues[1] == false) {
if (item.notsold) {
player.runCommandAsync(`tellraw @s[hasitem={item=${item.item},quantity=${res.formValues[0]}..}] {"rawtext":[{"text":"§cYou can not sell this"}]}`);
player.playSound(`note.bass`)
} else {
player.runCommandAsync(`tellraw @s[hasitem={item=${item.item},quantity=${res.formValues[0]}..}] {"rawtext":[{"text":"§7You managed to sell §ex${res.formValues[0]} ${item.name}"}]}`).then((rdata) => {
if (rdata.successCount == 0) return
player.runCommandAsync(`scoreboard players add @s money ${dataSell}`)
player.runCommandAsync(`clear @s ${item.item} ${item.data} ${res.formValues[0]}`)
player.playSound(`random.orb`)
}).catch()
}
}
})
} else {
Shop(player)
}
});
};