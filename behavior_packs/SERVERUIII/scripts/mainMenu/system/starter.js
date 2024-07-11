import { world, system, Player } from "@minecraft/server"

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("starterget")) {
      starter(player);
      player.removeTag("starterget");
    }
  }
});

export function starter(player) {
  player.runCommandAsync(`replaceitem entity @s[tag=!mkit] slot.armor.head 0 iron_helmet`);
  player.runCommandAsync(`replaceitem entity @s[tag=!mkit] slot.armor.chest 0 iron_chestplate`);
  player.runCommandAsync(`replaceitem entity @s[tag=!mkit] slot.armor.legs 0 iron_leggings`);
  player.runCommandAsync(`replaceitem entity @s[tag=!mkit] slot.armor.feet 0 iron_boots`);
  player.runCommandAsync(`give @s[tag=!mkit] stone_sword`);
  player.runCommandAsync(`give @s[tag=!mkit] stone_axe`);
  player.runCommandAsync(`give @s[tag=!mkit] stone_pickaxe`);
  player.runCommandAsync(`give @s[tag=!mkit] bread 32`);
  player.runCommandAsync(`playsound random.explode @s[tag=!mkit]`);
  player.runCommandAsync(`tellraw @s[tag=mkit] {"rawtext":[{"text":"§c➠ You already claimed starter!"}]}`);
  player.runCommandAsync(`tellraw @s[tag=!mkit] {"rawtext":[{"text":"§a➠ You Have Been Given Starter"}]}`);
  player.runCommandAsync(`tag @s[tag=!mkit] add mkit`);
  player.runCommandAsync('execute at @s[tag=!mkit] run particle minecraft:knockback_roar_particle ~~~');
  player.runCommandAsync('playsound mob.villager.yes @s[tag=!mkit]');
  player.runCommandAsync('playsound mob.villager.no @s[tag=mkit]');
  player.runCommandAsync('tag @s add mkit');
}