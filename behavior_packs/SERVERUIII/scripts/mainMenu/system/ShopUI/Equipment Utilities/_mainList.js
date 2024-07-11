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

import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";
import { ShopUI } from "../shop_main.js";
import { Helmet } from "./helmet.js";
import { Chestplate } from "./chestplate.js";
import { Leggings } from "./leggings.js";
import { Boots } from "./boots.js";
import { Sword } from "./sword.js";
import { Axe } from "./axe.js";
import { Pickaxe } from "./pickaxe.js";
import { Shovel } from "./shovel.js";
import { Hoe } from "./hoe.js";
import { Utilities } from "./utilities.js";

export function EquipmentsUtilities(player) {
  const gui = new ActionFormData()
    .title(`§y§r§bEquipments & Utitilities`)
    .body(
      `§6-------------------------------\n\nUser Information:\nName: §b${
        player.name
      }\n§6Money: §b$${getScore(
        player,
        "money"
      )}\n\n§6-------------------------------`
    )
    .button(`Helmet`, "textures/items/iron_helmet")
    .button(`Chestplate`, "textures/items/diamond_chestplate")
    .button(`Leggings`, "textures/items/netherite_leggings")
    .button(`Boots`, "textures/items/gold_boots")
    .button(`Sword`, "textures/items/iron_sword")
    .button(`Axe`, "textures/items/diamond_axe")
    .button(`Pickaxe`, "textures/items/netherite_pickaxe")
    .button(`Shovel`, "textures/items/gold_shovel")
    .button(`Hoe`, "textures/items/stone_hoe")
    .button(`Utilities`, "textures/items/elytra");
  gui.show(player).then((result) => {
    if (result.selection == 0) {
      Helmet(player);
    }
    if (result.selection == 1) {
      Chestplate(player);
    }
    if (result.selection == 2) {
      Leggings(player);
    }
    if (result.selection == 3) {
      Boots(player);
    }
    if (result.selection == 4) {
      Sword(player);
    }
    if (result.selection == 5) {
      Axe(player);
    }
    if (result.selection == 6) {
      Pickaxe(player);
    }
    if (result.selection == 7) {
      Shovel(player);
    }
    if (result.selection == 8) {
      Hoe(player);
    }
    if (result.selection == 9) {
      Utilities(player);
    }
    if (result.selection == 10) {
      ShopUI(player);
    }
  });
}

function getScore(entity, objective) {
  try {
    return world.scoreboard.getObjective(objective).getScore(entity.scoreboard);
  } catch (error) {
    return 0;
  }
}
