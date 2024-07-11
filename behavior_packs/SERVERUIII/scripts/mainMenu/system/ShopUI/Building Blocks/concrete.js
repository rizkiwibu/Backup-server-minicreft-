import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";
import { getScore } from "../../../../Function/index.js"

const itemData = [
  {
    textures: "textures/blocks/concrete_white",
    name: "White Concrete",
    cost: 28,
    sell: 4,
    data: 0,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_orange",
    name: "Orange Concrete",
    cost: 28,
    sell: 4,
    data: 1,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_magenta",
    name: "Magenta Concrete",
    cost: 28,
    sell: 4,
    data: 2,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_light_blue",
    name: "Light Blue Concrete",
    cost: 28,
    sell: 4,
    data: 3,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_yellow",
    name: "Yellow Concrete",
    cost: 28,
    sell: 4,
    data: 4,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_lime",
    name: "Lime Concrete",
    cost: 28,
    sell: 4,
    data: 5,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_pink",
    name: "Pink Concrete",
    cost: 28,
    sell: 4,
    data: 6,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_gray",
    name: "Gray Concrete",
    cost: 28,
    sell: 4,
    data: 7,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_silver",
    name: "Light Gray Concrete",
    cost: 28,
    sell: 4,
    data: 8,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_cyan",
    name: "Cyan Concrete",
    cost: 28,
    sell: 4,
    data: 9,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_purple",
    name: "Purple Concrete",
    cost: 28,
    sell: 4,
    data: 10,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_blue",
    name: "Blue Concrete",
    cost: 28,
    sell: 4,
    data: 11,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_brown",
    name: "Brown Concrete",
    cost: 28,
    sell: 4,
    data: 12,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_green",
    name: "Green Concrete",
    cost: 28,
    sell: 4,
    data: 13,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_red",
    name: "Red Concrete",
    cost: 28,
    sell: 4,
    data: 14,
    item: "concrete",
  },
  {
    textures: "textures/blocks/concrete_black",
    name: "Black Concrete",
    cost: 28,
    sell: 4,
    data: 15,
    item: "concrete",
  },
];

export function Concrete(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bConcrete Block`);
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