import { world, system, ItemStack } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const OPENING_ITEM = "obliskia:arcane_ledger";
const STATE_KEY = "obliskia:equipment_v1";
const SLOTS = [
  { id: "charm", name: "Charm", items: ["obliskia:test_charm"] },
  { id: "ring", name: "Ring", items: ["obliskia:test_ring"] },
  { id: "relic", name: "Relic", items: ["obliskia:test_relic"] },
  { id: "focus", name: "Focus", items: ["obliskia:test_focus"] }
];
const LABELS = {
  "obliskia:test_charm": "Test Charm",
  "obliskia:test_ring": "Test Ring",
  "obliskia:test_relic": "Test Relic",
  "obliskia:test_focus": "Test Focus"
};
const openPlayers = new Set();

function readEquipment(player) {
  try {
    const raw = player.getDynamicProperty(STATE_KEY);
    const parsed = typeof raw === "string" ? JSON.parse(raw) : {};
    return Object.fromEntries(SLOTS.map(slot => {
      const id = parsed?.[slot.id];
      return [slot.id, typeof id === "string" && slot.items.includes(id) ? id : null];
    }));
  } catch {
    return Object.fromEntries(SLOTS.map(slot => [slot.id, null]));
  }
}

function writeEquipment(player, state) {
  player.setDynamicProperty(STATE_KEY, JSON.stringify(state));
}

function getInventory(player) {
  return player.getComponent("minecraft:inventory")?.container;
}

function countItem(container, typeId) {
  let count = 0;
  for (let i = 0; i < container.size; i++) {
    const stack = container.getItem(i);
    if (stack?.typeId === typeId) count += stack.amount;
  }
  return count;
}

function removeOne(container, typeId) {
  for (let i = 0; i < container.size; i++) {
    const stack = container.getItem(i);
    if (stack?.typeId !== typeId) continue;
    if (stack.amount === 1) container.setItem(i);
    else {
      stack.amount -= 1;
      container.setItem(i, stack);
    }
    return true;
  }
  return false;
}

function giveOne(container, typeId) {
  return container.addItem(new ItemStack(typeId, 1)) === undefined;
}

async function showSlot(player, slot) {
  const state = readEquipment(player);
  const equippedId = state[slot.id];
  const inventory = getInventory(player);
  if (!inventory) return;

  const menu = new ActionFormData()
    .title(slot.name + " Slot")
    .body("Equipped: " + (equippedId ? LABELS[equippedId] : "Empty"));
  const available = slot.items.filter(id => countItem(inventory, id) > 0);

  if (equippedId) menu.button("Unequip " + LABELS[equippedId]);
  else {
    for (const id of available) menu.button("Equip " + LABELS[id]);
    if (!available.length) menu.button("No compatible test item in inventory");
  }
  menu.button("Back");

  const response = await menu.show(player);
  if (response.canceled || response.selection === undefined) return;

  if (equippedId) {
    if (response.selection !== 0) return;
    if (!giveOne(inventory, equippedId)) {
      player.sendMessage("§cInventory full! Make room before unequipping.");
      return;
    }
    state[slot.id] = null;
    try {
      writeEquipment(player, state);
    } catch (error) {
      removeOne(inventory, equippedId);
      player.sendMessage("§cSave failed; the equipment was not changed.");
      console.warn("[Obliskia Equipment] Save failed: " + String(error));
      return;
    }
    player.sendMessage("§aUnequipped " + LABELS[equippedId] + ".");
    return;
  }

  if (response.selection >= available.length) return;
  const chosenId = available[response.selection];
  if (!slot.items.includes(chosenId) || !removeOne(inventory, chosenId)) {
    player.sendMessage("§cThat item is no longer available.");
    return;
  }

  state[slot.id] = chosenId;
  try {
    writeEquipment(player, state);
  } catch (error) {
    if (!giveOne(inventory, chosenId)) {
      player.sendMessage("§cCRITICAL: save failed and inventory is full. Contact an admin.");
    } else player.sendMessage("§cSave failed; the item was returned.");
    console.warn("[Obliskia Equipment] Save failed: " + String(error));
    return;
  }
  player.sendMessage("§aEquipped " + LABELS[chosenId] + " in the " + slot.name + " slot.");
}

async function showEquipment(player) {
  if (openPlayers.has(player.id)) return;
  openPlayers.add(player.id);
  try {
    while (true) {
      const state = readEquipment(player);
      const menu = new ActionFormData()
        .title("Arcane Ledger")
        .body("Equipment prototype\nTest items only.");
      for (const slot of SLOTS) {
        const id = state[slot.id];
        menu.button(slot.name + ": " + (id ? LABELS[id] : "Empty"));
      }
      menu.button("Close");
      const response = await menu.show(player);
      if (response.canceled || response.selection === undefined ||
          response.selection >= SLOTS.length) return;
      await showSlot(player, SLOTS[response.selection]);
    }
  } catch (error) {
    console.warn("[Obliskia Equipment] Menu failed for " + player.id + ": " + String(error));
    try { player.sendMessage("§cEquipment menu error. Check the content log."); } catch {}
  } finally {
    openPlayers.delete(player.id);
  }
}

world.afterEvents.itemUse.subscribe(event => {
  if (event.itemStack?.typeId !== OPENING_ITEM) return;
  const player = event.source;
  if (!player || player.typeId !== "minecraft:player") return;
  system.run(() => { void showEquipment(player); });
});

world.afterEvents.playerLeave.subscribe(event => openPlayers.delete(event.playerId));
