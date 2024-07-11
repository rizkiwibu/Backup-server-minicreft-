import { world, system, Player } from '@minecraft/server'
import { ActionFormData, ModalFormData, MessageFormData } from '@minecraft/server-ui'
import { getScore, metricNumbers } from "../../../../Function/index.js"

const itemData = [
  {
    textures: 'textures/items/trial_key.png',
    name: '§dMytick Key\n§050k Click to buy',
    cost: 50000,
    data: 0,
    item: 'mytick:key',
  },
];

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("key")) {
      KeyShop(player);
      player.runCommandAsync(`tag @s remove key`);
    }
  }
});

export function KeyShop(player) {
  const shop = new ActionFormData();
  shop.title(`§bKey Shop`);
  shop.body(`§6-------------------------------\n\nUser Information:\nName: §b${player.nameTag}\n§6Money: §b$${metricNumbers(getScore(player, 'money'))}\n\n§6-------------------------------`);
  
  for (const item of itemData) {
    shop.button(`${item.name}\n§b$${item.cost}`, `${item.textures}`);
  }
  
  shop.show(player).then(result => {
    if (result.isCanceled) return;
    
    const item = itemData[result.selection];
    const money = getScore(player, "money");
    
    let brick = new ModalFormData()
      .title(`${item.name}`)
      .textField(`§6-------------------------------\n\nUser Information:\nName: §b${player.nameTag}\n§6Money: §b$${money}\n\n§6Item Information:\n§6Buy x1 §b${item.name} §6= §b$${item.cost}\n\n§6-------------------------------\n\n§6Amount:`, `The Amount you want to Buy`);
      
    brick.show(player).then(async res => {
      if (!res.formValues[0]) {
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cPlease enter the amount you want to Buy"}]}`);
        player.runCommandAsync(`playsound note.bass @s`);
        return;
      }
      
      if (isNaN(res.formValues[0])) {
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou can only enter numbers, not other characters"}]}`);
        player.runCommandAsync(`playsound note.bass @s`);
        return;
      }
      
      const amount = parseInt(res.formValues[0]);
      const dataCost = item.cost * amount;
      
      if (money >= dataCost) {
        await player.runCommandAsync(`scoreboard players remove @s[scores={money=${dataCost}..}] money ${dataCost}`);
        player.runCommandAsync(`give @s ${item.item} ${amount}`);
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§6SHOP §7>> §aYou have bought §ex${amount} ${item.name} §aWith totals: §e$${dataCost}"}]}`);
        player.runCommandAsync(`playsound random.levelup @s`);
      } else {
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§6SHOP §7>> §cYour money is not enough, need §e$${dataCost} §cmoney"}]}`);
        player.runCommandAsync(`playsound note.bass @s`);
      }
    });
  });
}
