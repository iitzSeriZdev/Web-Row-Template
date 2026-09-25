// Consistency checks for the documentation. Run with `npm run check` (after
// `npm run build` to also check the built site).
//
//   1. The error reference lists every message the installer prints, and
//      nothing it no longer prints (src/data/installer-messages.json is written
//      by the sync script from the Row-Template source).
//   2. Every page exists in every language, and every sidebar entry has a page.
//   3. Every internal link and #anchor resolves — in the sources, and in dist/
//      when it has been built.
//   4. The built pages load nothing from another origin.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "/Web-Row-Template";
const problems = [];
const fail = (msg) => problems.push(msg);

const { ENTRIES } = await import(join(ROOT, "src/data/errors.ts"));
const messages = JSON.parse(readFileSync(join(ROOT, "src/data/installer-messages.json"), "utf8")).messages;
const catalogue = JSON.parse(readFileSync(join(ROOT, "src/data/templates.json"), "utf8"));

// --- 1. error reference -----------------------------------------------------
const printed = new Set(messages.map((m) => m.text));
const listed = new Map();
for (const e of ENTRIES) {
  for (const t of e.texts) {
    if (listed.has(t)) fail(`errors: listed twice: ${JSON.stringify(t)}`);
    listed.set(t, e);
    if (!printed.has(t)) fail(`errors: not printed by the installer (stale?): ${JSON.stringify(t)}`);
  }
  for (const [lang, keys] of [["en", ["what", "fix"]], ["fa", ["tr", "what", "fix"]]]) {
    for (const k of keys) {
      const v = e[lang]?.[k];
      if (!v || (Array.isArray(v) && (!v.length || v.some((x) => !x.trim())))) fail(`errors: ${lang}.${k} missing for ${JSON.stringify(e.texts[0])}`);
    }
  }
}
for (const m of messages) {
  if (!listed.has(m.text)) fail(`errors: undocumented ${m.level} at ${m.file}:${m.line}: ${JSON.stringify(m.text)}`);
}
const TOKEN = /\$\{([#A-Za-z_0-9@\[\]]+)(?::[^}]*)?\}|\$([A-Za-z_][A-Za-z_0-9]*|\d)|%(s)/g;
const errorsSrc = readFileSync(join(ROOT, "src/lib/errors.ts"), "utf8");
for (const t of listed.keys()) {
  for (const m of t.matchAll(TOKEN)) {
    const name = m[1] ?? m[2] ?? m[3];
    const key = /^[A-Za-z_][A-Za-z_0-9]*$/.test(name) ? `${name}:` : `"${name}":`;
    if (!errorsSrc.includes(`  ${key}`)) fail(`errors: no label for placeholder ${name} in ${JSON.stringify(t)}`);
  }
}
const slug = (t) => {
  let s = t.replace(TOKEN, " ").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (s.length > 64) s = s.slice(0, 64).replace(/-[^-]*$/, "");
  return s;
};
const errorIds = new Set();
for (const e of ENTRIES) {
  const id = e.id ?? slug(e.texts[0]);
  if (errorIds.has(id)) fail(`errors: duplicate anchor #${id}`);
  errorIds.add(id);
}

// --- 2. pages ------------------------------------------------------------------
const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const pagesOf = (lang) => new Set(walk(join(ROOT, "src/content/docs", lang))
  .filter((p) => p.endsWith(".mdx"))
  .map((p) => relative(join(ROOT, "src/content/docs", lang), p).replace(/\\/g, "/").replace(/\.mdx$/, "").replace(/(^|\/)index$/, "")));
const en = pagesOf("en");
const fa = pagesOf("fa");
for (const p of en) if (!fa.has(p)) fail(`pages: fa is missing "${p}"`);
for (const p of fa) if (!en.has(p)) fail(`pages: en is missing "${p}"`);
const ids = catalogue.templates.map((t) => t.id);
const navSrc = readFileSync(join(ROOT, "src/lib/nav.ts"), "utf8");
const navSlugs = [...navSrc.matchAll(/"([a-z0-9/-]*)"/g)].map((m) => m[1]).filter((s) => s === "" || /^[a-z]/.test(s));
const all = new Set([...en, ...ids.map((id) => `templates/${id}`)]);
for (const s of navSlugs) {
  if (["getting-started", "installation", "templates", "configuration", "management", "help", "reference"].includes(s) && !en.has(s)) continue;
  if (!all.has(s)) fail(`nav: no page for "${s}"`);
}

// --- 3a. links in the sources -------------------------------------------------
function checkDocLink(from, to) {
  const [path, anchor] = to.split("#");
  const s = path.replace(/^\/docs\/?/, "").replace(/\/$/, "");
  if (!all.has(s)) fail(`link: ${from} → ${to}: no such page`);
  if (anchor && s === "help/errors" && !errorIds.has(anchor) && !/^[a-z-]+$/.test(anchor)) fail(`link: ${from} → ${to}: no such error`);
  if (anchor && s === "help/errors" && !errorIds.has(anchor) && !GROUP_IDS.has(anchor)) fail(`link: ${from} → ${to}: no such error anchor`);
}
const GROUP_IDS = new Set([...errorsSrc.matchAll(/en: "([^"]+)", fa: "[^"]+", icon/g)].map((m) => m[1].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")));
for (const lang of ["en", "fa"]) {
  for (const file of walk(join(ROOT, "src/content/docs", lang)).filter((p) => p.endsWith(".mdx"))) {
    const src = readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
    for (const m of src.matchAll(/(?:\]\(|href=")(\/docs[^)"\s]*)/g)) checkDocLink(relative(ROOT, file), m[1]);
  }
}
for (const e of ENTRIES) {
  for (const s of [e.en.what, ...e.en.fix, e.fa.tr, e.fa.what, ...e.fa.fix]) {
    for (const m of s.replace(/`[^`]+`/g, "").matchAll(/\]\(([^)\s]+)\)/g)) {
      if (m[1].startsWith("/docs")) checkDocLink(`errors ${JSON.stringify(e.texts[0])}`, m[1]);
      else if (m[1].startsWith("#") && !GROUP_IDS.has(m[1].slice(1)) && !errorIds.has(m[1].slice(1))) fail(`link: errors ${JSON.stringify(e.texts[0])} → ${m[1]}: no such anchor`);
    }
  }
}

// --- 3b / 4. the built site ------------------------------------------------------
const DIST = join(ROOT, "dist");
let checkedPages = 0;
if (existsSync(DIST)) {
  const html = walk(DIST).filter((p) => p.endsWith(".html") && !p.includes(`${join("dist", "live")}`));
  const idsCache = new Map();
  const idsIn = (file) => {
    if (!idsCache.has(file)) idsCache.set(file, new Set([...readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
    return idsCache.get(file);
  };
  const target = (url) => {
    let p = url.slice(BASE.length) || "/";
    const file = join(DIST, decodeURIComponent(p));
    if (p.endsWith("/")) return join(file, "index.html");
    return file;
  };
  for (const file of html) {
    checkedPages++;
    const src = readFileSync(file, "utf8");
    const page = "/" + relative(DIST, file).replace(/\\/g, "/");
    for (const m of src.matchAll(/<(script|link|img|iframe|source|video|audio)\b[^>]*\s(?:src|href)="([^"]+)"/g)) {
      const [, tag, url] = m;
      if (tag === "link" && !/rel="(stylesheet|icon|preload|modulepreload|manifest)"/.test(m[0])) continue;
      if (/^(https?:)?\/\//.test(url)) fail(`dist: ${page} loads <${tag}> from another origin: ${url}`);
    }
    for (const m of src.matchAll(/\shref="([^"]+)"/g)) {
      const url = m[1].replace(/&amp;/g, "&");
      if (/^(https?:|mailto:|tg:|data:)/.test(url)) continue;
      if (/rel="(canonical|alternate)"/.test(src.slice(Math.max(0, m.index - 80), m.index + 200)) && url.startsWith("http")) continue;
      let path = url, anchor = "";
      if (url.includes("#")) [path, anchor] = url.split("#");
      if (!path) { if (anchor && !idsIn(file).has(decodeURIComponent(anchor))) fail(`dist: ${page} → #${anchor}: no such anchor`); continue; }
      if (!path.startsWith(BASE)) { fail(`dist: ${page} → ${url}: outside the site base`); continue; }
      const t = target(path.split("?")[0]);
      if (!existsSync(t)) { fail(`dist: ${page} → ${url}: not found`); continue; }
      if (anchor && t.endsWith(".html") && !idsIn(t).has(decodeURIComponent(anchor))) fail(`dist: ${page} → ${url}: no such anchor`);
    }
  }
}

if (problems.length) {
  console.error(problems.map((p) => `  ✗ ${p}`).join("\n"));
  console.error(`\ncheck: ${problems.length} problem(s)`);
  process.exit(1);
}
console.log(`check: ${messages.length} installer messages (${printed.size} distinct) all documented in ${ENTRIES.length} entries; ${en.size} pages × 2 languages; ${checkedPages ? `${checkedPages} built pages, links and anchors OK` : "dist/ not built, skipped built-site checks"}`);
