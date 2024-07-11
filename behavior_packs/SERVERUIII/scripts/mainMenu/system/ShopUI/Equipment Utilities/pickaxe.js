import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";

const itemData = [
  {
    textures: "textures/items/wood_pickaxe",
    name: "Wooden Pickaxe",
    cost: 256,
    data: 0,
    item: "wooden_pickaxe",
  },
  {
    textures: "textures/items/stone_pickaxe",
    name: "Stone Pickaxe",
    cost: 512,
    data: 0,
    item: "stone_pickaxe",
  },
  {
    textures: "textures/items/iron_pickaxe",
    name: "Iron Pickaxe",
    cost: 2048,
    data: 0,
    item: "iron_pickaxe",
  },
  {
    textures: "textures/items/gold_pickaxe",
    name: "Golden Pickaxe",
    cost: 1536,
    data: 0,
    item: "golden_pickaxe",
  },
  {
    textures: "textures/items/diamond_pickaxe",
    name: "Diamond Pickaxe",
    cost: 2560,
    data: 0,
    item: "diamond_pickaxe",
  },
  {
    textures: "textures/items/netherite_pickaxe",
    name: "Netherite Pickaxe",
    cost: 103200,
    data: 0,
    item: "netherite_pickaxe",
  },
];

export function Pickaxe(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bPickaxe`);
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
        `§6-------------------------------\n\nUser Information:\nName: §b${player.name}\n§6Money: §b$${money}\n\n§6Item Information:\n§6Buy x1 §b${item.name} §6= §b$${item.cost}\n\n§6-------------------------------\n\n§6Amount:`,
        `The Amount you want to Buy`
      );
    brick.show(player).then((res) => {
      const value = `${res.formValues[0]}`;
      const costValue = value.replace(/[^0-9]/g, "");
      let dataCost = item.cost * costValue;
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
    });
  });
}

function getScore(entity, objective) {
  try {
    return world.scoreboard.getObjective(objective).getScore(entity.scoreboard);
  } catch (error) {
    return 0;
  }
}
