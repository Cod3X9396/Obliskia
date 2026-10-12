# Obliskia Equipment Prototype

This folder contains a paired Minecraft Bedrock **Behavior Pack (BP)** and **Resource Pack (RP)** for the Arcane Ledger equipment prototype.

## Packs
- **Behavior Pack:** `prototype_BP/` — custom items, equipment menu, slot validation, and player dynamic-property storage.
- **Resource Pack:** `prototype_RP/` — item texture atlas and custom 16×16 pixel-art sprites for the Arcane Ledger, Test Charm, Test Ring, Test Relic, and Test Focus.

## What works in the prototype code
- The Arcane Ledger opens a menu with four separate slots: Charm, Ring, Relic, and Focus.
- Each slot accepts only its whitelisted test item.
- Equipping removes one test item from inventory and records it in the player's equipment data.
- Unequipping returns the item; if the inventory is full, the slot stays equipped.
- Equipment data is stored as a player dynamic property for reconnect persistence.
- The Arcane Ledger prevents overlapping menus.

## Test items
The four `obliskia:test_*` items are temporary test items, not final game gear. Give them with commands such as `/give @s obliskia:test_charm`.

## Important
The files and JSON have been checked structurally, and the script has passed syntax/mock tests, but **the packs have not been tested inside Bedrock yet**. Before using them in a real world, import both packs into a disposable test world and verify that the custom sprites load, the menu opens, equip/unequip works, inventory-full handling works, and equipment persists after reconnecting. No item effects are implemented yet, and the prototype has not been made crash-safe for production use.

## Test instructions
See [PROTOTYPE_TESTING.md](PROTOTYPE_TESTING.md) for the disposable-world checklist.
