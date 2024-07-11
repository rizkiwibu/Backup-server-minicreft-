replaceitem entity @s slot.hotbar 0 air 1 0
replaceitem entity @s slot.hotbar 1 air 1 0
replaceitem entity @s slot.hotbar 2 da:item_skin_floating 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 3 da:sword 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 4 da:chestplate 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 5 da:terra 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 6 air 1 0
replaceitem entity @s slot.hotbar 7 air 1 0 
replaceitem entity @s slot.hotbar 8 da:back 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
tag @s add menu_edit5
tag @s remove menu_edit2
tellraw @s[tag=menu_edit5] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §fNormale §6edit  §2active"}]}
title @s[tag=menu_edit5] actionbar §l§7[§fMenu Item floating Normal§7]