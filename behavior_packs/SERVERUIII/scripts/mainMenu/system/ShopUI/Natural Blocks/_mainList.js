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
import { Overworld } from "./overworld.js";
import { Nether } from "./nether.js";
import { TheEnd } from "./the_end.js";

export function NaturalBlocks(player) {
  const gui = new ActionFormData()
    .title(`§y§r§bSelect Blocks Type`)
    .body(
      `§6-------------------------------\n\nUser Information:\nName: §b${
        player.name
      }\n§6Money: §b$${getScore(
        player,
        "money"
      )}\n\n§6-------------------------------`
    )
    .button(`Overworld`, `textures/blocks/grass_side_carried`)
    .button(`Nether`, `textures/blocks/netherrack`)
    .button(`The End`, `textures/blocks/end_stone`)
    .button(`<< Back <<`);
  gui.show(player).then((result) => {
    if (result.selection == 0) {
      Overworld(player);
    }
    if (result.selection == 1) {
      Nether(player);
    }
    if (result.selection == 2) {
      TheEnd(player);
    }
    if (result.selection == 3) {
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
