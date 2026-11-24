# Troubleshooting

| Symptom | What to do |
| --- | --- |
| **The Altium tools do not appear in the AI client.** | Confirm **Enable MCP Server** is ticked in Preferences → Data Management → MCP Server, then fully quit the AI client (system tray → Quit) and start it again. |
| **"Could not attach to MCP server…"** on start-up. | Claude Desktop starts with Windows and was running before Altium Designer. Start Altium Designer first, then quit Claude from the system tray and reopen it. |
| **The connector disappeared after a Claude update.** | In Preferences → Data Management → MCP Server, click **Uninstall**, then **Install**, and restart Claude. |
| **Only one of the two connectors is present.** | The **SCH Library** connector requires the MCP add-on license feature. Check License Management. |
| **Answers do not reflect edits you just made.** | The schematic tools read the compiled model. Ask for an ERC run — compiling refreshes the data every other schematic tool reads. |
| **The assistant "cannot see" a port, bus, sheet entry, or wire.** | Expected in this release: it reads the compiled connectivity, not the drawing (see [What the assistant actually sees](./how-it-works.md#what-the-assistant-actually-sees)). Ask for an ERC run instead — structural checks of that kind surface there as violations. |
| **Answers are about the wrong project.** | The assistant is reusing data from earlier in the conversation. Tell it explicitly that you switched projects, or start a new conversation. |
| **Answers are about the wrong variant.** | Say which design configuration you want, by name; `[No Variations]` is the base design. |
| **Answers describe a different board than the one in front of you.** | You have more than one copy of Altium Designer open and the conversation is bound to another one. Ask it to list the Altium instances and switch to the right one; see [If you run more than one copy of Altium Designer](./multiple-instances.md). |
| **"Altium Designer is not connected to a workspace."** | Sign in to your Altium 365 workspace in Altium Designer. History, revisions, comments and part lookups all go through it. |
| **"This feature requires a valid license."** | The *Altium Designer MCP* feature is missing from your license. Check **License Management**. |
| **History or revision questions fail.** | The project must be managed in the workspace you are signed in to — a local project has no history. Reading a stored revision additionally needs the *Customization Validation* feature enabled for the workspace; ask a workspace administrator. |
| **The editing tools are not offered.** | They are experimental: beta features must be enabled for your account and **Experimental Tools** ticked in Preferences → Data Management → MCP Server. Reconnect the AI client afterwards. |
| **Install leaves a warning on a client's tab.** | That client's configuration file cannot be read or written, the bridge executable is missing from the installation, or — for Claude — the file is not valid JSON. Fix the file, or copy the configuration block on that page into it by hand. |
| **"Altium Designer is not running: no live instance serves this MCP server."** | Altium Designer is not running, or the MCP Server extension is not loaded / not enabled. Start Altium Designer and check Preferences → Data Management → MCP Server. |
| **Symbol generation is unavailable.** | You need a Schematic Library — or a workspace component in the Component Editor — open *and active*. Click into the document first. |
| **Comment tools fail.** | The project must be managed in an Altium 365 workspace and you must be signed in to that workspace. |
| **The assistant states something you know is false.** | Point at the specific contradiction and ask it to re-read the design. Ask which tool it used. If it persists, start a fresh conversation. |
