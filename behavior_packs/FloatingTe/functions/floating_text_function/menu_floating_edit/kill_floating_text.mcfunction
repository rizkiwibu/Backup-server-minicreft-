kill @e[type=da:floating_text,tag=edit]
tellraw @s[tag=menu_edit6] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §cYour floating text has been removed."}]}
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
function floating_text_function/menu_home/menu_home