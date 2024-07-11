import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";

const itemData = [
  {
    textures: "textures/items/bread.png",
    name: "Bread",
    cost: 24,
    data: 0,
    item: "bread",
  },
  {
    textures: "textures/items/mushroom_stew.png",
    name: "Mushroom Stew",
    cost: 24,
    data: 0,
    item: "mushroom_stew",
  },
  {
    textures: "textures/items/beetroot_soup.png",
    name: "Beetroot Soup",
    cost: 24,
    data: 0,
    item: "beetroot_soup",
  },
  {
    textures: "textures/items/rabbit_stew.png",
    name: "Rabbit Stew",
    cost: 27,
    data: 0,
    item: "rabbit_stew",
  },
  {
    textures: "textures/items/potato_baked.png",
    name: "Baked Potato",
    cost: 24,
    data: 0,
    item: "baked_potato",
  },
  {
    textures: "textures/items/pumpkin_pie.png",
    name: "Pumpkin Pie",
    cost: 24,
    data: 0,
    item: "pumpkin_pie",
  },
  {
    textures: "textures/items/cookie.png",
    name: "Cookie",
    cost: 32,
    data: 0,
    item: "cookie",
  },
  {
    textures: "textures/items/cake.png",
    name: "Cake",
    cost: 76,
    data: 0,
    item: "cake",
  },
  {
    textures: "textures/items/apple_golden",
    name: "Golden Apple",
    cost: 512,
    data: 0,
    item: "golden_apple",
  },
  {
    textures: "textures/items/apple_golden",
    name: "Ecnhanted Golden Apple",
    cost: 30024,
    data: 0,
    item: "enchanted_golden_apple",
  },
];

export function MiscellaneousFood(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bMiscellaneous Food`);
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
