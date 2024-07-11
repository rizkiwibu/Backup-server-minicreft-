import { world, system, Player, ItemStack, Container, ItemTypes, EnchantmentList, Component } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import * as mc from "@minecraft/server";

// Fungsi untuk mendapatkan pemain online
function getOnlinePlayers(asNumber = false) {
  let onlinePlayers = world.getAllPlayers();
d
  return asNumber ? onlinePlayers.length : onlinePlayers;
}













export function INVsee(player) {
  const INVsee = new ModalFormData()
    let players = world.getPlayers(); 
  let operations = [];
  let playerObjects = [];
  for (let player of players) {;
  operations.push(player.name);
  playerObjects.push(player);
  };
    INVsee.title("Inventory-UI")
    .textField("Target:", "put the playerName");

  INVsee.show(player).then(res => {
    let targetInfo = [];
    const tgp = world.getPlayers();
    const targetPlayerName = res.formValues[0];
    let target = null; // Declare target variable here

    for (let player of tgp) {
      if (player.name === targetPlayerName) {
        target = player;
        targetInfo.push(target);
      }
    }
   for (let target of targetInfo) {
    if (target) {
      const inv = target.getComponent("inventory").container;
      
      if (inv.emptySlotsCount === inv.size)
        return player.sendMessage(`§4${target.name} §cEmpty Inv`);
      
      let str = "";
      for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        
        if (item === undefined) {
          continue;
        }
        
        const itemType = item.typeId;
        const amount = item.amount;
        let itemName = "";
        const getItemName = item.nameTag;
        
          itemName = getItemName ? `\n§2+ §bitemName: §3${item.nameTag}` : "";
          
        str += `\n§2Slot [§a${i}§2]:`;
        str += `\n§2+ §bidItem : §7${itemType}`;
        str += `\n§2+ §bamount : §7${amount}`
        str += `${itemName}`;
        
        for (const enchant of item.getComponent("minecraft:enchantments").enchantments) {
         const enchantType = enchant?.type.id ?? null;
         const enchantLevel = enchant?.level ?? 0;
         let textEC = "";
         textEC = enchantType ? `\n§7  - §d${enchantType} §7: §alvl ${enchantLevel}` : "";
        str += textEC;
      }

        str += "\n";
      }
      
      
        const invseeUI = new ActionFormData()
          .title(`INV-${target.name}`)
          .body(str)
          .button("close");

        invseeUI.show(player);
    } else {
      player.sendMessage("§7Player not found.");
    }
   } 
  });
}