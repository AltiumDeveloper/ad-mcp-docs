# Collaboration (comments)

These write into the same comment system your team already uses in Altium 365, so
findings from a review session become real, assignable items. Requires a project managed
in an Altium 365 workspace. On Altium Designer, comments are supported on **schematic
documents only**.

| Tool | What it does |
| --- | --- |
| `ad_collaboration_commentthread_*` | Whole threads: create, list, assign, resolve, delete. |
| `ad_collaboration_comment_*` | Individual replies within a thread: add, list, edit, delete. |

A few details that are not obvious from the names:

- A thread is created on **one or more schematic objects** — components, nets, or pins —
  and can attach a screenshot of each object's location.
- Listing is filterable by status, assignee, or document.
- Assignment resolves a workspace user from a name, login, or email. Say *"assign it to
  me"* for yourself; if several people match, you are asked to choose.
- Resolving also reopens; for task-type threads it sets the workflow status.
- **Deletion cannot be undone**, for either a thread or a single reply.

Typical uses:

> *"Post each of these findings as a comment on the component it concerns, and assign the
> power supply ones to me."*

> *"Go through every open comment in this design, list them here with a suggested answer,
> and I will tell you which ones to post."*
