import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";
import { BuildingBlocks } from "./_mainList";
import { getScore } from "../../../../Function/index.js"

const itemData = [
  {
    textures: "textures/blocks/log_oak",
    name: "Oak Log",
    cost: 25,
    sell: 2,
    data: 0,
    item: "oak_log",
  },
  {
    textures: "textures/blocks/planks_oak",
    name: "Oak Plank",
    cost: 10,
    sell: 0,
    data: 0,
    item: "planks",
  },
  {
    textures: "textures/blocks/log_spruce",
    name: "Spruce Log",
    cost: 25,
    sell: 2,
    data: 0,
    item: "spruce_log",
  },
  {
    textures: "textures/blocks/planks_spruce",
    name: "Spruce Plank",
    cost: 10,
    sell: 0,
    data: 1,
    item: "planks",
  },
  {
    textures: "textures/blocks/log_birch",
    name: "Birch Log",
    cost: 25,
    sell: 2,
    data: 0,
    item: "birch_log",
  },
  {
    textures: "textures/blocks/planks_birch",
    name: "Birch Plank",
    cost: 10,
    sell: 0,
    data: 2,
    item: "planks",
  },
  {
    textures: "textures/blocks/log_jungle",
    name: "Jungle Log",
    cost: 25,
    sell: 2,
    data: 0,
    item: "jungle_log",
  },
  {
    textures: "textures/blocks/planks_jungle",
    name: "Jungle Plank",
    cost: 10,
    sell: 0,
    data: 3,
    item: "planks",
  },
  {
    textures: "textures/blocks/log_acacia",
    name: "Acacia Log",
    cost: 25,
    sell: 2,
    data: 0,
    item: "acacia_log",
  },
  {
    textures: "textures/blocks/planks_acacia",
    name: "Acacia Plank",
    cost: 10,
    sell: 0,
    data: 4,
    item: "planks",
  },
  {
    textures: "textures/blocks/log_big_oak",
    name: "Dark Oak Log",
    cost: 25,
    sell: 2,
    data: 0,
    item: "dark_oak_log",
  },
  {
    textures: "textures/blocks/planks_big_oak",
    name: "Dark Oak Plank",
    cost: 10,
    sell: 0,
    data: 5,
    item: "planks",
  },
  {
    textures: "textures/blocks/mangrove_log_side",
    name: "Mangrove Log",
    cost: 25,
    sell: 2,
    data: 0,
    item: "mangrove_log",
  },
  {
    textures: "textures/blocks/mangrove_planks",
    name: "Mangrove Plank",
    cost: 10,
    sell: 0,
    data: 0,
    item: "mangrove_planks",
  },
  {
    textures: "textures/blocks/huge_fungus/crimson_log_top",
    name: "Crimson Stem",
    cost: 25,
    sell: 2,
    data: 0,
    item: "crimson_stem",
  },
  {
    textures: "textures/blocks/huge_fungus/crimson_planks",
    name: "Crimson Plank",
    cost: 10,
    sell: 0,
    data: 0,
    item: "crimson_planks",
  },
  {
    textures: "textures/blocks/huge_fungus/warped_stem_top",
    name: "Warped Stem",
    cost: 25,
    sell: 2,
    data: 0,
    item: "warped_stem",
  },
  {
    textures: "textures/blocks/huge_fungus/warped_planks",
    name: "Warped Plank",
    cost: 10,
    sell: 0,
    data: 0,
    item: "warped_planks",
  },
  {
    textures: "textures/blocks/log_cherry",
    name: "Cherry Log",
    cost: 25,
    sell: 2,
    data: 0,
    item: "cherry_log",
  },
  {
    textures: "textures/blocks/planks_cherry",
    name: "Cherry Plank",
    cost: 10,
    sell: 0,
    data: 0,
    item: "cherry_planks",
  },
  {
    textures: "textures/blocks/bamboo_stem",
    name: "Bamboo Planks",
    cost: 64,
    sell: 2,
    data: 0,
    item: "bamboo_planks",
  },
];

export function Wood(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bWood Blocks`);
  shop.body(
    `§6-------------------------------\n\nUser Information:\nName: §b${
      player.name
    }\n§6Money: §b$${getScore(
      player,
      "money"
    )}\n\n§6-------------------------------`
  );
  for (const item of itemData)
    shop.button(`${item.name}\n§b$${item.cost}`, `${item.textures}`);
  shop.show(player).then((result) => {
    if (result.isCanceled) return;
    const item = itemData[result.selection];
    var money = getScore(player, "money");
    let brick = new ModalFormData()
      .title(`${item.name}`)
      .textField(
        `§6-------------------------------\n\nUser Information:\nName: §b${player.name}\n§6Money: §b$${money}\n\n§6Item Information:\n§6Buy x1 §b${item.name} §6= §b$${item.cost}\n§6Sell x1 §b${item.name} §6= §b$${item.sell}\n\n§6-------------------------------\n\n§6Amount:`,
        `The Amount you want to Buy or Sell`
      )
      .toggle("§6Sell / Buy", true);
    brick.show(player).then((res) => {
      const value = `${res.formValues[0]}`;
      const costValue = value.replace(/[^0-9]/g, "");
      const sellValue = value.replace(/[^0-9]/g, "");
      let dataCost = item.cost * costValue;
      let dataSell = item.sell * sellValue;
      if (!res.formValues[0])
        return (
          player.runCommandAsync(
            `tellraw @s {"rawtext":[{"text":"§6SHOP §7>> §cPlease enter the amount you want to Buy or Sell"}]}`
          ) && player.runCommandAsync(`playsound note.bass @s`)
        );
      if (isNaN(res.formValues[0]))
        return (
          player.runCommandAsync(
            `tellraw @s {"rawtext":[{"text":"§6SHOP §7>> §cYou can only enter numbers, not other characters"}]}`
          ) && player.runCommandAsync(`playsound note.bass @s`)
        );
      if (!isNaN(res.formValues[0])) {
        if (res.formValues[1] == true) {
          player.runCommandAsync(
            `tag @s[scores={money=${dataCost}..}] add canBuy`
          );
          player.runCommandAsync(
            `scoreboard players remove @s[tag=canBuy] money ${dataCost}`
          );
          player.runCommandAsync(
            `give @s[tag=canBuy] ${item.item} ${costValue} ${item.data}`
          );
          player.runCommandAsync(
            `tellraw @s[tag=canBuy] {"rawtext":[{"text":"§6SHOP §7>> §aYou have bought §ex${costValue} ${item.name} §aWith totals: §e$${dataCost}"}]}`
          );
          player.runCommandAsync(`playsound random.levelup @s[tag=canBuy]`);
          player.runCommandAsync(
            `tellraw @s[tag=!canBuy] {"rawtext":[{"text":"§6SHOP §7>> §cYour money is not enough, need §e$${dataCost} §cmoney"}]}`
          );
          player.runCommandAsync(`playsound note.bass @s[tag=!canBuy]`);
          player.runCommandAsync(`tag @s remove canBuy`);
        }
        if (res.formValues[1] == false) {
          player.runCommandAsync(
            `tag @s[hasitem={item=${item.item},quantity=${sellValue}..}] add canSell`
          );
          player.runCommandAsync(
            `clear @s[tag=canSell] ${item.item} ${item.data} ${sellValue}`
          );
          player.runCommandAsync(
            `scoreboard players add @s[tag=canSell] money ${dataSell}`
          );
          player.runCommandAsync(
            `tellraw @s[tag=canSell] {"rawtext":[{"text":"§6SHOP §7>> §aYou successfully to sell §ex${sellValue} ${item.name} §aWith totals: §e$${dataSell}"}]}`
          );
          player.runCommandAsync(`playsound random.levelup @s[tag=canSell]`);
          player.runCommandAsync(
            `tellraw @s[tag=!canSell] {"rawtext":[{"text":"§6SHOP §7>> §cYou can't sell §ex${sellValue} ${item.name} §cbecause it's not enough or different"}]}`
          );
          player.runCommandAsync(`playsound note.bass @s[tag=!canSell]`);
          player.runCommandAsync(`tag @s remove canSell`);
        }
      }
    });
  });
}