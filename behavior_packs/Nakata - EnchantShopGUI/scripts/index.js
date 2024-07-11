import { system, world } from '@minecraft/server';
import { ChestFormData } from './@modules/forms.js';

const toolItems = [
  "minecraft:wooden_pickaxe",
  "minecraft:wooden_axe",
  "minecraft:wooden_shovel",
  "minecraft:wooden_hoe",
  "minecraft:stone_pickaxe",
  "minecraft:stone_axe",
  "minecraft:stone_shovel",
  "minecraft:stone_hoe",
  "minecraft:diamond_pickaxe",
  "minecraft:diamond_axe",
  "minecraft:diamond_shovel",
  "minecraft:diamond_hoe",
  "minecraft:iron_pickaxe",
  "minecraft:iron_axe",
  "minecraft:iron_shovel",
  "minecraft:iron_hoe",
  "minecraft:golden_pickaxe",
  "minecraft:golden_axe",
  "minecraft:golden_shovel",
  "minecraft:golden_hoe",
  "minecraft:netherite_pickaxe",
  "minecraft:netherite_axe",
  "minecraft:netherite_shovel",
  "minecraft:netherite_hoe",
  "minecraft:fishing_rod",
];

// Ranged Weapons
const rangedItems = [
  "minecraft:bow",
  "minecraft:crossbow",
  "minecraft:trident",
];

// Armor
const armorItems = [
  "minecraft:diamond_helmet",
  "minecraft:diamond_chestplate",
  "minecraft:diamond_leggings",
  "minecraft:diamond_boots",
  "minecraft:iron_helmet",
  "minecraft:iron_chestplate",
  "minecraft:iron_leggings",
  "minecraft:iron_boots",
  "minecraft:golden_helmet",
  "minecraft:golden_chestplate",
  "minecraft:golden_leggings",
  "minecraft:golden_boots",
  "minecraft:chainmail_helmet",
  "minecraft:chainmail_chestplate",
  "minecraft:chainmail_leggings",
  "minecraft:chainmail_boots",
  "minecraft:leather_helmet",
  "minecraft:leather_chestplate",
  "minecraft:leather_leggings",
  "minecraft:leather_boots",
  "minecraft:netherite_helmet",
  "minecraft:netherite_chestplate",
  "minecraft:netherite_leggings",
  "minecraft:netherite_boots",
];

// Melee Weapons
const meleeItems = [
  "minecraft:wooden_sword",
  "minecraft:stone_sword",
  "minecraft:diamond_sword",
  "minecraft:iron_sword",
  "minecraft:golden_sword",
  "minecraft:netherite_sword",
];

const enchantableItems = [
  "minecraft:wooden_sword",
  "minecraft:wooden_pickaxe",
  "minecraft:wooden_axe",
  "minecraft:wooden_shovel",
  "minecraft:wooden_hoe",
  "minecraft:stone_sword",
  "minecraft:stone_pickaxe",
  "minecraft:stone_axe",
  "minecraft:stone_shovel",
  "minecraft:stone_hoe",
  "minecraft:diamond_sword",
  "minecraft:diamond_pickaxe",
  "minecraft:diamond_axe",
  "minecraft:diamond_shovel",
  "minecraft:diamond_hoe",
  "minecraft:diamond_helmet",
  "minecraft:diamond_chestplate",
  "minecraft:diamond_leggings",
  "minecraft:diamond_boots",
  "minecraft:iron_sword",
  "minecraft:iron_pickaxe",
  "minecraft:iron_axe",
  "minecraft:iron_shovel",
  "minecraft:iron_hoe",
  "minecraft:iron_helmet",
  "minecraft:iron_chestplate",
  "minecraft:iron_leggings",
  "minecraft:iron_boots",
  "minecraft:golden_sword",
  "minecraft:golden_pickaxe",
  "minecraft:golden_axe",
  "minecraft:golden_shovel",
  "minecraft:golden_hoe",
  "minecraft:golden_helmet",
  "minecraft:golden_chestplate",
  "minecraft:golden_leggings",
  "minecraft:golden_boots",
  "minecraft:chainmail_helmet",
  "minecraft:chainmail_chestplate",
  "minecraft:chainmail_leggings",
  "minecraft:chainmail_boots",
  "minecraft:leather_helmet",
  "minecraft:leather_chestplate",
  "minecraft:leather_leggings",
  "minecraft:leather_boots",
  "minecraft:netherite_sword",
  "minecraft:netherite_pickaxe",
  "minecraft:netherite_axe",
  "minecraft:netherite_shovel",
  "minecraft:netherite_hoe",
  "minecraft:netherite_helmet",
  "minecraft:netherite_chestplate",
  "minecraft:netherite_leggings",
  "minecraft:netherite_boots",
  "minecraft:bow",
  "minecraft:fishing_rod",
  "minecraft:book",
  "minecraft:crossbow",
  "minecraft:trident"
];

system.runInterval(() => {
for (let player of world.getPlayers()) {
  if (player.hasTag("es")) {
    player.removeTag('es')
    const heldItem = player.getComponent("minecraft:inventory").container.getItem(player.selectedSlot);

    if (heldItem && enchantableItems.includes(heldItem.typeId.toLowerCase())) {
      switch (true) {
        case toolItems.includes(heldItem.typeId):
          toolsMenu(player);
          break;

        case rangedItems.includes(heldItem.typeId):
          rangeMenu(player);
          break;

        case armorItems.includes(heldItem.typeId):
          armorMenu(player);
          break;

        case meleeItems.includes(heldItem.typeId):
          meleeMenu(player);
          break;

        default:
          allPurposeMenu(player);
          break;
      }
    } else {
      player.sendMessage('§cTolong pegang item yang dapat saya enchant!');
    }
   }
  }
});


const toolsData = [
  {
    name: "Mending",
    max_level: 1,
    cost: 60000,
    enchant: "mending",
  },
  {
    name: "Unbreaking",
    max_level: 3,
    cost: 35000,
    enchant: "unbreaking",
  },
  {
    name: "Curse of Vanishing",
    max_level: 1,
    cost: 30000,
    enchant: "vanishing",
  },
  {
    name: "Efficiency",
    max_level: 5,
    cost: 40000,
    enchant: "efficiency",
  },
  {
    name: "Fortune",
    max_level: 3,
    cost: 45000,
    enchant: "fortune",
  },
  {
    name: "Luck Of The Sea",
    max_level: 3,
    cost: 15000,
    enchant: "luck_of_the_sea",
  },
  {
    name: "Lure",
    max_level: 3,
    cost: 15000,
    enchant: "lure",
  },
  {
    name: "Silk Touch",
    max_level: 1,
    cost: 30000,
    enchant: "silk_touch",
  },
];

const rangeData = [
  {
    name: "Mending",
    max_level: 1,
    cost: 60000,
    enchant: "mending",
  },
  {
    name: "Unbreaking",
    max_level: 3,
    cost: 35000,
    enchant: "unbreaking",
  },
  {
    name: "Curse of Vanishing",
    max_level: 1,
    cost: 30000,
    enchant: "vanishing",
  },
  {
    name: "Channeling",
    max_level: 1,
    cost: 35000,
    enchant: "channeling",
  },
  {
    name: "Flame",
    max_level: 1,
    cost: 35000,
    enchant: "flame",
  },
  {
    name: "Impaling",
    max_level: 5,
    cost: 30000,
    enchant: "impaling",
  },
  {
    name: "Infinity",
    max_level: 1,
    cost: 40000,
    enchant: "infinity",
  },
  {
    name: "Loyalty",
    max_level: 3,
    cost: 40000,
    enchant: "loyalty",
  },
  {
    name: "Riptide",
    max_level: 3,
    cost: 40000,
    enchant: "riptide",
  },
  {
    name: "Multishot",
    max_level: 1,
    cost: 35000,
    enchant: "multishot",
  },
  {
    name: "Piercing",
    max_level: 4,
    cost: 35000,
    enchant: "piercing",
  },
  {
    name: "Power",
    max_level: 5,
    cost: 40000,
    enchant: "power",
  },
  {
    name: "Punch",
    max_level: 2,
    cost: 35000,
    enchant: "punch",
  },
  {
    name: "Quick Charge",
    max_level: 3,
    cost: 35000,
    enchant: "quick_charge",
  },
];

const meleeData = [
  {
    name: "Mending",
    max_level: 1,
    cost: 60000,
    enchant: "mending",
  },
  {
    name: "Unbreaking",
    max_level: 3,
    cost: 35000,
    enchant: "unbreaking",
  },
  {
    name: "Curse of Vanishing",
    max_level: 1,
    cost: 30000,
    enchant: "vanishing",
  },
  {
    name: "Bane Of Arthropods",
    max_level: 5,
    cost: 30000,
    enchant: "bane_of_arthropods",
  },
  {
    name: "Fire Aspect",
    max_level: 2,
    cost: 40000,
    enchant: "fire_aspect",
  },
  {
    name: "Looting",
    max_level: 3,
    cost: 45000,
    enchant: "looting",
  },
  {
    name: "Knockback",
    max_level: 2,
    cost: 35000,
    enchant: "knockback",
  },
  {
    name: "Sharpness",
    max_level: 5,
    cost: 50000,
    enchant: "sharpness",
  },
  {
    name: "Smite",
    max_level: 3,
    cost: 45000,
    enchant: "smite",
  },
];

const armorData = [
  {
    name: "Mending",
    max_level: 1,
    cost: 60000,
    enchant: "mending",
  },
  {
    name: "Unbreaking",
    max_level: 3,
    cost: 35000,
    enchant: "unbreaking",
  },
  {
    name: "Curse of Vanishing",
    max_level: 1,
    cost: 30000,
    enchant: "vanishing",
  },
  {
    name: "Aqua Affinity",
    max_level: 1,
    cost: 25000,
    enchant: "aqua_affinity",
  },
  {
    name: "Blast Protection",
    max_level: 4,
    cost: 40000,
    enchant: "blast_protection",
  },
  {
    name: "Curse of Binding",
    max_level: 1,
    cost: 15000,
    enchant: "binding",
  },
  {
    name: "Depth Strider",
    max_level: 3,
    cost: 25000,
    enchant: "depth_strider",
  },
  {
    name: "Feather Falling",
    max_level: 4,
    cost: 30000,
    enchant: "feather_falling",
  },
  {
    name: "Fire Protection",
    max_level: 4,
    cost: 45000,
    enchant: "fire_protection",
  },
  {
    name: "Frost Walker",
    max_level: 2,
    cost: 30000,
    enchant: "frost_walker",
  },
  {
    name: "Projectile Protection",
    max_level: 4,
    cost: 40000,
    enchant: "projectile_protection",
  },
  {
    name: "Protection",
    max_level: 4,
    cost: 55000,
    enchant: "protection",
  },
  {
    name: "Respiration",
    max_level: 3,
    cost: 35000,
    enchant: "respiration",
  },
  {
    name: "Soul Speed",
    max_level: 3,
    cost: 25000,
    enchant: "soul_speed",
  },
  {
    name: "Thorns",
    max_level: 3,
    cost: 50000,
    enchant: "thorns",
  },
];

const allPurpose = [
  {
    name: "Mending",
    max_level: 1,
    cost: 60000,
    enchant: "mending",
  },
  {
    name: "Unbreaking",
    max_level: 3,
    cost: 35000,
    enchant: "unbreaking",
  },
  {
    name: "Curse of Vanishing",
    max_level: 1,
    cost: 30000,
    enchant: "vanishing",
  },
];

function toolsMenu(player) {
  let c = new ChestFormData('small');

  c.title('Tools | Menu');
  
  toolsData.forEach((enchant, index) => {
    c.button(index + 0, `§l§6${enchant.name}`, ['', `Max Level: ${enchant.max_level}\n§r§7Price ${enchant.cost}`, 'Click any item!'], "textures/items/book_enchanted", 1);
  });

  c.show(player).then(response => {
    if (response.canceled) return;
    let selectedEnchant = toolsData[response.selection - 0];
    confirmBuy(player, selectedEnchant)
  });
}


function rangeMenu(player) {
  let c = new ChestFormData('small');

  c.title('Range | Menu');
  
  rangeData.forEach((enchant, index) => {
    c.button(index + 0, `§l§6${enchant.name}`, ['', `Max Level: ${enchant.max_level}\n§r§7Price ${enchant.cost}`, 'Click any item!'], "textures/items/book_enchanted", 1);
  });

  c.show(player).then(response => {
    if (response.canceled) return;
    let selectedEnchant = rangeData[response.selection - 0];
    confirmBuy(player, selectedEnchant)
  });
}

function meleeMenu(player) {
  let c = new ChestFormData('small');

  c.title('Melee | Menu');
  
  meleeData.forEach((enchant, index) => {
    c.button(index + 0, `§l§6${enchant.name}`, ['', `Max Level: ${enchant.max_level}\n§r§7Price ${enchant.cost}`, 'Click any item!'], "textures/items/book_enchanted", 1);
  });

  c.show(player).then(response => {
    if (response.canceled) return;
    let selectedEnchant = meleeData[response.selection - 0];
    confirmBuy(player, selectedEnchant)
  });
}

function armorMenu(player) {
  let c = new ChestFormData('small');

  c.title('Armor | Menu');
  
  armorData.forEach((enchant, index) => {
    c.button(index + 0, `§l§6${enchant.name}`, ['', `Max Level: ${enchant.max_level}\n§r§7Price ${enchant.cost}`, 'Click any item!'], "textures/items/book_enchanted", 1);
  });

  c.show(player).then(response => {
    if (response.canceled) return;
    let selectedEnchant = armorData[response.selection - 0];
    confirmBuy(player, selectedEnchant)
  });
}

function allPurposeMenu(player) {
  let c = new ChestFormData('small');

  c.title('Main Menu');
  
  allPurpose.forEach((enchant, index) => {
    c.button(index + 0, `§l§6${enchant.name}`, ['', `Max Level: ${enchant.max_level}\n§r§7Price ${enchant.cost}`, 'Click any item!'], "textures/items/book_enchanted", 1);
  });

  c.show(player).then(response => {
    if (response.canceled) return;
    let selectedEnchant = allPurpose[response.selection - 0];
    confirmBuy(player, selectedEnchant)
  });
}

let selectedItemQuantity = 1;

function confirmBuy(player, selectedEnchant) {
    let confirmForm = new ChestFormData("large");
    let initialQuantity = 1;
    let money = getScore(player, 'money')
    confirmForm.title("Confirm Buy");
    confirmForm.button(22, `${selectedEnchant.name} x${selectedItemQuantity}`, [`\n§6Cost: ${selectedEnchant.cost * selectedItemQuantity}\n§7Click to buy`], "textures/items/book_enchanted", selectedItemQuantity);
    confirmForm.button(30, "§aAdd 1x level", ["\n§7Click to add"], "minecraft:green_stained_glass");
    confirmForm.button(32, "§cRemove 1x level", ["\n§7Click to remove"], "minecraft:red_stained_glass");
    confirmForm.show(player).then(res => {
    let dataCost = selectedEnchant.cost * selectedItemQuantity;
        if (res.canceled) {
         selectedItemQuantity = initialQuantity;
         return;          
         }

        if (res.selection === 22) {
            if (money >= dataCost) {
                player.runCommandAsync(`scoreboard players remove @s money ${dataCost}`);
                player.runCommandAsync(`enchant @s ${selectedEnchant.enchant} ${selectedItemQuantity}`);
                player.sendMessage(`§aSuccesfully buy ${selectedEnchant.name} with level ${selectedItemQuantity}`)
                selectedItemQuantity = 1;
            } else {
                player.sendMessage("§cNot enough money to buy!");
            }
        } else if (res.selection === 30) {
            if (selectedItemQuantity < selectedEnchant.max_level) {
                selectedItemQuantity += 1;
            } else {
                player.sendMessage("§cLevel Enchantment already at max!");
            }
        } else if (res.selection === 32) {
            if (selectedItemQuantity > 1) {
                selectedItemQuantity -= 1;
            } else {
                player.sendMessage("§cYou can't remove anymore!");
            }
        }
        confirmBuy(player, selectedEnchant);
    });
}


export function getScore(target, objective) {
  try {
    const oB = world.scoreboard.getObjective(objective);
    if (typeof target === "string") {
      const participant = oB
        .getParticipants()
        .find((pT) => pT.displayName === target);
      const score = participant ? oB.getScore(participant) : 0;
      return score === undefined ? 0 : score;
    }
    const score = oB.getScore(target.scoreboardIdentity);
    return score === undefined ? 0 : score;
  } catch {
    return 0;
  }
}