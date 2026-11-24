# Open issues

Things to confirm or follow up after the first publication. Page text states only what is known; the
unknowns are here.

## Once the Developer Center pages are published

1. **Link the Developer Center pages once they are published.** The links were taken out until the pages have URLs.
   Put them back in:
   - `website/pages.cjs`: the URLs in `DEVELOPER_CENTER`, and two entries at the top of the Get started section,
     "About the server" and "Quick start";
   - `content/index.mdx`: a sentence after the intro pointing to the overview and the Quick Start Guide;
   - `content/how-it-works.md`: the last paragraph's "list of capabilities" (the manual's "list in section 1.2"), linked
     to the overview;
   - `website/scripts/llms.mjs`: the `llms.txt` lead, which links only the Developer Center docs home for now;
   - `devcenter/altium-designer-mcp.md`: the Quick Start Guide as the first item of "Get started" (republish).

## To confirm with the MCP Server team

2. **Which connector exposes `switch_altium_instance`.** The source manual says the assistant "always has" it and that
   one switch covers every Altium tool set; the reference says only that.
3. **The bridge executable and `--instance-id`.** The manual names the flag but not the executable or the
   configuration format per client; the reference sends readers to the configuration block shown on the preferences
   page. A short per-client example (Claude JSON, Codex TOML, VS Code) would help once the paths are stable.
4. **Release notes.** The reference says to check the release notes after each update but has nowhere to link.
   Decide where release notes live (here, a `CHANGELOG.md`, or Altium Designer's own release notes) and link them
   from `setup.md#updating`.
5. **Supported clients beyond the three tabs.** Only Claude Desktop, Codex and VS Code are named; the **Custom** tab
   suggests others work. List the ones that are tested.

## Later

6. **Page comments.** The sibling sites show giscus comments (GitHub Discussions) on every page. Not set up here:
    it needs Discussions enabled on the repository and its ids in a `Comments` component, as in altium-auth.
