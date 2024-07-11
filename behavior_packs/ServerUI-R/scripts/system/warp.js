import { world, system } from "@minecraft/server" 
import { ActionFormData, ModalFormData, MessageFormData } from '@minecraft/server-ui'
import { enables } from "../config.js";

export function Warp(player){
    if (enables.get("warp") === 1) {
    player.sendMessage("§cFitur Dinonaktifkan oleh administrator!")
    return;
    } else {
    let actionForm = new ActionFormData()
    .title("§l§bWarp§fUI")
    .body(`§l§a➜ §bHello §r${player.name}`)
    let warps = []
    for (let warp of world.scoreboard.getObjective("warps:data").getParticipants()){
        warp = JSON.parse(warp.displayName.replaceAll("\\", ""))
        if(!warp?.name || !warp?.x.toString() || !warp?.y.toString() || !warp?.z.toString() || !warp?.dimension) continue 
        actionForm.button(`§b§l${warp.name}§r\n§7Click to teleport`,`textures/ui/world_glyph_color_2x`)
        warps.push(warp)
    }
    actionForm.button("§l§cEXIT","textures/ui/cancel")
    actionForm.show(player).then((res) => {
    
    const x = warps[res.selection].x
    const y = warps[res.selection].y
    const z = warps[res.selection].z
    
        if (res.canceled) return player.sendMessage(`§cCanceled Warp Teleport!§r`)

        player.teleport(
          { x: x, y: y, z: z },
          { dimension: world.getDimension(warps[res.selection].dimension) }
        );
        player.sendMessage(`§l§2➜§r §aYou have been teleported!...`)
    })
  }
}