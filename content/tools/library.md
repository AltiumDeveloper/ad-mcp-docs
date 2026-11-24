# Schematic library

Alongside `ad_library_document_list`, which reports the open Schematic Library documents
and which is active, there are three that do the work:

| Tool | What it does |
| --- | --- |
| `ad_library_symbol_find` | Looks up a manufacturer part number — first in your connected workspace library, then in connected parts providers — returning datasheets, parameters, and descriptions. |
| `ad_library_symbolpinout_details` | Reads the actual pins of a symbol open in the library editor — the basis for **validating** an existing symbol against a datasheet or a style guide, and for updating it rather than rebuilding it blind. |
| `ad_library_symbol_create` | **Creates** a symbol in the editor you have active, or — only when asked to replace it — **updates** an existing one by regenerating it in place under the same name. A plain create never overwrites an existing symbol, and invalid pin data (an unknown electrical type or side, a pin without a group) is rejected with a list of what to fix instead of being guessed. |

These are covered in detail in
[Creating, validating and updating schematic symbols](../symbols.md).
