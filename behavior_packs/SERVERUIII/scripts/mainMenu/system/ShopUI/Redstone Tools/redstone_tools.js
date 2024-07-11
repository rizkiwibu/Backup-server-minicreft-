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
    textures: "textures/items/redstone_dust",
    name: "Redstone",
    cost: 64,
    data: 0,
    item: "redstone",
  },
  {
    textures: "textures/blocks/redstone_torch_on",
    name: "Redstone Torch",
    cost: 96,
    data: 0,
    item: "redstone_torch",
  },
  {
    textures: "textures/blocks/redstone_block",
    name: "Redstone Block",
    cost: 576,
    data: 0,
    item: "redstone_block",
  },
  {
    textures: "textures/blocks/repeater_on",
    name: "Redstone Repeater",
    cost: 96,
    data: 0,
    item: "repeater",
  },
  {
    textures: "textures/blocks/comparator_on",
    name: "Redstone Comparator",
    cost: 96,
    data: 0,
    item: "comparator",
  },
  {
    textures: "textures/blocks/target_top",
    name: "Target Block",
    cost: 256,
    data: 0,
    item: "target",
  },
  {
    textures: "textures/blocks/lever",
    name: "Lever",
    cost: 64,
    data: 0,
    item: "lever",
  },
  {
    textures: "textures/blocks/sculk_sensor_top",
    name: "Sculk Sensor",
    cost: 5120,
    data: 0,
    item: "sculk_sensor",
  },
  {
    textures: "textures/blocks/trip_wire_source",
    name: "Tripwire Hook",
    cost: 64,
    data: 0,
    item: "tripwire_hook",
  },
  {
    textures: "textures/blocks/daylight_detector_top",
    name: "Daylight Detector",
    cost: 256,
    data: 0,
    item: "daylight_detector",
  },
  {
    textures: "textures/blocks/piston_top_normal",
    name: "Piston",
    cost: 256,
    data: 0,
    item: "piston",
  },
  {
    textures: "textures/blocks/piston_top_sticky",
    name: "Sticky Piston",
    cost: 256,
    data: 0,
    item: "sticky_piston",
  },
  {
    textures: "textures/blocks/slime",
    name: "Slime Block",
    cost: 1152,
    data: 0,
    item: "slime",
  },
  {
    textures: "textures/blocks/honey_top",
    name: "Honey Block",
    cost: 1152,
    data: 0,
    item: "honey_block",
  },
  {
    textures: "textures/blocks/dispenser_front_horizontal",
    name: "Dispenser",
    cost: 256,
    data: 0,
    item: "dispenser",
  },
  {
    textures: "textures/blocks/dropper_front_horizontal",
    name: "Droper",
    cost: 256,
    data: 0,
    item: "dropper",
  },
  {
    textures: "textures/blocks/hopper_top",
    name: "Hopper",
    cost: 256,
    data: 0,
    item: "hopper",
  },
  {
    textures: "textures/blocks/observer_front",
    name: "Observer",
    cost: 256,
    data: 0,
    item: "observer",
  },
  {
    textures: "textures/blocks/redstone_lamp_on",
    name: "Redstone Lamp",
    cost: 256,
    data: 0,
    item: "redstone_lamp",
  },
];

export function RedstoneTools(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bRedstone Tools`);
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
