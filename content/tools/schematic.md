# Schematic data

> **These tools read the compiled model, not your drawing.** Connectivity is resolved for
> you across sheets; ports, buses, wires and coordinates are not visible — the experimental
> sheet tools in [Schematic editing (experimental)](./editing.md) are the one exception.
> This is worth understanding before you frame a question —
> see [What the assistant actually sees](../how-it-works.md#what-the-assistant-actually-sees).

| Tool | What it does |
| --- | --- |
| `ad_schematic_summary_details` | High-level overview: sheet hierarchy, component and net counts, a histogram of component types, all power rail names, the project description, and the list of custom property names available. This is the assistant's orientation step, and the query tool is instructed not to run before it. |
| `ad_schematic_script_run` | The workhorse. Runs a small query against the compiled model — components, pins, nets, net classes, differential pairs, sheets, component parameters and footprints — and returns exactly the answer asked for, instead of dumping the whole netlist. This is what powers most connectivity questions, including part inventories: one row per library part, filtered by pin count to find the large ICs. |
| `ad_schematic_screenshot_capture` | Captures a picture of a schematic sheet. Used for things that have no textual form: sticky notes, text frames, hand-drawn boxes, coloured regions, highlights. It is a supplement to the text tools, not a replacement — asking "what does this circuit do?" should be answered from connectivity, not from a picture. |

**Why the query tool matters to you:** it is the reason the assistant can answer
*"which power nets have more than ten consumers?"* on a 2000-component design without
running out of context.
