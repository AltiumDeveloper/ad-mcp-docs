# AGENTS.md: working model for this repository

This repository documents the Altium Designer MCP Server. Read this before changing anything.

## The one rule

> **Stable introduction and quick start go to `devcenter/`; everything that changes with a release goes to `docs/`.**

The two folders are published to different sites by different processes. `devcenter/` is copied by hand into the
[Altium Developer Center](https://www.altium.com/documentation/altium-developer-center) portal on each release;
`docs/` is built into the reference site on every merge to `main`. A fact lives in one of them, and the other links
to it.

| Content | Goes in |
| --- | --- |
| What the server is, what it is for, requirements, install, connect, the first questions to ask | `devcenter/` |
| Tool names and behavior, sample prompts, guides, configuration detail, troubleshooting, glossary | `docs/` |

## Map

```
devcenter/
  README.md                          The publishing contract for the Developer Center pages. Not published.
  altium-designer-mcp.md             Dev Center: the product page (a capability of Altium Designer)
  altium-designer-mcp-quick-start.md Dev Center: the Quick Start Guide
  images/                            Screenshots, used by both sites
docs/
  index.mdx                          Reference home page (MDX for its buttons and cards)
  *.md                               Get started, guides and help pages
  tools/                             Tool reference: one page per subsection of the manual's section 4
website/
  pages.cjs                          Every published page: file, URL, sidebar section, label, description, icon.
                                     Also DEVELOPER_CENTER, the Dev Center URLs the reference links to.
  docusaurus.config.js               Site config on @altium-developer/docusaurus-theme
  src/search/engine.mjs              Search ranking (kinds: tool, guide, help)
  src/css/custom.css                 The tool-group icons (`.bc-<icon>`), nothing else
  scripts/                           search-index, search-check, llms, llms-check, devcenter-check
  test/site.test.mjs                 Pinned URLs, icons, Dev Center URLs, Markdown helpers, search, checks
OPEN-ISSUES.md                       Unknowns and things to confirm. Never put them in page text.
```

## Rules for `devcenter/`

- **Plain Markdown only.** No front matter, MDX or HTML: the pages are pasted into the portal as they are.
- **Absolute links to the reference site**, `https://docs.developer.altium.com/ad-mcp-docs/<route>/`, with the trailing
  slash. The only relative links are to `images/`.
- **Stable content.** No tool names or per-release detail; link to the reference for those.
- `npm run build` runs `devcenter:check`, which fails if a link into the site does not resolve to a page or a
  heading. Renaming a heading that a Dev Center page links to means updating the Dev Center page in the same change,
  and telling the publishers.

## Rules for `docs/`

- **Plain Markdown, no front matter.** `.md` is CommonMark, not MDX, so a page renders the same on GitHub and on the
  site. Titles come from the `# H1`; labels, order, URLs and descriptions come from `website/pages.cjs`. The one
  exception is `docs/index.mdx`, which uses the theme's `hero-actions` and `bc-grid` markup.
- **A new page is added to `website/pages.cjs`,** in its section, and its route to `PUBLISHED_ROUTES` in
  `website/test/site.test.mjs`. Only listed files are published; a link to an unlisted page fails the build.
- **Page URLs never change.** The Developer Center pages link to them. Add routes; don't rename or remove them.
- **Links:** relative `.md` links between pages (`./tools/erc.md#ad_schematic_erc_run`); images by relative path
  (`../devcenter/images/x.png`); the Dev Center pages by the URLs in `DEVELOPER_CENTER` (a test enforces it).
- **Anchors** are GitHub's slugs (`## The normal workflow` → `#the-normal-workflow`). The build fails on a broken link
  or anchor.
- **Tool names are found by search from the tool tables:** `scripts/search-index.mjs` makes a record for every
  backticked tool name in the first column of a table, and for the tools a tool page names in prose. Keep a tool in
  its table's first column, in backticks.
- **The tool reference describes the current release.** When the extension changes, update the tool pages and any
  guide that mentions the change.

## Source text

The pages in `docs/` (apart from the home page) are the *Altium Designer MCP Server — User Manual*, sections 2 to 9,
kept verbatim: one page per section, or per subsection where a section is large (section 4 is one page per tool group;
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
(**Preferences → Data Management → MCP Server**), and quote example prompts in italics. Unknowns, unconfirmed behavior
and placeholder URLs go to `OPEN-ISSUES.md`, never into page text.

## Validation (from the repository root)

```bash
cd website && npm ci && npm test && npm run build && cd ..
```

## Definition of done

- [ ] `npm test` and `npm run build` pass.
- [ ] New pages are in `pages.cjs` and `PUBLISHED_ROUTES`; no route changed.
- [ ] A change to a heading or page that a Dev Center page links to updates that Dev Center page.
- [ ] Release-specific detail is in `docs/`, not `devcenter/`.
- [ ] Anything unconfirmed is in `OPEN-ISSUES.md`.
