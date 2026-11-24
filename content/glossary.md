# Glossary

| Term | Meaning |
| --- | --- |
| **LLM** | Large Language Model — the AI that reads your questions and writes the answers (for example Claude Opus or Claude Sonnet). |
| **MCP** | Model Context Protocol — the open standard that lets Altium Designer expose design data to an AI client. |
| **MCP client** | The AI application you talk to: Claude Desktop, Codex, VS Code. |
| **MCP server** | The Altium Designer extension that answers the client's requests. |
| **Tool** | One specific operation the server offers, such as "list projects" or "run ERC". The assistant chooses which to call; you approve. |
| **Context** | Everything the assistant currently has in view: your messages, its replies, and all tool results so far in this conversation. Finite. |
| **Token** | The unit AI usage is measured in — roughly ¾ of a word. Long netlist dumps consume many; this is why the tools return targeted answers rather than whole netlists. |
| **Variant / design configuration** | An Altium project variant. With one selected, Not Fitted parts are excluded and Alternate parts replace the originals. |
| **Working copy** | The project as it is on your machine right now, uncommitted edits included. This is what the tools read unless you name a revision. |
| **Revision / commit** | A state of a managed project stored in your workspace. The overview and query tools can answer from one instead of from the working copy. |
| **Annotation / comment thread** | A comment attached to a schematic object, shared with your team through Altium 365. |
