import { system, world, Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { chatFormat, specialLevelMappings, levelUpMsg, prefix, chanceXp } from "../config.js";
import { getRank } from "../lib/game.js";
import { enables, chatCD } from "../config.js";

export function mainLevel(player) {
   if (enables.get("level") === 1) {
    player.sendMessage("§cFitur Dinonaktifkan oleh administrator!")
    return;
  } else {

   const ui = new ActionFormData()
   
   const level = player.level;
   const max = player.totalXpNeededForNextLevel;
   const exp = player.xpEarnedAtCurrentLevel;
  
   ui.title('Leveling System')
   ui.body(`Level anda saat ini adalah:\n§aLv.${level} (${exp}/${max})\n\n`)
   ui.button('Leaderboard', 'textures/ui/icon_best3')
   ui.button('Close', 'textures/blocks/barrier')
   ui.show(player).then((response) => {
   
     if (response.selection === 0) {
        leaderboard(player)
     }
     
     if (response.selection === 1) {}
   })
  }
}

function leaderboard(player) {

     const lb = new ActionFormData()
     let players = world.getPlayers()
     
     lb.title('Level Leaderboard')
     for (let i = 0; i < Math.min(players.length, 10); i++) {
        const playerName = players[i].name;
        const playerLevel = players[i].level;
        lb.body(`${i + 1}. ${playerName}: §aLv.${playerLevel}\n`);
    }
     lb.button('Back', 'textures/blocks/barrier')
     lb.show(player).then((result) => {
      
       if (result.canceled) { 
          leaderboard(player)
     }
     
       if (result.selection === 0) {
          mainLevel(player)
     }
  });
}

export function addXp(player) {
    const randomChance = Math.floor(Math.random() * 100) + 1;
    const chance = chanceXp
    
    if (randomChance <= chance) {
        player.addExperience(1);
    }
}

system.runInterval(() => {
  for (let player of world.getPlayers()) {
     const level = player.level;
    const max = player.totalXpNeededForNextLevel;
    const exp = player.xpEarnedAtCurrentLevel;
    
    if (exp >= max-2) {
        player.runCommandAsync(`scoreboard players set @s level ${level+1}`)
        player.sendMessage(levelUpMsg.replace("%level%", player.level+1))
        player.playSound('random.levelup');
        player.addExperience(max - exp + 1);

        const specialLevelData = specialLevelMappings[player.level];
        if (!specialLevelData || specialLevelData.text === "") return;
        
        player.sendMessage(specialLevelData.text);

        if (specialLevelData.handler !== []) {
            player.runCommandAsync(`${specialLevelData.handler}`);
        }
    }
  }
});


world.afterEvents.playerBreakBlock.subscribe(({ player, block, brokenBlockPermutation }) => {
    addXp(player);
});

world.afterEvents.playerPlaceBlock.subscribe(({ player, block }) => {
    addXp(player);
});

world.afterEvents.chatSend.subscribe(data => {
    const { sender, message } = data;
    addXp(sender);
});

class CommandCooldown {
  constructor() {
    this.cooldowns = new Map();
    this.defaultCooldown = chatCD * 1000;
  }

  setCooldown(playerId, cooldownTime = this.defaultCooldown) {
    const expireTime = Date.now() + cooldownTime;
    this.cooldowns.set(playerId, expireTime);
  }

  isOnCooldown(playerId) {
    const expireTime = this.cooldowns.get(playerId);
    if (!expireTime) return false;
    if (Date.now() > expireTime) {
      this.cooldowns.delete(playerId);
      return false;
    }
    return true;
  }

  getCooldownTime(playerId) {
    const expireTime = this.cooldowns.get(playerId);
    if (!expireTime) return 0;
    return expireTime - Date.now();
  }

  clearCooldown(playerId) {
    this.cooldowns.delete(playerId);
  }
}

const commandCooldown = new CommandCooldown();

world.beforeEvents.chatSend.subscribe(data => {
  try {
    const playerId = data.sender.id;
    if (commandCooldown.isOnCooldown(playerId)) {
      data.cancel = true;
      const remainingTime = commandCooldown.getCooldownTime(playerId);
      data.sender.sendMessage(`§cPlease wait §g${remainingTime / 1000} §cseconds before sending another message.`);
      return;
    }

    data.cancel = true;

    let playerGuild =
        data.sender
          .getTags()
          .find((tag) => tag.startsWith('Guild-'))
          ?.substring(6) ?? ``;
    
    const format = chatFormat
        .replace("%level%", getLevel(data.sender))
        .replace("%title%", getRank(data.sender))
        .replace("%player%", data.sender.name)
        .replace("%msg%", data.message)
        .replace("%clan%", playerGuild);
        
    world.getDimension("overworld").runCommandAsync(`tellraw @a {"rawtext":[{"text":"${format}"}]}`);
    
    commandCooldown.setCooldown(playerId);
  } catch (error) {
    console.warn("NAKATA: ", error);
  }
});

function getLevel(player) {

        let result = "";
        let level = player.level;

        if (level >= 0) {
            result = "§f" + level;
        }
        if (level >= 5) {
            result = "§7" + level;
        }
        if (level >= 10) {
            result = "§8" + level;
        }
        if (level >= 15) {
            result = "§e" + level;
        }
        if (level >= 20) {
            result = "§6" + level;
        }
        if (level >= 30) {
            result = "§b" + level;
        }
        if (level >= 40) {
            result = "§d" + level;
        }
        if (level >= 50) {
            result = "§5" + level;
        }
        if (level >= 60) {
            result = "§a" + level;
        }
        if (level >= 70) {
            result = "§2" + level;
        }
        if (level >= 80) {
            result = "§c" + level;
        }
        if (level >= 90) {
            result = "§9" + level;
        }
        if (level >= 100) {
            result = "§1" + level;
        }
        if (level >= 120) {
            result = "§4" + level;
        }
        if (level >= 140) {
            result = "§3" + level;
        }
        if (level >= 160) {
            result = "§0" + level;
        }
        if (level >= 180) {
            result = "§l§f" + level;
        }
        if (level >= 200) {
            result = "§l§7" + level;
        }
        if (level >= 220) {
            result = "§l§8" + level;
        }
        if (level >= 240) {
            result = "§l§e" + level;
        }
        if (level >= 260) {
            result = "§l§6" + level;
        }
        if (level >= 280) {
            result = "§l§b" + level;
        }
        if (level >= 300) {
            result = "§l§d" + level;
        }
        if (level >= 325) {
            result = "§l§5" + level;
        }
        if (level >= 350) {
            result = "§l§a" + level;
        }
        if (level >= 400) {
            result = "§l§2" + level;
        }
        if (level >= 450) {
            result = "§l§c" + level;
        }
        if (level >= 500) {
            result = "§l§9" + level;
        }
        if (level >= 550) {
            result = "§l§1" + level;
        }
        if (level >= 600) {
            result = "§l§4" + level;
        }
        if (level >= 750) {
            result = "§l§3" + level;
        }
        if (level >= 800) {
            result = "§l§0" + level;
        }
        if (level >= 850) {
            result = "§o§f" + level;
        }
        if (level >= 900) {
            result = "§o§7" + level;
        }
        if (level >= 950) {
            result = "§o§8" + level;
        }
        if (level >= 1000) {
            result = "§o§e" + level;
        }
        if (level >= 1050) {
            result = "§o§6" + level;
        }
        if (level >= 1125) {
            result = "§o§b" + level;
        }
        if (level >= 1200) {
            result = "§o§d" + level;
        }
        if (level >= 1275) {
            result = "§o§5" + level;
        }
        if (level >= 1350) {
            result = "§o§a" + level;
        }
        if (level >= 1425) {
            result = "§o§2" + level;
        }
        if (level >= 1500) {
            result = "§o§c" + level;
        }
        if (level >= 1600) {
            result = "§o§9" + level;
        }
        if (level >= 1700) {
            result = "§o§1" + level;
        }
        if (level >= 1800) {
            result = "§o§4" + level;
        }
        if (level >= 1900) {
            result = "§o§3" + level;
        }
        if (level >= 2000) {
            result = "§o§0" + level;
        }
        return result;
  }
  
  function getProgress(progress, size) {
    const fixedSize = 20;
    let percentage = ((progress / size) * 100).toFixed(2);

    percentage = Math.min(percentage, 100);

    const progressChars = Math.min(Math.ceil((percentage / 100) * fixedSize), fixedSize);

    return `§7[${"§a|".repeat(progressChars)}${"§7|".repeat(fixedSize - progressChars)}] §b${percentage} %%`;
}