replaceitem entity @s slot.hotbar 0 da:up 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 1 da:down 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 2 air 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 3 air 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 4 air 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 5 da:kill_floating_text 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 6 da:teleport 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 7 air 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
replaceitem entity @s slot.hotbar 8 da:back 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
playsound lodestone_compass.link_compass_to @s ~ ~ ~
tag @s add menu_edit3
tag @s remove menu_edit2
tellraw @s[tag=menu_edit3] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Menu edit floating text §aActive!"}]}