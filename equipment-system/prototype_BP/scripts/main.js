import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

/*
 * Obliskia Equipment — opening-item / form smoke-test prototype.
 * This proves only the Arcane Ledger -> native form path.
 * It is NOT the final inventory UI and does not yet equip real items.
 */

const OPENING_ITEM = "obliskia:arcane_ledger";

const categories = [
  { title: "Charm Slot", detail: "A slot for compatible Obliskia charms." },
  { title: "Ring Slot", detail: "A slot for compatible Obliskia rings." },
  { title: "Relic Slot", detail: "A slot for compatible magical relics." },
  { title: "Focus Slot", detail: "A slot for compatible spell foci." }
];

// Prevent repeated item-use events from opening overlapping forms.
const playersWithOpenForm = new Set();

async function showEquipmentPrototype(player) {
  const playerId = player.id;
  if (playersWithOpenForm.has(playerId)) return;
  playersWithOpenForm.add(playerId);

  try {
    // Loop makes the detail-page Back button actually return to the menu.
    while (true) {
      const menu = new ActionFormData()
        .title("Equipment")
        .body("Obliskia Equipment\n\nChoose a slot category to inspect it.");

      for (const category of categories) menu.button(category.title);
      menu.button("Close");

      const menuResponse = await menu.show(player);
      if (menuResponse.canceled || menuResponse.selection === undefined) return;
      if (menuResponse.selection < 0 || menuResponse.selection >= categories.length) return;

      const category = categories[menuResponse.selection];
      const detailResponse = await new ActionFormData()
        .title(category.title)
        .body(category.detail + "\n\nPrototype placeholder: no items can be equipped yet.")
        .button("Back")
        .show(player);

      if (detailResponse.canceled || detailResponse.selection !== 0) return;
    }
  } catch (error) {
    console.warn(
      `[Obliskia Equipment] Form failed for player ${playerId}: ${String(error)}`
    );
  } finally {
    playersWithOpenForm.delete(playerId);
  }
}

world.afterEvents.itemUse.subscribe((event) => {
  if (!event?.itemStack || event.itemStack.typeId !== OPENING_ITEM) return;
  const player = event.source;
  if (!player || player.typeId !== "minecraft:player") return;

  // Schedule form creation outside the event callback.
  system.run(() => {
    void showEquipmentPrototype(player);
  });
});
