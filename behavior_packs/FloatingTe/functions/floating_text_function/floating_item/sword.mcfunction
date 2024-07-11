execute @e[type=da:floating_text,tag=edit] ~ ~ ~ summon da:sword ~ ~ ~ floating_text ""
tellraw @s {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §fTo edit floating items left click on the floating item!"}]}
playsound lodestone_compass.link_compass_to @s ~ ~ ~
replaceitem entity @s slot.hotbar 0 air 1 0 
replaceitem entity @s slot.hotbar 1 air 1 0 
replaceitem entity @s slot.hotbar 2 air 1 0  
replaceitem entity @s slot.hotbar 3 air 1 0 
replaceitem entity @s slot.hotbar 4 air 1 0 
replaceitem entity @s slot.hotbar 5 air 1 0 
replaceitem entity @s slot.hotbar 6 air 1 0 
replaceitem entity @s slot.hotbar 7 air 1 0 
replaceitem entity @s slot.hotbar 8 air 1 0 