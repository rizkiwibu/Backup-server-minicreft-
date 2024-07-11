import {
  world,
  Player,
  system
} from "@minecraft/server";
import { 
  ActionFormData, 
  ModalFormData, 
  MessageFormData 
} from "@minecraft/server-ui";
import { Config } from "../../config.js"
import { getScore, metricNumbers } from "../../Function/index.js"

system.runInterval((tick) => {
  for (let player of world.getPlayers()) {
    player.runCommandAsync(`scoreboard objectives add money dummy`);
    player.runCommandAsync(`scoreboard objectives add bank dummy`);
  }
}, 0);

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("atm")) {
      Bank(player);
      player.removeTag(`atm`);
    }
  }
});

export function Bank(player) {
  let snaky_bank = new ActionFormData();
  snaky_bank.title("§y§rBank Menu");
  snaky_bank.body(`Balance: ${metricNumbers(getScore(player, `${Config.objectives}`))}`);
  snaky_bank.button("Withdraw§0\nClick to open", "textures/ui/icon_blackfriday.png");
  snaky_bank.button("Deposit§0\nClick to open", "textures/ui/trade_icon.png");
  snaky_bank.button("Transfer§0\nClick to open", "textures/ui/FriendsIcon.png");
  snaky_bank.button("Transaction\n§0Click to open", "textures/ui/icon_book_writable.png");
  snaky_bank.button("§l§cEXIT\n§r§dClick to close..", "textures/ui/cancel.png");
  snaky_bank.show(player).then(res => {
    if (res.selection === 0) {
      let fm = new ModalFormData();
      var playerObjects = [];
      var operations = [];
      var players = world.getPlayers();
      for (let playerr of players) {
        operations.push(playerr.name);
        playerObjects.push(playerr);
      }
      fm.title("§y§rWithdraw Money");
      fm.textField(`withdraw your money here\nYour money: ${metricNumbers(getScore(player, `${Config.objectives}`))}\nYour bank: ${metricNumbers(getScore(player, "bank"))}`, `amount`);
      fm.show(player).then(reponse => {
        var playerscore = getScore(player, "bank");
        const key = reponse.formValues[0];

        if (key.length < 1) {
          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cPlease input some number"}]}`);
          return;
        } else {
          if (key.length > 12) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cCode length exceeds the maximum limit of 12 characters."}]}`);
            return;
          }
        }
        if (Number(playerscore) < Number(reponse.formValues[0])) {
          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§8[§cBank§8] §cYour bank balance is not enough"}]}`)
        } else {
          if (!isNaN(key)) {
            player.runCommandAsync(`scoreboard players add @s money ${reponse.formValues[0]}`)
            player.runCommandAsync(`scoreboard players remove @s bank ${reponse.formValues[0]}`)
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§8[§cBank§8] §a Successfully took money in the bank for §r${reponse.formValues[0]}"}]}`)
            player.runCommandAsync(`tag @s add "transactions:\n§8[§cBank§8] §r§eWithdraw: §r${reponse.formValues[0]}"`)
            player.runCommandAsync(`playsound random.levelup @s`)
          } else {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cInvalid number, please input valid number"}]}`)
          }
        }
      })
    }
    if (res.selection === 1) {
      let fm = new ModalFormData()
      var playerObjects = []
      var operations = []
      var players = world.getPlayers()
      for (let playerr of players) {
        operations.push(playerr.name)
        playerObjects.push(playerr)
      }
      fm.title("§lDeposit Money")
      fm.textField(`Enter the amount of money here\nYour money: ${metricNumbers(getScore(player, `${Config.objectives}`))}`, `amount`)
      fm.show(player).then(reponse => {

        const key = reponse.formValues[0]

        if (key.length < 1) {
          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cPlease input some number"}]}`);
          return;
        } else {
          if (key.length > 12) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cCode length exceeds the maximum limit of 12 characters."}]}`);
            return;
          }
        }

        var playerscore = getScore(player, `${Config.objectives}`)
        if (Number(playerscore) < Number(reponse.formValues[0])) {
          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§8[§cBank§8] §cYour money is not enough to make a deposit into the bank"}]}`)
        } else {
          if (!isNaN(key)) {
            player.runCommandAsync(`scoreboard players add @s bank ${reponse.formValues[0]}`)
            player.runCommandAsync(`scoreboard players remove @s money ${reponse.formValues[0]}`)
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§8[§cBank§8] §aManaged to save money in the bank for §r${reponse.formValues[0]}"}]}`)
            player.runCommandAsync(`tag @s add "transactions:\n§8[§cBank§8] §r§eDeposit: §r${reponse.formValues[0]}"`)
            player.runCommandAsync(`playsound random.levelup @s`)
          } else {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cInvalid number, please input valid number"}]}`)
          }
        }
      })
    }
    if (res.selection === 2) {
      let fm = new ModalFormData()
      var playerObjects = []
      var operations = []
      var players = world.getPlayers()
      for (let playerr of players) {
        operations.push(playerr.name)
        playerObjects.push(playerr)
      }
      fm.title("§y§rTransfer Money")
      fm.dropdown("Select player", operations)
      fm.textField("Amount you want to send?", "amount")
      fm.show(player).then(response => {
        var target = operations[response.formValues[0]]
        var playerscore = getScore(player, `${Config.objectives}`)
        const key = response.formValues[1]

        if (key.length < 1) {
          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cPlease input some number"}]}`);
          return;
        } else {
          if (key.length > 12) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cCode length exceeds the maximum limit of 12 characters."}]}`);
            return;
          }
        }
        if (Number(playerscore) < Number(response.formValues[1])) {
          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§8[§cBank§8] §cYou are not enough §r${response.formValues[1]} §amoney §cto transfer §e${target}"}]}`)
        } else {
          if (!isNaN(key)) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§8[§cBank§8] §aYou Transferred To §e${target} §r${response.formValues[1]} §amoney "}]}`)
            player.runCommandAsync(`scoreboard players remove @s money ${response.formValues[1]}`)
            player.runCommandAsync(`scoreboard players add "${target}" money ${response.formValues[1]}`)
            player.runCommandAsync(`tag @s add "transactions:\n§8[§cBank§8] §r§eTransfer §r${target}\n§eAmount: §r${response.formValues[1]}"`)
            player.runCommandAsync(`playsound random.levelup @s`)
          } else {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cInvalid number, please input valid number"}]}`)
          }
        }
      })
    }
    if (res.selection === 3) {
      Transactions(player);
    }
    if (res.selection === 4) {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§8[§cBank§8] §r§aClose Bank Menu"}]}`)
    }
  });
}

function Transactions(player) {
  const tags = player.getTags();
  let transactions = [];
  for (const tag of tags) {
    if (tag.startsWith("transactions:")) {
      transactions.push(tag.replace("transactions:", ""));
    }
  }
  let fm = new ActionFormData()
  fm.title("§y§rTransactions")
  fm.body(`${transactions}`)
  fm.button("§l§cEXIT", "textures/ui/icon_import.png");
  fm.show(player).then((response) => {});
}