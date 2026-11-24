# Working with the LLM

Everything in this section is about the AI side of the conversation, not about Altium
Designer. It is what turns a working setup into good answers, and it is worth reading once
you have run the prompts in [Try it now](./sample-prompts.md).

## Set the ground rules at the start of a session

The single most effective habit is to open the conversation with a short instruction
about how you want the assistant to behave. For example:

> *"Act as a senior electrical engineer reviewing my design. Base every statement on data
> you read from the Altium MCP tools — do not guess. Keep answers short; I will ask for
> detail where I need it. Always state explicitly when you have made an assumption or
> performed a calculation, and show the calculation."*

Other rules worth adding, depending on the task:

- *"If something is ambiguous, ask me instead of choosing."*
- *"Always tell me which sheet a finding is on."*
- *"Use my company's abbreviations: … "*
- *"Answer in a table with columns: Designator, Net, Issue, Severity."*

## Writing good prompts

**Be specific about scope.** *"Review my design"* produces a broad, shallow answer.
*"Check the power tree: for each regulator, verify the feedback divider gives the labelled
output voltage"* produces something you can act on.

**One topic per question.** Ask about the reset circuit, then about the ESD protection —
not both in one message.

**Ask for the reasoning, not just the verdict.** *"…and show the resistor values and the
resulting voltage"* lets you check the work in seconds.

**Anchor to real objects.** Designators, net names, and sheet names give the assistant a
precise handle: *"Trace SPI1_CLK from U3 and list every pin on it with its direction."*

**Ask it to show its uncertainty.** *"Mark anything you inferred rather than read from the
design."*

Some question patterns that work well:

| Goal | Example prompt |
| --- | --- |
| Orientation | *"Give me a one-page overview of this project: sheets, component counts, power rails."* |
| Connectivity | *"What is connected to the RESET pin of U1? Include component values."* |
| Design check | *"Can this CPU start? Check the reset pin level, power rails, crystal and BOOT configuration."* |
| Sanity check on values | *"For each resistor in the LED strings, calculate the current and the dissipated power, and flag anything above 60% of its rating."* |
| Part replacement | *"Suggest a replacement for U1 from a different manufacturer. Note any footprint or pin-mapping differences."* |
| Documentation | *"List every comment thread in this project with its status and my open items."* |

## Steering which tools get used

Normally you should not have to think about this: ask in plain English and the assistant
picks the tools. It is worth knowing how to intervene in three situations.

**When it should read the design rather than reason from memory.** Say so in the ground
rules — *"base every statement on data you read from the Altium MCP tools"* — or in the
question itself: *"using the Altium MCP, …"*.

**When the answer looks shallow on a large design.** The assistant may be working from the
project summary instead of interrogating the model. Nudge it:
*"query the model directly rather than working from the summary."*

**When you want a structural check rather than a connectivity one.** Drawing objects —
ports, buses, wires — are not in the data the assistant reads, but ERC does inspect them.
Ask for *"an ERC run"* rather than asking it to look at the drawing
(see [What the assistant actually sees](./how-it-works.md#what-the-assistant-actually-sees)).

You can always audit what happened: *"which tool did you use, and what did it return?"*
The [Tool reference](./tools/index.md) lists what is available.

## Bringing in outside information

The assistant does not automatically know your internal standards, or the contents of a
datasheet. You supply those. There are three ways, from most casual to most durable:

1. **Paste or attach into the chat.** Drag a PDF datasheet or a text file of your symbol
   style guide into the message box. This applies for that conversation only. It is the
   quickest option and the right one for a one-off part.
2. **Project knowledge / persistent instructions.** Most AI clients let you attach files
   or standing instructions to a *project* or *workspace* so they apply to every
   conversation inside it. Put your company symbol guidelines, naming conventions, and
   preferred review checklist there once, and stop re-pasting them.
3. **Let the assistant search.** If it has web access, it can find a public datasheet
   itself. Always confirm it found the right revision and the right package variant —
   this is a common source of wrong pinouts.

**Practical notes on datasheets:**

- Very large datasheets (500+ pages) work, but tell the assistant which package and which
  part variant you are using, or it will mix up pin numbering between packages.
- If a part has both a datasheet and a user manual, the pinout is normally in the
  datasheet. Say which document you attached.

## Approving tool calls

The first time the assistant wants to use an Altium tool, your client will ask for
permission. You can approve each call individually or allow a tool for the whole
conversation. Approving is safe for read-only tools. Be deliberate with the ones that
change something — comment creation and deletion, symbol generation, and the editing tools
if you have enabled them ([Schematic editing (experimental)](./tools/editing.md)).

## Habits that save time

- **Keep Altium Designer in front of you.** Highlighting and screenshots act on the live
  application; you will see the results appear on your sheets.
- **Keep a baseline before symbol generation.** Generation rewrites the symbol in the open
  library and saves the document, so commit it or copy it first if you want a way back.
- **Ask for tables.** They are far easier to check than prose.
- **Start a fresh conversation when a session drifts.** Cheaper than arguing with it —
  see [Context, and why long conversations drift](./how-it-works.md#context-and-why-long-conversations-drift).
- **When an answer looks wrong, say so.** *"That contradicts what I see on sheet 3 —
  re-read the design and check again."* Assistants correct well when challenged with a
  specific observation, and badly when told only *"that's wrong."*
