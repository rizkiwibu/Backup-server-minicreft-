import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";

const itemData = [
  {
    textures: "textures/items/bamboo.png",
    name: "Bamboo",
    cost: 31,
    sell: 7,
    data: 0,
    item: "bamboo",
  },
  {
    textures: "textures/items/reeds.png",
    name: "Sugarcane",
    cost: 33,
    sell: 18,
    data: 0,
    item: "sugar_cane",
  },
  {
    textures: "textures/items/wheat.png",
    name: "Wheat",
    cost: 27,
    sell: 10,
    data: 0,
    item: "wheat",
  },
  {
    textures: "textures/items/beetroot.png",
    name: "Beetroot",
    cost: 16,
    sell: 8,
    data: 0,
    item: "beetroot",
  },
  {
    textures: "textures/items/carrot.png",
    name: "Carrot",
    cost: 73,
    sell: 13,
    data: 0,
    item: "carrot",
  },
  {
    textures: "textures/items/potato.png",
    name: "Potato",
    cost: 128,
    sell: 13,
    data: 0,
    item: "potato",
  },
  {
    textures: "textures/blocks/pumpkin_side.png",
    name: "Pumpkin",
    cost: 93,
    sell: 20,
    data: 0,
    item: "pumpkin",
  },
  {
    textures: "textures/items/melon.png",
    name: "Melon",
    cost: 18,
    sell: 5,
    data: 0,
    item: "melon_slice",
  },
];


export function FarmCrop(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bFarm Crop`);
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

function getScore(entity, objective) {
  try {
    return world.scoreboard.getObjective(objective).getScore(entity.scoreboard);
  } catch (error) {
    return 0;
  }
}
