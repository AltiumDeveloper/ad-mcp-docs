# Developer Center pages

The pages in this folder are published on the
[Altium Developer Center documentation](https://www.altium.com/documentation/altium-developer-center) portal, not on
the reference site. They are the stable introduction and quick start; everything that changes with each release
(the tools, sample prompts, troubleshooting) lives on the reference site, built from [`content/`](../content/README.md).

| Source | Dev Center page | Where it sits |
| --- | --- | --- |
| [`altium-designer-mcp.md`](altium-designer-mcp.md) | Altium Designer MCP Server | A capability of **Altium Designer**, next to the Altium Designer SDK |
| [`altium-designer-mcp-quick-start.md`](altium-designer-mcp-quick-start.md) | Altium Designer MCP Server Quick Start Guide | **Quick Start Guides**, next to the Altium 365 API, Altium Designer SDK and Octopart API guides |
| [`images/`](images/) | The screenshots the two pages show | Uploaded with the pages |

## Publishing

Republish both pages whenever they change here, typically with a release of the MCP Server extension. Copy each
page as it is: the title is the `# H1`, and the portal adds its own summary ("At a Glance").

## Rules for these pages

- **Plain Markdown.** No front matter, MDX or HTML, so a page pastes into the portal as it is.
- **Absolute links.** Links to the reference site use its full URL, `https://docs.developer.altium.com/ad-mcp-docs/…`,
  with the trailing slash. `npm run build` checks that every such link resolves to a page and, for a `#fragment`, to
  a heading on it, so a page that moves or a renamed heading on the reference site fails the build here first.
  The only relative links are to the screenshots in `images/`.
- **Stable content.** Keep these pages to what changes rarely: what the server is, what it is for, how to install and
  connect it, and the first questions to ask. Tool names, per-tool behavior and release-specific detail belong on the
  reference site.
