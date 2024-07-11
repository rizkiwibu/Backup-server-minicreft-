event entity @s[tag=lightning] ck:wing_4
playsound random.levelup @s[tag=lightning]
tellraw @s[tag=lightning] {"rawtext":[{"text":"§awing successfully used"}]}
tag @s[tag=!lightning] add fail