import { world } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"
import { system } from "@minecraft/server";

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("cw")) {
      Wing(player);
      player.runCommandAsync(`tag @s remove cw`);
    }
  }
});

   export function Wing(player) {
    const form = new ActionFormData()
       form.title("§y§r§bWINGS")
        form.body("§eHi, Select Your Wing:")
        if (!player.hasTag("lightning")) {
        form.button('§cLocked', 'textures/ui/icon_lock')
        } else { form.button('§l§dLIGHTNING WING \n§r§rSelect to equip','textures/ui/1')
        }
         if (!player.hasTag("ice")) {
        form.button('§cLocked', 'textures/ui/icon_lock')
         } else { form.button('§l§bICE WING \n§r§rSelect to equip','textures/ui/2')
         }
         if (!player.hasTag("fire")) {
        form.button('§cLocked', 'textures/ui/icon_lock')
         } else { form.button('§l§cFIRE WING \n§r§rSelect to equip','textures/ui/3')
         }
         if (!player.hasTag("poison")) {
        form.button('§cLocked', 'textures/ui/icon_lock')
         } else { form.button('§l§aPOISON WING \n§rSelect to equip','textures/ui/4')
         }
         if (!player.hasTag("griffin")) {
        form.button('§cLocked', 'textures/ui/icon_lock')
         } else { form.button('§l§7GRIFFIN WING \n§r§rSelect to equip','textures/ui/5')
         }
         if (!player.hasTag("abyssal")) {
        form.button('§cLocked', 'textures/ui/icon_lock')
         } else { form.button('§l§eABYSSAL WING \n§r§rSelect to equip','textures/ui/6')
         }
         if (!player.hasTag("red")) {
        form.button('§cLocked', 'textures/ui/icon_lock')
         } else { form.button('§l§cRED WING \n§r§rSelect to equip','textures/ui/7')
         }
         if (!player.hasTag("black")) {
        form.button('§cLocked', 'textures/ui/icon_lock')
         } else { form.button('§lBLACK WING \n§r§rSelect to equip','textures/ui/8')
         }
         if (!player.hasTag("white")) {
        form.button('§cLocked', 'textures/ui/icon_lock')
         } else { form.button('§l§fWHITE WING \n§r§rSelect to equip','textures/ui/9')
         }
        form.button('§lReset Skin\n§r§rClick to reset','textures/ui/refresh_light')
        form.button('§lClose\n§r§rClick to close','textures/ui/redX1')
          form.show(player).then(result => {
      if (result.selection === 0) {
        if (player.hasTag("lightning")) {
        player.runCommandAsync(`event entity @s ck:wing_4`)
        player.runCommandAsync(`playsound random.levelup @s`) 
        player.sendMessage(`§aWing successfully used`)
        } else {
        player.runCommandAsync(`playsound note.bass @s`)
        Fail(player);
        }
       }
      if (result.selection === 1) {
        if (player.hasTag("ice")) {
          player.runCommandAsync(`event entity @s ck:wing_3`)
      	  player.runCommandAsync(`playsound random.levelup @s`) 
      	  player.sendMessage(`§aWing successfully used`)
        } else {
        player.runCommandAsync(`playsound note.bass @s`)
        Fail(player);
        }
      }
      if (result.selection === 2) {
        if (player.hasTag("fire")) {
        player.runCommandAsync(`event entity @s ck:wing_2`)
        player.runCommandAsync(`playsound random.levelup @s`) 
        player.sendMessage(`§aWing successfully used`)
        } else {
        player.runCommandAsync(`playsound note.bass @s`)
        Fail(player);
        }
      }
      if (result.selection === 3) {
        if (player.hasTag("poison")) {
        player.runCommandAsync(`event entity @s ck:wing_5`)
        player.runCommandAsync(`playsound random.levelup @s`) 
        player.sendMessage(`§aWing successfully used`)
        } else {
        player.runCommandAsync(`playsound note.bass @s`)
        Fail(player);
        }
      }
      if (result.selection === 4) {
        if (player.hasTag("griffin")) {
        player.runCommandAsync(`event entity @s ck:wing_9`)
        player.runCommandAsync(`playsound random.levelup @s`) 
        player.sendMessage(`§aWing successfully used`)
        } else {
        player.runCommandAsync(`playsound note.bass @s`)
        Fail(player);
        }
      }
      if (result.selection === 5) {
        if (player.hasTag("abyssal")) {
      	player.runCommandAsync(`event entity @s ck:wing_1`)
      	player.runCommandAsync(`playsound random.levelup @s`) 
      	player.sendMessage(`§aWing successfully used`)
        } else {
        player.runCommandAsync(`playsound note.bass @s`)
        Fail(player);
        }
      }
      if (result.selection === 6) {
        if (player.hasTag("red")) {
    	player.runCommandAsync(`event entity @s ck:wing_8`)
    	player.runCommandAsync(`playsound random.levelup @s`);
    	player.sendMessage(`§aWing successfully used`)
        } else {
        player.runCommandAsync(`playsound note.bass @s`)
        Fail(player);
        }
      }
      if (result.selection === 7) {
        if (player.hasTag("black")) {
    	player.runCommandAsync(`event entity @s ck:wing_7`)
    	player.runCommandAsync(`playsound random.levelup @s`) 
    	player.sendMessage(`§aWing successfully used`)
    	 }else{
      player.runCommandAsync(`playsound note.bass @s`)
        Fail(player);
    	 }
      }
      if (result.selection === 8) {
        if (player.hasTag("white")) {
        player.runCommandAsync(`event entity @s ck:wing_6`)
        player.runCommandAsync(`playsound random.levelup @s`)
        player.sendMessage(`§aWing successfully used`)
        } else {
        player.runCommandAsync(`playsound note.bass @s`)
        Fail(player);
        }
      }
      if (result.selection === 9) {
      	Reset(player);
      }
      if (result.selection === 10) {
      	player.runCommandAsync(`playsound note.bass @s`);
      } 
  })
 }
      
      
function Reset(player) {
  const form = new ActionFormData()
       form.title("§y§r§cReset")
        form.button('§lReset\n§rClick To Reset','textures/ui/check')
        form.button('§l§cBACK\n§r§rClick To Back','textures/ui/redX1')
          form.show(player).then(result => {
     if (result.selection === 0) {
      	player.runCommandAsync(`event entity @s ck:wing_remove`)
         player.runCommandAsync(`playsound mob.zombie.unfect @s`);
      }
      if (result.selection === 1) {
      	Wing(player);
      }
})}


  function Fail(player) {
  const form = new ActionFormData()
       form.title("§y§r§c! Eror !")
        form.button('§lFailed\n§ryou dont have permission','textures/ui/lock_color')
        form.button('§l§cBACK\n§r§rSelect to equip','textures/ui/redX1')
          form.show(player).then(result => {
      if (result.selection === 1) {
      	Wing(player);
      }
})}