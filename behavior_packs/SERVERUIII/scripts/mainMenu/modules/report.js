import { world, system, Player } from "@minecraft/server";
import { Database } from "../../@modules/Database.js";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui";

const db = new Database('rptDB')

system.runInterval(() => {
     for (let player of world.getPlayers()) {
          if (player.hasTag("report")) {
               report(player);
               player.runCommandAsync(`tag @s remove report`)
               }
          }
     }
)

system.runInterval(() => {
     for (let player of world.getPlayers()) {
          if (player.hasTag("rlogs")) {
               getReports(player);
               player.runCommandAsync(`tag @s remove rlogs`)
               }
          }
     }
)


export function report(player) {
  let players = world.getPlayers(); 
  let operations = [];

  for (let player of players) {
    operations.push(player.name);
  };
  
  const Reasons = ["Griefing", "Xray", "Cheating", "Fly", "Toolbox", "Bullying", "Toxic"]
   const form = new ModalFormData()
    .title("§eReport Player")
    .dropdown("§ePlayer Name", operations)
    .dropdown("§cReason", Reasons);

  form.show(player).then(result => {
    const playerName = operations[result.formValues[0]];
    const reason = result.formValues[1];
    const reports = new Array();
    
    const Reason = {
        0: 'Griefing',
        1: 'Xray',
        2: 'Cheating',
        3: 'Fly',
        4: 'Toolbox',
        5: 'Bullying',
        6: 'Toxic',
    };

      const reportData = {
        reporter: player.name,
        reportedPlayer: playerName,
        reason: Reason[reason],
        timestamp: Date.now()
      };

      reports.push(reportData);
      
      db.set('report', reports)

      player.sendMessage(`§aSuccessfully reported player ${playerName} for reason: ${Reason[reason]}`);
  });
}

export function getReports(player) {

  const reports = db.get('report') || [];
  
  if (reports.length === 0) {
    player.sendMessage('§cUps, there are no reports at the moment.');
    return;
  }
  
  const list = new ActionFormData()
    .title("Report List")
    .body("§cMungkin ada beberapa orang yang bermasalah, mau kamu apakan dia?");

  reports.forEach((report) => {
    list.button(`${report.reportedPlayer}\n§c${report.reason}`, 'textures/ui/icon_steve');
  });

  list.show(player).then((response) => {
    if (response.selection !== null) {
      const selectedPlayer = reports[response.selection];
      if (selectedPlayer) {
        const ui = new ActionFormData();
        const reports = db.get('report') || [];
        ui.title(`Actions for ${selectedPlayer.reportedPlayer}`);
        ui.button('§c§lBanned', 'textures/ui/hammer_r');
        ui.button('§0§lRemove', 'textures/ui/icon_trash');
        ui.show(player).then((actionResponse) => {
          if (actionResponse.selection === 0) {
            reports.splice(actionResponse.selection, 1);
            db.set('report', reports);
            player.addTag('banui')
          } else if (actionResponse.selection === 1) {
            reports.splice(actionResponse.selection, 1);
            db.set('report', reports);
            player.sendMessage(`§cRemoving report for ${selectedPlayer.reportedPlayer}`);
          }
        });
      }
    }
  });
}

world.afterEvents.playerSpawn.subscribe(data => {
    const { player, initialSpawn } = data;
    const reports = db.get('report') || [];
   if (initialSpawn) {
     if (player.hasTag('admin')) {
       player.sendMessage(`Hello §f${player.name}, today §c${reports.length} §freports alvailable!`)
   }
  }
});