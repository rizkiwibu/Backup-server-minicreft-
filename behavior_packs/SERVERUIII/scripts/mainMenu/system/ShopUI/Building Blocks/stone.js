import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";
import { getScore } from "../../../../Function/index.js"

const itemData = [
  {
    textures: "textures/blocks/brick",
    name: "Brick Block",
    cost: 25,
    sell: 3,
    data: 0,
    item: "brick_block",
  },
  {
    textures: "textures/blocks/stone",
    name: "Stone",
    cost: 18,
    sell: 2,
    data: 0,
    item: "stone",
  },
  {
    textures: "textures/blocks/gravel",
    name: "Gravel",
    cost: 20,
    sell: 3,
    data: 0,
    item: "gravel",
  },
  {
    textures: "textures/blocks/cobblestone",
    name: "Cobblestone",
    cost: 16,
    sell: 1,
    data: 0,
    item: "cobblestone",
  },
  {
    textures: "textures/blocks/cobblestone_mossy",
    name: "Mossy Cobblestone",
    cost: 35,
    sell: 1,
    data: 0,
    item: "mossy_cobblestone",
  },
  {
    textures: "textures/blocks/stone_slab_top",
    name: "Smooth Stone",
    cost: 60,
    sell: 4,
    data: 0,
    item: "smooth_stone",
  },
  {
    textures: "textures/blocks/stonebrick",
    name: "Stonebrick",
    cost: 56,
    sell: 3,
    data: 0,
    item: "stonebrick",
  },
  {
    textures: "textures/blocks/stonebrick_mossy",
    name: "Mossy Stonebrick",
    cost: 56,
    sell: 2,
    data: 0,
    item: "mossy_stonebrick",
  },
  {
    textures: "textures/blocks/stone_granite",
    name: "Granite",
    cost: 38,
    sell: 2,
    data: 1,
    item: "stone",
  },
  {
    textures: "textures/blocks/stone_diorite",
    name: "Diorite",
    cost: 28,
    sell: 1,
    data: 3,
    item: "stone",
  },
  {
    textures: "textures/blocks/stone_andesite",
    name: "Andesite",
    cost: 28,
    sell: 1,
    data: 5,
    item: "stone",
  },
  {
    textures: "textures/blocks/deepslate/deepslate",
    name: "Deepslate",
    cost: 28,
    sell: 1,
    data: 0,
    item: "deepslate",
  },
  {
    textures: "textures/blocks/deepslate/cobbled_deepslate",
    name: "Cobbled Deepslate",
    cost: 28,
    sell: 1,
    data: 0,
    item: "cobbled_deepslate",
  },
  {
    textures: "textures/blocks/deepslate/deepslate_bricks",
    name: "Deepslate Brick",
    cost: 28,
    sell: 1,
    data: 0,
    item: "deepslate_bricks",
  },
  {
    textures: "textures/blocks/deepslate/deepslate_tiles",
    name: "Deepslate Tiles",
    cost: 28,
    sell: 1,
    data: 0,
    item: "deepslate_tiles",
  },
];

export function Stone(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bStone Block`);
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