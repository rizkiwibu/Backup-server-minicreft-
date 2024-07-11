import { SpawnTp } from "../system/spawntp.js";
import { HomeSystem } from "../system/home.js";
import { mainLevel } from "../system/leveling.js";
import { TpaSystem } from "../system/tpa.js";
import { Warp } from "../system/warp.js";
import { ShopSystem } from "../system/shop.js";
import { redeemCode } from "../system/code.js";
import { report } from "../system/report.js";
import { showLandMenu } from "../JUSTSKYLAND_NPERMA/land.js";

export const buttons = [
    {
        id: "spawnTp",
        display: "Teleport to Spawn",
        icon: "textures/ui/village_hero_effect.png",
        handler: SpawnTp
    },
    {
        id: "warp",
        display: "Warp Sytem",
        icon: "textures/ui/world_glyph_color.png",
        handler: Warp
    },
    {
        id: "home",
        display: "Home System",
        icon: "textures/ui/icon_recipe_item.png",
        handler: HomeSystem
    },
    {
        id: "tpa",
        display: "Tpa System",
        icon: "textures/ui/icon_multiplayer.png",
        handler: TpaSystem
    },
    {
        id: "shop",
        display: "Shop System",
        icon: "textures/ui/store_home_icon.png",
        handler: ShopSystem
    },
    {
        id: "level",
        display: "Leveling System",
        icon: "textures/items/experience_bottle.png",
        handler: mainLevel
    },
    {
        id: "code",
        display: "Redeem Code",
        icon: "textures/ui/icon_blackfriday.png",
        handler: redeemCode
    },
    {
        id: "report",
        display: "Report Players",
        icon: "textures/ui/Feedback.png",
        handler: report
    },
    {
        id: "land",
        display: "Land Management",
        icon: "textures/ui/xyz_axis.png",
        handler: showLandMenu
    },
];

export const color = "§a";
export const disableColor = "§4";
export const disableText = "feature has disabled";
export const disableIcon = "textures/blocks/barrier";