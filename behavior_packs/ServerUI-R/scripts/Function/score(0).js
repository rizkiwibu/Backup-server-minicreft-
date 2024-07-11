import * as mc from "@minecraft/server"

export class Score {
	static set(entity, objective, value) {
		try {
		   return mc.world.scoreboard.getObjective(objective).setScore(entity.scoreboardIdentity, value)
		} catch {
			return false
		}
	}

	static get(entity, objective) {
		try {
		   return mc.world.scoreboard.getObjective(objective).getScore(entity.scoreboardIdentity)
		} catch {
			return 0
		}
	}
}