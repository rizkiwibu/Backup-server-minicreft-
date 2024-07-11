import { world, system } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData, ActionFormResponse, MessageFormResponse, ModalFormResponse } from "@minecraft/server-ui";
import { Config } from "../config.js";
import { ServerSetDB } from "../databaseSave.js";

async function runCommand(command, dim = "overworld") {
  try {
    return { error: false, ...world.getDimension(dim).runCommandAsync(command) };
  } catch (error) {
    console.error("Error running command:", error);
    return { error: true };
  }
}

function setTickTimeout(callback, tick, loop = false) {
  let cT = 0;
  const tE = world.events.tick.subscribe((data) => {
    if (cT === 0) cT = data.currentTick + tick;
    if (cT <= data.currentTick) {
      try { callback(); } catch (e) { console.warn(`${e} : ${e.stack}`); }
      if (loop) cT += tick;
      else world.events.tick.unsubscribe(tE);
    }
  });
}

function setTimeout(callback, time) {
  let cT = 0;
  const tE = world.events.tick.subscribe(({ deltaTime, currentTick }) => {
    if (cT === 0) cT = currentTick + (time * 20);
    if (currentTick === cT) {
      try { callback(); } catch (e) { console.warn(`${e} : ${e.stack}`); }
      world.events.tick.unsubscribe(tE);
    }
  });
}

async function sleep(ms) {
  return new Promise((resolve) => {
    system.runTimeout(resolve, (ms / 1000) * 20);
  });
}

function getPlayer(playerName) {
  let name = playerName.replaceAll("_", " ");
  return Array.from(world.getPlayers()).find(p => p.name === name);
}

const SettingType = {
  TRUEFALSE: 0,
  CUSTOMSTR: 1,
  CUSTOMNUM: 2
};

function getSetting(name) {
  let value = ServerSetDB.get(name);
  return value !== undefined ? value : undefined;
}

function getCooldown(cooldown, player) {
  let cd = cooldown[player.name];
  if (!cd) return 0;
  return Date.now() >= cd ? 0 : Math.ceil((cd - Date.now()) / 1000);
}

function isCombat(player) {
  let playerName = player.nameTag ?? player;
  return combat.some(c => c.player === playerName);
}

function getPrefix() {
  return getSetting("commandPrefix") ?? Config.prefix;
}

function currencyPrefix() {
  return getSetting("currencyPrefix") ?? currency;
}

async function ForceOpen(player, form) {
  let response;
  do {
    response = await form.show(player);
  } while (response.cancelationReason === "userBusy");
  
  return response;
}

function getCurrentDimension(player) {
  return player.dimension.id.replace("minecraft:", "");
}

async function getEmptySlot(inventory) {
  let emptySlot = [];
  for (let i = 0; i < inventory.size; i++) {
    let item = inventory.getItem(i);
    if (!item) emptySlot.push(i);
  }
  return emptySlot;
}

async function giveItem(player, itemData, slot) {
  let inventory = player.getComponent("inventory").container;
  let [itemType, amount, data] = itemData;
  let emptySlot = slot ?? (await getEmptySlot(inventory))[0];
  if (emptySlot < 9) {
    await player.runCommandAsync(`replaceitem entity @s slot.hotbar ${emptySlot} ${itemType} ${amount} ${data}`);
  } else {
    emptySlot -= 9;
    await player.runCommandAsync(`replaceitem entity @s slot.inventory ${emptySlot} ${itemType} ${amount} ${data}`);
  }
  return emptySlot;
}

function noTPA(player) {
  let tag = player.getTags().find(t => t.startsWith("tpasetting"));
  if (tag === undefined) return false;
  let set = tag.substring("tpasetting:".length);
  return set === "off";
}

function getScore(target, objective) {
  try {
    const oB = world.scoreboard.getObjective(objective);
    if (typeof target === "string")
      return oB.getScore(oB.getParticipants().find((pT) => pT.displayName === target));
    return oB.getScore(target.scoreboardIdentity);
  } catch {
    return 0;
  }
}

function metricNumbers(value) {
  const types = ["", "k", "M", "B", "T", "P", "E", "Z", "Y"];
  const selectType = (Math.log10(value) / 3) | 0;
  if (selectType === 0) return value;
  let scaled = value / Math.pow(10, selectType * 3);
  return scaled.toFixed(1) + types[selectType];
}

export function getTime(satuan) {
  var d = new Date();
  var utc = d.getTimezoneOffset();
  d.setMinutes(d.getMinutes() + utc);
  var indTime = 7 * 60;
  d.setMinutes(d.getMinutes() + indTime);

  if (satuan === "h") return d.getHours();
  if (satuan === "m") return d.getMinutes();
  if (satuan === "s") return d.getSeconds();
}

export function getFormattedDate() {
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
  return date + " " + month + " " + year;
}

export {
  runCommand,
  setTickTimeout,
  setTimeout,
  sleep,
  getPlayer,
  SettingType,
  getSetting,
  getCooldown,
  isCombat,
  getPrefix,
  ForceOpen,
  getCurrentDimension,
  getEmptySlot,
  giveItem,
  noTPA,
  getScore,
  metricNumbers
};