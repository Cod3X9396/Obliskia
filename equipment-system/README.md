# Obliskia Equipment Prototype

The Arcane Ledger opens a prototype equipment menu with four separate slots: Charm, Ring, Relic, and Focus.

## What works in the prototype code
- Each slot accepts only its whitelisted test item.
- Equipping removes one test item from inventory and records it in the player's equipment data.
- Unequipping returns the item; if the inventory is full, the slot stays equipped.
- Equipment data is stored as a player dynamic property for reconnect persistence.
- The Arcane Ledger prevents overlapping menus.

## Test items
The four `obliskia:test_*` items are temporary test items, not final game gear. Give them with commands such as `/give @s obliskia:test_charm`.

## Important
The code and JSON pass static checks, but **the Bedrock runtime has not been tested yet**. Before using this in a real world, import it into a disposable test world and verify opening, equip/unequip, inventory-full behavior, and reconnect persistence. No item effects are implemented yet.

## Next steps
1. Runtime test in a disposable world.
2. Fix any API/version errors from the content log.
3. Add real equipment items and slot rules.
4. Add effects only after equip/unequip and persistence are reliable.
