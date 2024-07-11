import { world, system, Player } from "@minecraft/server";
import { Database } from "../../@modules/Database.js";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui";

const dbReviews = new Database("reviewsDB");


system.runInterval(() => {
     for (let player of world.getPlayers()) {
          if (player.hasTag("review")) {
               getReview(player);
               player.runCommandAsync(`tag @s remove review`)
               }
          }
     }
)

system.runInterval(() => {
     for (let player of world.getPlayers()) {
          if (player.hasTag("relogs")) {
               getReview(player);
               player.runCommandAsync(`tag @s remove relogs`)
               }
          }
     }
)

export function review(player) {
 const players = world.getPlayers();
  const playerNames = players.map((player) => player.name);
  
  const form = new ModalFormData()
    .title("§y§r§eReview Player")
    .slider("§eRatings", 1, 5, 1)
    .textField("§cExplain Opinion", "Enter Opinion!")

  form.show(player).then(result => {
    const playerRate = result.formValues[0];
    const reason = result.formValues[1];
    
    if (reason.includes("§")) {
    player.sendMessage("§cCant use letters character");
    return;
    }
    
    if (playerRate.length < 1) {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cPlease enter all data correctly"}]}`);
      return;
    }
    
    if (reason.length < 1) {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cPlease enter all data correctly"}]}`);
      return;
    }

    if (playerRate && reason) {
      const reviewData = {
        reporter: player.name,
        ratedPlayer: playerRate,
        reason: reason,
        timestamp: Date.now()
      };

      dbReviews.set(player.name, reviewData);

      
     
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSuccesfully give feedback"}]}`);
    } else {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§c Failed give feedback"}]}`);
    }
  });
}

export function getReview(player) {
  let reviewLogs = "Review List:\n\n";

  dbReviews.forEach((key, value) => {
    reviewLogs += `Rate From: ${value.reporter}\n`;
    reviewLogs += `Player Rate: ${value.ratedPlayer}/5\n`;
    reviewLogs += `Reason: ${value.reason}\n`;
    reviewLogs += `Timestamp: ${new Date(value.timestamp).toLocaleString()}\n\n`;
  });

  const list = new ActionFormData()
    .title("Rating List ★")
    .body(reviewLogs)
    .button("§bCreate Review", "textures/items/diamond.png");
    list.button("§l§cEXIT", "textures/ui/icon_import.png");

  list.show(player).then((response) => {
  if (response.selection == 0) {
  review(player);
};
  if (response.selection == 1) {}
  });
}