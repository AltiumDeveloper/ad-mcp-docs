# Electrical Rule Check (ERC)

| Tool | What it does |
| --- | --- |
| `ad_schematic_erc_run` | Compiles the project and returns a summary of violations: totals by severity (Fatal / Error / Warning), by rule, by rule group, and by sheet. Compiling also refreshes the data the other tools read. |
| `ad_schematic_erc_list` | The individual violations — rule, severity, message, sheet — each with ready-made targets for highlighting. Filterable by severity, rule group, and sheet. |
| `ad_schematic_erc_details` | Your project's ERC *configuration*: which rules are enabled at which severity, which are disabled, and which connection-matrix cells report a problem. Use it to understand what was and was not checked before trusting a clean result. |

**An empty list means no violations.** When the violation list is filtered by a severity, a
rule group, or a sheet that does not exist, the tool now fails and names the values it will
accept, rather than returning nothing — so "no results" can be read at face value.
