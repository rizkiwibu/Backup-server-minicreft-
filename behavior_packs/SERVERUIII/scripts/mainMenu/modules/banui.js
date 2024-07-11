import { world, system, Player, EffectTypes } from "@minecraft/server";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui";

system.beforeEvents.watchdogTerminate.subscribe(async (data) => {
  data.cancel = true;
});

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("banui")) {
      Banned(player);
      player.removeTag("banui");
    }
  }
});

function Banned(player) {
  const ui = new ModalFormData();
  const players = world.getPlayers();
  const operations = [];
  const playerObjects = [];

  for (let p of players) {
    operations.push(p.name);
    playerObjects.push(p);
  }

  ui.title("Banned Form");
  ui.textField('Input player name', 'Ex: NakataTzy')
  ui.textField("§cFill Temporary", "Ex: 24 (in hours)");
  ui.textField("Reason", "Ex: Cheating");

  ui.show(player).then((res) => {
  let targetInfo = [];
    const tgp = world.getPlayers();
    const targetPlayerName = res.formValues[0];
    let target = null; // Declare target variable here

    for (let player of tgp) {
      if (player.name === targetPlayerName) {
        target = player;
        targetInfo.push(target);
      }
    }
   for (let target of targetInfo) {
    if (target) {
    const banned_hours = res.formValues[1];
    const banned_ms = banned_hours * 60 * 60 * 1000;

    target.runCommandAsync(`tag @s add "banned:${Date.now() + banned_ms}"`);
    target.runCommandAsync(`tag @s add "reason:${res.formValues[2]}"`);
    player.sendMessage(`§aSuccefully banned ${target.name}!`)
  } else { player.sendMessage('§cTarget tidak ditemukan!') }
  }
});
}

function BannedUI(player) {
  const cooldownTag = player.getTags().find((tag) => tag.startsWith("banned:"));
  const cooldown = cooldownTag ? parseInt(cooldownTag.substring(7)) : 0;
  const reasonTag = player.getTags().find((tag) => tag.startsWith("reason:"));
  const reason = reasonTag ? reasonTag.substring(7) : "No reason provided";

  const secondsRemaining = Math.ceil((cooldown - Date.now()) / 1000);
  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const ui = new ActionFormData();
  ui.title('§cYou Are Banned!');
  ui.body(`§cOuhhh, it seems you are already banned with reason: §g${reason}\n\n§cPlease wait until §f${hours}§ch§f ${minutes}§cm§f ${seconds}§cs§f`);
  ui.button('§l§cExit\n§r§0Click');

  ui.show(player).then((res) => {
    if (res.selection === 0) {
      world.getDimension("overworld").runCommandAsync(`kick ${player.name} ${reason}`);
    }
  });
}

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    const cooldownTag = player.getTags().find((tag) => tag.startsWith("banned:"));
    const cooldown = cooldownTag ? parseInt(cooldownTag.substring(7)) : 0;
    
    const reasonTag = player.getTags().find((tag) => tag.startsWith("reason:"));
    const reason = reasonTag ? reasonTag.substring(7) : "No reason provided";

    if (cooldown > Date.now()) {
      const secondsRemaining = Math.ceil((cooldown - Date.now()) / 1000);
      BannedUI(player);
      player.runCommandAsync('ability @s mute true');
      player.addEffect(EffectTypes.get('blindness'), secondsRemaining, { amplifier: 255, showParticles: false });
      player.addEffect(EffectTypes.get('slowness'), secondsRemaining, { amplifier: 255, showParticles: false });
      player.addEffect(EffectTypes.get('resistance'), secondsRemaining, { amplifier: 255, showParticles: false });
    } else { 
        player.runCommandAsync('ability @s mute false')
        player.removeTag(`reason:${reason}`)
        player.removeTag(`banned:${cooldown}`)
    }
  }
}, 10);

function getOnlinePlayers(asNumber = false) {
  let onlinePlayers = world.getAllPlayers();
d
  return asNumber ? onlinePlayers.length : onlinePlayers;
}