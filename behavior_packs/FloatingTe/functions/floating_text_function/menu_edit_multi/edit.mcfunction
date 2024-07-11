tellraw @s[tag=menu_edit4] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Advanced edit Particle  §cDisabled"}]}
replaceitem entity @s slot.hotbar 0 da:kill_floating_text_all 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 1 air 1 0 
replaceitem entity @s slot.hotbar 2 da:menu_floating_clickcable 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 3 da:item_floating 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 4 da:particle 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 5 da:text_floating_edit 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 6 air 1 0 
replaceitem entity @s slot.hotbar 7 air 1 0 
replaceitem entity @s slot.hotbar 8 da:back 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
tellraw @s[tag=menu_edit1] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Advanced edit  §2active"}]}
tag @s add menu_edit2
tag @s remove menu_edit1
tag @s remove menu_edit3
tag @s remove menu_edit4
tag @s remove menu_edit5
tag @s remove menu_edit6
tag @s remove menu_edit7
tag @s remove menu_edit8
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:land] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:sword] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:chestplate] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:skin_floating] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:floating_text_clickable1] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:floating_text_clickable2] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:floating_text_clickable3] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:floating_text_clickable4] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:floating_text_clickable5] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:floating_text_clickable6] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:floating_text_clickable7] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:floating_text_clickable8] remove edit
title @s[tag=menu_edit2] actionbar §l§7[§fMenu Advanced edit§7]
