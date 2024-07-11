kill @e[type=da:floating_text_clickable1,tag=edit]
kill @e[type=da:floating_text_clickable2,tag=edit]
kill @e[type=da:floating_text_clickable3,tag=edit]
kill @e[type=da:floating_text_clickable4,tag=edit]
kill @e[type=da:floating_text_clickable5,tag=edit]
kill @e[type=da:floating_text_clickable6,tag=edit]
kill @e[type=da:floating_text_clickable7,tag=edit]
kill @e[type=da:floating_text_clickable8,tag=edit]
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
tellraw @s[tag=menu_edit7] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §cYour item floating text clickable has been removed."}]}
function floating_text_function/menu_edit_multi/edit