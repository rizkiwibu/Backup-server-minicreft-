import { world, system, Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("vent")) {
      Missi(player);
      player.removeTag("vent");
    }
  }
});

export function Missi(player) {
  const ui = new ActionFormData();

  ui.title("§eSERVER EVENT");
  ui.body("§l      --------------------      \n§e            EVENT&MISSI       \n§r§l      --------------------      \n§rUntuk MengClaim Hadiah §r Kamu Hanya Perlu Membunuh Mobs Click Button Pass Di Sana Ada Syarat² Untuk Claim\n       §l§b       EVENT&MISSI    ");
  ui.button("§lEVENT\n§rClick to open", "textures/ui/creative_icon.png"); //0
  ui.button("§lMISSI\n§rClick to open", "textures/ui/icon_book_writable.png"); //1
  ui.button("§l§cCLOSE", "textures/ui/cancel.png");

  ui.show(player).then((res) => {
    if (res.selection === 0) {
      Event(player);
    }
    if (res.selection === 1) {
      Missip(player);
    }
  });
}

export function Event(player) {
  const ui = new ActionFormData();
  ui.title("EVENT");
  ui.body("§7§•Bereskan Event Yang Ada lalu Claim Hadiah nya, Mantap Bukan Anjay");
  ui.button("EVENT 1", "textures/ui/promo_gift_small_yellow.png");
  ui.button("EVENT 2", "textures/ui/promo_gift_small_pink.png");
  ui.button("EVENT 3", "textures/ui/promo_gift_small_green.png");
  ui.button("EVENT 4", "textures/ui/promo_gift_small_blue.png");
  ui.button("§l§cCLOSE", "textures/ui/cancel.png");

  ui.show(player).then((res) => {
    if (res.selection === 0) {
      Event1(player);
    }
    if (res.selection === 1) {
      Event2(player);
    }
    if (res.selection === 2) {
      Event3(player);
    }
    if (res.selection === 3) {
      Event4(player);
    }
  });
}

export function Event1(player) {
  const ui = new ActionFormData();
  
  ui.title("EVENT1");
  ui.body("§•§7Bunuh 300 Mobs Untuk Membereskan Missi Event 1 jika sudah anda bisa mengambil hadiah di bawah ini\n» Money 50k\n» Key red 1");
  ui.button("Claim", "textures/ui/check.png");
  ui.button("Kembali", "textures/ui/cancel.png");
  
  ui.show(player).then((res) => {
    if (res.selection === 0) {
     player.runCommandAsync('tellraw @s[scores={kills=..299}] {"rawtext":[{"text":"§cMaaf Kamu Belum Membereskan Misi! "}]}');
      player.runCommandAsync('playsound mob.villager no @s[tag=!event1,scores={killls=299..}]');
      player.runCommandAsync('give @s[tag=!event1,scores={kills=300..}] red:key 1');
      player.runCommandAsync('scoreboard players add @s[tag=!event1,scores={kills=300..}] money 50000');
      player.runCommandAsync('playsound mob.villager yes @s[tag=!event1,scores={killls=300..}]');
      player.runCommandAsync('tag @s[scores={kills=300..}] add event1');      
      player.runCommandAsync('tellraw @s[tag=event1] {"rawtext":[{"text":"§aKamu telah Meng Claim Hadiah Ini! "}]}');
    }
  });
}

export function Event2(player) {
  const ui = new ActionFormData();
  
  ui.title("EVENT2");
  ui.body("§•§7Bermain 7 Jam Untuk Membereskan Missi Event 2 jika sudah anda bisa mengambil hadiah di bawah\n» Key mytick 1");
  ui.button("Claim", "textures/ui/check.png");
  ui.button("Kembali", "textures/ui/cancel.png");
  
  ui.show(player).then((res) => {
    if (res.selection === 0) {
     player.runCommandAsync('tellraw @s[scores={h=..6}] {"rawtext":[{"text":"§cMaaf Kamu Belum Membereskan Misi! "}]}');
      player.runCommandAsync('playsound mob.villager no @s[tag=!event2,scores={h=6..}]');
      player.runCommandAsync('give @s[tag=!event2,scores={h=7..}] mytick:key 1');
      player.runCommandAsync('playsound mob.villager yes @s[tag=!event2,scores={h=7..}]');
      player.runCommandAsync('tag @s[scores={h=7..}] add event2');      
      player.runCommandAsync('tellraw @s[tag=event2] {"rawtext":[{"text":"§aKamu telah Meng Claim Hadiah Ini! "}]}');
    }
  });
}

export function Event3(player) {
  const ui = new ActionFormData();
  
  ui.title("EVENT3");
  ui.body("§•§7Bunuh 700 Mobs Untuk Membereskan Missi Event 3 jika sudah anda bisa mengambil hadiah di bawah\n» Key mytick 1\n» Mobs Spawner");
  ui.button("Claim", "textures/ui/check.png");
  ui.button("Kembali", "textures/ui/cancel.png");
  
  ui.show(player).then((res) => {
    if (res.selection === 0) {
     player.runCommandAsync('tellraw @s[scores={kills=..699}] {"rawtext":[{"text":"§cMaaf Kamu Belum Membereskan Misi! "}]}');
      player.runCommandAsync('playsound mob.villager no @s[tag=!event3,scores={kills=699..}]');
      player.runCommandAsync('give @s[tag=!event3,scores={kills=700..}] mytick:key 1');
      player.runCommandAsync('give @s[tag=!event3,scores={kills=700..}] mob_spawner 1');
      player.runCommandAsync('playsound mob.villager yes @s[tag=!event3,scores={kills=700..}]');
      player.runCommandAsync('tag @s[scores={kills=700..}] add event3');      
      player.runCommandAsync('tellraw @s[tag=event3] {"rawtext":[{"text":"§aKamu telah Meng Claim Hadiah Ini! "}]}');
    }
  });
}


export function Event4(player) {
  const ui = new ActionFormData();
  
  ui.title("EVENT4");
  ui.body("§•§7Bermain Selama 2 Hari Untuk Membereskan Missi Event 4 jika sudah anda bisa mengambil hadiah di bawah\n» Key mytick 1\n» Mobs Spawner\n» Zombie Egg\n» Elytra\n» Money 150k");
  ui.button("Claim", "textures/ui/check.png");
  ui.button("Kembali", "textures/ui/cancel.png");
  
  ui.show(player).then((res) => {
    if (res.selection === 0) { 
      player.runCommandAsync('tellraw @s[scores={d=..1}] {"rawtext":[{"text":"§cMaaf Kamu Belum Membereskan Misi! "}]}');
      player.runCommandAsync('playsound mob.villager no @s[tag=!event4,scores={d=1..}]');
      player.runCommandAsync('give @s[tag=!event4,scores={d=2..}] mytick:key 1');
      player.runCommandAsync('give @s[tag=!event4,scores={d=2..}] mob_spawner 1');    
      player.runCommandAsync('give @s[tag=!event4,scores={d=2..}] zombie_spawn_egg 1');
      player.runCommandAsync('give @s[tag=!event4,scores={d=2..}] elytra 1');
      player.runCommandAsync('scoreboard players add @s[tag=!event4,scores={d=2..}] money 150000');
      player.runCommandAsync('playsound mob.villager yes @s[tag=!event4,scores={d=2..}]');
      player.runCommandAsync('tag @s[scores={d=2..}] add event4');
      player.runCommandAsync('tellraw @s[tag=event4] {"rawtext":[{"text":"§aKamu telah Meng Claim Hadiah Ini! "}]}');
    }
  });
}

export function Missip(player) {
  const ui = new ActionFormData();
  
  ui.title("MISSI");
  ui.body("§7§•Bereskan Event Yang Ada lalu Claim Hadiah nya, Mantap Bukan Anjay");
  ui.button("MISSI 1", "textures/ui/hammer_r.png");
  ui.button("MISSI 2", "textures/ui/hammer_r.png");
  ui.button("MISSI 3", "textures/ui/hammer_r.png");
  ui.button("§l§cCLOSE", "textures/ui/cancel.png");

  ui.show(player).then((res) => {
    if (res.selection === 0) {
      Misi1(player);
    }
    if (res.selection === 1) {
      Misi2(player);
    }
    if (res.selection === 2) {
      Misi3(player);
    }
  });
}

export function Misi1(player) {
  const ui = new ActionFormData();
  
  ui.title("MISSION 1"); 
  ui.body("§•§7Bunuh 50 Mobs Untuk Membereskan Missi 1 jika sudah anda bisa mengambil hadiah di bawah ini\n» Key red 1");
  ui.button("Claim", "textures/ui/check.png");
  ui.button("Kembali", "textures/ui/cancel.png");
  
  ui.show(player).then((res) => {
    if (res.selection === 0) {
      player.runCommandAsync('tellraw @s[scores={kills=..49}] {"rawtext":[{"text":"§cMaaf Kamu Belum Membereskan Misi! "}]}');
      player.runCommandAsync('playsound mob.villager no @s[tag=!misi1,scores={kills=49..}]');
      player.runCommandAsync('give @s[tag=!misi1,scores={kills=50..}] red:key 1');
      player.runCommandAsync('playsound mob.villager yes @s[tag=!misi1,scores={kills=50..}]');
      player.runCommandAsync('tag @s[scores={kills=50..}] add misi1');
      player.runCommandAsync('tellraw @s[tag=misi1] {"rawtext":[{"text":"§aKamu Telah Membereskan Missi ini! "}]}');
    }
  });
}

export function Misi2(player) {
  const ui = new ActionFormData();
  
  ui.title("MISSION 2"); 
  ui.body("§•§7Bunuh 150 Mobs Untuk Membereskan Missi 2 jika sudah anda bisa mengambil hadiah di bawah ini\n» Key epic 1");
  ui.button("Claim", "textures/ui/check.png");
  ui.button("Kembali", "textures/ui/cancel.png");
  
  ui.show(player).then((res) => {
    if (res.selection === 0) {
      player.runCommandAsync('tellraw @s[scores={kills=..149}] {"rawtext":[{"text":"§cMaaf Kamu Belum Membereskan Misi! "}]}');
      player.runCommandAsync('playsound mob.villager no @s[tag=!misi2,scores={kills=149..}]');
      player.runCommandAsync('give @s[tag=!misi2,scores={kills=150..}] epic:key 1');
      player.runCommandAsync('playsound mob.villager yes @s[tag=!misi2,scores={kills=150..}]');
      player.runCommandAsync('tag @s[scores={kills=150..}] add misi2');
      player.runCommandAsync('tellraw @s[tag=misi2] {"rawtext":[{"text":"§aKamu Telah Membereskan Missi ini! "}]}');
    }
  });
}

export function Misi3(player) {
  const ui = new ActionFormData();
  
  ui.title("MISSION 3"); 
  ui.body("§•§7Bunuh 250 Mobs Untuk Membereskan Missi 3 jika sudah anda bisa mengambil hadiah di bawah ini\n» Key mytick 1");
  ui.button("Claim", "textures/ui/check.png");
  ui.button("Kembali", "textures/ui/cancel.png");
  
  ui.show(player).then((res) => {
    if (res.selection === 0) {
      player.runCommandAsync('tellraw @s[scores={kills=..249}] {"rawtext":[{"text":"§cMaaf Kamu Belum Membereskan Misi! "}]}');
      player.runCommandAsync('playsound mob.villager no @s[tag=!misi3,scores={kills=249..}]');
      player.runCommandAsync('give @s[tag=!misi3,scores={kills=250..}] mytick:key 1');
      player.runCommandAsync('playsound mob.villager yes @s[tag=!misi3,scores={kills=250..}]');
      player.runCommandAsync('tag @s[scores={kills=250..}] add misi3');
      player.runCommandAsync('tellraw @s[tag=misi3] {"rawtext":[{"text":"§aKamu Telah Membereskan Missi ini! "}]}');
    }
  });
}