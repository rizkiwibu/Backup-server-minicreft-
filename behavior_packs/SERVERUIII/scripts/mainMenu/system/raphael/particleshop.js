import { world, system, Player } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"

system.runInterval(() => {
  for (const player of world.getPlayers({
    tags: ["particle"]
  })) {
    particle(player);
    player.removeTag("particle");
  }
});

function particle(player) {
      const ui = new ActionFormData()
      
      ui.title("§y§r§dParticle Shop")
      ui.body("§l      --------------------      \n§e             PARTICLE SHOP       \n§r§l      --------------------      \n§r§e»» §rSilahkan Pilih Particle yang ingin Kalian Beli!")
      ui.button("§dParticle Ungu\n§0500k Click to Buy", "textures/ui/icon_winter.png")
      ui.button("Particle Putih\n§0500k Click to Buy", "textures/ui/icon_winter.png")
      ui.button("§l§cCLOSE", "textures/ui/cancel.png")
     ui.show(player).then((res) => {
 	
      if (res.selection === 0) {
         player.runCommandAsync('tellraw @s[scores={money=..499999}] {"rawtext":[{"text":"§cMaaf Money Anda Tidak Cukup"}]}');
        player.runCommandAsync('playsound mob.villager.no @s[scores={money=..499999}]');
        player.runCommandAsync('tellraw @s[scores={money=500000..}] {"rawtext":[{"text":"§aBerhasil Membeli Particle"}]}');
        player.runCommandAsync('tag @s[scores={money=500000..}] add ungu');
        player.runCommand('execute at @s[scores={money=500000..}] run particle minecraft:knockback_roar_particle ~~~');
        player.runCommandAsync('playsound random.explode @s[scores={money=500000..}]');
        player.runCommandAsync('scoreboard Players remove @s[scores={money=500000..}] money 500000');
      }
      
      if (res.selection === 1) {
         player.runCommandAsync('tellraw @s[scores={money=..499999}] {"rawtext":[{"text":"§cMaaf Money Anda Tidak Cukup"}]}');
        player.runCommandAsync('playsound mob.villager.no @s[scores={money=..499999}]');
        player.runCommandAsync('tellraw @s[scores={money=500000..}] {"rawtext":[{"text":"§aBerhasil Membeli Particle"}]}');
        player.runCommandAsync('tag @s[scores={money=500000..}] add putih');
        player.runCommand('execute at @s[scores={money=500000..}] run particle minecraft:knockback_roar_particle ~~~');
        player.runCommandAsync('playsound random.explode @s[scores={money=500000..}]');
        player.runCommandAsync('scoreboard Players remove @s[scores={money=500000..}] money 500000');
      }
      	
      if (res.selection === 2) {
         player.runCommandAsync('playsound note.pling @s');
      }
    });
  }