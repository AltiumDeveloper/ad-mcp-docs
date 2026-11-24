# Creating, validating and updating schematic symbols

As shipped, this is the one area where the assistant *writes* into your design data — the
editing tools in [Schematic editing (experimental)](./tools/editing.md) are off unless you
enable them — so it deserves a section of its own. There are three things you can ask for,
and they use the same tools:

- **Create** a new symbol from a manufacturer part number, a datasheet, or a pinout you
  supply — see [The normal workflow](#the-normal-workflow).
- **Validate** a symbol you already have: the assistant reads its actual pins out of the
  library editor and checks them against the datasheet or your own guidelines, reporting
  the differences before it changes anything.
- **Update** an existing symbol: rename pins, fix electrical types, regroup or move pins to
  another side, re-split it into parts, or apply a house style — the component is
  regenerated in place under the same name
  ([Attaching your own symbol guidelines](#attaching-your-own-symbol-guidelines)).

Validating and updating are the same conversation, so a check normally runs straight into
the fix:

> *"Read the pinout of the symbol I have open, check it against the attached datasheet, and
> list every mismatch in pin number, name, or electrical type before changing anything."*

All three end the same way: the symbol lands in the document you have open, and publishing
it — release — stays your decision. Note that the document itself *is* saved for you
([What gets created, and where](#what-gets-created-and-where)).

## What gets created, and where

The assistant builds the symbol **into whichever symbol editor you currently have
active** in Altium Designer. That is either:

- a standalone **Schematic Library (.SchLib)** document, or
- a **workspace component** open in the Component Editor.

It never chooses a destination for you and never creates a vault item or releases anything
to the workspace. It does, however, **save the document it just built into** — the library
file on disk, or the workspace component's own documents. So keep a baseline: work on a
copy, or commit the library before you start, if you want a simple way back.

If neither kind of editor is active, symbol generation is simply not available — open or
create a library first and click into it.

A label reading *"Created with generative AI, please review."* is placed on generated
symbols as a reminder.

## The normal workflow

1. **Open the library.** Create or open a `.SchLib` (or open a workspace component in the
   Component Editor) and make it the active document.
2. **Give the assistant the part.** The most direct opening is just the MPN:

   > *"Create a symbol for STM32F103C8T6."*

   The assistant looks the part up. If it already exists in your workspace library, it
   will tell you so — you can open that one and edit it instead of duplicating it.
3. **Supply the source data.** If the lookup finds a datasheet, it uses it. Otherwise
   attach the PDF yourself, or allow a web search. Say which package you want.
4. **Review the proposed pinout.** Before building anything, the assistant must show you
   the complete pinout as a table, with one row per pin:

   | Pin # | Name | Electrical type | Side / group | Confidence |
   | --- | --- | --- | --- | --- |

   Anything it inferred, guessed, or found ambiguous in the datasheet is flagged, with a
   note explaining why. **This table is the review gate — read it.** Catching a wrong pin
   here costs seconds; catching it after the symbol is on a schematic costs a respin.
5. **Confirm or correct.** Correct anything wrong and ask for the table again. Only after
   your explicit go-ahead is the symbol built.
6. **Check it in Altium Designer.**
7. **Ask for changes if you want them** (see below), then release it when you are happy.

If you are in a hurry you can say *"skip the review table and generate it"* — but for a
part you intend to keep, don't.

**Generation is not one-shot.** Once the symbol is in front of you, keep talking to the
assistant — it rebuilds the symbol in place, as often as you like, until you are happy.
Look at the result on screen and say what is wrong in plain language:

> *"No — move GND from the left edge to the right."*
>
> *"Put all the power pins on top instead."*
>
> *"Pin 14 should be PA5, not PA6."*
>
> *"Split the GPIO group into two, one per port."*
>
> *"Make it two parts: analog and digital."*

This is usually faster than fixing the symbol by hand, and it is the intended way to work
— the first generation gets you 90% of the way, and you steer the rest. Each round
overwrites the previous attempt in the open document, and nothing is published to the
workspace until *you* release it.

Worth knowing when you iterate:

- The assistant rebuilds the symbol from the pin list it is working with. If you have
  edited the symbol **by hand** in Altium Designer in the meantime, tell it to read the
  current pinout first — otherwise your manual edits are overwritten by its older picture
  of the part.
- Component-level parameters, the designator prefix, the description, the style and other
  primitives survive a rebuild unless you ask to change them. Pins are rebuilt each time: a pin
  left out of the new pin list is removed, while a pin that keeps its number and name also keeps
  its parameters, alternate functions, description, IEEE symbols and hidden flag unless you ask
  to change or clear them.
- Asking for a **new** symbol never overwrites one that already has pins or a drawn body: in a
  library, the symbol with the same name; in the Component Editor, the component's own symbol,
  whatever the name. The assistant reports the clash and asks whether to replace it (in a
  library, or use another name); after a replace it lists the pin numbers that are gone.

## Attaching your own symbol guidelines

By default the assistant follows a general set of conventions (described below). Your
company almost certainly has its own. Give it yours and it will follow those instead.

**For a single session:** paste the guideline text, or drag the document, into the chat
before asking for a symbol.

> *"Here is our symbol style guide. Follow it for every symbol in this conversation."*

**Permanently:** put the guideline document into your AI client's project knowledge
(see [Bringing in outside information](./working-with-the-llm.md#bringing-in-outside-information))
so it applies to every conversation without re-pasting.

**Useful things to specify in a guideline:**

- Which side each function group goes on (power top vs. left, ground bottom vs. right).
- Naming conventions and abbreviations you standardise on.
- How to handle alternate/multiplexed pin functions in the pin name.
- When to split a part into sub-parts, and along which boundaries.
- Which parameters must be present on the component.

You can also apply a guideline to an **existing** symbol:

> *"Open my library — read the pinout of the symbol I have active, then rearrange it to
> match the attached guideline and show me the table before you change anything."*

The assistant reads the current pins, applies the guideline, and writes the adjusted
symbol back.

## Default conventions

Unless your own guidelines say otherwise:

**Electrical type** is required on every pin, from: Input, IO, Output, OpenCollector,
OpenEmitter, HiZ, Power, Passive.

- **Power** for every supply and ground pin (not *Passive*).
- **Passive** for *any* analog pin — ADC/DAC, crystal/oscillator, op-amp inputs and
  outputs, comparators, current sense, reference inputs. Input/Output/IO are for digital
  logic only.

**Pin names** are canonicalised to standard forms (GND, AGND, DGND, PGND, EPAD, NC, RSVD,
VCC, VDD, VSS), including inside compound names such as `PA0/SDA`.

**Active-low pins** are written with tildes — `~RESET~` — which renders as an overline in
Altium Designer. All the datasheet spellings (`/RESET`, `nRESET`, `!RESET`, `RESET#`,
`RESET_N`, `RESETB`, overlined) are normalised to that form. In a compound name only the
active-low part is wrapped: `PA0/~SDA~`.

**Pin placement** on rectangular symbols is driven by *groups*. Every pin belongs to a
group, and every group is assigned a side (Left / Right / Top / Bottom) and optionally a
position along that side (Top / Middle / Bottom). By default there is one `power` group
(left, top) and one `ground` group (right, bottom); other functional groups are split
left and right DIP-style. Groups are separated by a gap, and the body is auto-sized so
that all pin names fit without overlapping.

**Appearance** — pin length, line widths, colours, fills, and label fonts — follows
**your own Altium Designer symbol defaults**. The generator does not impose a look of its
own: set your house style once in Altium Designer's schematic default settings, and every
generated symbol picks it up. If you want a symbol to differ from those defaults, say so
in the request (*"pin length 200 mil, hide the pin designators"*), and the assistant sets
those properties explicitly on that symbol. It can also copy the styling of a symbol you
already have: ask it to read an existing symbol first and reuse its style.

## Standard component shapes

For discrete parts you can ask for a proper distinctive shape instead of a rectangle:

> *"Create a Schottky diode symbol"* · *"…an N-channel MOSFET"* · *"…a 2-input NAND gate"*

Available shapes include: diode (standard, Zener, Schottky, LED, photo, TVS,
bidirectional TVS, varicap), BJT, MOSFET, JFET, IGBT, op-amp, resistor, potentiometer,
capacitor (polarised and non-polarised), inductor, ferrite bead, crystal, fuse, PTC,
logic gate (AND/NAND/OR/NOR/XOR/XNOR/buffer/inverter), switch (SPST/SPDT/DPST/DPDT/
pushbutton), relay, transformer, optocoupler, thyristor (SCR/Triac/Diac), bridge
rectifier, battery, antenna.

With a shape, pins attach to named terminals of that shape (Anode, Cathode, Gate, Drain,
Source, In+, In−, Out, and so on) rather than to groups.

## Large parts and multi-part symbols

A single generation call is capped at **150 pins**. For an FPGA or a large
microcontroller, the symbol is built as a **multi-part component** across several steps:
the first step creates the component with part 1, and each following step appends the
next part.

Split along functional boundaries where they exist — one part per FPGA bank, or
*(1) power + clock + reset + debug, (2) GPIO ports, (3) analog + ADC supply* — otherwise
simply by pin count. The assistant will normally propose a split and ask you to approve
it. You can state it up front:

> *"Create it as 3 parts: power/clock/reset/debug, all GPIO, and ADC plus analog supply."*

You can also rearrange afterwards: *"Swap part 1 with part 3"*, *"move the analog pins out
of part 2"*.

## Known limitations

- Component-level parameters are not invented; MPNs are not written into the symbol.
  Add them yourself, or ask for them explicitly.
- On regeneration, per-pin data is matched by pin **number and name**. Renumbering or renaming
  a pin drops its parameters, alternate functions, description, IEEE symbols and hidden flag —
  the assistant lists renamed pins so you can restore what still applies. Per-pin settings the
  tool does not model (for example one pin's own length or colour) return to the symbol style on
  every rebuild. If you have hand-edited the symbol in Altium, tell the assistant to read the
  existing pinout first ([Schematic library](./tools/library.md)) rather than rebuild from scratch.
