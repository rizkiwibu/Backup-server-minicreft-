import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";

const itemData = [
  {
    textures: "textures/blocks/netherrack",
    name: "Netherrack",
    cost: 32,
    sell: 4,
    data: 0,
    item: "netherrack",
  },
  {
    textures: "textures/blocks/crimson_nylium_side",
    name: "Crimson Nylium",
    cost: 32,
    sell: 2,
    data: 0,
    item: "crimson_nylium",
  },
  {
    textures: "textures/blocks/warped_nylium_side",
    name: "Warped Nylium",
    cost: 32,
    sell: 2,
    data: 0,
    item: "warped_nylium",
  },
  {
    textures: "textures/blocks/nether_wart_block",
    name: "Nether Wart Block",
    cost: 32,
    sell: 3,
    data: 0,
    item: "nether_wart_block",
  },
  {
    textures: "textures/blocks/warped_wart_block",
    name: "Warped Wart Block",
    cost: 32,
    sell: 2,
    data: 0,
    item: "warped_wart_block",
  },
  {
    textures: "textures/blocks/weeping_vines_base",
    name: "Weeping Vines",
    cost: 32,
    sell: 2,
    data: 0,
    item: "weeping_vines",
  },
  {
    textures: "textures/blocks/twisting_vines_base",
    name: "Twisting Vines",
    cost: 32,
    sell: 2,
    data: 0,
    item: "twisting_vines",
  },
  {
    textures: "textures/blocks/shroomlight",
    name: "Shroomlight",
    cost: 48,
    sell: 2,
    data: 0,
    item: "shroomlight",
  },
  {
    textures: "textures/blocks/soul_sand",
    name: "Soul Sand",
    cost: 64,
    sell: 2,
    data: 0,
    item: "soul_sand",
  },
  {
    textures: "textures/blocks/soul_soil",
    name: "Soul Soil",
    cost: 64,
    sell: 2,
    data: 0,
    item: "soul_soil",
  },
  {
    textures: "textures/blocks/magma",
    name: "Magma",
    cost: 64,
    sell: 2,
    data: 0,
    item: "magma",
  },
  {
    textures: "textures/blocks/blackstone",
    name: "Blackstone",
    cost: 64,
    sell: 2,
    data: 0,
    item: "blackstone",
  },
  {
    textures: "textures/blocks/basalt_top",
    name: "Basalt",
    cost: 64,
    sell: 2,
    data: 0,
    item: "basalt",
  },
  {
    textures: "textures/blocks/smooth_basalt",
    name: "Smooth Basalt",
    cost: 64,
    sell: 2,
    data: 0,
    item: "smooth_basalt",
  },
];

export function Nether(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bNether Block`);
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
