# Testing the Equipment Prototype

Do not import this into the main world yet. The code has passed static checks and mocked tests of equip, unequip, and full-inventory handling. Bedrock runtime behavior still needs confirmation in a **disposable test world**.

## Import both packs

1. Copy/import `prototype_BP` as the Behavior Pack and `prototype_RP` as the Resource Pack into Minecraft Bedrock's development pack folders.
2. Create a disposable test world with cheats enabled and activate **both** packs. The behavior pack declares a dependency on the resource pack.
3. Give yourself the Arcane Ledger: `/give @s obliskia:arcane_ledger`.
4. Give yourself test gear: `/give @s obliskia:test_charm`, `/give @s obliskia:test_ring`, `/give @s obliskia:test_relic`, and `/give @s obliskia:test_focus`.
5. Use the Ledger, equip and unequip items, fill your inventory, and rejoin the world to test persistence.
6. Check the Content Log for script or JSON errors.

## Current resource-pack scope

The RP currently contains its manifest and English pack metadata. Items still use vanilla icons; custom item artwork and texture-atlas mappings have not been added yet.

The prototype only stores equipped item IDs; it does not apply item effects yet. A narrow crash window between inventory changes and saving equipment state also remains. Do not use it in a live world until runtime tests and transaction-safety work are complete.
