kill @e[type=da:land,tag=edit]
kill @e[type=da:sword,tag=edit]
kill @e[type=da:chestplate,tag=edit]
kill @e[type=da:skin_floating,tag=edit]
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
tellraw @s[tag=menu_edit6] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §cYour item floating text has been removed."}]}
function floating_text_function/menu_edit_multi/edit