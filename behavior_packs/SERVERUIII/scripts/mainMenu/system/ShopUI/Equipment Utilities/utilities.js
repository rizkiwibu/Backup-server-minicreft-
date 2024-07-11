import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";

const itemData = [
  {
    textures: "textures/items/elytra",
    name: "Elytra",
    cost: 100480,
    data: 0,
    item: "elytra",
  },
  {
    textures: "textures/items/fireworks",
    name: "Firework Rocket",
    cost: 128,
    data: 0,
    item: "firework_rocket",
  },
  {
    textures: "textures/items/bucket_empty",
    name: "Bucket",
    cost: 128,
    data: 0,
    item: "bucket",
  },
  {
    textures: "textures/items/bucket_water",
    name: "Water Bucket",
    cost: 196,
    data: 0,
    item: "water_bucket",
  },
  {
    textures: "textures/items/bucket_lava",
    name: "Lava Bucket",
    cost: 512,
    data: 0,
    item: "lava_bucket",
  },
  {
    textures: "textures/items/bucket_powder_snow",
    name: "Snow Powder Bucket",
    cost: 768,
    data: 0,
    item: "snow_powder_bucket",
  },
  {
    textures: "textures/items/fishing_rod_uncast",
    name: "Fishing Rod",
    cost: 196,
    data: 0,
    item: "fishing_rod",
  },
  {
    textures: "textures/items/carrot_on_a_stick",
    name: "Carrot on Stick",
    cost: 256,
    data: 0,
    item: "carrot_on_a_stick",
  },
  {
    textures: "textures/items/warped_fungus_on_a_stick",
    name: "Warped Fungus on Stick",
    cost: 256,
    data: 0,
    item: "warped_fungus_on_a_stick",
  },
  {
    textures: "textures/items/flint_and_steel",
    name: "Flint and Steel",
    cost: 128,
    data: 0,
    item: "flint_and_steel",
  },
  {
    textures: "textures/items/fireball",
    name: "Fire Charge",
    cost: 384,
    data: 0,
    item: "fire_charge",
  },
  {
    textures: "textures/items/shears",
    name: "Shears",
    cost: 256,
    data: 0,
    item: "shears",
  },
  {
    textures: "textures/items/lead",
    name: "Lead",
    cost: 256,
    data: 0,
    item: "lead",
  },
  {
    textures: "textures/items/compass_item",
    name: "Compass",
    cost: 512,
    data: 0,
    item: "compass",
  },
  {
    textures: "textures/items/recovery_compass_item",
    name: "Recovery Compass",
    cost: 1024,
    data: 0,
    item: "recovery_compass",
  },
  {
    textures: "textures/items/clock_item",
    name: "Clock",
    cost: 256,
    data: 0,
    item: "clock",
  },
  {
    textures: "textures/items/spyglass",
    name: "Spyglass",
    cost: 768,
    data: 0,
    item: "spyglass",
  },
  {
    textures: "textures/items/map_empty",
    name: "Empty Map",
    cost: 384,
    data: 0,
    item: "empty_map",
  },
  {
    textures: "textures/items/book_writable",
    name: "Book & Quill",
    cost: 256,
    data: 0,
    item: "writable_book",
  },
  {
    textures: "textures/items/saddle",
    name: "Saddle",
    cost: 512,
    data: 0,
    item: "saddle",
  },
];

export function Utilities(player) {
  const shop = new ActionFormData();
  shop.title(`§y§r§bUtilities`);
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
