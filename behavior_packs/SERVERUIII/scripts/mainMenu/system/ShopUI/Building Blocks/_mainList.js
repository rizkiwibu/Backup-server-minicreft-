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
import { Wood } from "./wood.js";
import { Stone } from "./stone.js";
import { Glass } from "./glass.js";
import { Wool } from "./wool.js";
import { Concrete } from "./concrete.js";
import { Terracotta } from "./terracotta.js";
import { getScore } from "../../../../Function/index.js"

export function BuildingBlocks(player) {
  const gui = new ActionFormData()
    .title(`§y§r§bPilih Block`)
    .body(
      `§6-------------------------------\n\nUser Information:\nName: §b${
        player.name
      }\n§6Money: §b$${getScore(
        player,
        "money"
      )}\n\n§6-------------------------------`
    )
    .button(`Wood Blocks`, `textures/blocks/log_oak`)
    .button(`Stone Blocks`, `textures/blocks/stone`)
    .button(`Glass Blocks`, `textures/blocks/glass`)
    .button(`Wool Blocks`, `textures/blocks/wool_colored_red`)
    .button(`Concrete Blocks`, `textures/blocks/concrete_white`)
    .button(`Terracotta Blocks`, `textures/blocks/hardened_clay`);
  gui.show(player).then((result) => {
    if (result.selection == 0) {
      Wood(player);
    }
    if (result.selection == 1) {
      Stone(player);
    }
    if (result.selection == 2) {
      Glass(player);
    }
    if (result.selection == 3) {
      Wool(player);
    }
    if (result.selection == 4) {
      Concrete(player);
    }
    if (result.selection == 5) {
      Terracotta(player);
    }
    if (result.selection == 6) {
      ShopUI(player);
    }
  });
}