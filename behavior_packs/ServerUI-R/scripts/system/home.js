import { world, system, Player } from "@minecraft/server";
import * as ui from '@minecraft/server-ui';
import { enables } from "../config.js";

export function HomeSystem(player) {
    if (enables.get("home") === 1) {
    player.sendMessage("§cFitur Dinonaktifkan oleh administrator!")
    return;
  } else {
    let tags = player.getTags()
    let homes = getHomes(player)
    let fm = new ui.ActionFormData();
    fm.title("Home System")
    fm.body(`Home Settings，Rumah Mu sekarang ${homes['Homes'].length}`)
    fm.button('Create Home', 'textures/ui/color_plus.png')
    fm.button('Remove Home', 'textures/ui/icon_trash.png')
    for (let i in tags) {
        if (tags[i].startsWith('{"Home":{')) {
            let homeData = JSON.parse(tags[i])
            let homeName = homeData['Home']['Name']
            let homePos = homeData['Home']['Pos']
            fm.button(`§1${homeName}\n§r§9${homePos}`)
        }
    }

    fm.show(player).then(response => {
        if (response.canceled) { return }
        if (response.selection == 0) {
            if (player.dimension != world.getDimension("overworld")) {
                player.runCommandAsync(`playsound note.pling "${player.name}"`)
                player.sendMessage(`>> §cRumah Anda hanya dapat membuat di dunia luar`)
                return
            }
            else {
                let fm = new ui.ModalFormData()
                fm.title("Sistem Home");
                fm.textField("masukan nama rumah", "Contoh : Rumah saya")
                fm.show(player).then(response => {

                    if (response.canceled) { return }
                    if (response.formValues[0] == "") {
                        player.runCommandAsync(`playsound note.pling "${player.name}"`)
                        player.sendMessage(`>> §cTolong isi semua data!`)
                        return
                    }
                    if (homes["Homes"].includes(response.formValues[0])) {
                        player.runCommandAsync(`playsound note.pling "${player.name}"`)
                        player.sendMessage(`>> §ckamu telah diberi nama §e${response.formValues[0]} §cJarak dari rumah anda`)
                        return
                    }
                    let pos = player.location
                    let jsonDB = {
                        'Home': {
                            'Name': response.formValues[0],
                            'Pos': `${Math.floor(pos.x)} ${Math.floor(pos.y)} ${Math.floor(pos.z)}`
                        }
                    }
                    player.addTag(JSON.stringify(jsonDB))
                    player.runCommandAsync(`playsound random.orb "${player.name}"`)
                    player.sendMessage(`>> §aBerhasil menetapkan rumah §b${response.formValues[0]}`)

                })

            }
        }
        else if (response.selection == 1) {
            let fm = new ui.ModalFormData()

            let homes = getHomes(player)

            fm.title("Sistem Home");
            fm.dropdown("memilih untuk Hapus Rumah", homes['Homes'])

            if (!homes['Homes'].length) {
                player.sendMessage(`>> §cAnda tidak mengatur apapun `)
                return
            }

            fm.show(player).then(response => {
                if (response.canceled) { return }
                let findJsonDB = {
                    'Home': {
                        'Name': homes['Homes'][response.formValues[0]],
                        'Pos': homes['Pos'][response.formValues[0]]
                    }
                }
                player.removeTag(JSON.stringify(findJsonDB))
                player.runCommandAsync(`playsound random.orb "${player.name}"`)
                player.sendMessage(`>> §eBerhasil menghapus poin rumah §b${homes['Homes'][response.formValues[0]]}`)

            })
        }
        else {
            let homes = getHomes(player)
            
            player.runCommandAsync(`tp @s ${homes['Pos'][response.selection - 2]}`)
            player.runCommandAsync(`playsound random.orb @s`)
            player.sendMessage(`>> §aDikirim ke rumah §b${homes['Homes'][response.selection - 2]} §aKordinat §b${homes['Pos'][response.selection - 2]}`)
        }
    });
  }
}

function getHomes(player) {
    let tags = player.getTags()
    let homes = { "Homes": [], "Pos": [] }
    for (let i in tags) {
        if (tags[i].startsWith('{"Home":{')) {
            let homeData = JSON.parse(tags[i])
            homes["Homes"].push(homeData['Home']['Name'])
            homes["Pos"].push(homeData['Home']['Pos'])
        }
    }
    return homes
}