import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

/*
 * TEMPORARY PROOF OF CONCEPT for Obliskia Equipment.
 * Use a compass to open this test menu.
 *
 * This form is not the final custom inventory UI. It only verifies that:
 * - the pack loads and runs Script API code,
 * - a player can open a menu,
 * - category names are clearly visible.
 *
 * Slot data and item movement are deliberately not implemented yet.
 */

const TEST_ITEM = "minecraft:compass";
const categories = [
  { title: "Charm Slot", detail: "Accepts Obliskia charms only." },
  { title: "Ring Slot", detail: "Accepts Obliskia rings only." },
  { title: "Relic Slot", detail: "Accepts compatible magical relics only." },
  { title: "Focus Slot", detail: "Accepts compatible spell foci only." }
];

async function showEquipmentPrototype(player) {
  const form = new ActionFormData()
    .title("Obliskia Equipment — Prototype")
    .body("TEST MENU — These are example categories, not the final category list.\n\nChoose a slot category to inspect its rule.");

  for (const category of categories) {
    form.button(category.title);
  }

  form.button("Close");

  try {
    const response = await form.show(player);
    if (response.canceled || response.selection === undefined) return;

    if (response.selection < categories.length) {
      const category = categories[response.selection];
      await new ActionFormData()
        .title(category.title)
        .body(category.detail + "\n\nCompatibility checks will be implemented in the next prototype.")
        .button("Close")
        .show(player)
        .catch(() => {});
    }
  } catch (error) {
    console.warn(`[Obliskia Equipment] Could not show prototype UI: ${error}`);
  }
}

world.afterEvents.itemUse.subscribe((event) => {
  if (event.itemStack.typeId !== TEST_ITEM) return;
  system.run(() => showEquipmentPrototype(event.source));
});

