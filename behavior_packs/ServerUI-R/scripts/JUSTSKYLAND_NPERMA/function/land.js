import { JsonDatabase } from "../../@modules/condb";

const LandDB = new JsonDatabase("landDB").load();

class Land {
    static createLand(player, start, end, uuid) {
        const creationDate = new Date();
        const { centerX, centerZ } = this.getCenter(start, end);
        const landStructure = {
            landID: uuid,
            landOwner: player.name,
            landDimension: player.dimension.id,
            creationDate: creationDate.toLocaleString(),
            landSpawn: [centerX, centerZ],
            land: { start, end },
            invites: []
        };

        const checkOverlap = this.checkOverlap(start, end, player);
        if (checkOverlap.isInside)
            return { created: false, overlapInfo: checkOverlap, landID: null };
        LandDB.set(uuid, landStructure);
        return { created: true, overlapInfo: null, landID: uuid };
    }

    static getCenter(start, end) {
        const centerX = (start[0] + end[0]) / 2;
        const centerZ = (start[1] + end[1]) / 2;
        return { centerX, centerZ };
    }

    static deleteLand(landID, playerName) {
        const land = this.findLand(landID);
        if (!land) return { deleted: false, error: "Land not found" };
        if (land.landOwner !== playerName)
            return { deleted: false, error: "You're not the land owner" };

        LandDB.delete(landID);
        return { deleted: true, error: null };
    }

    static getLands(player) {
        const playerLands = [];
        for (const [, land] of LandDB.entries()) {
            if (land.landOwner === player.name) playerLands.push(land);
        }
        return playerLands;
    }

    static checkInvite(landID) {
        const land = this.findLand(landID);
        if (land) return land.invites;
        return null;
    }

    static invitePlayer(landID, playerName, targetName) {
        const land = this.findLand(landID);
        if (!land) return { status: false, error: "Land not found!" };
        if (land.landOwner !== playerName)
            return { status: false, error: "You're not the land owner" };

        const updatedInvites = [...land.invites, targetName];
        const updatedLand = { ...land, invites: updatedInvites };

        LandDB.set(landID, updatedLand);

        return { status: true, error: null };
    }

    static removeInvite(landID, playerName, targetName) {
        const land = this.findLand(landID);
        if (!land) return { status: false, error: "Land not found!" };
        if (!land.invites.includes(targetName))
            return { status: false, error: "Player not found" };
        if (land.landOwner !== playerName)
            return { status: false, error: "You're not the land owner" };

        const updatedInvites = land.invites.filter(
            invite => invite !== targetName
        );
        const updatedLand = { ...land, invites: updatedInvites };

        LandDB.set(landID, updatedLand);

        return { status: true, error: null };
    }

    static updateWarp(landID, pos, player) {
        const land = this.findLand(landID);
        if (!land) return { status: false, error: "Land not found!" };
        if (land.landOwner !== player.name)
            return { status: false, error: "You're not the land owner" };
        const updatedSpawn = { ...land, landSpawn: pos };
        if (!this.testPlayer([pos[0], pos[1]], player).isInside)
            return { status: false, error: "You're not inside the land" };
        else LandDB.set(landID, updatedSpawn);
        return { status: true, error: null, newLocation: pos };
    }

    static calculateLandSize(start, end) {
        const width = Math.abs(end[0] - start[0]);
        const depth = Math.abs(end[1] - start[1]);
        return width * depth;
    }

    static generateUUID() {
        const min = 1000;
        const max = 9999;
        let uuid;
        do {
            uuid = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (this.isUUIDExists(uuid));
        return uuid.toString();
    }

    static isUUIDExists(uuid) {
        for (const [, land] of LandDB.entries()) {
            if (land.landID === uuid) {
                return true;
            }
        }
        return false;
    }

    static checkOverlap(start, end, player) {
        for (const [, existingLand] of LandDB.entries()) {
            const { start: existingStart, end: existingEnd } =
                existingLand.land;
            if (existingLand.landDimension !== player.dimension.id) continue;
            const isInside =
                Math.min(start[0], end[0]) <=
                    Math.max(existingStart[0], existingEnd[0]) &&
                Math.max(start[0], end[0]) >=
                    Math.min(existingStart[0], existingEnd[0]) &&
                Math.max(start[1], end[1]) >=
                    Math.min(existingStart[1], existingEnd[1]) &&
                Math.min(start[1], end[1]) <=
                    Math.max(existingStart[1], existingEnd[1]);
            if (isInside)
                return {
                    isInside,
                    conflictingLandID: existingLand.landID
                };
        }
        return { isInside: false, conflictingLandID: null };
    }

    static findLand(landID) {
        return LandDB.get(landID);
    }

    static testPlayer(playerPos, player) {
        for (const [, land] of LandDB.entries()) {
            const { start, end } = land.land;
            if (land.landDimension !== player.dimension.id) continue;
            const isInside =
                playerPos[0] >= Math.min(start[0], end[0]) &&
                playerPos[0] <= Math.max(start[0], end[0]) &&
                playerPos[1] >= Math.min(start[1], end[1]) &&
                playerPos[1] <= Math.max(start[1], end[1]);
            if (isInside)
                return {
                    isInside,
                    owner: land.landOwner,
                    landID: land.landID,
                    invites: land.invites
                };
        }
        return {
            isInside: false,
            owner: null,
            landID: null,
            invites: []
        };
    }

    static testBlock(playerPos, player, offset = 5) {
        const testLand = this.testPlayer([playerPos[0], playerPos[1]], player);

        if (testLand.isInside) {
            return {
              isInside: true,
              owner: testLand.owner,
              landID: testLand.landID,
              invites: testLand.invites,
              offset: false
            }
        }

        for (const [, land] of LandDB.entries()) {
            const { start, end } = land.land;
            if (land.landDimension !== player.dimension.id) continue;

            const isInsideWithOffset =
                playerPos[0] + offset >= Math.min(start[0], end[0]) &&
                playerPos[0] - offset <= Math.max(start[0], end[0]) &&
                playerPos[1] + offset >= Math.min(start[1], end[1]) &&
                playerPos[1] - offset <= Math.max(start[1], end[1]);

            if (isInsideWithOffset) {
                return {
                    isInside: true,
                    owner: land.landOwner,
                    landID: land.landID,
                    invites: land.invites,
                    offset: true
                };
            }
        }

        return {
            isInside: false,
            owner: null,
            landID: null,
            invites: [],
            offset: false
        };
    }
}

export { Land };
