replaceitem entity @s slot.hotbar 0 da:particle_up 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 1 da:particle_down 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 2 air 1 0 
replaceitem entity @s slot.hotbar 3 air 1 0 
replaceitem entity @s slot.hotbar 4 da:speed 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 5 da:reset 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 6 air 1 0 
replaceitem entity @s slot.hotbar 7 air 1 0 
replaceitem entity @s slot.hotbar 8 da:back 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
tag @s add menu_edit4
title @s[tag=menu_edit4] actionbar §l§7[§fMenu Particle edit §7]
tellraw @s[tag=menu_edit4] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Advanced Edit Particle  §2active"}]}
tag @s remove menu_edit2
