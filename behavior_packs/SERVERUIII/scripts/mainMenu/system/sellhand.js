import { world, system, ItemStack } from "@minecraft/server"

let sellItems = [
  {
    id: 'minecraft:iron_ingot',
    name: 'Iron Ingot',
    value: 400,
  },
  {
    id: 'minecraft:diamond',
    name: 'Diamond',
    value: 800,
  },
  {
    id: 'minecraft:sugar_cane',
    name: 'Sugar Cane',
    value: 50,
  },
  {
    id: 'minecraft:gold_ingot',
    name: 'Gold Ingot',
    value: 750,
  },
  {
    id: 'minecraft:emerald',
    name: 'Emerald',
    value: 1500,
  },
  {
    id: 'minecraft:apple',
    name: 'Apple',
    value: 3,
  },
  {
    id: 'minecraft:coal',
    name: 'Coal',
    value: 10,
  },
  {
    id: 'minecraft:wheat',
    name: 'Wheat',
    value: 30,
  },
  {
    id: 'minecraft:carrot',
    name: 'Carrot',
    value: 35,
  },
  {
    id: 'minecraft:potato',
    name: 'Potato',
    value: 35,
  },
  {
    id: 'minecraft:beetroot',
    name: 'Beetroot',
    value: 30,
  },
  {
    id: 'minecraft:snowball',
    name: 'Snowball',
    value: 1,
  },
  {
    id: 'minecraft:slime_ball',
    name: 'Slime ball',
    value: 4,
  },
  {
    id: 'minecraft:egg',
    name: 'Egg',
    value: 6,
  },
  {
    id: 'minecraft:netherite_ingot',
    name: 'Netherite',
    value: 20000,
  },
  {
    id: 'minecraft:copper_ingot',
    name: 'Copper',
    value: 10,
  },
  {
    id: 'minecraft:melon',
    name: 'Melon',
    value: 6,
  },
  {
    id: 'minecraft:cookie',
    name: 'Cookie',
    value: 10,
  },
  {
    id: 'minecraft:sweet_berries',
    name: 'Sweet Berrie',
    value: 6,
  },
  {
    id: 'minecraft:glow_berries',
    name: 'Glow Barries',
    value: 10,
  },
  {
    id: 'minecraft:golden_apple',
    name: 'Golden Apple',
    value: 60,
  },
  {
    id: 'minecraft:enchanted_golden_apple',
    name: 'Enchanted Golden Apple',
    value: 60,
  },
  {
    id: 'minecraft:iron_ore',
    name: 'Iron Ore',
    value: 10,
  },
  {
    id: 'minecraft:coal_ore',
    name: 'Coal Ore',
    value: 10,
  },
  {
    id: 'minecraft:copper_ore',
    name: 'Copper Ore',
    value: 10,
  },
  {
    id: 'minecraft:diamond_ore',
    name: 'Diamond Ore',
    value: 30,
  },
  {
    id: 'minecraft:emerald_ore',
    name: 'Emerald Ore',
    value: 50,
  },
  {
    id: 'minecraft:gold_ore',
    name: 'Gold Ore',
    value: 10,
  },
  {
    id: 'minecraft:redstone_ore',
    name: 'Redstone Ore',
    value: 10,
  },
  {
    id: 'minecraft:copper_ore',
    name: 'Copper ore',
    value: 5,
  },
  {
    id: 'minecraft:lapis_ore',
    name: 'Lapis Ore',
    value: 7,
  },
  {
    id: 'minecraft:quartz_ore',
    name: 'Quartz Ore',
    value: 10,
  },
  {
    id: 'minecraft:golden_carrot',
    name: 'Golden Carrot',
    value: 50,
  },
  {
    id: 'minecraft:glistering_melon_slice',
    name: 'Glistering melon',
    value: 30,
  },
  {
    id: 'minecraft:baked_potato',
    name: 'Baked Potato',
    value: 3,
  },
  {
    id: 'minecraft:charcoal',
    name: 'Charcoal',
    value: 5,
  },
  {
    id: 'minecraft:stick',
    name: 'Stick',
    value: 2,
  },
  {
    id: 'minecraft:string',
    name: 'String',
    value: 2,
  },
  {
    id: 'minecraft:feather',
    name: 'Feather',
    value: 1,
  },
  {
    id: 'minecraft:leather',
    name: 'Leather',
    value: 4,
  },
  {
    id: 'minecraft:kelp',
    name: 'Kelp',
    value: 8,
  },
  {
    id: 'minecraft:bone',
    name: 'Bone',
    value: 3,
  },
  {
    id: 'minecraft:sugar',
    name: 'Sugar',
    value: 6,
  },
  {
    id: 'minecraft:cake',
    name: 'Cake',
    value: 8,
  },
  {
    id: 'minecraft:bed',
    name: 'Bed',
    value: 4,
  },
  {
    id: 'minecraft:ender_pearl',
    name: 'Ender Pearl',
    value: 30,
  },
  {
    id: 'minecraft:blaze_rod',
    name: 'Blaze Rod',
    value: 10,
  },
  {
    id: 'minecraft:ghast_tear',
    name: 'Ghast Tear',
    value: 2,
  },
  {
    id: 'minecraft:gold_nugget',
    name: 'Gold Nugget',
    value: 3,
  },
  {
    id: 'minecraft:blaze_powder',
    name: 'Blaze Powder',
    value: 10,
  },
  {
    id: 'minecraft:magma_cream',
    name: 'Magma Cream',
    value: 13,
  },
  {
    id: 'minecraft:ender_eye',
    name: 'Ender Eye',
    value: 10,
  },
  {
    id: 'minecraft:raw_iron',
    name: 'Raw Iron',
    value: 500,
  },
  {
    id: 'minecraft:raw_copper',
    name: 'Raw Copper',
    value: 100,
  },
  {
    id: 'minecraft:raw_gold',
    name: 'Raw Gold',
    value: 250,
  },
  {
    id: 'minecraft:nether_star',
    name: 'Nether Star',
    value: 40000,
  },
  {
    id: 'minecraft:paper',
    name: 'Paper',
    value: 5,
  },
  {
    id: 'minecraft:prismarine_shard',
    name: 'Prismarine Shard',
    value: 10,
  },
  {
    id: 'minecraft:ancient_debriss',
    name: 'Ancient Debriss',
    value: 2500,
  },
  {
    id: 'minecraft:netherite_ingot',
    name: 'Netherite Ingot',
    value: 10000,
  },
  {
    id: 'minecraft:bamboo',
    name: 'Bambu',
    value: 40,
  },
  {
    id: 'minecraft:sea_grass',
    name: 'Rumput lawd',
    value: 3,
  },
  {
    id: 'minecraft:bread',
    name: 'Roti',
    value: 10,
  },
];


system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("sellh")) {
      sellHandItem(player);
      player.runCommandAsync(`tag @s remove sellh`);
    }
  }
});

export function sellHandItem(player) {
    const inventory = player.getComponent('inventory').container;
    const item = inventory.getItem(player.selectedSlot);
    if (!item) {
        player.sendMessage("§cYou are not holding anything to sell");
        return 0;
    }
    const soldItem = sellItems.find(element => element.id === item.typeId);
    if (!soldItem) {
        player.sendMessage("§cYou cannot sell this item");
        return 0;
    }
    const amount = soldItem.value * item.amount;
    clearItem(player, player.selectedSlot)
    player.runCommandAsync(`scoreboard players add @s money ${amount}`);
    player.sendMessage(`§a§lSuccess! §r§7sold §8${item.amount} ${soldItem.name}§7 for §8$${amount}!`);
    return amount;
}

export function clearItem(player, slot){
    slot = slot + 0;

    if (slot >= 0) {
        try {
            if(slot <= 8) player.runCommandAsync(`replaceitem entity @s slot.hotbar ${slot} air 1`);
                else player.runCommandAsync(`replaceitem entity @s slot.inventory ${slot - 9} air 1`);
        } catch(error) { }
    }
}