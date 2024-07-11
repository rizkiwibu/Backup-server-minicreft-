import { world, Player, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { ForceOpen } from "../Function/index.js";
import { redeemCode } from "./system/code.js";

import "./system/warp"; 

world.beforeEvents.itemUse.subscribe((eventData) => {
  let item = eventData.itemStack;
  let player = eventData.source;
  if (item.typeId == "mcc:settings" && player.hasTag("admin")) {
    system.run(() => {
      settings(player);
    });
  }
});

async function settings(player) {
  let f = new ActionFormData()
    .title("§y§r§aADMIN UI ")
    .body("§b ADMIN UI ");

  if (!player.hasTag("admin")) {
    f.body("§c Anda tidak memiliki tag admin!");
  } else {
    f.button("Warp Settings\n§0Click to Open", "textures/ui/worldsIcon.png");
    f.button("Set Code\n§0Click to Open", "textures/ui/icon_best3.png");
  }

  if (!player.hasTag("admin")) {
    a.button("CLOSE\n§0Click to Close", "textures/ui/cancel.png");
  }

  let r = await ForceOpen(player, f);

  if (r.canceled || !player.hasTag("admin")) {
    console.warn("UI closed");
    return;
  }

  switch (r.selection) {
    case 0:
      // If "World Warp" is selected, show the second UI
      player.addTag("w:setting");
      break;
    case 1:
      player.addTag("scode");
      break;
  }
}

export { settings };