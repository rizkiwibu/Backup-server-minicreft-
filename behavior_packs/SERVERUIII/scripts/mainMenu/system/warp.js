import { world, system } from "@minecraft/server"
import { ActionFormData, ModalFormData , MessageFormData} from '@minecraft/server-ui'

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("w:setting")) {
      setting(player);
      player.runCommandAsync(`tag @s remove w:setting`);
    }
  }
});
system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("warps")) {
      Warp(player);
      player.runCommandAsync(`tag @s remove warps`);
    }
  }
});
function setting(player) {
       let g = new ActionFormData()
        .title("§y§rWarp Settings")
        .body("")
        .button("Create warp", "textures/ui/color_plus")
        .button("Edit Warp", "textures/ui/debug_glyph_color")
        .button("Remove warp", "textures/ui/trash.png")
        .show(player).then((res) => {
            if(res.selection == 0){
              a(player);
            }
            if(res.selection == 1){
              e(player);
            }
            if(res.selection == 2){
              r(player);
            }
        })}
            function a(player) {
                let a = new ModalFormData()
                .title("§y§rCreate Warp")
                .textField("Nama Warp", "")
                .textField("Nama bawah", ``,`Click to teleport`)
                .textField("Cordinat", ``,`${Math.round(player.location.x)} ${Math.round(player.location.y)} ${Math.round(player.location.z)}`)
                .textField("Texture", ``,`textures/ui/World`)
                .show(player).then((res) => {
                    if(res.canceled) return settings(player)                	
                    if(!res.formValues[0] || !res.formValues[1] || !res.formValues[2] || !res.formValues[3]) return player.sendMessage(`§7[§eWARP§7]§e Bạn cần phải điền vào tất cả mọi thứ những gì được yêu cầu`)
                    res.formValues[0] = res.formValues[0].replace('"', "'")
                    player.runCommandAsync(`scoreboard players set "{\\"toado\\": \\"${res.formValues[2]}\\", \\"anh\\": \\"${res.formValues[3]}\\", \\"dimension\\": \\"${res.formValues[1]}\\", \\"name\\": \\"${res.formValues[0]}\\"}" warps:data 1`)
                    player.sendMessage(`§7[§eWARP§7]§a đã tạo warp thành công\n§7* Tên: ${res.formValues[0]}\n§7* Ghi chú: ${res.formValues[1]}\n§7* Ảnh Minh họa: ${res.formValues[3]}\n* Tọa Độ: ${res.formValues[2]}`)
                })}

            function r(player) {
                let actionForm = new ActionFormData()
                .title("§y§rRemove Warp")
                let warps = []
                for(let warpo of world.scoreboard.getObjective("warps:data").getParticipants()){
                    let warp = JSON.parse(warpo.displayName.replaceAll("\\", ""))
                    warp.data = warpo.displayName
                    if(!warp?.name || !warp?.dimension || !warp?.anh || !warp?.toado) continue
                    actionForm.button(`§r${warp.name}§r\n${warp.dimension}`,`${warp.anh}`)
                    warps.push(warp)
                }
                actionForm.show(player).then((res) => {
                	if(res.canceled) return settings(player)
                    warps = warps[res.selection]
                    new MessageFormData()
                    .title(`§y§rRemove Warp`)
                    .body(`Apakag Kamu ingin Menghapus Warp?`)
                    .button1("Batal")
                    .button2("Hapus")
                    .show(player).then((res) => {
                    	if(res.canceled) return r(player)
                        if(res.selection == 1){
                            player.runCommandAsync(`scoreboard players reset "${warps.data}" warps:data`)
                            return player.sendMessage(`§7[§eWARP§7]§r§e đã xóa warp!`)
                        }else{
                            return player.sendMessage(`§7[§eWARP§7]§b hủy xóa warp: "${warps.name}"!§r`)
                        }
                    })
                })
            }
            
            function e(player) {
                let actionForm = new ActionFormData()
                .title("§y§rEdit Warp")
                let warps = []
                for(let warpo of world.scoreboard.getObjective("warps:data").getParticipants()){
                    let warp = JSON.parse(warpo.displayName.replaceAll("\\", ""))
                    warp.data = warpo.displayName
                    if(!warp?.name || !warp?.dimension || !warp?.anh || !warp?.toado) continue
                    actionForm.button(`§r${warp.name}§r\n${warp.dimension}`,`${warp.anh}`)
                    warps.push(warp)
                }
                actionForm.show(player).then((res) => {
                if(res.canceled) return settings(player)
                warps = warps[res.selection]
                new ModalFormData()
                .title("Edit Warp")
                .textField("Tên Warp", ``,`${warps.name}`)
                .textField("Ghi chú", ``,`${warps.dimension}`)
                .textField("Tọa độ", ``,`${warps.toado}`)
                .textField("Ảnh Minh họa", ``,`${warps.anh}`)
                .show(player).then((res) => {
                	if(res.canceled) return e(player)
                    if(!res.formValues[0] || !res.formValues[1] || !res.formValues[2] || !res.formValues[3]) return player.sendMessage(`§7[§eWARP§7]§e Bạn cần phải điền vào tất cả mọi thứ những gì được yêu cầu`)
                    try {
                    player.runCommandAsync(`scoreboard players reset "${warps.data}" warps:data`)
                    player.runCommandAsync(`scoreboard players set "{\\"toado\\": \\"${res.formValues[2]}\\", \\"anh\\": \\"${res.formValues[3]}\\", \\"dimension\\": \\"${res.formValues[1]}\\", \\"name\\": \\"${res.formValues[0]}\\"}" warps:data 1`)
                    player.sendMessage(`§7[§eWARP§7]§a đã chỉnh sửa warp thành công\n§7* Tên: ${res.formValues[0]}\n§7* Ghi chú: ${res.formValues[1]}\n§7* Ảnh Minh họa: ${res.formValues[3]}\n* Tọa Độ: ${res.formValues[2]}`)
                    } catch (e) {
                    	player.sendMessage(`§cerror, 404`)
                        }
                    })
                })
            }
            
            
  function Warp(player){
    let actionForm = new ActionFormData()
    .title("§y§r§bWARP UI")
    .body(``)
    let warps = []
    for(let warp of world.scoreboard.getObjective("warps:data").getParticipants()){
        warp = JSON.parse(warp.displayName.replaceAll("\\", ""))
        if(!warp?.name || !warp?.dimension || !warp?.anh || !warp?.toado) continue
        actionForm.button(`${warp.name}§r\n${warp.dimension}`,`${warp.anh}`)
        warps.push(warp)
    }
    actionForm.show(player).then((res) => {
        player.runCommandAsync(`tp "${player.name}" ${warps[res.selection].toado}`)
    })
}

world.afterEvents.playerSpawn.subscribe((eventData) => {
  let { player, initialSpawn } = eventData;
  if (!initialSpawn) return;
  try {
    world.scoreboard.addObjective("warps:data", "Warps Data");
  } catch {}
});