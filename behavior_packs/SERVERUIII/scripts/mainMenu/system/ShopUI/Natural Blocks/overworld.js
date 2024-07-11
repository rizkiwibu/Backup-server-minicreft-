import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";

const itemData = [
  {
    textures: "textures/blocks/grass_side_carried",
    name: "Grass Block",
    cost: 28,
    sell: 1,
    data: 0,
    item: "grass",
  },
  {
    textures: "textures/blocks/dirt",
    name: "Dirt",
    cost: 14,
    sell: 1,
    data: 0,
    item: "dirt",
  },
  {
    textures: "textures/blocks/grass_path_side",
    name: "Dirt Path",
    cost: 34,
    sell: 1,
    data: 0,
    item: "dirt_path",
  },
  {
    textures: "textures/blocks/coarse_dirt",
    name: "Coarse Dirt",
    cost: 28,
    sell: 1,
    data: 1,
    item: "dirt",
  },
  {
    textures: "textures/blocks/dirt_with_roots",
    name: "Rooted Dirt",
    cost: 34,
    sell: 1,
    data: 0,
    item: "dirt_with_roots",
  },
  {
    textures: "textures/blocks/dirt_podzol_side",
    name: "Podzol",
    cost: 28,
    sell: 1,
    data: 0,
    item: "podzol",
  },
  {
    textures: "textures/blocks/mycelium_side",
    name: "Mycelium",
    cost: 28,
    sell: 1,
    data: 0,
    item: "mycelium",
  },
  {
    textures: "textures/blocks/mud",
    name: "Mud",
    cost: 28,
    sell: 1,
    data: 0,
    item: "mud",
  },
  {
    textures: "textures/blocks/mud_bricks",
    name: "Mud Brick",
    cost: 28,
    sell: 1,
    data: 0,
    item: "mud_brick",
  },
  {
    textures: "textures/blocks/packed_mud",
    name: "Packed Mud",
    cost: 28,
    sell: 1,
    data: 0,
    item: "packed_mud",
  },
  {
    textures: "textures/blocks/clay",
    name: "Clay",
    cost: 64,
    sell: 2,
    data: 0,
    item: "clay",
  },
  {
    textures: "textures/blocks/sand",
    name: "Sand",
    cost: 18,
    sell: 1,
    data: 0,
    item: "sand",
  },
  {
    textures: "textures/blocks/sandstone_top",
    name: "Sandstone",
    cost: 61,
    sell: 1,
    data: 0,
    item: "sandstone",
  },
  {
    textures: "textures/blocks/red_sand",
    name: "Red Sand",
    cost: 16,
    sell: 1,
    data: 0,
    item: "red_sand",
  },
  {
    textures: "textures/blocks/red_sandstone_top",
    name: "Red Sandstone",
    cost: 24,
    sell: 1,
    data: 0,
    item: "red_sandstone",
  },
  {
    textures: "textures/blocks/amethyst_block",
    name: "Amethyst Block",
    cost: 396,
    sell: 11,
    data: 0,
    item: "amethyst_block",
  },
  {
    textures: "textures/blocks/calcite",
    name: "Calcite",
    cost: 36,
    sell: 1,
    data: 0,
    item: "",
  },
  {
    textures: "textures/blocks/tuff",
    name: "Tuff",
    cost: 24,
    sell: 1,
    data: 0,
    item: "tuff",
  },
  {
    textures: "textures/blocks/dripstone_block",
    name: "Dripstone",
    cost: 24,
    sell: 1,
    data: 0,
    item: "dripstone_block",
  },
  {
    textures: "textures/blocks/pointed_dripstone_down_tip",
    name: "Pointed Dripstone",
    cost: 16,
    sell: 1,
    data: 0,
    item: "pointed_dripstone",
  },
  {
    textures: "textures/blocks/moss_block",
    name: "Moss Block",
    cost: 64,
    sell: 1,
    data: 0,
    item: "moss_block",
  },
  {
    textures: "textures/blocks/ice",
    name: "Ice",
    cost: 64,
    sell: 1,
    data: 0,
    item: "ice",
  },
  {
    textures: "textures/blocks/ice_packed",
    name: "Packed Ice",
    cost: 24,
    sell: 1,
    data: 0,
    item: "packed_ice",
  },
  {
    textures: "textures/blocks/blue_ice",
    name: "Blue Ice",
    cost: 24,
    sell: 1,
    data: 0,
    item: "blue_ice",
  },
  {
    textures: "textures/blocks/snow",
    name: "Snow Block",
    cost: 24,
    sell: 1,
    data: 0,
    item: "snow",
  },
  {
    textures: "textures/blocks/obsidian",
    name: "Obsidian",
    cost: 256,
    sell: 12,
    data: 0,
    item: "obsidian",
  },
  {
    textures: "textures/blocks/crying_obsidian",
    name: "Crying Obsidian",
    cost: 196,
    sell: 12,
    data: 0,
    item: "crying_obsidian",
  },
  {
    textures: "textures/blocks/prismarine_bricks",
    name: "Prismarine",
    cost: 128,
    sell: 2,
    data: 0,
    item: "prismarine",
  },
  {
    textures: "textures/blocks/sponge",
    name: "Sponge",
    cost: 128,
    sell: 2,
    data: 0,
    item: "sponge",
  },
];

export function Overworld(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bOverworld Block`);
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
