import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";
import { getScore } from "../../../../Function/index.js"

const itemData = [
  {
    textures: "textures/blocks/glass",
    name: "Natural Glass",
    cost: 15,
    sell: 5,
    data: 0,
    item: "glass",
  },
  {
    textures: "textures/blocks/glass_white",
    name: "White Glass",
    cost: 15,
    sell: 5,
    data: 0,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_orange",
    name: "Orange Glass",
    cost: 15,
    sell: 5,
    data: 1,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_magenta",
    name: "Magenta Glass",
    cost: 15,
    sell: 5,
    data: 2,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_light_blue",
    name: "Light Blue Glass",
    cost: 15,
    sell: 5,
    data: 3,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_yellow",
    name: "Yellow Glass",
    cost: 15,
    sell: 5,
    data: 4,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_lime",
    name: "Lime Glass",
    cost: 15,
    sell: 5,
    data: 5,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_pink",
    name: "Pink Glass",
    cost: 15,
    sell: 5,
    data: 6,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_gray",
    name: "Gray Glass",
    cost: 15,
    sell: 5,
    data: 7,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_silver",
    name: "Light Gray Glass",
    cost: 15,
    sell: 5,
    data: 8,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_cyan",
    name: "Cyan Glass",
    cost: 15,
    sell: 5,
    data: 9,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_purple",
    name: "Purple Glass",
    cost: 15,
    sell: 5,
    data: 10,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_blue",
    name: "Blue Glass",
    cost: 15,
    sell: 5,
    data: 11,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_brown",
    name: "Brown Glass",
    cost: 15,
    sell: 5,
    data: 12,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_green",
    name: "Green Glass",
    cost: 15,
    sell: 5,
    data: 13,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_red",
    name: "Red Glass",
    cost: 15,
    sell: 5,
    data: 14,
    item: "stained_glass",
  },
  {
    textures: "textures/blocks/glass_black",
    name: "Black Glass",
    cost: 15,
    sell: 5,
    data: 15,
    item: "stained_glass",
  },
];

export function Glass(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bGlass Block`);
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
