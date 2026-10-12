# Obliskia Equipment & Trinket System

A standalone equipment interface for Obliskia's magical items. This system is separate from the future Cyberpunk 2077 cyberware project.

## Core requirements

- Equipment slots are separate from Minecraft's normal armor slots.
- Each slot has a clear category name and a visual identifier; text and icons should work together.
- Every item declares which slot category it belongs to. Incompatible items must be rejected.
- Players manage their own equipment through the custom UI; no Ripperdoc-style provider requirement.
- Equipped items and their effects must remain consistent after reconnects and in multiplayer.
- The implementation must be validated by server-side script wherever Bedrock APIs allow it.
- The design is inspired by the Archaism Talismans inventory UI: a Minecraft-native feel, clearly labeled slots, recognizable item icons, and a compact equipment layout. This is an independent implementation and must not depend on that add-on.
- The interface is opened by using a dedicated custom item, the Arcane Ledger—not a chat command.

## Development order

1. **Opening-item proof of concept:** use the custom Arcane Ledger item to open a temporary native Bedrock form and verify the item-use event on Bedrock 26.52.
2. **Custom UI proof of concept:** research and test a Minecraft-style inventory layout inspired by Archaism Talismans; don't mistake the temporary form for the final interface.
3. **Slot rules:** define data for slot categories, allowed item IDs, compatibility checks, and safe handling of rejected items.
4. **Equipment state:** store equipped item IDs per player and restore them reliably.
5. **Effects:** apply/remove item effects without duplicates or stale effects.
6. **UI and polish:** clear category labels, empty-slot icons, selected-item details, and invalid-slot feedback.
7. **Packaging and testing:** test reloads, reconnects, multiplayer, inventory-full cases, and Realm compatibility.

## Non-goals

- No cyberware or Cyberpunk categories.
- No replacement of vanilla armor slots.
- No requirement for magical NPCs or stations to equip items.
- No dependency on Archaism Talismans.

## Status

Planning / technical proof of concept. Do not assume custom UI opening, item movement interception, or abstract-slot locking works until it has been demonstrated in the target Bedrock version.
