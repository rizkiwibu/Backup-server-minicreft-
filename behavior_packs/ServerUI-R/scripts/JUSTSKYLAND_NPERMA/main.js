import {
    world,
    Player,
    system,
    Block,
    BlockPermutation
} from "@minecraft/server";
import { Land } from "./land";
import { config } from "./config";
import { sleep } from "../Function/index.js";

world.afterEvents.blockExplode.subscribe(
    ({ explodedBlockPermutation: tblock, source, block, dimension }) => {
        system.run(() => {
            const testLand = Land.testPlayer(
                [block.location.x, block.location.z],
                block
            );

            if (testLand.isInside) {
                dimension
                    .getEntitiesAtBlockLocation(block.location)
                    .filter(entity => entity.typeId === "minecraft:item")
                    .forEach(item => item.kill());
                dimension.getBlock(block.location).setPermutation(tblock);
            }
        });
    }
);

if (config.liquid_protect) {
    world.afterEvents.itemUseOn.subscribe(data => {
        system.run(() => {
            const { block, source: player } = data;
            if (!(player instanceof Player)) return;

            const testLand = Land.testBlock(
                [block.location.x, block.location.z],
                player,
                config.offset >= 10 ? 10 : config.offset < 5 ? 5 : config.offset
            );

            const blockLand = world.getDimension(block.dimension.id).getBlock({
                x: block.location.x,
                y: block.location.y + 1,
                z: block.location.z
            });

            if (testLand.isInside && blockLand.isLiquid) {
                const { owner, offset } = testLand;

                if (
                    !(owner === player.name ||
                    player.hasTag(config.bypassLandTag) ||
                    (testLand.invites && testLand.invites.includes(player.name))
                    )
                ) {
                    if (!offset) return;

                    const protects = config.protect.find(
                        p => p.id == testLand.landID
                    );

                    if (protects) {
                        if (protects.mode === "action") {
                            player.onScreenDisplay.setActionBar(
                                "§cThis Area is Locked"
                            );
                        } else {
                            player.sendMessage("§cThis Area is Locked");
                        }
                    } else {
                        if (!config.landpopup) return;

                        player.sendMessage(
                            `§cYou cant place Liquid Block in this area, owner: ${owner}`
                        );
                    }
                    blockLand.setType("minecraft:air");
                }
            }
        });
    });
}

world.afterEvents.playerBreakBlock.subscribe(
    async ({ player, block, dimension, brokenBlockPermutation }) => {
        system.run(() => {
            const testLand = Land.testPlayer(
                [block.location.x, block.location.z],
                player
            );

            if (testLand.isInside) {
                const { owner } = testLand;

                if (
                    !(
                        owner === player.name ||
                        player.hasTag(config.bypassLandTag) ||
                        (testLand.invites &&
                            testLand.invites.includes(player.name))
                    )
                ) {
                    dimension
                        .getEntitiesAtBlockLocation(block.location)
                        .filter(entity => entity.typeId === "minecraft:item")
                        .forEach(item => item.kill());

                    dimension
                        .getBlock(block.location)
                        .setPermutation(brokenBlockPermutation);

                    const protects = config.protect.find(
                        p => p.id == testLand.landID
                    );

                    if (protects) {
                        if (protects.mode === "action") {
                            player.onScreenDisplay.setActionBar(
                                "§cThis land is Locked"
                            );
                        } else {
                            player.sendMessage("§cThis Land is Locked");
                        }
                    } else {
                        if (!config.landpopup) return;

                        player.sendMessage(
                            `§cYou cant break a block here, owner: ${owner}`
                        );
                    }
                } else {
                    player.addExperience(0);
                }
            } else {
                player.addExperience(0);
            }
        });
    }
);

world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    const { player, block, faceLocation } = e;
    if (!(player instanceof Player)) return;

    const testLandBlock = Land.testPlayer(
        [block.location.x, block.location.z],
        player
    );
    const testLandFace = Land.testPlayer(
        [faceLocation.x, faceLocation.z],
        player
    );

    if (testLandBlock.isInside && testLandFace.isInside) {
        const { owner: ownerBlock } = testLandBlock;
        const { owner: ownerFace } = testLandFace;

        if (
            !(
                (ownerBlock || ownerFace) === player.name ||
                player.hasTag(config.bypassLandTag) ||
                (testLandBlock.invites &&
                    testLandBlock.invites.includes(player.name)) ||
                (testLandFace.invites &&
                    testLandFace.invites.includes(player.name))
            )
        ) {
            const protects = config.protect.find(
                p => p.id == testLandFace.landID || p.id == testLandBlock.landID
            );

            if (!protects?.interact) {
                e.cancel = true;

                if (protects) {
                    if (protects.mode === "action") {
                        player.onScreenDisplay.setActionBar(
                            "§cThis land locked"
                        );
                    } else {
                        player.sendMessage("§cThis land locked");
                    }
                } else {
                    if (!config.landpopup) return;

                    player.sendMessage(
                        `§cYou cant interact here, owner: ${
                            ownerBlock ?? ownerFace
                        }`
                    );
                }
            }
        }
    }
});

world.afterEvents.playerPlaceBlock.subscribe(({ player, block }) => {
    system.run(() => {
        const testLand = Land.testPlayer(
            [block.location.x, block.location.z],
            player
        );

        if (testLand.isInside) {
            const { owner } = testLand;

            if (
                !(
                    owner === player.name ||
                    player.hasTag(config.bypassLandTag) ||
                    (testLand.invites && testLand.invites.includes(player.name))
                )
            ) {
                block.setType("minecraft:air");

                const protects = config.protect.find(
                    p => p.id == testLand.landID
                );

                if (protects) {
                    if (protects.mode === "action") {
                        player.onScreenDisplay.setActionBar(
                            "§cThis land is Locked"
                        );
                    } else {
                        player.sendMessage("§cThis Land is Locked");
                    }
                } else {
                    if (!config.landpopup) return;

                    player.sendMessage(
                        `§cYou cannot place a block here, owner: ${owner}`
                    );
                }
            } else {
                player.addExperience(0);
            }
        } else {
            player.addExperience(0);
        }
    });
});

const playerLog = {};
system.runInterval(async () => {
    for (const player of world.getPlayers()) {
        const plog = playerLog[player.name] || [];
        const testLand = Land.testPlayer(
            [Math.floor(player.location.x), Math.floor(player.location.z)],
            player
        );

        if (!testLand.isInside) {
            playerLog[player.name] = [];
            continue;
        }

        playerLog[player.name] = plog.filter(
            landID => landID === testLand.landID
        );

        if (!plog.includes(testLand.landID)) {
            const ownerland = testLand.owner === player.name;
            const inviteLand = testLand.invites.includes(player.name);

            const ownerDisplayName = testLand.owner;

            const protects = config.protect.find(p => p.id == testLand.landID);
            if (protects) {
                if (protects.mode === "action") {
                    player.onScreenDisplay.setActionBar(protects.msg);
                } else {
                    player.sendMessage(protects.msg);
                }
            } else {
                if (config.landpopup)
                    player.onScreenDisplay.setActionBar(
                        `§${ownerland ? "2" : "4"}[§${ownerland ? "a" : "c"}${
                            testLand.landID
                        }§${
                            ownerland ? "2" : "4"
                        }] §6Own: §7${ownerDisplayName}`
                    );
            }

            playerLog[player.name].push(testLand.landID);
        }
    }
});
