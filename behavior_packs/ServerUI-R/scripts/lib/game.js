import { world, system } from "@minecraft/server"
import { rank_prefix, ranks, default_rank } from "../config.js";

async function sleep(tick) {
  try {
    return new Promise((resolve, reject) => {
      system.runTimeout(resolve, tick);
    });
  } catch (err) {
    console.warn(err, err.stack);
  }
}

function getScore(target, objective) {
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

async function ForceOpen(player, form) {
	while (true) {
		const response = await form.show(player);
		if (response.cancelationReason !== "UserBusy") return response;
	}
}

function metricNumbers(value) {
  const types = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  const selectType = (Math.log10(value) / 3) | 0;

  if (selectType == 0) return value;
  let scaled = value / Math.pow(10, selectType * 3);

  return scaled.toFixed(1) + types[selectType];
}

function thousandsSeparator(value) {
  if (typeof value !== "number") return;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getRank(player) {
    for (let tag of player.getTags()) {
        if (tag.startsWith(rank_prefix)) {
            return tag.substring(rank_prefix.length);
        }
    }
    return default_rank;
}

export { getRank, getScore, sleep, ForceOpen, metricNumbers }
