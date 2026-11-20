# Schematic editing (experimental)

> **Off by default, and in development.** These tools exist only when beta features are
> enabled for your account *and* you tick **Experimental Tools** in the preferences page
> ([Connect Altium Designer to your AI client](../setup.md#connect-altium-designer-to-your-ai-client)). Names, arguments and
> behaviour can change from release to release, so treat them as a preview: work on a copy
> of the project, and save before you start.

This is the one group that draws on a sheet rather than reading one.

| Tools | What they do |
| --- | --- |
| **Read a sheet** — `ad_schematic_sheet_details`, `ad_schematic_sheet_verify` | Read a single sheet as a grid: component and pin cells, wires, net labels, ports, the nets they form, and what looks broken. Then check the drawn result against an intended netlist. |
| **Find a part** — `ad_schematic_part_resolve` | Search your workspace library by part number, or by description — *"240 Ohm 0603"* — and return the matches, the best one with its symbol and pins. Touches no sheet. |
| **Place and edit** — `ad_schematic_component_*` | Place library parts, set designator, comment, value or any parameter, move, rotate or mirror, and remove. |
| **Wire it** — `ad_schematic_wire_create`, `ad_schematic_marker_create`, `ad_schematic_wiring_delete` | Draw wires between pins, place net labels, power ports, grounds, sheet ports and No-ERC markers, and erase any of those again. |
| **Sheets and blocks** — `ad_schematic_sheet_create`, `ad_schematic_sheet_clear`, `ad_schematic_block_create` | Add a blank sheet, clear one, and replicate a rectangular block — one channel of a repeated circuit — at an offset, with fresh designators. |

Four things to know before you try them:

- **Nothing tidies up after an edit.** Wires do not follow a component you move, and
  deleting a component leaves its wires hanging. The assistant has to redraw them, and you
  should check that it did.
- **Clearing a sheet is broader than it sounds.** Clearing removes all the wiring on the
  sheet by default, not only the wiring of the components you named.
- **Nothing is saved.** The edits land in the open document; you save or discard them.
- **Verify, don't trust.** Ask for a sheet check against the intended netlist and an ERC
  run afterwards. Both are cheap, and they are what tells you the drawing matches the intent.
