import { world, Player } from "@minecraft/server"; 
import * as ui from '@minecraft/server-ui';
import { enables } from "../config.js";

function TpaSystem(player) {
    if (enables.get("tpa") === 1) {
        player.sendMessage("§cFitur Dinonaktifkan oleh administrator!");
        return;
    }

    const targetInfo = [];
    const tgp = world.getPlayers();
    const fm1 = new ui.ModalFormData();
    const operations = [];

    for (const targetPlayer of tgp) {
        operations.push(targetPlayer.name);
        targetInfo.push(targetPlayer);
    }

    fm1.title("TPA");
    fm1.dropdown("Pilih pemain yang ingin Anda kunjungi", operations);
    fm1.toggle("Toggle: Jika dimatikan, Anda akan tpa ke orang yang Anda pilih. Jika dihidupkan, Anda akan meminta orang tersebut datang kepada Anda.");
    fm1.submitButton('§l§aAccept')
    
    fm1.show(player).then(response => {
        const targetIndex = response.formValues[0];
        const tpHere = response.formValues[1]
        const target = targetInfo[targetIndex];

        const fm2 = new ui.MessageFormData();

        if (!target) {
            player.sendMessage('§cTarget tidak ditemukan!');
            return;
        }

        if (tpHere) {
            fm2.body(`§e§lTPA\n§r§e${player.name} §fmenginginkan Anda untuk tpa kepadanya.`);
        } else {
            fm2.body(`§e${player.name} §fmenginginkan tpa kepada Anda.`);
        }

        fm2.button1(`Setuju`);
        fm2.button2(`Tidak setuju`);
        player.sendMessage(`§e➥ §rAnda mengirim pesan ke §e${target.name}`);
        
        fm2.show(target).then(response => {
            if (response.selection !== 0) {
                player.sendMessage("§cGagal melakukan TPA.");
                return;
            }
            
            player.sendMessage("§aAnda berhasil melakukan TPA.");
            
            if (tpHere === 1) {
                target.runCommandAsync(`tp @s "${player.name}"`);
                target.runCommandAsync(`playsound mob.endermen.portal "${player.name}"`);
                target.runCommandAsync(`playsound mob.endermen.portal @s`);
            } else {
                player.runCommandAsync(`tp @s "${target.name}"`);
                player.runCommandAsync(`playsound mob.endermen.portal @s`);
                player.runCommandAsync(`playsound mob.endermen.portal "${target.name}"`);
            }
        });
    });
}

export { TpaSystem };
