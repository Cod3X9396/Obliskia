import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

/*
 * Obliskia Equipment — opening-item / form smoke-test prototype.
 *
 * Important: this proves only the Arcane Ledger -> native form path.
 * It is NOT the final inventory UI and does not yet equip real items.
 */

const OPENING_ITEM = "obliskia:arcane_ledger";

const categories = [
  { title: "Charm Slot", detail: "A slot for compatible Obliskia charms." },
  { title: "Ring Slot", detail: "A slot for compatible Obliskia rings." },
  { title: "Relic Slot", detail: "A slot for compatible magical relics." },
  { title: "Focus Slot", detail: "A slot for compatible spell foci." }
];

// Prevent repeated item-use events from trying to show overlapping forms.
const playersWithOpenForm = new Set();

async function showEquipmentPrototype(player) {
  const playerId = player.id;
  if (playersWithOpenForm.has(playerId)) return;
  playersWithOpenForm.add(playerId);

  try {
    const form = new ActionFormData()
      .title("Equipment")
      .body("Obliskia Equipment\n\nChoose a slot category to inspect it.");

    for (const category of categories) {
      form.button(category.title);
    }
    form.button("Close");

    const response = await form.show(player);
    if (response.canceled || response.selection === undefined) return;
    if (response.selection < 0 || response.selection >= categories.length) return;

    const category = categories[response.selection];
    await new ActionFormData()
      .title(category.title)
      .body(
        category.detail +
        "\n\nPrototype placeholder: no items can be equipped yet."
      )
      .button("Back")
      .show(player);
  } catch (error) {
    console.warn(
      `[Obliskia Equipment] Form failed for player ${playerId}: ${String(error)}`
    );
  } finally {
    playersWithOpenForm.delete(playerId);
  }
}

world.afterEvents.itemUse.subscribe((event) => {
  // ItemUseAfterEvent.source is documented as a Player, but guard the event
  // fields so an unexpected event cannot crash this subscriber.
  if (!event?.itemStack || event.itemStack.typeId !== OPENING_ITEM) return;
  const player = event.source;
  if (!player || player.typeId !== "minecraft:player") return;

  // Forms must be opened outside the event callback's restricted execution.
  system.run(() => {
    void showEquipmentPrototype(player);
  });
});
