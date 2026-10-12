# Obliskia Admin Guide

Hey! This guide is for anyone helping run Obliskia. You don't need to be a developer to use most of it.

**The project:** Minecraft Bedrock fantasy RPG  
**Repository:** https://github.com/Cod3X9396/Obliskia  
**Target version mentioned by the owner:** Bedrock v26.52  
**Last updated:** 2026-10-12

> **Quick note:** Some things below are ideas or older development notes, not confirmed working features. If something says **check first**, test it or ask the owner before telling players it's ready.

## 1. What is Obliskia?

Obliskia is a Minecraft Bedrock RPG project with plans for magic, tomes, MP (mana), quests, an AI wizard, and an equipment/trinket menu.

Not everything discussed for the project is in the live world yet. The GitHub repo has some equipment-system files, but that doesn't mean the feature is finished or safe to use on the Realm.

## 2. Being an admin

The main job is to keep the world fun and fair. Try to be helpful, stay calm, and apply the same rules to your friends as everyone else.

### If something goes wrong

1. **Find out what happened.** Ask the players involved and get the story before deciding.
2. **Save evidence if you can.** Screenshots, chat, coordinates, the time, and witnesses can help.
3. **Stop ongoing damage.** Keep people safe, but don't rush into a big punishment without knowing the facts.
4. **Use a fair response.** A reminder may be enough for a first mistake. Repeated or serious problems need stronger action.
5. **Tell the owner when needed.** Especially for serious incidents, disputes, exploits, or anything that could damage the world.
6. **Write down important incidents** in a private admin log so the team knows what happened.

### A simple moderation guide

| Problem | What to do |
|---|---|
| Accidental mess or mistake | Explain what happened and help fix it |
| Spam or annoying chat | Ask them to stop; warn them if it continues |
| Griefing or stealing | Stop the damage, save evidence, and tell the owner if it's serious or repeated |
| Cheating or item duplication | Ask them to stop, save evidence, and don't spread the exploit around |
| Harassment or threats | Protect the affected player and get the owner involved quickly |
| Lost item or bug | Write down what happened and investigate before promising a replacement |

This is a suggested approach, not a built-in Obliskia moderation system. Don't punish someone just because another player accused them.

### What to put in the admin log

Keep it private. Write down:
- When it happened (include the time zone if possible)
- Which admins and players were involved
- What you actually saw or what was reported
- Any screenshots or other evidence
- What action was taken and why
- Whether the owner needs to follow up

## 3. Admin powers and keeping the world safe

- Only give admin/operator powers to people who need them.
- Never share passwords, API keys, or access tokens.
- Don't test random commands or scripts on the live world.
- Don't use admin powers to secretly give yourself or friends an advantage.
- If an admin leaves the team, make sure their access is removed.
- Before changing the world or add-on, check with the owner and make sure there's a way to recover if something breaks.

**Realms and Dedicated Servers aren't the same.** A command or server file that works on a Bedrock Dedicated Server might not be available on a Realm. Use the tools for the hosting setup you're actually using.

For a Bedrock Dedicated Server, the official Minecraft docs cover commands like `op`, `deop`, `gamerule`, and `stop`, along with `server.properties` and `allowlist.json`. The `/allowlist` command has actions such as `add`, `remove`, `list`, `on`, `off`, and `reload`. Check the official docs before using them, and don't assume they work the same way on Realms.

Be extra careful with commands that clear inventories, kill entities, teleport players, change game rules, or reload add-ons. Check what the command will affect first.

## 4. Magic and MP

These are values discussed during development. **Check the current add-on before treating them as the live rules.**

| Spell/system | Previously discussed details |
|---|---|
| MP | Maximum 48; regenerates 1 MP every 2 seconds |
| Tome | A tome is required to cast spells |
| Fireball | Costs 8 MP; right-click was the planned input |
| Flamethrower | Hold sneak; drains 1 MP every 10 ticks; flame effects and damage were discussed |
| Ring of Fire | Costs 25 MP; radius 5; lasts 10 seconds in the newer design notes |
| Black Hole | Described as costing “100%,” but exactly what that means still needs checking |
| Dash | Planned to create a slow field covering 20 blocks for 1 second |

Older Fire Tome notes also mention Ring of Fire being triggered with left-click and using a scoreboard called `ROFtimer`. These details may come from an older version.

### If a spell isn't working

Ask the player:
- Which tome and spell were they using?
- How much MP did they have before and after?
- What buttons or actions did they use (right-click, left-click, sneak)?
- Where were they, and what happened?
- Did particles, sound, or damage appear?
- Did it happen to anyone else?

If possible, test it in a separate world with the same add-on version. Don't promise a spell is fixed until someone has tested it.

## 5. Technical stuff: functions and scoreboards

Earlier development notes mentioned these names:
- `functions/` — where function files may live
- `spell_casting.mcfunction` — discussed as the place that detects or routes spell inputs
- `/function` — Minecraft command used to run a function
- Scoreboards — used for MP, spell state, or timed effects
- `obliskia:fire_tome` — the Fire Tome item identifier
- `ROFtimer` — a scoreboard name mentioned for Ring of Fire timing

These names are from development discussions. Some may have changed or may not exist in the current version. Check the actual files before editing anything.

If you're helping debug:
1. Write down what should happen and what actually happened.
2. Reproduce it in a test world.
3. Check the relevant file and scoreboard.
4. Change one thing at a time.
5. Test again, including multiplayer or reconnecting if relevant.
6. Tell the owner what you changed and what happened.

Don't rename functions or scoreboards casually; other files may depend on them.

## 6. Homes and teleport requests

Commands like `/sethome`, `/home`, and `/tpa` have come up in earlier discussions, but their current availability and exact syntax **haven't been confirmed**.

Don't promise players these commands work until you've tested them. If they're installed, check whether homes survive a reconnect or restart, and whether teleport requests can be accepted, denied, and safely expired.

## 7. The AI wizard project

The owner has discussed connecting an AI wizard to Bedrock through an MCP/mc-agent-style project. A local project folder previously mentioned was `C:\Users\tycem\mc-mcp-server`.

That doesn't mean the AI is currently running in the live world.

Before helping test an AI:
- Test it in a separate world first.
- Give it only the permissions it needs.
- Keep track of what actions it takes.
- Don't let it automatically ban players, change permissions, or clear inventories without human review.
- Stop it and remove its access if it starts doing unexpected things.
- Never post API keys or private server details in public chat or GitHub.

## 8. Equipment and the Arcane Ledger

The equipment project is meant to let players manage magical accessories in a Minecraft-style menu. It's separate from the future Cyberpunk 2077 cyberware idea.

The plan includes:
- Equipment slots separate from normal armor slots
- Clear slot names and item compatibility rules
- A menu players can open themselves, without needing an NPC
- Saving equipment and keeping effects correct after reconnects
- A special item called the **Arcane Ledger** to open the menu

### Is it ready to use?

**No — it's still a prototype. Don't install it in the live world yet.**

The repo currently has these files:
- `equipment-system/README.md`
- `equipment-system/TECHNICAL_SPIKE.md`
- `equipment-system/prototype_BP/manifest.json`
- `equipment-system/prototype_BP/items/arcane_ledger.json`
- `equipment-system/prototype_BP/scripts/main.js`

The script tries to open a basic Minecraft form when the Arcane Ledger is used. The Charm, Ring, Relic, and Focus categories are placeholders, not final decisions. The files passed basic code/JSON checks, but they haven't been proven to work in-game.

It still needs real equip/unequip behavior, item compatibility checks, saved equipment, protection against losing or duplicating items, and the intended custom inventory-like menu.

**For admins right now:**
- Don't add it to the live Realm.
- Don't tell players it's ready.
- Don't hand out placeholder items as finished equipment.
- Leave testing to a separate test world until the owner says it's ready.

More details:
- [Equipment README](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/README.md)
- [Technical notes](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/TECHNICAL_SPIKE.md)
- [Prototype script](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/prototype_BP/scripts/main.js)

## 9. Bugs, exploits, and lost items

When someone reports a bug, get:
- Their Minecraft and add-on version, if known
- What they were doing, step by step
- When and where it happened
- Whether it affects one player or everyone
- Screenshots or other evidence
- What items or world changes were involved

### If someone finds an item duplication bug

1. Ask them to stop repeating it.
2. Save the details and evidence.
3. Don't share the exploit publicly.
4. Reproduce it in a test world, not the live one.
5. Ask the owner what to do next.

Don't confiscate unrelated items or decide on a rollback yourself.

### If someone loses an item

1. Find out exactly which item and how many were lost.
2. Ask what happened just before it disappeared.
3. Check whether it was dropped, used, moved, or lost because of a bug.
4. Look for a safe way to recover it.
5. Tell the owner if it looks like an add-on bug.

Don't promise a replacement before the situation has been checked.

## 10. New-admin checklist

- [ ] Read this guide and ask questions about anything unclear.
- [ ] Know who the owner is and how to contact them.
- [ ] Know which features actually work in the live world.
- [ ] Know the difference between the live world and the test world.
- [ ] Know what you are allowed to do as an admin.
- [ ] Know how incidents should be recorded.
- [ ] Find out whether backups exist and how to restore them.
- [ ] Keep private information and credentials private.
- [ ] Ask before making risky changes.

## 11. Quick status check

| Feature | What we know |
|---|---|
| Obliskia RPG | Main project direction |
| Bedrock v26.52 | Version mentioned by the owner; check the live world |
| MP and spell costs | Discussed during development; check what's actually enabled |
| Homes and TPA | Mentioned before; commands aren't confirmed |
| AI wizard | Planned/discussed; don't assume it's running |
| Arcane Ledger equipment menu | Prototype only; not ready for the live world |
| Moderation steps in this guide | Suggestions for the admin team to agree on |

## 12. Making changes

- Make one change at a time and explain what you changed.
- Check the changes before putting them in the live world.
- Keep API keys, passwords, player private information, and server details out of GitHub.
- Update this guide when commands or spell values really change.
- Only call something “working” after it's been tested in the place it will actually be used.

## Useful links

### Obliskia
- [Main repository](https://github.com/Cod3X9396/Obliskia)
- [Equipment README](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/README.md)
- [Equipment technical notes](https://github.com/Cod3X9396/Obliskia/blob/main/equipment-system/TECHNICAL_SPIKE.md)

### Official Minecraft help
- [Bedrock Dedicated Server setup](https://learn.microsoft.com/en-us/minecraft/creator/documents/bedrockserver/getting-started?view=minecraft-bedrock-stable)
- [The `/allowlist` command](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/allowlist?view=minecraft-bedrock-stable)
- [Minecraft commands and permissions](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands?view=minecraft-bedrock-stable)

**If you're not sure, pause and ask the owner. It's better to check than to accidentally break something in the live world.**
