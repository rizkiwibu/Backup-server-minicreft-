import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";
import { getScore } from "../../../../Function/index.js"

const itemData = [
  {
    textures: "textures/blocks/wool_colored_white",
    name: "White Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "white_wool",
  },
  {
    textures: "textures/blocks/wool_colored_orange",
    name: "Orange Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "orange_wool",
  },
  {
    textures: "textures/blocks/wool_colored_magenta",
    name: "Magenta Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "magenta_wool",
  },
  {
    textures: "textures/blocks/wool_colored_light_blue",
    name: "Light Blue Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "light_blue_wool",
  },
  {
    textures: "textures/blocks/wool_colored_yellow",
    name: "Yellow Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "yellow_wool",
  },
  {
    textures: "textures/blocks/wool_colored_lime",
    name: "Lime Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "lime_wool",
  },
  {
    textures: "textures/blocks/wool_colored_pink",
    name: "Pink Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "wool",
  },
  {
    textures: "textures/blocks/wool_colored_gray",
    name: "Gray Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "gray_wool",
  },
  {
    textures: "textures/blocks/wool_colored_silver",
    name: "Light Gray Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "light_gray_wool",
  },
  {
    textures: "textures/blocks/wool_colored_cyan",
    name: "Cyan Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "cyan_wool",
  },
  {
    textures: "textures/blocks/wool_colored_purple",
    name: "Purple Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "purple_wool",
  },
  {
    textures: "textures/blocks/wool_colored_blue",
    name: "Blue Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "blue_wool",
  },
  {
    textures: "textures/blocks/wool_colored_brown",
    name: "Brown Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "brown_wool",
  },
  {
    textures: "textures/blocks/wool_colored_green",
    name: "Green Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "green_wool",
  },
  {
    textures: "textures/blocks/wool_colored_red",
    name: "Red Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "red_wool",
  },
  {
    textures: "textures/blocks/wool_colored_black",
    name: "Black Wool",
    cost: 16,
    sell: 1,
    data: 0,
    item: "black_wool",
  },
];

export function Wool(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bWool Block`);
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

