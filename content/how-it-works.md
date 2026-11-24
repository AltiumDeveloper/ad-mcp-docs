# How it works

You can use the extension without any of this. It is here for when an answer surprises you
and you want to know why.

## The MCP server vs the LLM

It helps to keep two very different things apart.

| | **The MCP server (Altium Designer)** | **The LLM (Claude)** |
| --- | --- | --- |
| **Role** | Provides facts | Reasons about them |
| **Gives you** | Netlists, pin lists, parameters, ERC results | Interpretation, calculations, opinions, review comments |
| **Can it be wrong?** | It reports what is in your design. Some fields are heuristic (see below). | Yes. It can misread, over-generalise, or invent things that sound plausible. |
| **Does it remember?** | No. Every question is answered against the design as it is right now. | Yes, within one conversation. |

**Practical consequence:** treat the tool output as data and the assistant's conclusions
as *a colleague's opinion that needs checking*. When the assistant claims something about
your design, it is reasonable to ask *"which tool did you use, and what did it return?"*

**A note on heuristics.** A few fields are guessed rather than known — most importantly
**component type** (IC, connector, resistor…), which is inferred from the name,
description, and pin count. Counts by category are approximate. Values, descriptions,
designator prefixes, and pin names are reliable; the type classification is not.

## What the assistant actually sees

The schematic tools read the **compiled schematic model**: the connectivity that Altium
Designer produces when the project is compiled. They do **not** read the per-sheet editor
model — the drawing you work in.

What that means in practice:

- **Cross-sheet connections are already resolved.** A signal that leaves sheet 3 through
  a port, crosses a sheet symbol, and arrives on sheet 7 is presented as *one net* with
  all its pins. The assistant can tell you everything that net touches and on which
  sheets — but it cannot tell you *how* the connection was drawn.
- **Drawing objects are invisible to it.** Ports, sheet entries, sheet symbols, buses
  and bus entries, signal harnesses, wires, junctions, net labels, power ports, and
  object coordinates are not part of the model. Nor is the physical placement of
  anything on the sheet.
- **Structural checks of the drawing belong to ERC**
  ([Electrical Rule Check (ERC)](./tools/erc.md)), which does inspect those objects and
  reports what it finds as violations. Ask for an ERC run rather than asking the
  assistant to look at the drawing.
- **Bus members appear as ordinary nets.** `D[0..7]` is seen as eight individual nets,
  not as a bus. Net *classes*, however, are available, and differential pairs are
  identified as such.
- **The model reflects the last compile.** If you have edited sheets since, ask for an
  ERC run first — compiling refreshes the data every other schematic tool reads.

This is a limitation of the current release, not a design decision, and the first part of
the editor model is already reachable: with the experimental tools enabled
([Schematic editing (experimental)](./tools/editing.md)), a single sheet can be read as a grid
of cells — components, pins, wires, labels and ports, with their positions.

**A revision reads differently again.** Answered from a committed revision
([Project history and revisions](./tools/history.md)) rather than from your working copy, the
sheets arrive as a flat list with no hierarchy, and footprints and source libraries are not
part of the data.

## The session flow: projects and variants

Almost every conversation follows the same opening sequence, automatically:

1. **List projects** — find out what is open and which project is active.
2. **List design variants** — find out which variant (design configuration) is current.
3. **Answer the question** using the schematic tools, for the chosen project and variant.

Variants matter: with a variant selected, *Not Fitted* components disappear from the
data and *Alternate* parts replace the originals, so answers reflect the variant you are
actually building. The base design is called `[No Variations]`.

## Context, and why long conversations drift

The **context** is everything the assistant currently has in front of it: your messages,
its own replies, and every tool result returned so far in this conversation. It is
finite. Two things follow:

- **Long conversations degrade.** After a long session of large netlist dumps, older
  parts of the conversation are pushed out and the assistant starts to lose track. When a
  session gets confused, start a new conversation.
- **The assistant may reuse stale data.** If you switch to a different project in Altium
  Designer mid-conversation, the assistant may still answer from the netlist it fetched
  earlier. If you change project or make design edits, say so explicitly:

  > *"I have switched to a different project — please re-read the design before answering."*

  Or, more safely, start a fresh conversation.

## Why this rather than your own MCP server

Altium Designer has a scripting and extension API, and it is entirely possible to wrap it
in an MCP server of your own. If you have already tried, you will recognise the two places
where it becomes hard: **token usage** and **answer quality**. Both are the substance of
this extension rather than a side effect of it.

**Token usage — the tools return answers, not dumps.** A thin wrapper over the API
typically hands the model whole object collections: every component, every pin, every net.
On a real board that is tens of thousands of tokens *per question*, the context fills after
a handful of exchanges, and the quality collapses with it. This server is built the other
way round:

- Queries are evaluated **inside Altium Designer**, across the whole compiled model, and
  only the result comes back. *"Which power nets have more than ten consumers?"* costs a
  few hundred tokens on a 2000-component design, not the netlist.
- A single call gives the assistant a whole-project orientation, so it does not go fishing.
- Aggregation happens in the query: a part inventory comes back one row per *library part*
  rather than per placement, narrowed by pin count, so the placements never reach the
  conversation at all.
- Oversized results are truncated with an explicit *"refine your query"* hint rather than
  being allowed to flood the conversation.

**Answer quality — the wrapper is the easy half.** What decides whether you get a correct
answer is not the API call; it is whether the model picks the right tool, passes the right
arguments, and reads the result correctly. That comes from the tool descriptions, the input
schemas, and the follow-up hints embedded in the results — all of which are maintained as
part of the product and tuned against real designs. The same applies to the domain
knowledge baked in: variant handling, net classes and differential pairs, the ERC
configuration, the symbol conventions and the review gate in
[Creating, validating and updating schematic symbols](./symbols.md). None of that arrives
with an API binding.

**Reach.** The extension runs *inside* Altium Designer, so it can use the compiled
connectivity model, the ERC engine and its configuration, live cross-probing and
highlighting, sheet screenshots, Altium 365 comments, the workspace's project history and
stored revisions, and the symbol editor. Much of that is not reachable from a script, and
none of it from outside the running application.

**Maintenance.** It ships, updates and is supported with Altium Designer. A private bridge
is yours to keep working across releases.

**When your own server still makes sense.** If you need something specific to your flow
that these tools do not cover, build it — this does not stand in the way, and MCP clients
talk to several servers at once, so the two coexist. Please also tell us what was missing;
that is how the list of capabilities grows.
