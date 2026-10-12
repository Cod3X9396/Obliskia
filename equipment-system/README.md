# Obliskia Equipment Prototype

This folder contains a paired Minecraft Bedrock **Behavior Pack (BP)** and **Resource Pack (RP)** for the Arcane Ledger equipment prototype.

## Packs
- **Behavior Pack:** `prototype_BP/` — custom items, equipment menu, slot validation, and player dynamic-property storage.
- **Resource Pack:** `prototype_RP/` — companion resource-pack manifest and English pack metadata. The prototype currently uses vanilla item icons; custom artwork has not been added yet.

Import or copy **both** packs into Minecraft Bedrock's development pack folders, then enable both on a disposable test world. The behavior pack declares a dependency on the resource pack so Bedrock can associate the pair.

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
The code and JSON pass static checks and mocked behavior tests, but **the Bedrock runtime has not been tested yet**. Before using this in a real world, import both packs into a disposable test world and verify opening, equip/unequip, inventory-full behavior, and reconnect persistence. No item effects are implemented yet, and the prototype has not been made crash-safe for production use.

## Test instructions
See [PROTOTYPE_TESTING.md](PROTOTYPE_TESTING.md) for the disposable-world checklist.
