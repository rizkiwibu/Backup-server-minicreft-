scoreboard players remove @e[type=da:floating_text,tag=edit] particle 1
playsound lodestone_compass.link_compass_to_lodestone @s ~ ~ ~
execute @e[type=da:floating_text,tag=edit,scores={particle=-1}] ~ ~ ~ scoreboard players set @e[type=da:floating_text,scores={particle=-1}] particle 12
