/*
----------------------------------
Creator: Mafly
Discord:
https://dsc.mafly-studio.me
Youtube: MaFly
https://www.youtube.com/c/MaFly16

Website:
https://mafly-studio.me/
----------------------------------
*/

import { world, system } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";
import { BuildingBlocks } from "./Building Blocks/_mainList.js";
import { NaturalBlocks } from "./Natural Blocks/_mainList.js";
import { FunctionalBlocks } from "./Functional Blocks/functional_block.js";
import { RedstoneTools } from "./Redstone Tools/redstone_tools.js";
import { EquipmentsUtilities } from "./Equipment Utilities/_mainList.js";
import { FoodsFarms } from "./Foods Farms/_mainList.js";
import { Ores } from "./Ores/ore.js";
import { MobDrops } from "./Mob Drops/mob_drop.js";
import { SpawnEggs } from "./Spawn Eggs/_mainList.js";
import { KeyShop } from "./Key/key_1.js";
import { getScore } from "../../../Function/index.js"

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("shop")) {
      ShopUI(player);
      player.runCommandAsync(`tag @s remove shop`);
    }
  }
});


system.runInterval(() => {
     for (let player of world.getPlayers()) {
          if (player.hasTag("sell")) {
               Ores(player);
               player.removeTag(`sell`) 
             }
         }
      });

export async function ShopUI(player) {
  const shopui = new ActionFormData()
    .title(`§y§r§bShop UI Menu`)
    .body(
      `§6Your Money: §b$${getScore(
        player,
        "money"
      )}`
    )
    .button(`Building Blocks\n§0Click To Open`, "textures/blocks/brick")
    .button(`Natural Blocks\n§0Click To Open`, "textures/blocks/grass_side_carried")
    .button(`Functional Blocks\n§0Click To Open`, "textures/blocks/crafting_table_front")
    .button(`Redstone Tools\n§0Click To Open`, "textures/items/redstone_dust")
    .button(`Equipments & Utilites\n§0Click To Open`, "textures/items/diamond_axe")
    .button(`Foods & Farms\n§0Click To Open`, "textures/items/apple_golden")
    .button(`Ores Ingot\n§0Click To Open`, "textures/items/diamond")
    .button(`Mob Drops\n§0Click To Open`, "textures/items/leather")
    .button(`Spawn Eggs\n§0Click To Open`, "textures/items/egg_chicken")
  let result = await ForceOpen(player, shopui);
  if (result.selection == 0) {
    BuildingBlocks(player);
  }
  if (result.selection == 1) {
    NaturalBlocks(player);
  }
  if (result.selection == 2) {
    FunctionalBlocks(player);
  }
  if (result.selection == 3) {
    RedstoneTools(player);
  }
  if (result.selection == 4) {
    EquipmentsUtilities(player);
  }
  if (result.selection == 5) {
    FoodsFarms(player);
  }
  if (result.selection == 6) {
    Ores(player);
  }
  if (result.selection == 7) {
    MobDrops(player);
  }
  if (result.selection == 8) {
    SpawnEggs(player);
  }
}

async function ForceOpen(player, form) {
  while (true) {
    const response = await form.show(player);
    if (response.cancelationReason !== "userBusy") return response;
  }
}