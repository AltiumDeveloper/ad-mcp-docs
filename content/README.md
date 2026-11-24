# Published content

The pages of the reference site, `https://docs.developer.altium.com/ad-mcp-docs/`, which `website/` builds on every
merge to `main`. A file here is published only when `website/pages.cjs` lists it, so this README is not.

Everything that changes with a release belongs here: tool names and behavior, sample prompts, guides, configuration
detail, troubleshooting and the glossary. The stable introduction and quick start belong in
[`devcenter/`](../devcenter/README.md); a fact lives in one of the two, and the other links to it.

## Rules

- **Plain Markdown, no front matter.** `.md` is CommonMark, not MDX, so a page renders the same on GitHub and on the
  site. Titles come from the `# H1`; labels, order, URLs and descriptions come from `website/pages.cjs`. The one
  exception is the home page, `index.mdx`, which uses the theme's `hero-actions` and `bc-grid` markup.
- **A new page is added to `website/pages.cjs`,** in its section, and its route to `PUBLISHED_ROUTES` in
  `website/test/site.test.mjs`. A link to an unlisted page fails the build.
- **Page URLs never change.** The Developer Center pages link to them. Add routes; don't rename or remove them.
- **Links:** relative `.md` links between pages (`./tools/erc.md#ad_schematic_erc_run`); images by relative path
  (`../devcenter/images/x.png`); the Developer Center pages by the URLs in `DEVELOPER_CENTER` in
  `website/pages.cjs` (a test enforces it).
- **Anchors** are GitHub's slugs (`## The normal workflow` is `#the-normal-workflow`). The build fails on a broken
  link or anchor. Renaming a heading that a Developer Center page links to means updating that page in the same change
  and telling the publishers.
- **Tool names are found by search from the tool tables:** `website/scripts/search-index.mjs` makes a record for every
  backticked tool name in the first column of a table, and for the tools a tool page names in prose. Keep a tool in
  its table's first column, in backticks.
- **The tool reference describes the current release.** When the extension changes, update the tool pages and any
  guide that mentions the change.
- **Unknowns, unconfirmed behavior and placeholder URLs** go to [`docs/OPEN-ISSUES.md`](../docs/OPEN-ISSUES.md),
  never into page text.

## Source text

The pages here (apart from the home page) are the *Altium Designer MCP Server — User Manual*, sections 2 to 9, kept
verbatim: one page per section, or per subsection where a section is large (section 4 is one page per tool group;
7.5 and 7.7 have their own pages). Change the wording only to follow a change in the product. The only edits the
split itself makes are:

- section numbers dropped from headings, and heading levels shifted to fit the page;
- a cross-reference ("see section 4.8", "the next section") becomes a link whose text is the target's title;
- image paths point at `devcenter/images/`;
- a list of the tool pages on `tools/index.md`, which replaces the subsections that followed it in the manual.

When the manual changes, carry the change over word for word.

## Writing

For new text (the home page, the Developer Center pages, anything the manual does not cover), follow the manual's
voice: address the reader as "you", name the UI as Altium Designer shows it, in bold
(**Preferences → Data Management → MCP Server**), and quote example prompts in italics.
