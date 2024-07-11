event entity @s[tag=abyssal] ck:wing_1
playsound random.levelup @s[tag=abyssal]
tellraw @s[tag=abyssal] {"rawtext":[{"text":"§awing successfully used"}]}
tag @s[tag=!abyssal] add fail