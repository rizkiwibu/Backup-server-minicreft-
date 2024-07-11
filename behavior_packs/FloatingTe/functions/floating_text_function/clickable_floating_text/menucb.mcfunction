replaceitem entity @s slot.hotbar 0 da:up_cb 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 1 da:down_cb 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 2 air 1 0 
replaceitem entity @s slot.hotbar 3 air 1 0 
replaceitem entity @s slot.hotbar 4 air 1 0 
replaceitem entity @s slot.hotbar 5 air 1 0 
replaceitem entity @s slot.hotbar 6 da:cb_kill 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 7 air 1 0 
replaceitem entity @s slot.hotbar 8 da:back 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
tag @s add menu_edit7
tag @s remove menu_edit1
tag @s remove menu_edit2
tag @s remove menu_edit3
tag @s remove menu_edit4
tag @s remove menu_edit5
tag @s remove menu_edit6
tag @s remove menu_edit8
tellraw @s[tag=menu_edit6] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Advance §6edit §bFloating text clickcable  §2active"}]}
title @s[tag=menu_edit5] actionbar §l§7[§fMenu clickcable floating §6Advance§7]