import { world, Player, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { ForceOpen } from "../Function/index.js";
import { TpaSystem } from "./system/wibuu.js";
import { rules } from "./system/rules.js";
import { starter } from "./system/starter.js";
import { HomeSystem } from "./system/home.js";
import { Bank } from "./system/atm.js";
import { redeemCode } from "./system/code.js";

import "./system/warp.js";
import { Wing } from "./system/wings.js";
import { Missi } from "./system/misi.js";

import { list } from "./modules/list.js"; 
import { report } from "./modules/report.js";
import { review } from "./modules/review.js";
import { daily } from "./modules/dailylogin.js";
import "./system/judi.js";
import "./system/sizeui.js";
import "./modules/banui.js";
import "./system/sit.js";
import "./system/sellhand.js";

import { ShopUI } from "./system/ShopUI/shop_main.js";


world.beforeEvents.itemUse.subscribe((eventData) => {
  let item = eventData.itemStack;
  let player = eventData.source;
  if (item.typeId == "mcc:menu") {
    system.run(() => {
      playerMenu(player);
    });
  }
});

async function playerMenu(player) {
  let f = new ActionFormData()
    .title("§y§r§eSERVER UI ")
    .body("§l      --------------------      \n§e             SERVER MENU       \n§r§l      --------------------      \n§r§e»» §rSilahkan Pilih Menu yang kalian Butuhkan!\n§r§e»» §rPlease select the menu you need!\n       §l§e       SERVER MENU    ")
    .button("World Warp\n§0Click to Open", "textures/ui/worldsIcon.png")
    .button("Sethome\n§0Click to Open", "textures/ui/icon_recipe_item.png")
    .button("Teleport\n§0Click to Open", "textures/ui/dressing_room_customization.png")
    .button("Redem Code\n§0Click to Open", "textures/ui/icon_blackfriday.png")
    .button("Event & Missi\n§0Click to Open", "textures/ui/debug_glyph_color.png")
    .button("Starterkit\n§0Click to Open", "textures/ui/icon_recipe_equipment.png")
    .button("§l§cCLOSE\n§r§0Click to Close", "textures/ui/cancel.png");

  let r = await ForceOpen(player, f);

  if (r.canceled) return console.warn("close ui");

  switch (r.selection) {
    case 0:
      // If "World Warp" is selected, show the second UI
      player.addTag("warps");
      break;
    case 1:
      HomeSystem(player);
      break;
    case 2:
      TpaSystem(player);
      break;
    case 3:
    redeemCode(player);
      break;
    case 4:
      ShopUI(player);
      break;
    case 5:
      Wing(player);
      break;
     case 8:
      Missi(player);
      break;
    case 9:
      starter(player); 
      break;	
  }
}

export { playerMenu };