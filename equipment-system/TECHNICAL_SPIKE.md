# Technical Proof of Concept

This document tracks the risks that must be tested before building the full equipment system.

## Questions to prove

### 1. Custom UI entry point
Can the desired custom JSON UI screen be opened reliably from a supported in-game action in the target Bedrock version? The reference add-on uses custom JSON UI files, but its activation mechanism must be verified rather than guessed.

### 2. Slot interaction and validation
Can the interface prevent incompatible items from entering a slot? If UI controls do not provide a secure validation boundary, all state changes must go through a script-controlled path and be checked again server-side.

### 3. Storage model
Compare:
- a dedicated managed inventory/container, and
- per-player equipment data with a UI that presents virtual slots.

Choose only after confirming the interaction model and persistence behavior. A visual slot is not automatically a real inventory slot.

### 4. Persistence
Test player leave/rejoin, world reload, death, and dimension changes. Decide which state survives each event and how missing/invalid item IDs are recovered.

### 5. Realm support
Avoid APIs that are unavailable on Realms or dedicated-server-only. Verify every dependency against the actual target game version.

## Acceptance criteria for the first prototype

- The pack loads without script or JSON errors.
- The custom screen can be opened and closed reliably.
- Every empty slot visibly identifies its category using text and/or an icon.
- An item from the wrong category is rejected without being lost or duplicated.
- A valid item can be equipped, removed, and restored after reconnecting.
- The behavior is tested in the intended Bedrock version before the architecture is expanded.

## Debug findings

- The current JavaScript passes a local syntax check, and the manifest/item JSON parse successfully. This does not prove the script modules load in Minecraft.
- The detail page previously labeled its button **Back** but simply closed the form. The menu loop now makes it return to the category menu.
- A per-player guard now prevents overlapping forms from repeated item-use events.
- The item icon was changed from `book_enchanted` to the vanilla `enchanted_book` texture key.

## Current blockers

- The Arcane Ledger event and native form still need an in-game runtime test before their behavior can be called verified.
- `ActionFormData` is a button-list dialog, not the desired inventory-like custom screen.
- There is no actual item-equip flow, slot compatibility validation, persistence, or item-loss/duplication protection yet.
- The custom-screen opening method and slot interaction model remain unproven for the target Bedrock version.
