# Obliskia — New Admin Handbook

**Audience:** new moderators, administrators, and technical maintainers  
**Project:** Minecraft Bedrock fantasy-RPG add-on  
**Repository:** https://github.com/Cod3X9396/Obliskia  
**Target reported by the owner:** Bedrock v26.52  
**Reviewed:** 2026-10-12

> **Read first:** This guide distinguishes previous design notes from confirmed live features. A feature described here is not necessarily installed or working in the current world. Items marked “verify” or “planned” must be checked in the actual world or current code before an admin promises that they work.

## 1. What Obliskia is

Obliskia is a Minecraft Bedrock fantasy RPG project. Its intended features include magical tomes and spellcasting, MP/mana, spell effects, an AI-wizard/agent project, player convenience commands, quests, and a separate equipment/trinket interface.

The public GitHub repository currently contains the equipment-system documents and a small prototype behavior pack. Do not assume every project idea is live on the Realm.

## 2. Admin responsibilities and moderation

Admins protect the world and its players; they are not above the rules.

### Incident procedure

1. Identify the player and what allegedly happened.
2. If the facts are unclear, ask questions before punishing.
3. Preserve evidence when practical: chat context, screenshots, coordinates, time, witnesses, and relevant logs.
4. Use the least severe action that safely addresses the issue.
5. Record significant actions in a private admin log.
6. Escalate serious, repeated, disputed, or technical cases to the world owner.

### Recommended moderation ladder

This is a recommended policy, not a built-in Obliskia moderation feature.

| Situation | Initial response | Escalation |
|---|---|---|
| Accidental disruption | Explain the rule and help correct it | Warning if repeated |
| Spam/disruptive chat | Tell the player to stop; warn | Remove from session if it continues |
| Griefing/theft | Stop ongoing damage and preserve evidence | Restore from a trusted backup if available; escalate repeat cases |
| Cheating/exploit/duplication | Stop abuse and preserve evidence; don't spread exploit instructions | Owner review, rollback or restriction as appropriate |
| Harassment/threats | Protect affected players and preserve evidence | Remove offender from session and escalate promptly |
| Bug or unfair item loss | Record exact steps and affected state | Reproduce in a test world; don't promise compensation before review |

Do not punish someone solely on rumor. An admin may temporarily interrupt an incident for safety while gathering facts.

### Private moderation log

Record date/time and timezone, admin, players involved, factual description, evidence/witnesses, action and reason, whether owner review is needed, and follow-up. Keep the log private; do not publish players' private information.

## 3. Permissions and world safety

### Least privilege

- Give operator/admin powers only to people who need them.
- Never share owner credentials, API keys, or access tokens.
- Do not run unfamiliar commands/scripts on the live world.
- Review access when an admin leaves the team.
- Do not use admin powers to benefit yourself or friends secretly.

### Realm versus Bedrock Dedicated Server

These are different hosting environments. Do not assume a dedicated-server command or file exists on a Realm. Use the actual world owner's supported Realm/Minecraft permission controls for the hosting setup.

For Bedrock Dedicated Server, Microsoft's documentation describes console commands such as `op`, `deop`, `gamerule`, and `stop`, plus `server.properties` and `allowlist.json`. The documented `/allowlist <action> [name]` actions include `add`, `remove`, `list`, `on`, `off`, and `reload`. Check the current server version and permissions before using these. See the official links in section 13.

### Before destructive commands

Commands that clear inventory, kill entities, teleport players, change game rules, or reload packs can cause collateral damage. Confirm the target and result, check scope, make a backup/use a test world where possible, and record changes to inventory, builds, permissions, or world state. Do not edit or reload live packs without owner approval and a recovery plan.

## 4. Magic and MP

The following values are from prior design discussions. Verify them against the current add-on before treating them as live rules.

- Maximum MP: **48**
- The spell system requires a tome.
- Regeneration: **1 MP every 2 seconds**
- Fireball: **8 MP**
- Ring of Fire: **25 MP**, **radius 5**, **10 seconds** in the newer design summary.
- Black Hole: described as costing **100%**; whether this means all current MP, a full bar, or another rule needs implementation verification.
- Dash: creates a **20-block slow field for 1 second** in design notes.

A previous Fire Tome implementation discussion gave more detail:
- Fireball costs 8 MP per right-click.
- Flamethrower requires sneaking, drains 1 MP every 10 ticks, emits flame particles and damage at a range described as 2–8 blocks, and was designed to provide fire resistance and a sound.
- Ring of Fire costs 25 MP, uses left-click, lasts 200 game ticks (10 seconds), and was tracked with a scoreboard named `ROFtimer`.

These may describe a particular version of the Fire Tome, not necessarily the current live pack. Live code and observed behavior take precedence. Do not invent spell costs or tell players a spell is enabled until verified.

### Troubleshooting a spell

Ask for the tome and spell, MP before/after, exact input (right-click, left-click, sneak), dimension/coordinates, whether particles/sound/damage appeared, whether other players were nearby, and any available error. Reproduce in a test world. Don't spawn replacements or edit MP until the loss is verified and the owner-approved compensation policy is known.

## 5. Functions, scoreboards, and pack debugging

Previous implementation discussions referenced:
- A `functions/` folder.
- `spell_casting.mcfunction` as an input-detection/dispatch point.
- Spell-specific functions invoked using `/function`.
- Scoreboards for MP, spell state, and timed effects.
- Fire Tome identifier `obliskia:fire_tome`.
- Separating input detection, spell logic, and tick/update logic for ongoing effects.

These are known from prior development context, but exact files may not all be present in the current public repository. Inspect the current pack before editing. Scoreboard names and function identifiers may be referenced elsewhere; don't rename them casually.

Safe debugging:
1. Record expected versus actual behavior.
2. Reproduce in a test world with matching pack versions.
3. Inspect the relevant function/script and scoreboard values.
4. Change one thing at a time.
5. Test normal use, insufficient MP, repeated use, death/rejoin, and multiplayer when relevant.
6. Record results and update documentation.
7. Move fixes to the live world only with owner approval.

## 6. Homes and teleport requests

Previous discussions referenced `/sethome`, `/home`, and `/tpa`. Their availability and exact syntax are **not verified by the current public repository**. They may belong to another pack/tool or may still be planned.

Do not invent syntax or promise they work. If they are present, verify how homes persist after reconnect/restart, how teleport requests are accepted/denied/expired, cross-dimension behavior, cooldowns/limits, and abuse prevention. Test in a safe world before documenting the commands as live.

## 7. AI wizard / agent project

The owner has discussed connecting an AI wizard brain to Bedrock/Realm through an MCP/mc-agent-style setup. The related local project path previously mentioned was `C:\Users\tycem\mc-mcp-server`. Proposed ideas included AI-selected spell/function actions and combat roles.

This is development context, not proof an AI wizard is running on the live world. Before enabling any agent:
- Restrict tools and permissions to the minimum required.
- Test in a separate world.
- Keep an audit trail of its actions.
- Require human review for bans, permission changes, inventory clearing, or other destructive actions.
- Stop the process/revoke access if it behaves unexpectedly.
- Never put keys, tokens, or private server details in public chat/issues/screenshots.

## 8. Equipment and trinket inventory

Project files: [equipment-system](https://github.com/Cod3X9396/Obliskia/tree/main/equipment-system).

This is an equipment system for Obliskia magical accessories, separate from the future Cyberpunk 2077 cyberware project.

### Intended design
- Slots separate from vanilla armor slots.
- Each slot clearly labeled and visually identifiable.
- Each item declares its permitted category; incompatible items must be rejected.
- Players equip/unequip through UI without requiring an NPC/provider.
- Equipment state and effects should remain consistent after reconnects and in multiplayer.
- Minecraft-native inventory feel, inspired by the Archaism Talismans layout but implemented independently.
- A dedicated custom item, the **Arcane Ledger**, opens the interface; not a chat command.

### Current prototype status
The repository contains:
- `equipment-system/README.md`
- `equipment-system/TECHNICAL_SPIKE.md`
- `equipment-system/prototype_BP/manifest.json`
- `equipment-system/prototype_BP/items/arcane_ledger.json`
- `equipment-system/prototype_BP/scripts/main.js`

The script attempts to open a temporary native Bedrock `ActionFormData` menu when the Arcane Ledger is used. Charm, Ring, Relic, and Focus are placeholder categories, not final approved categories. JavaScript syntax and JSON static checks were performed, but this does not prove the pack runs in Minecraft.

**This is not a complete or in-game-verified equipment system.** It does not yet equip real items, enforce compatibility, persist equipment, or provide the intended inventory-like custom UI. The owner explicitly decided not to import it into Minecraft until a working prototype exists.

Admin rules:
- Do not install it in the live world/Realm.
- Do not tell players the Arcane Ledger is ready for normal use.
- Do not distribute placeholder items as if their categories are finalized.
- Keep development in the repository and test environment until UI, equip/unequip, validation, persistence, and recovery are demonstrated.
- If testing later shows item loss/duplication, stop testing, preserve evidence, and notify the owner.

See the [equipment README](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/README.md) and [technical spike](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/TECHNICAL_SPIKE.md).

## 9. Bugs, exploits, and item-loss reports

For any bug, record player, time, game/pack version, reproduction steps, scope (one player or many), screenshots/logs, and what changed. Avoid publicly sharing exploit instructions. Reproduce in a test world and do not delete/duplicate items to “fix” it before understanding the cause.

If duplication is suspected:
1. Stop repeated testing and ask the player not to continue exploiting it.
2. Avoid confiscating unrelated items.
3. Record before/after evidence and exact steps.
4. Isolate testing from the live world.
5. Let the owner decide rollback, item removal, or remediation.

If an item is lost:
1. Do not promise an immediate replacement.
2. Determine whether it was dropped, consumed, moved, or lost to a bug.
3. Record item name/identifier, count, location, and sequence of actions.
4. Check for a safe recovery/backup.
5. Escalate suspected add-on bugs.

## 10. New-admin checklist

- [ ] Read this guide and ask about unclear rules.
- [ ] Know which features are live versus planned.
- [ ] Know the owner and how to contact them.
- [ ] Understand moderation and private logging.
- [ ] Know which world is production and which is test.
- [ ] Confirm whether backups exist and how restoration works; do not assume.
- [ ] Confirm your exact permission level and responsibilities.
- [ ] Agree not to abuse powers, leak private information, or share credentials.
- [ ] Know how to report an incident or malfunctioning AI/add-on.

## 11. Quick status table

| Area | Known details | Status |
|---|---|---|
| Project | Bedrock fantasy RPG/add-on | Confirmed direction |
| Target version | Owner reported Bedrock v26.52 | Verify against live world |
| MP | 48 max; 1 MP/2 sec regen | Previously discussed; verify live |
| Fireball | 8 MP; Fire Tome right-click discussed | Previously discussed; verify live |
| Flamethrower | Sneak; 1 MP per 10 ticks | Prior implementation discussion; verify live |
| Ring of Fire | 25 MP; 10 sec; radius 5 in design summary | Previously discussed; verify live |
| Black Hole | “100%” cost mentioned | Meaning/implementation unverified |
| Dash | 20-block slow field for 1 sec | Design note; verify live |
| Homes/TPA | `/sethome`, `/home`, `/tpa` mentioned | Availability/syntax unverified |
| AI wizard | MCP/mc-agent integration discussed | Do not assume live |
| Equipment | Arcane Ledger + temporary form in repository | Prototype only; not live-ready |
| Moderation rules | Proposed in this handbook | Owner/admin team should approve |

## 12. Change management

- Keep code and docs in the GitHub repository.
- Make focused changes and clear commit messages; review diffs.
- Never commit credentials, API keys, player personal information, or private server details.
- Keep a changelog for gameplay values and admin commands.
- Update this guide when a documented value changes.
- Call a feature “live” only after testing in the intended environment.

## 13. Sources and reference links

### Obliskia
- [Repository](https://github.com/Cod3X9396/Obliskia)
- [Equipment README](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/README.md)
- [Equipment technical spike](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/TECHNICAL_SPIKE.md)
- [Arcane Ledger prototype script](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/prototype_BP/scripts/main.js)

### Official Minecraft documentation
- [Bedrock Dedicated Server setup and configuration](https://learn.microsoft.com/en-us/minecraft/creator/documents/bedrockserver/getting-started?view=minecraft-bedrock-stable)
- [Bedrock `/allowlist` command](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/allowlist?view=minecraft-bedrock-stable)
- [Bedrock command list and permission levels](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands?view=minecraft-bedrock-stable)

**Rule of thumb:** when uncertain, pause, preserve evidence, and ask the owner. Never guess command syntax, promise an unverified feature, or experiment destructively on the live world.
