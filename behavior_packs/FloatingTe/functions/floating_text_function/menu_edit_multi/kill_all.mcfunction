kill @e[type=da:floating_text]
kill @e[type=da:land]
kill @e[type=da:sword]
kill @e[type=da:chestplate]
kill @e[type=da:skin_floating]
kill @e[type=da:floating_text_clickable1]
kill @e[type=da:floating_text_clickable2]
kill @e[type=da:floating_text_clickable3]
kill @e[type=da:floating_text_clickable4]
kill @e[type=da:floating_text_clickable5]
kill @e[type=da:floating_text_clickable6]
kill @e[type=da:floating_text_clickable7]
kill @e[type=da:floating_text_clickable8]
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
tellraw @s[tag=menu_edit6] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §cAll floating text components removed."}]}
function floating_text_function/menu_home/menu_home