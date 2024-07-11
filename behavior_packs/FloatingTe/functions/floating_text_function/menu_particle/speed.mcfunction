scoreboard players add @e[type=da:floating_text,tag=edit] speed 1
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
execute @e[type=da:floating_text,tag=edit,scores={speed=4}] ~ ~ ~ scoreboard players set @e[type=da:floating_text,scores={speed=4}] speed 1
