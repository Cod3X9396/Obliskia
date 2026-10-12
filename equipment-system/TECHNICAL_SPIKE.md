# Equipment Prototype Test Plan

## Current prototype
The Arcane Ledger opens a native Bedrock form. Four test-only item types map to four slots: Charm, Ring, Relic, and Focus. The script removes a matching test item when equipping, records the slot in a player dynamic property, and returns the item when unequipping.

## Static checks
- `scripts/main.js` passes a JavaScript syntax check.
- `manifest.json` and all five item JSON files parse successfully.
- Slot item IDs are explicitly whitelisted in the script.

## Runtime test checklist
Use a **disposable test world**, not the main world:
1. Confirm the pack loads without script/JSON errors.
2. Give yourself the Arcane Ledger and each test item.
3. Use the Ledger; confirm all four slots open.
4. Equip a Charm in Charm; confirm one Charm leaves inventory.
5. Try a Ring in Charm; it must not be offered.
6. Unequip; confirm the item returns exactly once.
7. Fill inventory, then unequip; it must stay equipped.
8. Rejoin the world; confirm equipment remains recorded.
9. Repeat in multiplayer if the target setup supports it.

## Known limits
- Static checks do not prove Minecraft runtime compatibility.
- Equipped items are recorded and held out of inventory, but **their effects are not implemented**.
- If the game shuts down at the exact moment between inventory mutation and saving state, a narrow item-loss/duplication risk may remain. Treat this as an early prototype, not production-safe gear.
- The native form is functional UI, not the final custom inventory-like screen.
