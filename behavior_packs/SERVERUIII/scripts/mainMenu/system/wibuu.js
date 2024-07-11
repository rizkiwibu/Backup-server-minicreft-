import { world, Player } from "@minecraft/server"; 
import * as ui from '@minecraft/server-ui';

function TpaSystem(player) {
  let fm = new ui.ModalFormData();
  let players = world.getPlayers(); 
  let operations = [];
  let playerObjects = [];
  for (let player of players) {
    operations.push(player.name);
    playerObjects.push(player);
  }
  fm.title("§y§rTPA");
  fm.dropdown("choose who you want to visit", operations);
  fm.toggle("toggle when the button is off then you will tpa to the person you selected if the button on will be you ask that person to come to you");
  fm.show(player).then(response => {
    let fm = new ui.MessageFormData();
    let target = playerObjects[response.formValues[0]];
    let tpHere = response.formValues[1];
    if (tpHere) {
      fm.body(`§e§l                              TPA\n§r§e${player.name} §fwant you to tpa to that §eperson`);
    } else {
      fm.body(`§e${player.name} §fwant tpa to §eyou`);
    }
    fm.button1(`terima`);
    fm.button2(`tolak`);
    player.sendMessage(`§e§l➥ §r you sent a message to §e${target.name}`);
    fm.show(target).then(response => {
      if (response.selection != 0) return player.sendMessage("§c§l➥§r fail for §cTPA ");
      player.sendMessage("§l§a➥ §fyou managed to do the §aTPA");
      if (tpHere) {
        player.runCommandAsync(`tp "${target.name}" "${player.name}"`);
        player.runCommandAsync(`playsound mob.endermen.portal "${player.name}"`);
        player.runCommandAsync(`playsound mob.endermen.portal "${target.name}"`);
      } else {
        player.runCommandAsync(`tp "${player.name}" "${target.name}"`);
        player.runCommandAsync(`playsound mob.endermen.portal "${player.name}"`);
        player.runCommandAsync(`playsound mob.endermen.portal "${target.name}"`);
      }
    });
  });
}

export { TpaSystem };