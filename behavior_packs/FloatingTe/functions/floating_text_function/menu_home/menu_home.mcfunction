tellraw @s[tag=!menu_edit2] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":"  §2Menu Activated successfully!"}]}
replaceitem entity @s slot.hotbar 0 air 1 0
replaceitem entity @s slot.hotbar 1 anvil 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 2 name_tag 1 0 
replaceitem entity @s slot.hotbar 3 da:floating_text_spawn_egg 1 0 
replaceitem entity @s slot.hotbar 4 air 1 0 
replaceitem entity @s slot.hotbar 5 da:summon 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 6 air 1 0
replaceitem entity @s slot.hotbar 7 air 1 0 
replaceitem entity @s slot.hotbar 8 da:back 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
tag @e[type=da:floating_text,tag=edit] remove edit
tag @e[type=da:terra,tag=edit] remove edit
tag @e[type=da:sword,tag=edit] remove edit
tag @e[type=da:chestplate,tag=edit] remove edit
tag @e[type=da:skin_floating,tag=edit] remove edit
tag @s add floating
gamerule showtags false
tag @s add menu_edit1
tag @s remove menu_edit2
tag @s remove menu_edit3
tag @s remove menu_edit4
tag @s remove menu_edit5
tag @s remove menu_edit6
tag @s remove menu_edit7
title @s[tag=menu_edit1] actionbar §l§7[§fMenu Home §7]
