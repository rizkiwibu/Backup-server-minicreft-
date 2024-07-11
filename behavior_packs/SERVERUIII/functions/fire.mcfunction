event entity @s[tag=fire] ck:wing_2
playsound random.levelup @s[tag=fire]
tellraw @s[tag=fire] {"rawtext":[{"text":"§awing successfully used"}]}
tag @s[tag=!fire] add fail