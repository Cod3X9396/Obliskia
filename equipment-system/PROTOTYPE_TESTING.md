# Testing the Equipment Prototype

Do not import this into the main world yet. The code has passed static checks and a mocked test of equip, unequip, and full-inventory handling. Bedrock runtime behavior still needs confirmation in a **disposable test world**.

1. Import the prototype behavior pack into a new test world with cheats enabled.
2. Give yourself the Arcane Ledger: `/give @s obliskia:arcane_ledger`.
3. Give yourself test gear, e.g. `/give @s obliskia:test_charm`, `/give @s obliskia:test_ring`, `/give @s obliskia:test_relic`, and `/give @s obliskia:test_focus`.
4. Use the Ledger, equip and unequip items, fill your inventory, and rejoin the world to test persistence.
5. Check the Content Log for script or JSON errors.

The prototype only stores equipped item IDs; it does not apply item effects yet. Do not use it in a live world until the runtime checklist passes.
