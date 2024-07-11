replaceitem entity @s slot.hotbar 0 da:cb1 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 1 da:cb2 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 2 da:cb3 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 3 da:cb4 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 4 da:cb5 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}} 
replaceitem entity @s slot.hotbar 5 da:cb6 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 6 da:cb7 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 7 da:cb8 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}} 
replaceitem entity @s slot.hotbar 8 da:back 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
tag @s add menu_edit8
tag @s remove menu_edit1
tag @s remove menu_edit2
tag @s remove menu_edit3
tag @s remove menu_edit4
tag @s remove menu_edit5
tag @s remove menu_edit6
tag @s remove menu_edit7
tellraw @s[tag=menu_edit7] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Advance §6edit §bFloating text clickcable  §2active"}]}
title @s[tag=menu_edit5] actionbar §l§7[§fMenu clickcable floating §6Advance§7]