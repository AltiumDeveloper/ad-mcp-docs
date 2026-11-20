# Project history and revisions

For a project managed in the workspace Altium Designer is signed in to, the assistant can
also read its past. A local project has no history and these tools say so.

**Revisions need a workspace feature.** Anything that touches a stored revision — even
listing them — requires *Customization Validation* to be enabled for your workspace.
Without it, the tools tell you to ask a workspace administrator, and only your working copy
can be read. The history feed below does not depend on it.

| Tool | What it does |
| --- | --- |
| `ad_design_projecthistory_list` | The project's history feed, newest first: commits, releases, copies, MCAD change suggestions, when the project was created and when it went online. Filterable by event type, by file, or by free text; 20 entries by default, up to 100. |
| `ad_design_projecthistory_details` | What a particular commit changed — components (including a previous designator or comment), nets, variants, layers, board size, and the files touched. Up to ten commits per call. |
| `ad_design_projectrevision_list` | The stored revisions themselves: id, author, date, message, and the files each one changed. This is where the revision id in the next paragraph comes from. |

**The overview and the query tool can read a revision.** Both
`ad_schematic_summary_details` and `ad_schematic_script_run`
([Schematic data](./schematic.md)) take an optional revision id: with it, they answer from
that committed revision on the server; without it, from your working copy, uncommitted
edits included. Every answer states which of the two it came from, so ask the same question
twice to compare a commit with what is in front of you.

Two things to expect when you read a revision rather than your own copy:

- **Sheets come back as a flat list.** A revision carries no sheet hierarchy, and the
  footprint and source-library fields are empty.
- **Not every revision has data.** Some — imported ones, for example — carry no generated
  design data, and are reported as such rather than answered.
