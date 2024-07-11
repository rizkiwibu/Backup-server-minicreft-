event entity @s[tag=poison] ck:wing_5
playsound random.levelup @s[tag=poison]
tellraw @s[tag=poison] {"rawtext":[{"text":"§awing successfully used"}]}
tag @s[tag=!poison] add fail