import { world, system } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("list")) {
      list(player);
      player.runCommandAsync("tag @s remove list");
    }
  }
});





//CONFIGURATION ALL TEXT HERE!

const title = '------------------------------\n§bWelcome To Nama Server\n§rSaya Berharap Kalian Betah Ya\nTolong Jangan Langgar Rules Kami\nPatuhi semua Rules Yang Ada\n~ \n\n-------------------------------'



const abouts = "hallo selamat datang di server kami semoga kamu betah ya\njika ingin server ini terus berkembang kamu bisa membeli rank atau donate kepada owner,terimakasih!"

const staffs = 'owner:Nama\nadmin:Nama'

const event = "Mau Download Mapnya?, Masuk Discord Yang Ada Di Deskripsi YouTube"






















































export function list(player) {
  const form = new ActionFormData()
  
  form.title("§bServer Information")
  form.body(`${title}`)
  form.button("§b§lAbout§r\n§rClick to open information", "textures/items/book_writable.png")
  form.button("§b§lStaff§r\n§rClick to open", "textures/ui/icon_best3.png")
  form.button("§b§lTentang Tempest§r\n§7Click to open", "textures/ui/world_glyph_color.png")
  form.button("§c§lExit§r", "textures/ui/icon_import.png")
  form.show(player).then(result => {
    if (result.selection === 0) {
    Abouts(player);
  }
   if (result.selection === 1) {
   Staff(player);
  }
   if (result.selection === 2) {
    Events(player);
  }
    if (result.selection === 4) {}
 });
}

function Abouts(player) {
  const form = new ActionFormData()
  .title("About Server")
  .body(`${abouts}`)
  .button("Close", "textures/ui/cancel")
  form.show(player).then(result => {
    if (result.selection === 0) {
      list(player)
      }
  })
}

function Votes(player) {
  const form = new ActionFormData()
  .title("About Server")
  .body(`${votes}`)
  .button("Close", "textures/ui/cancel")
  form.show(player).then(result => {
    if (result.selection === 0) {
      list(player)
    }
  })
}

function Staff(player) {
  const form = new ActionFormData()
  .title("Staff Server")
  .body(`${staffs}`)
  .button("Close", "textures/ui/cancel")
  form.show(player).then(result => {
    if (result.selection === 0) {
      list(player)
    }
  })
}

function Events(player) {
  const form = new ActionFormData()
  .title("About Server")
  .body(`${event}`)
  .button("Close", "textures/ui/cancel")
  form.show(player).then(result => {
    if (result.selection === 0) {
      list(player)
    }
  })
}