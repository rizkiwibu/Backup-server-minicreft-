/*
----------------------------------
Creator: Mafly
Discord: Maplii#9957
Youtube: MaFly
https://www.youtube.com/c/MaFly16

- DECODER A NAKATAAAAAAAAA

Website:
https://mafly.xyz/

This addon is an update of Snaky Shop UI V3

Author Script: Snaky
Discord: snaky#4956
Youtube: https://www.youtube.com/channel/UCmyfzetquo4bKpeoiLG_C2A
----------------------------------
*/

import { world } from '@minecraft/server'
import { ActionFormData, ModalFormData, MessageFormData } from '@minecraft/server-ui'
import { KeyShop } from './key_1.js';

export function KeyUI(player) {
  const gui = new ActionFormData()
  .title(`§bKey Gacha`)
  .body(`§6-------------------------------\n\nUser Information:\nName: §b${player.nameTag}\n§6Money: §b$${getScore(player, 'money')}\n\n§6-------------------------------`)
  .button(`Key Gacha`, 'textures/ui/icon_lock.png')
  .button(`<< Back <<`)
  gui.show(player).then(result => {
    if (result.selection == 0) {
        KeyShop(player)
    }
    if (result.selection == 1) {
        ShopUI(player)
    }
  })
}

function getScore(entity, objective) {
    try {
        return world.scoreboard.getObjective(objective).getScore(entity.scoreboard);
    } catch (error) {
        return 0;
    }
  }