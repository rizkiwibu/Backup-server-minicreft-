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

const itemData = [
  {
    textures: "textures/items/leather.png",
    name: "Leather",
    cost: 32,
    sell: 5,
    data: 0,
    item: "leather",
  },
  {
    textures: "textures/items/rabbit_hide.png",
    name: "Rabbit Hide",
    cost: 32,
    sell: 5,
    data: 0,
    item: "rabbit_hide",
  },
  {
    textures: "textures/items/rabbit_foot.png",
    name: "Rabbit Foot",
    cost: 32,
    sell: 5,
    data: 0,
    item: "rabbit_foot",
  },
  {
    textures: "textures/items/feather.png",
    name: "Feather",
    cost: 32,
    sell: 5,
    data: 0,
    item: "feather",
  },
  {
    textures: "textures/items/gunpowder.png",
    name: "Gunpowder",
    cost: 32,
    sell: 5,
    data: 0,
    item: "gunpowder",
  },
  {
    textures: "textures/items/string.png",
    name: "String",
    cost: 32,
    sell: 5,
    data: 0,
    item: "string",
  },
  {
    textures: "textures/items/rotten_flesh.png",
    name: "Rotten Flesh",
    cost: 32,
    sell: 5,
    data: 0,
    item: "rotten_flesh",
  },
  {
    textures: "textures/items/bone.png",
    name: "Bone",
    cost: 64,
    sell: 8,
    data: 0,
    item: "bone",
  },
  {
    textures: "textures/items/ender_pearl.png",
    name: "Ender Pearl",
    cost: 700,
    sell: 15,
    data: 0,
    item: "ender_pearl",
  },
  {
    textures: "textures/items/slimeball.png",
    name: "Slimeball",
    cost: 64,
    sell: 10,
    data: 0,
    item: "slime_ball",
  },
  {
    textures: "textures/items/spider_eye.png",
    name: "Spider Eye",
    cost: 32,
    sell: 13,
    data: 0,
    item: "spider_eye",
  },
  {
    textures: "textures/items/spider_eye_fermented.png",
    name: "Fermented Spider Eye",
    cost: 32,
    sell: 13,
    data: 0,
    item: "fermented_spider_eye",
  },
  {
    textures: "textures/items/magma_cream.png",
    name: "Magma Cream",
    cost: 32,
    sell: 13,
    data: 0,
    item: "magma_cream",
  },
  {
    textures: "textures/items/blaze_rod.png",
    name: "Blaze Rod",
    cost: 700,
    sell: 18,
    data: 0,
    item: "blaze_rod",
  },
  {
    textures: "textures/items/dye_powder_glow.png",
    name: "Glow Ink Sac",
    cost: 64,
    sell: 13,
    data: 0,
    item: "glow_ink_sac",
  },
  {
    textures: "textures/items/shulker_shell.png",
    name: "Shulker Shell",
    cost: 5000,
    sell: 35,
    data: 0,
    item: "shulker_shell",
  },
];

export function MobDrops(player) {
  const shop = new ActionFormData();
  shop.title(`§y§rMob Drop Loot`);
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
