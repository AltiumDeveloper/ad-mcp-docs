# Is it safe?

**It is local.** The server runs inside your Altium Designer process and listens on
`localhost` only; requests that do not come from your own machine are refused outright.
Nothing on your network — or beyond it — can reach your design through it.

**The write surface is small and deliberate.** As shipped, two tool groups change anything:
comments, and symbol generation. No tool edits a schematic sheet unless you enable the
experimental editing tools yourself
([Schematic editing (experimental)](./tools/editing.md)) — the rest either read data, compile
the project (exactly what the Compile button does), or drive the view, as highlighting
does. Symbol generation writes into the library editor you have open and saves that
document, but never releases it to the workspace — publishing stays with you. Each tool
declares to
your AI client whether it is read-only or destructive, and that is what the client uses to
decide when to ask you for approval (see [Approving tool calls](./working-with-the-llm.md#approving-tool-calls)).

**The query tool is sandboxed.** The queries the assistant runs against your design execute
in an embedded JavaScript engine with no access to files, the network, or the operating
system — only a read-only copy of the compiled design. It is bounded by statement,
recursion, time and output-size limits, so a runaway query stops itself instead of tying up
Altium Designer.

**What actually leaves your machine.** Four things, all of them under your control:

- **Your conversation**, to your own AI provider under your own account — the question you
  asked and the tool results your client includes with it. Altium is not in that path and
  does not see it. Your provider's terms apply, exactly as they do when you paste a snippet
  into the chat by hand.
- **Comment operations**, to your Altium 365 workspace — the same place Altium Designer
  already puts them.
- **Part lookups**, to your workspace library and any parts providers you have connected.
- **History and revision reads**, to your Altium 365 workspace — the same records the web
  interface shows, for the project you have open.

Altium's standard usage analytics record which tool ran and whether it succeeded — a
feature name, no design content — and only when you have analytics enabled.

**What is left to your judgement.** Whether your design may be sent to an external AI
service at all is your call and your organisation's, the same question you would ask of any
cloud tool. And the assistant itself can be wrong: see
[The MCP server vs the LLM](./how-it-works.md#the-mcp-server-vs-the-llm).
