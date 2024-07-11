import { world, system } from "@minecraft/server"

world.beforeEvents.chatSend.subscribe(data => {
  const { sender, message } = data;   
  let prefix = "."
  if (message.startsWith(prefix + "sit")) {
    data.cancel = true;
   system.runTimeout(() => {
 if (!sender.hasTag('sit')) {
   sender.addTag('sit')
   sender.playAnimation('animation.player.sitt', {blendOutTime: 1000})
    }
   }, 1)
  }
});

system.runInterval(() => {
for (let player of world.getPlayers()) {
 if (player.hasTag('sit')) {
   if (player.isInWater || player.isSneaking || player.isClimbing || player.isFalling || player.isSwimming || player.isSprinting || player.isJumping) {
       player.removeTag("sit")
       player.playAnimation('animation.player.sitt', {blendOutTime: 0})
     }
     }
   }
 });
 
 world.beforeEvents.chatSend.subscribe(data => {
  const { sender, message } = data;   
  let prefix = "."
  if (message.startsWith(prefix + "lay")) {
    data.cancel = true;
   system.runTimeout(() => {
 if (!sender.hasTag('lay')) {
   sender.addTag('lay')
   sender.playAnimation('animation.player.lay', {blendOutTime: 1000})
    }
   }, 1)
  }
});

system.runInterval(() => {
for (let player of world.getPlayers()) {
 if (player.hasTag('lay')) {
   if (player.isInWater || player.isSneaking || player.isClimbing || player.isFalling || player.isSwimming || player.isSprinting || player.isJumping) {
       player.removeTag("lay")
       player.playAnimation('animation.player.lay', {blendOutTime: 0})
     }
     }
   }
})