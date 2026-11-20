# Altium Designer MCP Server

The **Altium Designer MCP Server** is an extension for Altium Designer that lets an AI
assistant — such as Claude — read and act on the design you currently have open.

Without it, an AI chat knows nothing about your board. You would have to describe your
circuit in words, or paste in netlists and screenshots by hand. With it, you can simply
ask:

> *"Which pins of U3 are unconnected?"*
>
> *"Are there any nets driven by two outputs?"*
>
> *"Add a comment on R31 explaining that this divider holds the reset pin low."*

and the assistant reads the answer directly out of your live design.

**MCP** stands for *Model Context Protocol*. It is an open, industry-standard way for
applications to expose their data to AI assistants. You do not need to understand the
protocol itself — think of it as a cable between Altium Designer and your AI chat window.

## What you can do with it

The extension currently exposes these groups of capability:

| Area | What you can ask for |
| --- | --- |
| **Design & schematic data** | Components, nets, connectivity, pin functions, net classes, differential pairs, design variants, sheet hierarchy, component parameters (MPN, manufacturer, datasheet links, footprint). |
| **Design review (ERC)** | Run a compile / Electrical Rule Check, summarise violations, drill into individual ones, and highlight the offending objects on the sheet. |
| **History & revisions** | For a project managed in a workspace: what happened to it (commits, releases, copies), what a given commit changed, and the project overview or a query re-run against a committed revision instead of your working copy. |
| **Collaboration** | Create, read, reply to, assign, resolve, and delete comments on schematic objects — the same comments your colleagues see in Altium 365. |
| **Schematic symbols** | **Create** a symbol from a part number or a datasheet, **validate** an existing one against its datasheet or your house style, and **update** it in place — pin names, electrical types, grouping, multi-part splits. |
| **Schematic editing** *(experimental)* | Place parts, draw wires, add net labels and ports, move or remove what is on a sheet, replicate a channel, add a sheet, and check a sheet against an intended netlist. Off by default — see [Schematic editing (experimental)](https://docs.developer.altium.com/ad-mcp-docs/tools/editing/). |

**It works on the design in front of you.** The assistant reads your running Altium Designer
session, so it sees your local state — including work you have not yet pushed to the
workspace or shared with the team. That is the point: you can review a change while it is
still yours to fix, rather than after it has gone to the server. It also means the
assistant sees your copy, not a colleague's — if someone else has edited the design and
you have not pulled the update, pull it first. A committed revision can be read as well,
which is how you compare the two ([Project history and revisions](https://docs.developer.altium.com/ad-mcp-docs/tools/history/)).

> **It runs on your machine.** The server is part of Altium Designer, listens only to your
> own PC, and reads only what you have open.
> [Is it safe?](https://docs.developer.altium.com/ad-mcp-docs/security/) covers the security detail, and
> [Why this rather than your own MCP server](https://docs.developer.altium.com/ad-mcp-docs/how-it-works/#why-this-rather-than-your-own-mcp-server)
> covers why this rather than a home-grown server on the Altium API.

> **This list is a snapshot, not a ceiling.** The MCP Server is under active development
> and the set of capabilities is expanding with each release — both in depth (richer data
> and more control within the areas above) and in breadth (further design domains). Expect
> this table, and the [Tool reference](https://docs.developer.altium.com/ad-mcp-docs/tools/), to grow. Two
> practical consequences:
>
> - **Check the release notes after each update.** Something the assistant could not do
>   last month may be available now. Keep the extension current
>   (see [Updating](https://docs.developer.altium.com/ad-mcp-docs/setup/#updating)).
> - **The limitations below describe today's build**, not a permanent boundary. If a
>   capability you need is missing, it is worth reporting — feedback from practising
>   engineers is what sets the order in which these are added.

## What it does *not* do (current release)

- **Schematic only.** PCB layout, 3D, and ActiveBOM data are not exposed.
- **It reads the *compiled* design, not the drawing.** The assistant sees connectivity —
  components, pins, nets, net classes, sheets — not the editor's drawing objects: ports,
  sheet symbols, buses, wires, junctions, net labels, or coordinates. This shapes what you
  can usefully ask; [What the assistant actually sees](https://docs.developer.altium.com/ad-mcp-docs/how-it-works/#what-the-assistant-actually-sees) explains it.
- **Editing a schematic is experimental and off by default.** As shipped, the assistant
  reads the design, comments on it, and builds symbols in a library; it will not move,
  rewire, or delete anything on a sheet unless you switch the editing tools on yourself
  ([Schematic editing (experimental)](https://docs.developer.altium.com/ad-mcp-docs/tools/editing/)).
- **The project has to be open in Altium Designer.** Committed revisions of it are fetched
  from your workspace, but Altium Designer is still what identifies the project — there is
  no access to a project you have not opened.
- **Half of it needs a workspace.** Comments, project history and revisions, part lookups
  and library searches all go through Altium 365, so they need you signed in and — for
  comments, history and revisions — the project managed there. Plain schematic questions
  work on a local project too.

## Who runs the AI

The AI model is **yours**, not Altium's. You bring your own AI client and your own
account (for example a Claude subscription). Altium Designer only exposes design data to
that client, in the context of your own session. Nothing is sent anywhere until you ask
a question, and your AI provider's terms govern what happens to the conversation.

## Get started

- [Try it now](https://docs.developer.altium.com/ad-mcp-docs/sample-prompts/)
- [Tool reference](https://docs.developer.altium.com/ad-mcp-docs/tools/)
