import { world, Player, system } from "@minecraft/server";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui";
import { Database } from "../../@modules/Database.js";

const dbRedeem = new Database("redeemDB");
const dbRedeemed = new Database("redeemedDB");
const dbPlayer = new Database("PlayerDB");

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("scode")) {
      setCode(player);
      player.runCommandAsync(`tag @s remove scode`);
    }
  }
});

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("rcode")) {
      redeemCode(player);
      player.runCommandAsync(`tag @s remove rcode`);
    }
  }
}, 20);

export function setCode(player) {
  const form = new ModalFormData()
    form.title("§y§r§cSetCode - §bAdmin")
    form.textField("3 - 12 characters", "Example: nakata")
    form.textField("Item", "Example: diamond")
    form.textField("Quantity - Number Required", "Example: 64")
    form.textField("Objective", "Example: money")
    form.textField("Quantity - Number Required", "Example: 1000");
    form.textField("User Can Entry", "Example: 50");

  form.show(player).then((result) => {
    const key = result.formValues[0];
    const item = result.formValues[1];
    const quantity = result.formValues[2];
    const objective = result.formValues[3];
    const quantityRequired = result.formValues[4];
    const maxPlayer = result.formValues[5];

    // Larangan Batas Kata
    if (key.length > 12) {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cCode length exceeds the maximum limit of 12 characters."}]}`);
      return;
    } else if (key.length < 3) {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cCode length should be at least 3 characters."}]}`);
      return;
    }

    if (item.length < 1 || objective.length < 1 || isNaN(quantity) || isNaN(quantityRequired)) {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cPlease enter all data correctly"}]}`);
      return;
    }

    const redeemData = {
      kunci: key,
      item: item,
      jumlah: parseInt(quantity),
      objective: objective,
      jumlaho: parseInt(quantityRequired),
      maxp: parseInt(maxPlayer),
    };
    
    // Mengatur status redeemed menjadi false untuk semua pemain
dbPlayer.forEach((playerName, playerData) => {
    playerData.redeemed = false;
    dbPlayer.delete(playerName); // Menghapus entri pemain dari database
  });
  
  
    dbRedeem.set("redeem", redeemData); // Set database

    player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aCode set redeemed to §e${key}§r\n\n§aItems: §g${item}\n§aItem Quantity: §g${quantity}\n\n§aObjective: §g${objective}\n§aQuantity Required: §g${quantityRequired}\n§aMaxPlayer: §g${maxPlayer}"}]}`);
  });
}

export function redeemCode(player) {
    const modal = new ModalFormData()
        .title("§y§r§eRedeemCode")
        .textField("Code", "Enter Code");

    modal.show(player).then((result) => {
        const code = result.formValues[0];
        const redeemData = dbRedeem.get("redeem");

        if (redeemData && redeemData.kunci === code) {
            const playerName = player.name;

            // Memeriksa status redeemed pemain
            if (!dbPlayer.has(playerName) || !dbPlayer.get(playerName).redeemed) {
                // Mengatur status redeemed menjadi true untuk pemain yang menebus kode

                // Memeriksa apakah jumlah pemain yang telah menebus kode telah mencapai batas maksimum
                if (dbPlayer.length >= redeemData.maxp) {
                    player.sendMessage("§cMaximum number of players have already redeemed the code.");
                    return;
                }

                const playerData = {
                    redeemed: true,
                };
                dbPlayer.set(playerName, playerData);

                player.runCommandAsync(`give @s ${redeemData.item} ${redeemData.jumlah}`);
                player.runCommandAsync(`scoreboard players add @s ${redeemData.objective} ${redeemData.jumlaho}`);
                player.runCommandAsync(`playsound random.levelup @s`);
                player.runCommandAsync(`playsound note.bass @s`);
                player.runCommandAsync(`tag @s[tag=!playerDB] add playerDB`);
                player.sendMessage("§aSucces claim code!");
            } else {
                player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have already redeemed the code"}]}`);
                player.runCommandAsync(`playsound note.pling @s`);
            }
        } else {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cInvalid Code! Maybe it has expired"}]}`);
            player.runCommandAsync(`playsound note.pling @s`);
        }
    });
}