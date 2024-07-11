import { world, Player, system } from "@minecraft/server";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui";

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("dailys")) {
      daily(player);
      player.removeTag("dailys");
    }
  }
});


system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("claimd")) {
      claimDailyReward(player);
      player.removeTag("claimd");
    }
  }
});

//API jika player masuk maka daily 48 dan 72 akan cooldown 
world.afterEvents.playerSpawn.subscribe((eventData) => {
  let { player, initialSpawn } = eventData;
  if (initialSpawn) {
   if (!player.hasTag(`hasd`)) {
   
   
  //48h / 2h
  const daily_rewards_hours = 48;
  const daily_rewards_ms = daily_rewards_hours * 60 * 60 * 1000;
  
  player.addTag(`daily_rewards:${Date.now() + daily_rewards_ms}`);

  //72 / 3h
  const daily_rewardss_hours = 72;
  const daily_rewardss_ms = daily_rewardss_hours * 60 * 60 * 1000;
  
  player.addTag(`daily_rewardss:${Date.now() + daily_rewardss_ms}`);
  
  //add tag if was give tag reward
  player.addTag(`hasd`)
     }
    }
   });




export function claimDailyReward(player) {
  const daily_reward_hours = 24;
  const daily_reward_ms = daily_reward_hours * 60 * 60 * 1000;
  const cooldownTag = player.getTags().find((tag) => tag.startsWith("daily_reward:"));
  const cooldown = cooldownTag ? parseInt(cooldownTag.substring(13)) : 0;

  if (cooldown > Date.now()) {
    player.sendMessage(`§cYou have already claimed your daily reward. Please wait for §e${Math.ceil((cooldown - Date.now()) / 3600000)} hours.`);
    return;
  }

  const isVip = player.hasTag("dvip");
  let rewardMessage = `§7[ §fNormal §7] §fYou got iron_ingot 3\nmoney 1000\nKey 1.`;

  if (isVip) {
    rewardMessage = `§aYou have claimed the daily reward.`;
    player.runCommandAsync(`give @s diamond 3`);
    player.runCommandAsync(`scoreboard players add @s money 1000`);
    player.runCommandAsync(`give @s key:gold_key 0 1`);
    player.sendMessage("§7[ §dDvip §7] §gYou got Diamond 3\nKey 1\nMoney 1000");
  }

  if (cooldownTag) {
    player.removeTag(cooldownTag);
  }

  player.addTag(`daily_reward:${Date.now() + daily_reward_ms}`);
  player.runCommandAsync(`give @s iron_ingot 3`);
  player.runCommandAsync(`scoreboard players add @s money 1000`);
  player.runCommandAsync(`give @s key:gold_key 0 1`)
  player.sendMessage(rewardMessage);
}

export function claimDailyReward2(player) {
  const daily_rewards_hours = 48;
  const daily_rewards_ms = daily_rewards_hours * 60 * 60 * 1000;
  const cooldownsTags = player.getTags().find((tag) => tag.startsWith("daily_rewards:"));
  const cooldowns = cooldownsTags ? parseInt(cooldownsTags.substring(14)) : 0;

  if (cooldowns > Date.now()) {
    player.sendMessage(`§cYou have already claimed your daily reward. Please wait for §e${Math.ceil((cooldowns - Date.now()) / 3600000)} hours.`);
    return;
  }

  const isVip = player.hasTag("dvip");
  let rewardMessage = `§7[ §fNormal §7] §fYou got iron_ingot 6\nmoney 2000\nKey 2.`;

  if (isVip) {
    rewardMessage = `§aYou have claimed the daily reward.`;
    player.runCommandAsync(`give @s diamond 3`);
    player.runCommandAsync(`scoreboard players add @s money 2000`);
  player.runCommandAsync(`give @s key:gold_key 0 2`)
    player.sendMessage("§7[ §dDvip §7] §gYou got Diamond 3\nKey 2\nMoney 2000");
  }

  if (cooldownsTags) {
    player.removeTag(cooldownsTags);
  }

  player.addTag(`daily_rewards:${Date.now() + daily_rewards_ms}`);
  player.runCommandAsync(`give @s iron_ingot 12`);
  player.runCommandAsync(`scoreboard players add @s money 20000`);
  player.runCommandAsync(`give @s mcc:keypoint 0 4`)
  player.sendMessage(rewardMessage);
}

export function claimDailyReward3(player) {
  const daily_rewardss_hours = 72;
  const daily_rewardss_ms = daily_rewardss_hours * 60 * 60 * 1000;
  const cooldownssTagss = player.getTags().find((tag) => tag.startsWith("daily_rewardss:"));
  const cooldownss = cooldownssTagss ? parseInt(cooldownssTagss.substring(15)) : 0;

  if (cooldownss > Date.now()) {
    player.sendMessage(`§cYou have already claimed your daily reward. Please wait for §e${Math.ceil((cooldownss - Date.now()) / 3600000)} hours.`);
    return;
  }

  const isVip = player.hasTag("dvip");
  let rewardMessage = `§7[ §fNormal §7] §fYou got iron_ingot 5\nmoney 2000\nKey 2
1.`;

  if (isVip) {
    rewardMessage = `§aYou have claimed the daily reward.`;
    player.runCommandAsync(`give @s diamond 3`);
    player.runCommandAsync(`scoreboard players add @s money 2000`);
    player.runCommandAsync(`give @s key:gold_key 3`)
    player.sendMessage("§7[ §dDvip §7] §gYou got Diamond 3\nKey 3\nMoney 2000");
  }

  if (cooldownssTagss) {
    player.removeTag(cooldownssTagss);
  }

  player.addTag(`daily_rewardss:${Date.now() + daily_rewardss_ms}`);
  player.runCommandAsync(`give @s iron_ingot 5`);
  player.runCommandAsync(`scoreboard players add @s money 2000`);
  player.runCommandAsync(`give @s key:gold_key 0 1`)
  player.sendMessage(rewardMessage);
}

export async function daily(player) {

   const form = new ActionFormData();
   
  const cooldownTag = player.getTags().find((tag) => tag.startsWith("daily_reward:"));
  const cooldown = cooldownTag ? parseInt(cooldownTag.substring(13)) : 0;

  const cooldownsTags = player.getTags().find((tag) => tag.startsWith("daily_rewards:"));
  const cooldowns = cooldownsTags ? parseInt(cooldownsTags.substring(14)) : 0;

  const cooldownssTagss = player.getTags().find((tag) => tag.startsWith("daily_rewardss:"));
  const cooldownss = cooldownssTagss ? parseInt(cooldownssTagss.substring(15)) : 0;


  // Button 24h
  form.title(`§y§r§bDaily Logins`);
  if (cooldown > Date.now()) {
    form.button(`§4Claimed\n§g${Math.ceil((cooldown - Date.now()) / 3600000)} hours`, `textures/ui/cancel.png`);
  } else {
    form.button(`§aClaim Now!§f\nTap To Claim`, `textures/ui/promo_gift_small_yellow.png`);
  }

  // Button 48h
  if (cooldowns > Date.now()) {
    form.button(`§4Claimed\n§c§g${Math.ceil((cooldowns - Date.now()) / 3600000)} hours`, `textures/ui/cancel.png`);
  } else {
    form.button(`§aClaim Now!§f\nTap To Claim`, `textures/ui/promo_gift_small_green.png`);
  }

  // Button 72h
  if (cooldownss > Date.now()) {
    form.button(`§4Claimed\n§c§g${Math.ceil((cooldownss - Date.now()) / 3600000)} hours`, `textures/ui/cancel.png`);
  } else {
    form.button(`§aClaim Now!§f\nTap To Claim`, `textures/ui/promo_gift_small_blue.png`);
  }

  // Respon terhadap tombolnya
  form.show(player).then(result => {
    // Tombol 1
    if (result.selection === 0) {
     claimDailyReward(player);
  }

    // Tombol 2
    if (result.selection === 1) {
      claimDailyReward2(player);
    }

    // Tombol 3
    if (result.selection === 2) {
      claimDailyReward3(player);
    }
  });
}
