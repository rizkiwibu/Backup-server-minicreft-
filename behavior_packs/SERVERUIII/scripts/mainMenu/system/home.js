import { world } from "@minecraft/server";
import * as ui from '@minecraft/server-ui';

// Home max count Configuration
const isVip = 4;
const isVip1 = 5;
const isMvp = 6;
const isMvp1 = 7;
const isMvp2 = 9;
const isDefault = 2;

// HomeTag configuration
const vip = 'hVip';
const vip1 = 'hVip1';
const mvp = 'hMvp';
const mvp1 = 'hMvp1';
const mvp2 = 'hMvp2';

export function HomeSystem(player) {
    let tags = player.getTags();
    let fm = new ui.ActionFormData();
    fm.title("§y§r§bHome System");
    fm.body("➠ Ayo Sethome Terlebih Dahulu");
    fm.button('Create Home\n§0Click To Open', 'textures/ui/store_home_icon.png');
    fm.button('Remove Home\n§0Click To Open', 'textures/ui/icon_trash.png');
    for (let i in tags) {
        if (tags[i].startsWith('{"Home":{')) {
            let homeData = JSON.parse(tags[i]);
            let homeName = homeData['Home']['Name'];
            let homePos = homeData['Home']['Pos'];
            fm.button(`§a ${homeName}\n§0Click To Teleport`);
        }
    }

    fm.show(player).then(response => {
        if (!response || response.isCanceled) { return; }
        if (response.selection == 0) {
            if (player.dimension != world.getDimension("overworld")) {
                player.runCommandAsync(`playsound note.pling "${player.name}"`);
                player.sendMessage(`>> §cRumah Anda hanya dapat membuat di dunia luar`);
                return;
            }
            else {
                let fm = new ui.ModalFormData();
                fm.title("§y§rSistem Home");
                fm.textField("masukan nama rumah", "Contoh : Rumah saya");
                fm.show(player).then(response => {
                    let homes = getHomes(player);

                    // Menghapus kode validasi jumlah rumah untuk setiap tag karena belum diimplementasikan.

                    if (!response || response.isCanceled) { return; }
                    if (response.formValues[0] == "") {
                        player.runCommandAsync(`playsound note.pling "${player.name}"`);
                        player.sendMessage(`>> §cTolong isi semua data!`);
                        return;
                    }
                    if (homes["Homes"].includes(response.formValues[0])) {
                        player.runCommandAsync(`playsound note.pling "${player.name}"`);
                        player.sendMessage(`>> §ckamu telah diberi nama §e${response.formValues[0]} §cJarak dari rumah anda`);
                        return;
                    }
                    let pos = player.location;
                    let jsonDB = {
                        'Home': {
                            'Name': response.formValues[0],
                            'Pos': `${Math.floor(pos.x)} ${Math.floor(pos.y)} ${Math.floor(pos.z)}`
                        }
                    };
                    player.addTag(JSON.stringify(jsonDB));
                    player.runCommandAsync(`playsound random.orb "${player.name}"`);
                    player.sendMessage(`>> §aBerhasil menetapkan rumah §b${response.formValues[0]}`);

                });
            }
        }
        else if (response.selection == 1) {
            let fm = new ui.ModalFormData();
            let homes = getHomes(player);
            fm.title("Sistem Home");
            fm.dropdown("memilih untuk Hapus Rumah", homes['Homes']);
            if (!homes['Homes'].length) {
                player.sendMessage(`>> §cAnda tidak mengatur apapun `);
                return;
            }
            fm.show(player).then(response => {
                if (!response || response.isCanceled) { return; }
                let findJsonDB = {
                    'Home': {
                        'Name': homes['Homes'][response.formValues[0]],
                        'Pos': homes['Pos'][response.formValues[0]]
                    }
                };
                player.removeTag(JSON.stringify(findJsonDB));
                player.runCommandAsync(`playsound random.orb "${player.name}"`);
                player.sendMessage(`>> §eBerhasil menghapus poin rumah §b${homes['Homes'][response.formValues[0]]}`);
            });
        }
        else {
            let homes = getHomes(player);
            player.runCommandAsync(`tp "${player.name}" ${homes['Pos'][response.selection - 2]}`);
            player.runCommandAsync(`playsound random.orb "${player.name}"`);
            player.sendMessage(`>> §aDikirim ke titik rumah §b${homes['Homes'][response.selection - 2]}`);
        }
    });
}

function getHomes(player) {
    let tags = player.getTags();
    let homes = { "Homes": [], "Pos": [] };
    for (let i in tags) {
        if (tags[i].startsWith('{"Home":{')) {
            let homeData = JSON.parse(tags[i]);
            homes["Homes"].push(homeData['Home']['Name']);
            homes["Pos"].push(homeData['Home']['Pos']);
        }
    }
    return homes;
}