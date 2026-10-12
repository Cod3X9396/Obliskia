import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

/*
 * Obliskia Equipment — first UI proof of concept.
 * Use the custom Arcane Ledger item to open this menu.
 *
 * This is a first-stage test using Bedrock's native form styling.
 * It is not the final inventory layout. Slot categories are examples only.
 */

const OPENING_ITEM = "obliskia:arcane_ledger";

const categories = [
  { title: "Charm Slot", detail: "A slot for compatible Obliskia charms." },
  { title: "Ring Slot", detail: "A slot for compatible Obliskia rings." },
  { title: "Relic Slot", detail: "A slot for compatible magical relics." },
  { title: "Focus Slot", detail: "A slot for compatible spell foci." }
];

async function showEquipmentPrototype(player) {
  const form = new ActionFormData()
    .title("Equipment")
    .body("Obliskia Equipment\n\nChoose a slot category to inspect it.");

  for (const category of categories) {
    form.button(category.title);
  }

  form.button("Close");

  try {
    const response = await form.show(player);
    if (response.canceled || response.selection === undefined) return;
    if (response.selection >= categories.length) return;

    const category = categories[response.selection];
    await new ActionFormData()
      .title(category.title)
      .body(category.detail + "\n\nThese are placeholder categories. We'll finalize Obliskia's categories before implementing real equipment.")
      .button("Close")
      .show(player);
  } catch (error) {
    console.warn(`[Obliskia Equipment] Could not show UI: ${error}`);
  }
}

world.afterEvents.itemUse.subscribe((event) => {
  if (event.itemStack.typeId !== OPENING_ITEM) return;
  if (event.source.typeId !== "minecraft:player") return;

  system.run(() => showEquipmentPrototype(event.source));
});
