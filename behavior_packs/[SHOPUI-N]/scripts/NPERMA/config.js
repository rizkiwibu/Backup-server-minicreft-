//note: dont sell this addon!!!!!

/**
 * @Command :
 * +shop: to open shopui
 * +stocktime: to see next restock time
 * +restock: restock shop
 *
 * @Devcommand :
 * +del: delete db player
 *
 * @information :
 * + Support NPC (using tags, addTag to Entity)
 * + Custom UI
 * + Stock System
 * + @CREATOR : @Nperma
 *
 * @Path :
 *  ShopUI
 *  ╰ Category
 *    ╰ Items
 */

const config = {
    chat_command: ["+shopui", "+shop"],
    author: "nperma", //dont change this
    enablewatchdog: true,
    allshopTag: "allshop", //for Entity
    scoreobj: "money",
    bypassrestock: ["NASRULGgindo", "yourgamerTag", "Ananda1240", "Fluyinn"], //gamertag, bypass/access to use command '+restock'

    translate: {
        form_title: "§l[ SHOP UI ]",
        form_title_category: name => `§l[ ${name} Category ]`,
        form_title_selected: name => `§l[ ${name} ]`,
        form_body_main: "§2» §l§bSHOP UI ADDON\n§r§2» §byour money: §g${money}",
        form_body_category:
            "§2» §bCategory: §l§7{category}\n§r§2» §byour money: §g${money}",
        form_body_selected:
            "§2» §byour money: §g${money}\n§2» §bpricePerItem: §a${price}\n§2» §bstock: §7x{stock}\n§2» §bamount: §7",
        buy_failed_money: `§2» §cyou don't have enough money to buy this`,
        buy_failed_slot: `§2» §cfailed to purchase, need another §4{slot} §cto accommodate the amount into your inventory`,
        buy_success:
            "§2» §ayou bought §2{amount} {itemid}§a for §g${price}§a, your money now §e${money}§a, stock: §e{stock}",
        insufficient_stock:
            "§2» §cNot enough stock available. Current stock: {stock}",
        restock: "§2» §7Restock shop",
        next_restock: "§2» §7Next restock time is on§a {time} {date}",
        stock_enough:
            "§2» §cYour stock for this item is out of stock, wait for the next restock at §a{time} {date}"

        /**
         * @placeholder next_restock && stock_enough:
         * {time} : show time next restock
         * {date} : show date next restock
         *
         * @placeholder form_body_main:
         * {money} : Display your money
         *
         * @placeholder form_body_category:
         * {money} : Display your money
         * {category} : Display Category
         *
         * @placeholder form_body_selected:
         * {price} : Display price item
         * {money} : Display your money
         *
         * @placeholder buy_success:
         * {money} : Display your money
         * {itemid} : Display itemid
         * {amount} : Display amount
         * {stock} : Display stock
         * {price} : Display Price
         */
    },

    default_stock: 10,

    trigger: {
        //not support for Player
        interact: true, //only support for entity have property interact (e.g., npc), default: true
        hit: true //hitEntity (note: if you hit entity.npc and you opped, the entity will despawn), not Recommend
    },

    reset_shop_cooldown: "(1|30|0)", //format: (?hour|minute|second), default time reset: 1hour 30min 0sec

    timeoption: {
        locales: "id-ID", //default locate Indonesian
        options: {
            timeZoneName: "short",
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    }, //check docs : https://www.w3schools.com/jsref/jsref_tolocalestring.asp

    buttons: [
        {
            texture: "textures/blocks/planks_oak",
            name: "§lPlanks\n§r§f[ click here ]",
            tag: "plankshop",
            array: [
                {
                    texture: "textures/blocks/planks_oak",
                    buttonname: "Oak Plank\n[ click here ]",
                    itemid: "minecraft:planks",
                    data: 0,
                    min_buy: 1,
                    max_buy: 64,
                    price: 24,
                    stock: 2024
                },
                {
                    texture: "textures/blocks/planks_spruce",
                    buttonname: "Spruce Plank\n[ click here ]",
                    itemid: "minecraft:planks",
                    data: 1,
                    min_buy: 1,
                    max_buy: 64,
                    price: 24,
                    stock: 2024
                },
                {
                    texture: "textures/blocks/planks_birch",
                    buttonname: "Brich Plank\n[ click here ]",
                    itemid: "minecraft:planks",
                    data: 2,
                    min_buy: 1,
                    max_buy: 64,
                    price: 24,
                    stock: 2024
                },
                {
                    texture: "textures/blocks/planks_jungle",
                    buttonname: "Jungle Plank\n[ click here ]",
                    itemid: "minecraft:planks",
                    data: 3,
                    min_buy: 1,
                    max_buy: 64,
                    price: 24,
                    stock: 2024
                },
                {
                    texture: "textures/blocks/planks_acacia",
                    buttonname: "Acacia Plank\n[ click here ]",
                    itemid: "minecraft:planks",
                    data: 4,
                    min_buy: 1,
                    max_buy: 64,
                    price: 24,
                    stock: 2024
                },
                {
                    texture: "textures/blocks/planks_big_oak",
                    buttonname: "Dark Oak Plank\n[ click here ]",
                    itemid: "minecraft:planks",
                    data: 5,
                    min_buy: 1,
                    max_buy: 64,
                    price: 34,
                    stock: 225
                }
            ]
        },
        {
            texture: "textures/blocks/log_oak",
            name: "§lLog\n§r§f[ click here ]",
            tag: "logshop",
            array: [
                {
                    texture: "textures/blocks/log_oak",
                    buttonname: "Oak Log\n[ click here ]",
                    itemid: "minecraft:log",
                    data: 0,
                    min_buy: 1,
                    max_buy: 64,
                    stock: 1140,
                    price: 12
                },
                {
                    texture: "textures/blocks/log_spruce",
                    buttonname: "Spruce Log\n[ click here ]",
                    itemid: "minecraft:log",
                    data: 1,
                    min_buy: 1,
                    max_buy: 64,
                    stock: 1140,
                    price: 12
                },
                {
                    texture: "textures/blocks/log_birch",
                    buttonname: "Birch Log\n[ click here ]",
                    itemid: "minecraft:log",
                    data: 2,
                    min_buy: 1,
                    max_buy: 64,
                    stock: 1140,
                    price: 12
                },
                {
                    texture: "textures/blocks/log_jungle",
                    buttonname: "Jungle Log\n[ click here ]",
                    itemid: "minecraft:log",
                    data: 3,
                    min_buy: 1,
                    max_buy: 64,
                    stock: 1140,
                    price: 12
                },
                {
                    texture: "textures/blocks/log_acacia",
                    buttonname: "Acacia Log\n[ click here ]",
                    itemid: "minecraft:log2",
                    data: 0,
                    min_buy: 1,
                    max_buy: 64,
                    stock: 1140,
                    price: 12
                },
                {
                    texture: "textures/blocks/log_big_oak",
                    buttonname: "Oak Log\n[ click here ]",
                    itemid: "minecraft:log2",
                    data: 1,
                    min_buy: 1,
                    max_buy: 64,
                    stock: 1140,
                    price: 12
                }
            ]
        },
        {
            texture: "textures/items/dye_powder_green",
            name: "§lColor Dye\n§r§f[ click here ]",
            tag: "dyeshop",
            array: [
                {
                    texture: "textures/items/dye_powder_white_new",
                    buttonname: "White dye\n[ click here ]",
                    itemid: "minecraft:white_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                },
                {
                    texture: "textures/items/dye_powder_red",
                    buttonname: "Red dye\n[ click here ]",
                    itemid: "minecraft:red_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                },
                {
                    texture: "textures/items/dye_powder_blue",
                    buttonname: "Blue dye\n[ click here ]",
                    itemid: "minecraft:blue_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                },
                {
                    texture: "textures/items/dye_powder_green",
                    buttonname: "Green dye\n[ click here ]",
                    itemid: "minecraft:green_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                },
                {
                    texture: "textures/items/dye_powder_gray",
                    buttonname: "Gray dye\n[ click here ]",
                    itemid: "minecraft:gray_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                },
                {
                    texture: "textures/items/dye_powder_lime",
                    buttonname: "Lime dye\n[ click here ]",
                    itemid: "minecraft:lime_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                },
                {
                    texture: "textures/items/dye_powder_pink",
                    buttonname: "Pink dye\n[ click here ]",
                    itemid: "minecraft:pink_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                },
                {
                    texture: "textures/items/dye_powder_yellow",
                    buttonname: "Yellow dye\n[ click here ]",
                    itemid: "minecraft:yellow_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                },
                {
                    texture: "textures/items/dye_powder_orange",
                    buttonname: "Orange dye\n[ click here ]",
                    itemid: "minecraft:orange_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                },
                {
                    texture: "textures/items/dye_powder_black",
                    buttonname: "Black dye\n[ click here ]",
                    itemid: "minecraft:black_dye",
                    data: 0,
                    min_buy: 1,
                    max_buy: 32,
                    price: 64,
                    stock: 228
                }
            ]
        },
        {
            texture: "textures/items/weapon/doombringer_axe",
            name: "§l§cSWORD LEGENDARY\n§r§f[ click here ]",
            tag: "legendaryshop",
            array: [
                {
                    texture: "textures/items/weapon/godaxe",
                    buttonname: "§c§lGODAXE§r\n[ §rPrice : §e$§r 1,5§aJt§r ]",
                    itemid: "two:godaxe",
                    data: 0,
                    min_buy: 1,
                    max_buy: 1,
                    price: 1500000,
                    stock: 1
                },
                {
                    texture: "textures/items/weapon/doombringer_axe",
                    buttonname: "§l§4DOOMBRINGER_AXE§r\n[ §rPrice : §e$§r 1,5§aJt§r ]",
                    itemid: "two:doombringer_axe",
                    data: 0,
                    min_buy: 1,
                    max_buy: 1,
                    price: 1500000,
                    stock: 1
                },
                {
                    texture: "textures/items/weapon/dual_ender",
                    buttonname: "§l§aDUAL_ENDER§r\n[ §rPrice : §e$§r 800§aK§r ]",
                    itemid: "two:dual_ender",
                    data: 0,
                    min_buy: 1,
                    max_buy: 1,
                    price: 800000,
                    stock: 5
                },
                {
                    texture: "textures/items/weapon/venuzdonoa",
                    buttonname: "§l§dVENUZDONOA§r\n[ §rPrice : §e$§r 1,1§aJt§r ]",
                    itemid: "two:venuzdonoa",
                    data: 0,
                    min_buy: 1,
                    max_buy: 1,
                    price: 1100000,
                    stock: 1
                },
                {
                    texture: "textures/items/weapon/frost_slayer",
                    buttonname: "§l§bFROST_SLAYER§r\n[ §rPrice : §e$§r 2,0§aJt§r ]",
                    itemid: "two:frost_slayer",
                    data: 0,
                    min_buy: 1,
                    max_buy: 1,
                    price: 2000000,
                    stock: 1
                }
            ]
        },
        {
            texture: "textures/blocks/crafting_table_top",
            name: "§lNecessary\n§r§f[ click here ]",
            tag: "necessaryshop",
            array: [
                {
                    texture: "textures/blocks/crafting_table_side",
                    buttonname: "Crafting Table\n[ click here ]",
                    itemid: "minecraft:crafting_table",
                    min_buy: 1,
                    max_buy: 12,
                    price: 544,
                    stock: 34
                },
                {
                    texture: "textures/items/bed_white",
                    buttonname: "Bed for Sleep\n[ click here ]",
                    itemid: "minecraft:bed",
                    data: 0,
                    min_buy: 1,
                    max_buy: 1,
                    price: 880
                },
                {
                    texture: "textures/blocks/torch_on",
                    buttonname: "Torch\n[ click here ]",
                    itemid: "minecraft:torch",
                    min_buy: 4,
                    max_buy: 64,
                    price: 80,
                    stock: 128
                },
                {
                    texture: "textures/items/bucket_empty",
                    buttonname: "Bucket\n[ click here ]",
                    itemid: "minecraft:bucket",
                    min_buy: 1,
                    max_buy: 1,
                    price: 186
                },
                {
                    texture: "textures/items/potion_bottle_empty",
                    buttonname: "Glass Bottle\n[ click here ]",
                    itemid: "minecraft:glass_bottle",
                    min_buy: 1,
                    max_buy: 16,
                    price: 50,
                    stock: 32
                },
                {
                    texture: "textures/items/fishing_rod_uncast",
                    buttonname: "Fishing Rod\n[ click here ]",
                    itemid: "minecraft:fishing_rod",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1200
                },
                {
                    texture: "textures/items/totem",
                    buttonname: "Totem of Undying\n[ click here ]",
                    itemid: "minecraft:totem_of_undying",
                    min_buy: 1,
                    max_buy: 1,
                    price: 64000,
                    stock: 2
                },
                {
                    texture: "textures/blocks/furnace_front_off",
                    buttonname: "Furnace\n[ click here ]",
                    itemid: "minecraft:furnace",
                    min_buy: 1,
                    max_buy: 12,
                    price: 744,
                    stock: 12
                },
                {
                    texture: "textures/blocks/blast_furnace_front_off",
                    buttonname: "Blast Furnace\n[ click here ]",
                    itemid: "minecraft:blast_furnace",
                    min_buy: 1,
                    max_buy: 12,
                    price: 998,
                    stock: 12
                },
                {
                    texture: "textures/blocks/smithing_table_side",
                    buttonname: "Smithing Table\n[ click here ]",
                    itemid: "minecraft:smithing_table",
                    min_buy: 1,
                    max_buy: 7,
                    price: 5444,
                    stock: 7
                },
                {
                    texture: "textures/blocks/stonecutter_side",
                    buttonname: "Stone Cutter\n[ click here ]",
                    itemid: "minecraft:stonecutter",
                    min_buy: 1,
                    max_buy: 34,
                    price: 644,
                    stock: 34
                },
                {
                    texture: "textures/items/gunpowder",
                    buttonname: "Gunpowder\n[ click here ]",
                    itemid: "minecraft:gunpowder",
                    min_buy: 1,
                    max_buy: 64,
                    price: 640,
                    stock: 64
                },
                {
                    texture: "textures/items/cauldron",
                    buttonname: "Cauldron\n[ click here ]",
                    itemid: "minecraft:cauldron",
                    min_buy: 1,
                    max_buy: 2,
                    price: 1200,
                    stock: 16
                },
                {
                    texture: "textures/blocks/bookshelf",
                    buttonname: "Book Shelf\n[ click here ]",
                    itemid: "minecraft:bookshelf",
                    min_buy: 1,
                    max_buy: 64,
                    price: 1000,
                    stock: 280
                },
                {
                    texture: "textures/blocks/enchanting_table_side",
                    buttonname: "Enchanting Table\n[ click here ]",
                    itemid: "minecraft:enchanting_table",
                    min_buy: 1,
                    max_buy: 64,
                    price: 440000,
                    stock: 2
                },
                {
                    texture: "textures/blocks/ladder",
                    buttonname: "Ladder\n[ click here ]",
                    itemid: "minecraft:ladder",
                    min_buy: 4,
                    max_buy: 64,
                    price: 166,
                    stock: 600
                },
                {
                    texture: "textures/items/ender_pearl",
                    buttonname: "Ender Pearl\n[ click here ]",
                    itemid: "minecraft:ender_pearl",
                    min_buy: 6,
                    max_buy: 16,
                    price: 320,
                    stock: 64
                },
                {
                    texture: "textures/items/amethyst_shard",
                    buttonname: "amethyst Shard\n[ click here ]",
                    itemid: "minecraft:amethyst_shard",
                    min_buy: 1,
                    max_buy: 32,
                    price: 600,
                    stock: 64
                },
                {
                    texture: "textures/items/blaze_rod",
                    buttonname: "Blaze Rod\n[ click here ]",
                    itemid: "minecraft:blaze_rod",
                    min_buy: 2,
                    max_buy: 64,
                    price: 128,
                    stock: 280
                }
            ]
        },
        {
            texture: "textures/keys/cherry",
            name: "§lKEY\n§r§f[ click here ]",
            tag: "keyshop",
            array: [
                {
                    texture: "textures/keys/cherry",
                    buttonname: "§cLegendary §rKey\n[ click here ]",
                    itemid: "je:legendary",
                    min_buy: 1,
                    max_buy: 5,
                    price: 350000,
                    stock: 25
                 },                
                {
                    texture: "textures/keys/cherry",
                    buttonname: "§bBlueFlame §rKey\n[ click here ]",
                    itemid: "je:blueflame",
                    min_buy: 1,
                    max_buy: 5,
                    price: 150000,
                    stock: 25
                 },
                {
                    texture: "textures/keys/cherry",
                    buttonname: "§dCherry §rKey\n[ click here ]",
                    itemid: "je:cherry",
                    min_buy: 1,
                    max_buy: 5,
                    price: 100000,
                    stock: 25
                },
                {
                    texture: "textures/keys/cherry",
                    buttonname: "§eFlame §rKey\n[ click here ]",
                    itemid: "je:flame",
                    min_buy: 1,
                    max_buy: 5,
                    price: 260000,
                    stock: 25
                }
            ]
        },
        {
            texture: "textures/items/diamond",
            name: "§lORE\n§r§f[ click here ]",
            tag: "oreshop",
            array: [
                {
                    texture: "textures/items/diamond",
                    buttonname: "Diamond\n[ click here ]",
                    itemid: "minecraft:diamond",
                    min_buy: 1,
                    max_buy: 64,
                    price: 2000,
                    stock: 999
                 },                
                {
                    texture: "textures/items/netherite_ingot",
                    buttonname: "Netherite\n[ click here ]",
                    itemid: "minecraft:netherite_ingot",
                    min_buy: 1,
                    max_buy: 64,
                    price: 5000,
                    stock: 999
                 },
                {
                    texture: "textures/items/emerald",
                    buttonname: "emerald\n[ click here ]",
                    itemid: "minecraft:emerald",
                    min_buy: 1,
                    max_buy: 64,
                    price: 2500,
                    stock: 999
                },
                {
                    texture: "textures/items/iron_ingot",
                    buttonname: "Iron\n[ click here ]",
                    itemid: "minecraft:iron_ingot",
                    min_buy: 1,
                    max_buy: 64,
                    price: 1600,
                    stock: 999
                 },
                {
                    texture: "textures/items/gold_ingot",
                    buttonname: "Gold\n[ click here ]",
                    itemid: "minecraft:gold_ingot",
                    min_buy: 1,
                    max_buy: 64,
                    price: 1000,
                    stock: 999                   
                 },
                {
                    texture: "textures/items/coal",
                    buttonname: "Coal\n[ click here ]",
                    itemid: "minecraft:coal",
                    min_buy: 1,
                    max_buy: 64,
                    price: 700,
                    stock: 999
                }
            ]
        },
        {
            texture: "textures/items/diamond_axe",
            name: "§lTOOLS\n§r§f[ click here ]",
            tag: "toolshop",
            array: [
                {
                    texture: "textures/items/wood_axe",
                    buttonname: "Wooden Axe\n[ click here ]",
                    itemid: "minecraft:wooden_axe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 600
                 },
                {
                    texture: "textures/items/wood_hoe",
                    buttonname: "Wooden Hoe\n[ click here ]",
                    itemid: "minecraft:wooden_hoe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 500
                },
                {
                    texture: "textures/items/wood_shovel",
                    buttonname: "Wooden Shovel\n[ click here ]",
                    itemid: "minecraft:wooden_shovel",
                    min_buy: 1,
                    max_buy: 1,
                    price: 550
                },
                {
                    texture: "textures/items/wood_pickaxe",
                    buttonname: "Wooden Pickaxe\n[ click here ]",
                    itemid: "minecraft:wooden_pickaxe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 760
                },
                {
                    texture: "textures/items/wood_sword",
                    buttonname: "Wooden Sword\n[ click here ]",
                    itemid: "minecraft:wooden_sword",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1200
                },
                {
                    texture: "textures/items/gold_axe",
                    buttonname: "Golden Axe\n[ click here ]",
                    itemid: "minecraft:golden_axe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 750
                },
                {
                    texture: "textures/items/gold_hoe",
                    buttonname: "Golden Hoe\n[ click here ]",
                    itemid: "minecraft:golden_hoe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 600
                },
                {
                    texture: "textures/items/gold_shovel",
                    buttonname: "Golden Shovel\n[ click here ]",
                    itemid: "minecraft:golden_shovel",
                    min_buy: 1,
                    max_buy: 1,
                    price: 760
                },
                {
                    texture: "textures/items/gold_pickaxe",
                    buttonname: "Golden Pickaxe\n[ click here ]",
                    itemid: "minecraft:golden_pickaxe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 870
                },
                {
                    texture: "textures/items/gold_sword",
                    buttonname: "Gold Sword\n[ click here ]",
                    itemid: "minecraft:golden_sword",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1330
                },
                {
                    texture: "textures/items/iron_axe",
                    buttonname: "Iron Axe\n[ click here ]",
                    itemid: "minecraft:iron_axe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 850
                },
                {
                    texture: "textures/items/iron_hoe",
                    buttonname: "Iron Hoe\n[ click here ]",
                    itemid: "minecraft:iron_hoe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 540
                },
                {
                    texture: "textures/items/iron_shovel",
                    buttonname: "Iron Axe\n[ click here ]",
                    itemid: "minecraft:iron_shovel",
                    min_buy: 1,
                    max_buy: 1,
                    price: 670
                },
                {
                    texture: "textures/items/iron_pickaxe",
                    buttonname: "Iron Pickaxe\n[ click here ]",
                    itemid: "minecraft:iron_pickaxe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 990
                },
                {
                    texture: "textures/items/iron_sword",
                    buttonname: "Iron Sword\n[ click here ]",
                    itemid: "minecraft:iron_sword",
                    min_buy: 1,
                    max_buy: 1,
                    price: 2200
                },
                {
                    texture: "textures/items/diamond_axe",
                    buttonname: "Diamond Axe\n[ click here ]",
                    itemid: "minecraft:diamond_axe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1140
                },
                {
                    texture: "textures/items/diamond_hoe",
                    buttonname: "Diamond Hoe\n[ click here ]",
                    itemid: "minecraft:diamond_hoe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 750
                },
                {
                    texture: "textures/items/diamond_shovel",
                    buttonname: "Diamond Shovel\n[ click here ]",
                    itemid: "minecraft:diamond_shovel",
                    min_buy: 1,
                    max_buy: 1,
                    price: 800
                },
                {
                    texture: "textures/items/diamond_pickaxe",
                    buttonname: "Diamond Pickaxe\n[ click here ]",
                    itemid: "minecraft:diamond_pickaxe",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1240
                },
                {
                    texture: "textures/items/diamond_sword",
                    buttonname: "Diamond Sword\n[ click here ]",
                    itemid: "minecraft:diamond_sword",
                    min_buy: 1,
                    max_buy: 1,
                    price: 3400
                }
            ]
        },
        {
            texture: "textures/items/diamond_chestplate",
            name: "§lARMOR\n§r§f[ click here ]",
            tag: "armorshop",
            array: [
                {
                    texture: "textures/items/leather_boots",
                    buttonname: "Leather Boots\n[ click here ]",
                    itemid: "minecraft:leather_boots",
                    min_buy: 1,
                    max_buy: 1,
                    price: 400
                },
                {
                    texture: "textures/items/leather_leggings",
                    buttonname: "Leather Pants\n[ click here ]",
                    itemid: "minecraft:leather_leggings",
                    min_buy: 1,
                    max_buy: 1,
                    price: 500
                },
                {
                    texture: "textures/items/leather_chestplate",
                    buttonname: "Leather Tunic\n[ click here ]",
                    itemid: "minecraft:leather_chestplate",
                    min_buy: 1,
                    max_buy: 1,
                    price: 850
                },
                {
                    texture: "textures/items/leather_helmet",
                    buttonname: "Leather Cap\n[ click here ]",
                    itemid: "minecraft:leather_helmet",
                    min_buy: 1,
                    max_buy: 1,
                    price: 450
                },
                {
                    texture: "textures/items/gold_boots",
                    buttonname: "Golden Boots\n[ click here ]",
                    itemid: "minecraft:golden_boots",
                    min_buy: 1,
                    max_buy: 1,
                    price: 600
                },
                {
                    texture: "textures/items/gold_leggings",
                    buttonname: "Golden Leggings\n[ click here ]",
                    itemid: "minecraft:golden_leggings",
                    min_buy: 1,
                    max_buy: 1,
                    price: 700
                },
                {
                    texture: "textures/items/gold_chestplate",
                    buttonname: "Golden Chestplate\n[ click here ]",
                    itemid: "minecraft:golden_chestplate",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1050
                },
                {
                    texture: "textures/items/gold_helmet",
                    buttonname: "Golden Helmet\n[ click here ]",
                    itemid: "minecraft:golden_helmet",
                    min_buy: 1,
                    max_buy: 1,
                    price: 750
                },
                {
                    texture: "textures/items/iron_boots",
                    buttonname: "Iron Boots\n[ click here ]",
                    itemid: "minecraft:iron_boots",
                    min_buy: 1,
                    max_buy: 1,
                    price: 800
                },
                {
                    texture: "textures/items/iron_leggings",
                    buttonname: "Iron Leggings\n[ click here ]",
                    itemid: "minecraft:iron_leggings",
                    min_buy: 1,
                    max_buy: 1,
                    price: 900
                },
                {
                    texture: "textures/items/iron_chestplate",
                    buttonname: "Iron Chestplate\n[ click here ]",
                    itemid: "minecraft:iron_chestplate",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1250
                },
                {
                    texture: "textures/items/iron_helmet",
                    buttonname: "Iron Helmet\n[ click here ]",
                    itemid: "minecraft:iron_helmet",
                    min_buy: 1,
                    max_buy: 1,
                    price: 950
                },
                {
                    texture: "textures/items/diamond_boots",
                    buttonname: "Diamond Boots\n[ click here ]",
                    itemid: "minecraft:diamond_boots",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1000
                },
                {
                    texture: "textures/items/diamond_leggings",
                    buttonname: "Diamond Leggings\n[ click here ]",
                    itemid: "minecraft:diamond_leggings",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1100
                },
                {
                    texture: "textures/items/diamond_chestplate",
                    buttonname: "Diamond Chestplate\n[ click here ]",
                    itemid: "minecraft:diamond_chestplate",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1450
                },
                {
                    texture: "textures/items/diamond_helmet",
                    buttonname: "Diamond Helmet\n[ click here ]",
                    itemid: "minecraft:diamond_helmet",
                    min_buy: 1,
                    max_buy: 1,
                    price: 1250
                }
            ]
        }
    ]
};

/**
 * @param {OBJECT} buttons
 * @property {string} texture
 * @property {string} buttonname
 * @property {string} itemid
 * @property {number} min_buy
 * @property {number} max_buy
 * @property {number} price
 * @property {number} stock
 */
export default config;
