execute @e[tag=cb1] ~ ~ ~ execute @e[type=da:floating_text,tag=edit] ~ ~ ~ summon da:floating_text_clickable1 ~ ~ ~ 
execute @e[tag=cb2] ~ ~ ~ execute @e[type=da:floating_text,tag=edit] ~ ~ ~ summon da:floating_text_clickable2 ~ ~ ~
execute @e[tag=cb3] ~ ~ ~ execute @e[type=da:floating_text,tag=edit] ~ ~ ~ summon da:floating_text_clickable3 ~ ~ ~
execute @e[tag=cb4] ~ ~ ~ execute @e[type=da:floating_text,tag=edit] ~ ~ ~ summon da:floating_text_clickable4 ~ ~ ~
execute @e[tag=cb5] ~ ~ ~ execute @e[type=da:floating_text,tag=edit] ~ ~ ~ summon da:floating_text_clickable5 ~ ~ ~
execute @e[tag=cb6] ~ ~ ~ execute @e[type=da:floating_text,tag=edit] ~ ~ ~ summon da:floating_text_clickable6 ~ ~ ~
execute @e[tag=cb7] ~ ~ ~ execute @e[type=da:floating_text,tag=edit] ~ ~ ~ summon da:floating_text_clickable7 ~ ~ ~
execute @e[tag=cb8] ~ ~ ~ execute @e[type=da:floating_text,tag=edit] ~ ~ ~ summon da:floating_text_clickable8 ~ ~ ~
tellraw @s {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §fTo edit floating items left click on the floating text clickable!"}]}
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