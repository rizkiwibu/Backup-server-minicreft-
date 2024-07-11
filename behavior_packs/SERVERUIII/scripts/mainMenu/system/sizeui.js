import { world } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import { MessageFormData } from "@minecraft/server-ui"
import { system } from "@minecraft/server";

system.runInterval(() => {
     for (let player of world.getPlayers()) {
          if (player.hasTag("sizeui")) {
               sizeUI(player);
               player.removeTag(`sizeui`) 
             }
         }
      });
        
export function sizeUI(player) {
     const form = new ActionFormData()
     .title("§lSIZE UI")
     .button("§l§cEXIT\n§r§8§oClick To Exit", "textures/ui/redX1")
     .button("§lRESET SKIN\n§r§8§oClick To Reset", "textures/ui/refresh_light")
     .button("§lBIG\n§r§8§oClick To View", "textures/ui/icon_spring")
     .button("§lSMALL\n§r§8§oClick To View", "textures/ui/icon_spring")
          form.show(player).then(result => {
      if (result.selection === 1) {
        player.runCommandAsync(`playanimation @s animation.player.bigone I 0`)
        player.runCommandAsync(`playsound random.orb @s`)
        player.sendMessage(`§asucceeded in resetting the skin`)
     }
      if (result.selection === 2) {
        Big(player);
     }
     if (result.selection === 3) {
        Small(player);
     }
})}
function Big(player) {
     const form = new ActionFormData()
     .title("§lSIZE UI")
     .button("§lLEVEL 1\n§r§8§oClick To Resized", "textures/ui/dressing_room_capes.png")
     .button("§lLEVEL 2\n§r§8§oClick To Resized", "textures/ui/dressing_room_capes.png")
     .button("§lLEVEL 3\n§r§8§oClick To Resized", "textures/ui/dressing_room_capes.png")
     .button("§l§cEXIT\n§r§8§oClick To Exit", "textures/ui/redX1")
          form.show(player).then(result => {
      if (result.selection === 0) {
        player.runCommandAsync(`playanimation @s animation.player.bigone I 9999999`)
        player.runCommandAsync(`playsound random.orb @s`)
        player.sendMessage(`§asuccessfully resized`)
     }
     if (result.selection === 1) {
        player.runCommandAsync(`playanimation @s animation.player.bigtwo I 9999999`)
        player.runCommandAsync(`playsound random.orb @s`)
        player.sendMessage(`§asuccessfully resized`)
     }
     if (result.selection === 2) {
        player.runCommandAsync(`playanimation @s animation.player.bigtree I 9999999`)
        player.runCommandAsync(`playsound random.orb @s`)
        player.sendMessage(`§asuccessfully resized`)
     }
})}
function Small(player) {
     const form = new ActionFormData()
     .button("§lLEVEL 1\n§r§8§oClick To Resized", "textures/ui/dressing_room_capes.png")
     .button("§lLEVEL 2\n§r§8§oClick To Resized", "textures/ui/dressing_room_capes.png")
     .button("§lLEVEL 3\n§r§8§oClick To Resized", "textures/ui/dressing_room_capes.png")
     .button("§l§cEXIT\n§r§8§oClick To Exit", "textures/ui/redX1")
          form.show(player).then(result => {
        if (result.selection === 0) {
        player.runCommandAsync(`playanimation @s animation.player.smallone I 9999999`)
        player.runCommandAsync(`playsound random.orb @s`)
        player.sendMessage(`§asuccessfully resized`)
     }
     if (result.selection === 1) {
        player.runCommandAsync(`playanimation @s animation.player.smalltwo I 9999999`)
        player.runCommandAsync(`playsound random.orb @s`)
        player.sendMessage(`§asuccessfully resized`)
     }
     if (result.selection === 2) {
        player.runCommandAsync(`playanimation @s animation.player.smalltree I 9999999`)
        player.runCommandAsync(`playsound random.orb @s`)
        player.sendMessage(`§asuccessfully resized`)
     }
})}
function setTickTimeout(callback, tick){
    let ticks = 0
    let TickCallBack = world.events.tick.subscribe(() => {
        ticks += 1
        if(ticks == tick){
            callback()
            world.events.tick.unsubscribe(TickCallBack)
        }
    })
}