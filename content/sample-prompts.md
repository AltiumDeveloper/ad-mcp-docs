# Try it now

Twelve prompts to run on a real board — seven for the design connector, five for symbols.
Each is chosen to show you something you could **not** get by pasting a netlist or a
screenshot into a chat window, so you can judge the value quickly, on your own design.

Copy them as they are. You do not need to know any tool names, and you do not need to read
[Working with the LLM](./working-with-the-llm.md) first — that is for getting more out of the assistant
once you have decided it is worth your time.

## Design, review and comments

Uses the **Altium Designer MCP** connector. Open a project first. The last three need the
project to be managed in an Altium 365 workspace.

**1. Get your bearings.**

> *"Using the Altium MCP, give me a one-page overview of this project: sheets, component
> counts, the power rails, and the ten nets with the most pins."*

Proves the assistant is really reading your design, and gives you a baseline to check
against what you know.

**2. Trace a signal, then see it on the sheet.**

> *"What is connected to the RESET pin of U1? List every pin on that net with its
> component, value and direction — then highlight that net on the schematic."*

Cross-sheet connectivity resolved for you, and the answer lands in Altium Designer: the net
is selected and zoomed to on the sheet in front of you.

**3. Run a real review pass.**

> *"Run ERC, summarise the violations by severity and by sheet, then show me which checks
> are switched off in the configuration."*

The last clause is the one that earns its keep — a clean ERC result means little until you
know which rules were disabled.

**4. Ask for engineering, not just data.**

> *"For each regulator on this board, check that the feedback divider produces the labelled
> output voltage. Show the resistor values and the arithmetic for each one."*

This is where the LLM adds something a netlist export cannot: it pulls the values out of
your design and does the work, in a form you can check in seconds.

**5. Turn findings into assigned work.**

> *"Take the three most serious findings from the review above, post each as a comment on
> the component it concerns, and assign them to me."*

The comments appear in Altium 365 exactly as if a colleague had left them — so a review
session ends with real, tracked items rather than a chat log. *Requires a managed project.*

**6. Ask what changed, and by whom.**

> *"List the last ten commits on this project with author, date and message, then tell me
> what the most recent one actually changed."*

The project's own history, read in place — no switching to the web interface to find out
who touched the design last week. *Requires a managed project.*

**7. Compare a commit with what you have open.**

> *"Count the components and nets in the revision before that commit, then in my working
> copy, and list what was added or removed."*

The same question answered twice, once against a stored revision and once against your
local state, which is how you see a change rather than read about it. *Requires a managed
project and the Customization Validation workspace feature
([Project history and revisions](./tools/history.md)).*

## Schematic symbols

Uses the **SCH Library** connector. Create or open a `.SchLib` (or a workspace component in
the Component Editor) and click into it so it is the active document.

**1. Build a symbol from a part number.**

> *"Create a symbol for STM32F103C8T6 in the library I have open. Show me the full pinout
> table for review before you build anything."*

The part is looked up for you. The review table is the gate — read it before saying yes.

**2. Check a symbol you already have.**

> *"Read the pinout of the symbol I have active and check it against the attached
> datasheet. List every mismatch in pin number, name, or electrical type — do not change
> anything yet."*

Validation of an existing library part, which is usually a slow manual job.

**3. Restyle it by asking.**

> *"Move every power pin to the top and every ground pin to the bottom, then regenerate the
> symbol."*

Iteration in plain language beats dragging pins by hand, and nothing is published to the
workspace until you release it.

**4. Get proper shapes for discretes.**

> *"Create a Schottky diode symbol and an N-channel MOSFET symbol in this library."*

Real component shapes with named terminals, not rectangles with pins.

**5. Take on a big part.**

> *"Create a symbol for this FPGA as a multi-part component — one part per bank, plus a
> separate power and configuration part. Propose the split before you build it."*

Large parts are where hand-drawing hurts most, and where the review table matters most.
