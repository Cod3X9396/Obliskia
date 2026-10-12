# Testing the Equipment Prototype

Do not import this into the main world yet. The script has passed syntax checks and mocked tests of equip, unequip, and full-inventory handling. Bedrock runtime behavior and texture loading still need confirmation in a **disposable test world**.

## Import both packs

1. Copy/import `prototype_BP` as the Behavior Pack and `prototype_RP` as the Resource Pack into Minecraft Bedrock's development pack folders.
2. Create a disposable test world with cheats enabled and activate **both** packs. The behavior pack declares a dependency on the resource pack.
3. Give yourself the Arcane Ledger: `/give @s obliskia:arcane_ledger`.
4. Give yourself test gear: `/give @s obliskia:test_charm`, `/give @s obliskia:test_ring`, `/give @s obliskia:test_relic`, and `/give @s obliskia:test_focus`.
5. Check that the five items display their custom pixel-art sprites in inventory and hotbar.
6. Use the Ledger, equip and unequip items, fill your inventory, and rejoin the world to test persistence.
7. Check the Content Log for script, JSON, or missing-texture errors.

## Current resource-pack scope

The RP includes `textures/item_texture.json` and five 16×16 PNG sprites. These are first-pass pixel-art icons, not final polished art. No item effects are implemented yet. A narrow crash window between inventory changes and saving equipment state also remains. Do not use it in a live world until runtime tests and transaction-safety work are complete.
