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
import { UndeadMob } from "./mob_undead.js";
import { SpawnerMob } from "./mob_spawner.js";

export function SpawnEggs(player) {
  const gui = new ActionFormData()
    .title(`§y§r§bSpawn Eggs`)
    .body(
      `§6-------------------------------\n\nUser Information:\nName: §b${
        player.name
      }\n§6Money: §b$${getScore(
        player,
        "money"
      )}\n\n§6-------------------------------`
    )
    .button(`Undead Mob`, "textures/items/egg_zombie.png")
    .button(`Spawner Mob`, "textures/blocks/mob_spawner.png");
  gui.show(player).then((result) => {
    if (result.selection == 0) {
      UndeadMob(player);
    }
    if (result.selection == 1) {
      SpawnerMob(player);
    }
    if (result.selection == 2) {
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
