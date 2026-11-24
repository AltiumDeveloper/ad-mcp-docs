# Site build

Builds the reference site from [`content/`](../content/README.md) with Docusaurus, on the theme shared with the other
Altium developer sites, and runs the checks that keep the site, its search, its `llms.txt` surface and the
Developer Center links correct.

| File | What it is for |
| --- | --- |
| `pages.cjs` | Every published page: file, URL, sidebar section, label, description, icon. Also `DEVELOPER_CENTER`, the Developer Center URLs the reference links to |
| `docusaurus.config.js` | Site config on `@altium-developer/docusaurus-theme` |
| `src/search/engine.mjs` | Search ranking (kinds: tool, guide, help) |
| `src/css/custom.css` | The tool-group icons (`.bc-<icon>`), nothing else |
| `scripts/` | search-index, search-check, llms, llms-check, devcenter-check |
| `test/site.test.mjs` | Pinned URLs, icons, Developer Center URLs, Markdown helpers, search, checks |

Node 22 or later:

```bash
npm ci
npm start        # live preview
npm test         # unit tests
npm run build    # the CI checks: links, anchors, search index, llms.txt, Developer Center links
```

The theme, [`@altium-developer/docusaurus-theme`](https://github.com/AltiumDeveloper/docusaurus-theme), installs from
its GitHub Release tarball. To update it, change the version in the URL in `package.json` (twice: the tag and the file
name) and run `npm install`.
