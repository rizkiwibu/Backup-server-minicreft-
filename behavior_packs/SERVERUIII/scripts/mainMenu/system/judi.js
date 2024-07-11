import { world, system, Player } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("judi")) {
      judi(player)
      player.removeTag("judi")
    }
  }
});

function judi(player) {
  const ui = new ActionFormData()
  
  ui.title("§aJUDI HAROM")
  ui.body("§l      --------------------      \n§e             JUDI HAROM       \n§r§l      --------------------      \n§rMengapa Kalian Berjudi:( kalian Tidak Pantas Di Tiru!\n       §l§e       JUDI HAROM    ")
  ui.button("[ §lTARUHAN JUDI§r ]\n10k Click to play", "textures/ui/icon_deals.png") //0
  ui.button("[ §lLIST HADIAH JUDI§r ]\nClick to Open", "textures/ui/icon_cookie.png")
  ui.button("§l§cCLOSE", "textures/ui/cancel.png") //1
  ui.show(player).then((res) => {
    
    if (res.selection === 0) {
      player.runCommandAsync('tellraw @s[scores={money=..9999}] {"rawtext":[{"text":"§cTcihh Mendokseyy Duit lu kurangg Mangkanya Jangan Judi "}]}');
      player.runCommandAsync('playsound mob.villager.no @s[scores={money=..9999}]');
      player.runCommandAsync('tellraw @s[scores={money=10000..}] {"rawtext":[{"text":"§aJudi Sedang Berputar..."}]}');
      player.runCommandAsync('tag @s[scores={money=10000..}] add haram');
      player.runCommandAsync('playsound mob.villager.yes @s[scores={money=10000..}]');
      player.runCommandAsync('scoreboard Players remove @s[scores={money=10000..}] money 10000');
      player.runCommandAsync('setblock -101046.70 105.00 -119813.56 redstone_block');
    }
    
    if (res.selection === 1) {
      listh(player);
    }
  });
}

function listh(player) {
  const ui = new ActionFormData();

  ui.title("List Hadiah");
  ui.body("§l      --------------------      \n§e             LIST HADIAH       \n§r§l      --------------------      §r\n»» Money 5K\n»» Money 10k\n»» Money 15k\n»» Zonk\nSemoga Hoki ya Dan Jangan Terlalu Berlebihan Takut nya Kamu Ketagihan nanti admin yang pusing :(");
  ui.button("§l§cCLOSE", "textures/ui/cancel.png");

  return ui.show(player);
}