import { world } from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";

const itemData = [
  {
    textures: "textures/blocks/mob_spawner.png",
    name: "Mob Spawner",
    cost: 200000,
    data: 0,
    item: "mob_spawner",
  },
];

export function SpawnerMob(player) {
  var money = getScore(player, "money");
  for (var item of itemData);
  const shop = new ModalFormData();
  shop.title(`${item.name}`);
  shop.textField(
    `§6-------------------------------\n\nUser Information:\nName: §b${player.name}\n§6Money: §b$${money}\n\n§6Item Information:\n§6Buy x1 §b${item.name} §6= §b$${item.cost}\n\n§6-------------------------------\n\n§6Amount:`,
    `The Amount you want to Buy`
  );
  shop.show(player).then((res) => {
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
      player.runCommandAsync(`tag @s[scores={money=${dataCost}..}] add canBuy`);
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
}

function getScore(entity, objective) {
  try {
    return world.scoreboard.getObjective(objective).getScore(entity.scoreboard);
  } catch (error) {
    return 0;
  }
}
