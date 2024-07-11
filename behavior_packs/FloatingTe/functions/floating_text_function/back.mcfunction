replaceitem entity @s[tag=menu_edit1] slot.hotbar 0 da:menu 1
replaceitem entity @s[tag=menu_edit1] slot.hotbar 1 air 1
replaceitem entity @s[tag=menu_edit1] slot.hotbar 2 air 1
replaceitem entity @s[tag=menu_edit1] slot.hotbar 3 air 1
replaceitem entity @s[tag=menu_edit1] slot.hotbar 4 air 1
replaceitem entity @s[tag=menu_edit1] slot.hotbar 5 air 1
replaceitem entity @s[tag=menu_edit1] slot.hotbar 6 air 1
replaceitem entity @s[tag=menu_edit1] slot.hotbar 7 air 1
replaceitem entity @s[tag=menu_edit1] slot.hotbar 8 air 1
execute @s[tag=menu_edit1] ~ ~ ~ tag @s remove floating
tag @s remove menu_edit1
playsound block.barrel.close @s ~ ~ ~
execute @s[tag=menu_edit5] ~ ~ ~ tag @e[type=da:terra] remove edit
execute @s[tag=menu_edit5] ~ ~ ~ tag @e[type=da:sword] remove edit
execute @s[tag=menu_edit5] ~ ~ ~ tag @e[type=da:chestplate] remove edit
execute @s[tag=menu_edit5] ~ ~ ~ tag @e[type=da:skin_floating] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ tag @e[type=da:floating_text] remove edit
execute @s[tag=menu_edit2] ~ ~ ~ function floating_text_function/menu_home/menu_home
tellraw @s[tag=menu_edit3] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Menu edit floating text   §cDisabled!"}]}
execute @s[tag=menu_edit3] ~ ~ ~ function floating_text_function/menu_edit_multi/edit
execute @s[tag=menu_edit4] ~ ~ ~ function floating_text_function/menu_edit_multi/edit
tellraw @s[tag=menu_edit5] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §fNormal §6edit  §cDisabled!"}]}
execute @s[tag=menu_edit5] ~ ~ ~ function floating_text_function/menu_edit_multi/edit
tellraw @s[tag=menu_edit6] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Advanced edit §bFloating Item  §cDisabled!"}]}
execute @s[tag=menu_edit6] ~ ~ ~ function floating_text_function/menu_edit_multi/edit
tellraw @s[tag=menu_edit7] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Advanced edit §bFloating text clickable  §cDisabled!"}]}
execute @s[tag=menu_edit7] ~ ~ ~ function floating_text_function/menu_edit_multi/edit
execute @s[tag=menu_edit8] ~ ~ ~ function floating_text_function/menu_edit_multi/edit
tellraw @s[tag=menu_edit1] {"rawtext":[{"text":"§f[§6F§aT§f] §r§8>>§b"},{"selector":"@s"},{"text":" §6Advanced edit  §cDisabled!"}]}
execute @s[tag=floating] ~ ~ ~ tag @s remove cb1
execute @s[tag=floating] ~ ~ ~ tag @s remove cb2
execute @s[tag=floating] ~ ~ ~ tag @s remove cb3
execute @s[tag=floating] ~ ~ ~ tag @s remove cb4
execute @s[tag=floating] ~ ~ ~ tag @s remove cb5
execute @s[tag=floating] ~ ~ ~ tag @s remove cb6
execute @s[tag=floating] ~ ~ ~ tag @s remove cb7
execute @s[tag=floating] ~ ~ ~ tag @s remove cb8



