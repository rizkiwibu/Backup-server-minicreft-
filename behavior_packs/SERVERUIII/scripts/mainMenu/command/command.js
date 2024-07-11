import { world } from "@minecraft/server"

//config
const prefix = "+"





//help
world.beforeEvents.chatSend.subscribe(data => {
  const { sender, message } = data;

  if (message.startsWith(prefix + "help")) {
    data.cancel = true
   if (!sender.hasTag('admin')) {
    sender.sendMessage(`§a================\n§g${prefix}menu §7<Give menu>\n§a===============`)
    } else {
    sender.sendMessage(`§e================\n§g${prefix}menu §7<Give menu>\n§a${prefix}clearchat §7<Clear the chat>\n§a${prefix}uv §7<Unvanish>\n§a${prefix}admin §7<Give admin menu>\n§e================`)
   }
  }
});

world.beforeEvents.chatSend.subscribe(data => {
    const { sender, message } = data;
    if (message.startsWith(prefix)) {
        const command = message.slice(prefix.length).split(' ')[0];

        // List of allowed commands
        const allowedCommands = ['help', 'menu'];
        const allowedCommandsAdmin = ['uv', 'clearchat', 'admin', 'help', 'menu']
       
      if (!sender.hasTag('admin')) {
        if (!allowedCommands.includes(command)) {
            data.cancel = true;
            sender.sendMessage(`§cInvalid command. Type ${prefix}help for the list of available commands`);
        }
      } else {
       if (!allowedCommandsAdmin.includes(command)) {
           data.cancel = true
           sender.sendMessage(`§cInvalid command. Type ${prefix}help for the list of available commands`);
     }
    }
   }
});

world.beforeEvents.chatSend.subscribe(data => {
  const { sender, message } = data;
  if (message.startsWith(prefix + "menu")) {
    data.cancel = true;
    sender.runCommandAsync('give @s mcc:menu')
  }
});

world.beforeEvents.chatSend.subscribe(data => {
  const { sender, message } = data;
  if (message.startsWith(prefix + "uv")) {
    data.cancel = true;
    if (sender.hasTag('admin')) {
    sender.runCommandAsync('gamemode c @s')
  }
 }
});

world.beforeEvents.chatSend.subscribe(data => {
  const { sender, message } = data;
  if (message.startsWith(prefix + "admin")) {
    data.cancel = true;
    if (sender.hasTag('admin')) {
    sender.runCommandAsync('give @s mcc:admin')
  }
 }
});

world.beforeEvents.chatSend.subscribe(data => {
  const { sender, message } = data;
  if (message.startsWith(prefix + "clearchat")) {
    data.cancel = true;
    if (sender.hasTag('admin')) {
    sender.runCommandAsync(
      `tellraw @a {"rawtext":[{"text":"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n§aClear Chat Successfully"}]}`
    );
  }
 }
});