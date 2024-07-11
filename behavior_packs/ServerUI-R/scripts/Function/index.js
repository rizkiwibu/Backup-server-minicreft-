import {
  world,
  system,
  Player,
  ItemStack,
  Entity,
  Container,
  Component,
  ScoreboardIdentity,
} from "@minecraft/server";
import {
  ActionFormData,
  ModalFormData,
  MessageFormData,
} from "@minecraft/server-ui";
export { math } from "./math.js";
export { Xyz } from "./xyz.js";
export { Score } from "./score(0).js";
import { ServerSetDB } from "../databaseSave.js";
export { CooldownClass } from "./CDclass";

function getCooldown(cooldown, player) {
  let cd = cooldown[player.name];
  if (!cd) return 0;
  if (Date.now() >= cd) return 0;
  return Math.ceil((cd - Date.now()) / 1000);
}

async function sleep(tick) {
  try {
    return new Promise((resolve, reject) => {
      system.runTimeout(resolve, tick);
    });
  } catch (err) {
    console.warn(err, err.stack);
  }
}

function setInterval(callback, tick, isSecond = false) {
  const timerID = system.runInterval(callback, isSecond ? tick * 20 : tick);
  return timerID;
}

function setTimeout(callback, tick, isSecond = false) {
  const timerID = system.runTimeout(callback, isSecond ? tick * 20 : tick);
  return timerID;
}

function clearRun(timerID) {
  system.clearRun(timerID);
}

//CommandResult

function cmd(target, cmd) {
  try {
    if (target instanceof Player) {
      target.runCommandAsync(cmd);
    }
  } catch (error) {
    console.warn(`Error: Cmd must be Player`);
  }
}

function Message(string, msg) {
  string.sendMessage(msg);
}

function worldMessage(msg) {
  world.sendMessage(msg);
}

//Scoreboard

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

/**
 * Sets the score recorded for a participant on objective
 * @param participant
 * @param objectiveId
 * @param score
 * @returns {ScoreboardIdentity} participant that was changed in objective
 */
function setScore(participant, objectiveId, score) {
  const objective = world.scoreboard.getObjective(objectiveId);
  if (!objective) throw new Error(`Objective ${objectiveId} not found`);
  objective.setScore(participant, score);
  if (participant instanceof Entity) return participant.scoreboardIdentity;
  else if (participant instanceof ScoreboardIdentity) return participant;
  else
    return objective
      .getParticipants()
      .find((p) => p.displayName === participant);
}
/**
 * Add the score recorded for entity on objective
 * @param participant
 * @param objectiveId
 * @param score
 */
function addScore(participant, objectiveId, score) {
  const objective = world.scoreboard.getObjective(objectiveId);
  if (!objective) throw new Error(`Objective ${objectiveId} not found`);
  objective.addScore(participant, score);
  if (participant instanceof Entity) return participant.scoreboardIdentity;
  else if (participant instanceof ScoreboardIdentity) return participant;
  else
    return objective
      .getParticipants()
      .find((p) => p.displayName === participant);
}

//Date

function getTime(value) {
  let regDM = "ID";
  let date = new Date();
  let utc = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() + utc);
  let indTime = 7 * 60;
  let enTime = 0;
  let euTime = 60;

  if (regDM === "ID") {
    date.setMinutes(date.getMinutes() + indTime);
  }
  if (regDM === "EN") {
    date.setMinutes(date.getMinutes() + enTime);
  }
  if (regDM === "EU") {
    date.setMinutes(date.getMinutes() + euTime);
  }

  if (value === "s") return date.getSeconds();
  if (value === "m") return date.getMinutes();
  if (value === "h") return date.getHours();
}

function getFormattedDate(isNumber = false) {
  var d = new Date();
  var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  var day = days[d.getDay()];
  var month = months[d.getMonth()];
  var date = d.getDate();
  var year = d.getFullYear();
  let format = "";

  if (isNumber) {
    const formattedDate = (date < 10 ? "0" : "") + date;
    const formattedMonth =
      (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1);
    format = formattedDate + "/" + formattedMonth + "/" + year;
  } else {
    format = date + " " + month + " " + year;
  }

  return format;
}

//Formatted

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

//Setting

const keySett = "NpermaSett";

let settingData = {
  prefix: ServerSetDB.get(keySett)?.prefix ?? ",",
};

function getSetting(name) {
  let value = ServerSetDB.get(name);
  if (value == undefined) return undefined;
  return value;
}

function getPrefix() {
  return settingData.prefix;
}

function setPrefix(newPrefix) {
  settingData.prefix = newPrefix;
  return ServerSetDB.set(keySett, settingData);
}

async function ForceOpen(player, form) {
  while (true) {
    const response = await form.show(player);
    if (response.cancelationReason !== "userBusy") return response;
  }
}

function getOnlinePlayers(asNumber = false) {
  let onlinePlayers = world.getAllPlayers();

  return asNumber ? onlinePlayers.length : onlinePlayers;
}

export {
  getOnlinePlayers,
  sleep,
  ForceOpen,
  setInterval,
  setTimeout,
  clearRun,
  getScore,
  setScore,
  addScore,
  getTime,
  getFormattedDate,
  getPrefix,
  setPrefix,
  metricNumbers,
  thousandsSeparator,
  getSetting,
  getCooldown
};
