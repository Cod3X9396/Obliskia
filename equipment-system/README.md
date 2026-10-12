# Obliskia Equipment & Trinket System

A standalone equipment interface for Obliskia's magical items. This system is separate from the future Cyberpunk 2077 cyberware project.

## Core requirements

- Equipment slots are separate from Minecraft's normal armor slots.
- Each slot has a clear category name and a visual identifier; text and icons should work together.
- Every item declares which slot category it belongs to. Incompatible items must be rejected.
- Players manage their own equipment through the custom UI; no Ripperdoc-style provider requirement.
- Equipped items and their effects must remain consistent after reconnects and in multiplayer.
- The implementation must be validated by server-side script wherever Bedrock APIs allow it.
- The design is inspired by the Archaism Talismans inventory UI, but this is an independent implementation and must not depend on that add-on.

## Development order

1. **Technical proof of concept:** establish the target Bedrock version, confirm how the custom screen is opened, and test whether the selected UI approach can safely represent and change equipment slots.
2. **Slot rules:** define data for slot categories, allowed item IDs, compatibility checks, and safe handling of rejected items.
3. **Equipment state:** store equipped item IDs per player and restore them reliably.
4. **Effects:** apply/remove item effects without duplicates or stale effects.
5. **UI and polish:** clear category labels, empty-slot icons, selected-item details, and invalid-slot feedback.
6. **Packaging and testing:** test reloads, reconnects, multiplayer, inventory-full cases, and Realm compatibility.

## Non-goals

- No cyberware or Cyberpunk categories.
- No replacement of vanilla armor slots.
- No requirement for magical NPCs or stations to equip items.
- No dependency on Archaism Talismans.

## Status

Planning / technical proof of concept. Do not assume custom UI opening, item movement interception, or abstract-slot locking works until it has been demonstrated in the target Bedrock version.
