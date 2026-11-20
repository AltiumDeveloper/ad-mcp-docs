// The site's pages: which Markdown files are published, under which URL, in which sidebar section and order, with
// which description. docusaurus.config.js (docs plugin `include`, sidebar, front matter), scripts/search-index.mjs,
// scripts/llms.mjs and scripts/devcenter-check.mjs all read this list, so a page is added in one place.
//
// The sources stay plain GitHub-flavoured Markdown with no front matter, so they render on GitHub as they do here.
// Titles come from each file's `# H1`; everything else Docusaurus needs is here and injected at build time
// (`frontMatterFor` → markdown.parseFrontMatter in docusaurus.config.js).
//
// Page URLs never change once published: the Developer Center pages (devcenter/) link to them by absolute URL, and
// test/site.test.mjs pins the list.
const path = require('node:path');

const REPO_ROOT = path.resolve(__dirname, '..');

// Altium Developer Center. The pages built from devcenter/ (see devcenter/README.md) are not linked yet: add their
// URLs here (and the sidebar links and page links listed in OPEN-ISSUES.md) once they are published.
const DEVELOPER_CENTER = {
  home: 'https://developer.altium.com/',
  docs: 'https://www.altium.com/documentation/altium-developer-center',
};

// The sidebar sections, in sidebar order. The home page is a single link; the others are small-caps headings over
// their pages. `kind` is the search kind (src/search/engine.mjs KINDS). Page `file`s are repository-relative; `route`
// is the page URL below the base URL; `icon` puts a swatch before the page's sidebar label (`.bc-<icon>` in
// src/css/custom.css, the same icons as the home page cards). An entry with `href` instead of `file` is a sidebar link
// to another site, not a page.
const SECTIONS = [
  {
    id: 'home',
    label: 'Overview',
    kind: 'guide',
    pages: [
      { file: 'docs/index.mdx', route: '/', label: 'Overview', description: 'Reference for the Altium Designer MCP Server: tools, sample prompts and guides.' },
    ],
  },
  {
    id: 'start',
    label: 'Get started',
    kind: 'guide',
    pages: [
      { file: 'docs/setup.md', route: '/setup/', label: 'Getting started', description: 'Requirements, each supported AI client, configuring a client by hand, experimental tools and updating.' },
      { file: 'docs/sample-prompts.md', route: '/sample-prompts/', label: 'Try it now', description: 'Twelve prompts to try on a real board, for design review and for schematic symbols.' },
    ],
  },
  {
    id: 'guides',
    label: 'Guides',
    kind: 'guide',
    pages: [
      { file: 'docs/working-with-the-llm.md', route: '/working-with-the-llm/', label: 'Working with the LLM', description: 'Ground rules, good prompts, steering tool use, outside information and approving tool calls.' },
      { file: 'docs/symbols.md', route: '/symbols/', label: 'Schematic symbols', description: 'Create, validate and update symbols: the review gate, guidelines, conventions, shapes and multi-part parts.' },
      { file: 'docs/how-it-works.md', route: '/how-it-works/', label: 'How it works', description: 'The MCP server vs the LLM, what the assistant sees, projects and variants, context drift, and why not your own MCP server.' },
      { file: 'docs/multiple-instances.md', route: '/multiple-instances/', label: 'Multiple instances', description: 'Which copy of Altium Designer a conversation uses, and how to switch or pin it.' },
      { file: 'docs/security.md', route: '/security/', label: 'Is it safe?', description: 'Local only, the write surface, the sandboxed query tool, and what leaves your machine.' },
    ],
  },
  {
    id: 'tools',
    label: 'Tool reference',
    kind: 'tool',
    pages: [
      { file: 'docs/tools/index.md', route: '/tools/', label: 'All tools', description: 'Tool naming, tool families, and the tool groups.' },
      // The labels and order of the home page cards (docs/index.mdx, from the manual's capability table). The
      // "Design & schematic data" card covers two pages, Design and Schematic data; Highlighting and Schematic library
      // have no card of their own and sit next to the cards they belong with.
      { file: 'docs/tools/design.md', route: '/tools/design/', label: 'Design', icon: 'design', description: 'The open projects and the variants of a project.' },
      { file: 'docs/tools/schematic.md', route: '/tools/schematic/', label: 'Schematic data', icon: 'schematic', description: 'The project summary, the query tool and sheet screenshots.' },
      { file: 'docs/tools/erc.md', route: '/tools/erc/', label: 'Design review (ERC)', icon: 'erc', description: 'Compile and run the Electrical Rule Check, list violations, and read the ERC configuration.' },
      { file: 'docs/tools/highlighting.md', route: '/tools/highlighting/', label: 'Highlighting', icon: 'highlight', description: 'Cross-probing: zoom to, select and highlight components, nets or pins on a sheet.' },
      { file: 'docs/tools/history.md', route: '/tools/history/', label: 'History & revisions', icon: 'history', description: 'The project history feed, what a commit changed, and reading a committed revision.' },
      { file: 'docs/tools/comments.md', route: '/tools/comments/', label: 'Collaboration', icon: 'comments', description: 'Altium 365 comment threads and replies on schematic objects.' },
      { file: 'docs/tools/library.md', route: '/tools/library/', label: 'Schematic library', icon: 'symbols', description: 'Part lookup, reading a symbol pinout, and creating or updating a symbol.' },
      { file: 'docs/tools/editing.md', route: '/tools/editing/', label: 'Schematic editing (experimental)', icon: 'editing', description: 'Experimental: read a sheet, place parts, draw wires and labels, and replicate blocks.' },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    kind: 'help',
    pages: [
      { file: 'docs/troubleshooting.md', route: '/troubleshooting/', label: 'Troubleshooting', description: 'Symptoms and fixes for connecting, answers, workspace features and symbols.' },
      { file: 'docs/glossary.md', route: '/glossary/', label: 'Glossary', description: 'LLM, MCP, clients and servers, tools, context, tokens, variants, revisions and comment threads.' },
    ],
  },
];

// Docusaurus' doc id: the repository-relative path without its extension.
const docId = (file) => file.replace(/\.mdx?$/, '');

// Every published page, in site order, with the absolute path of its source. Sidebar links (`href`) are not pages.
function allPages() {
  return SECTIONS.flatMap((section) => section.pages.filter((page) => page.file).map((page) => ({
    ...page,
    section: section.id,
    kind: section.kind,
    id: docId(page.file),
    source: path.join(REPO_ROOT, page.file),
  })));
}

// Front matter injected into a source file at build time, or undefined for a file that is not a listed page.
function frontMatterFor(filePath) {
  const page = allPages().find((p) => p.source === path.resolve(filePath));
  if (!page) return undefined;
  return { slug: page.route, sidebar_label: page.label, description: page.description };
}

module.exports = { REPO_ROOT, DEVELOPER_CENTER, SECTIONS, docId, allPages, frontMatterFor };
