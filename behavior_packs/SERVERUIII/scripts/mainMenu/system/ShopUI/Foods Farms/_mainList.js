import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";
import { ShopUI } from "../shop_main.js";
import { RawMeatFood } from "./raw_meat_food.js";
import { CookedMeatFood } from "./cooked_meat_food.js";
import { MiscellaneousFood } from "./miscellaneous_food.js";
import { FarmSeed } from "./farm_seed.js";
import { FarmCrop } from "./farm_crop.js";
import { FarmSapling } from "./farm_sapling.js";

export function FoodsFarms(player) {
  const gui = new ActionFormData()
    .title(`Foods & Farms`)
    .body(
      `§6-------------------------------\n\nUser Information:\nName: §b${
        player.name
      }\n§6Money: §b$${getScore(
        player,
        "money"
      )}\n\n§6-------------------------------`
    )
    .button(`Raw Meat Food`, "textures/items/beef_raw")
    .button(`Cooked Meat Food`, "textures/items/beef_cooked")
    .button(`Miscellaneous Food`, "textures/items/cake")
    .button(`Farm Seed`, "textures/items/seeds_wheat")
    .button(`Farm Crop`, "textures/items/wheat")
    .button(`Farm Sapling`, "textures/blocks/sapling_oak");
  gui.show(player).then((result) => {
    if (result.selection == 0) {
      RawMeatFood(player);
    }
    if (result.selection == 1) {
      CookedMeatFood(player);
    }
    if (result.selection == 2) {
      MiscellaneousFood(player);
    }
    if (result.selection == 3) {
      FarmSeed(player);
    }
    if (result.selection == 4) {
      FarmCrop(player);
    }
    if (result.selection == 5) {
      FarmSapling(player);
    }
    if (result.selection == 6) {
      ShopUI(player);
    }
  });

  // Menambahkan suara note.bell jika pemain memiliki tag "farms"
  if (player.hasTag("farms")) {
    FarmCrop(player);
    player.removeTag("farms");
  }
}

function getScore(entity, objective) {
  try {
    return world.scoreboard.getObjective(objective).getScore(entity.scoreboard);
  } catch (error) {
    return 0;
  }
}