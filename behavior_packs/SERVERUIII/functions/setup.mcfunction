scoreboard objectives add tick dummy
scoreboard players add @a[tag=open] tick 1
tag @a[tag=open,scores={tick=20}] add wing
tag @a[tag=open,scores={tick=20}] remove open
scoreboard players reset @a[scores={tick=20}] tick
tickingarea add circle ~~~ 4 wing
gamerule commandblockoutput false