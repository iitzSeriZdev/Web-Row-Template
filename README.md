# Row-Template Docs

The documentation site for [Row-Template](https://github.com/iitzSeriZdev/Row-Template), the self-contained, white-label subscription page for 3X-UI panels.

**→ [iitzseridev.github.io/Web-Row-Template](https://iitzseridev.github.io/Web-Row-Template/)** · [فارسی](https://iitzseridev.github.io/Web-Row-Template/fa/)

- **Installation** with the one-command installer, and a step-by-step manual install that also works on servers without GitHub access.
- **Every template** with a live, interactive preview: phone and desktop sizes, all five languages, light and dark.
- **An error reference** covering every error and warning the installer can print, with what it means and how to fix it, translated into Persian.
- **Management**: the `row-template` command, the interactive manager, updating, backups and rollback, verify, uninstall.
- **English and Persian**, right-to-left, with full-text search in both.

Everything is written against the Row-Template 1.2.0 source: commands, paths and messages are exactly what the installer prints.

## Development

Node.js 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:4321/Web-Row-Template/
npm run build      # the site and its Pagefind search index, in dist/
npm run check      # consistency checks (run after a build to include the built site)
npm run preview    # serve dist/
```

Search needs the Pagefind index, so it works after `npm run build` (in `preview`), not in `dev`.

## How it is put together

| Path | What lives there |
|---|---|
| `src/content/docs/en/`, `src/content/docs/fa/` | The pages, as MDX — one file per page and language, at the same path |
| `src/data/errors.ts` | The error reference: every installer message, its translation, meaning and fix |
| `src/data/templates.json`, `public/previews/`, `public/live/` | Synced from Row-Template — never edited here |
| `src/data/installer-messages.json` | Every error and warning in the installer source, extracted by the sync script |
| `src/components/`, `src/layouts/` | The UI, modelled on the shadcn/ui documentation |
| `src/lib/nav.ts` | The sidebar, in reading order |
| `src/styles/globals.css` | The design system: shadcn/ui's neutral palette, Geist and Vazirmatn, logical properties for RTL |
| `scripts/` | `sync-from-row-template.mjs` and `check-site.mjs` |

Built with [Astro](https://astro.build) and [Pagefind](https://pagefind.app). Fonts (Geist, Geist Mono, Vazirmatn) and icons ([Lucide](https://lucide.dev)) are bundled at build time; the site loads nothing from another origin.

## Syncing from Row-Template

The template catalogue, the screenshots, the live previews and the list of installer messages come from a Row-Template checkout. To refresh them after a Row-Template change:

```bash
# in Row-Template: render every design's fixture pages (needs Go 1.22+)
npm run fixtures:all

# here
npm run sync -- ../Row-Template
npm run check
```

`npm run check` then fails if the installer prints a message the error reference does not document, or if the reference documents one the installer no longer prints.

## Checks

`npm run check` verifies that:

- every installer message is documented, exactly once, in both languages;
- every page exists in both languages, and every sidebar entry has a page;
- every internal link and `#anchor` resolves — in the sources, and in `dist/` after a build;
- no built page loads a script, stylesheet, image or frame from another origin.

## Deployment

`.github/workflows/deploy.yml` builds and checks every pull request, and deploys `main` to GitHub Pages. One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Contributing

Corrections are welcome — every page has an **Edit this page on GitHub** link. When you change a page, change it in both languages, and keep every command, path and message exactly as the installer prints it.

## License

[MIT](LICENSE)
