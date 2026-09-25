// Refresh everything this site takes from a Row-Template checkout.
//
//   node scripts/sync-from-row-template.mjs ../Row-Template
//
// Copies, and never edits:
//   docs/src/data/templates.json                  -> src/data/templates.json
//   docs/public/previews/<id>-{desktop,mobile}.webp -> public/previews/
//   tools/fixtures/out/<id>/00-showcase/rendered.html -> public/live/<id>/index.html
//
// The rendered pages are produced by Row-Template's own fixture renderer
// (`npm run fixtures:all` there), from the project's placeholder data; run it
// first. They are the real, self-contained template files, so the gallery's
// live previews are the product itself, not a mock-up.
//
// It also records every error and warning the installer can print, with where
// it comes from, in src/data/installer-messages.json. scripts/check-site.mjs
// compares the error reference against that list, so a message added to or
// removed from the installer shows up as a failing check here.

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(process.argv[2] || "../Row-Template");

function need(path) {
  if (!existsSync(path)) {
    console.error(`sync: not found: ${path}`);
    process.exit(1);
  }
  return path;
}

need(join(SRC, "installer", "lib", "row-template.sh"));

// 1. the catalogue
const catalogue = need(join(SRC, "docs", "src", "data", "templates.json"));
copyFileSync(catalogue, join(ROOT, "src", "data", "templates.json"));
const ids = JSON.parse(readFileSync(catalogue, "utf8")).templates.map((t) => t.id);

// 2. screenshots
const shots = need(join(SRC, "docs", "public", "previews"));
mkdirSync(join(ROOT, "public", "previews"), { recursive: true });
for (const id of ids) {
  for (const mode of ["desktop", "mobile"]) {
    copyFileSync(need(join(shots, `${id}-${mode}.webp`)), join(ROOT, "public", "previews", `${id}-${mode}.webp`));
  }
}

// 3. live pages
rmSync(join(ROOT, "public", "live"), { recursive: true, force: true });
for (const id of ids) {
  const page = need(join(SRC, "tools", "fixtures", "out", id, "00-showcase", "rendered.html"));
  mkdirSync(join(ROOT, "public", "live", id), { recursive: true });
  copyFileSync(page, join(ROOT, "public", "live", id, "index.html"));
}

// 4. installer messages
const FILES = ["installer/install.sh", "installer/lib/row-template.sh", "installer/bin/row-template"];
const CALL = /\b(b_die|b_err|rt_die|rt_err|rt_warn|rt_ui_warn|rt_ui_error)\s+"((?:[^"\\]|\\.)*)"/g;
// The CLI launcher prints two lines of its own before the library is loaded.
const RAW = /printf '(row-template: [^'\\]*)(?:\\n)?'/g;
// Groundwork no 1.2.0 command reaches (format-2 backups), and the printing
// helpers themselves.
const SKIP = new Set([
  "rt_backup_create_v2", "rt_backup_panel_write", "rt_backup_manifest_write", "rt_backup_format",
  "rt_ui_success", "rt_section",
]);
const messages = [];
for (const file of FILES) {
  let fn = "(top)";
  readFileSync(join(SRC, file), "utf8").split("\n").forEach((line, i) => {
    const def = line.match(/^([a-z_0-9]+)\(\) \{/);
    if (def) fn = def[1];
    if (/^\s*#/.test(line) || SKIP.has(fn)) return;
    for (const m of line.matchAll(CALL)) {
      if (/^\$\d$/.test(m[2])) continue; // the helpers passing their argument on
      messages.push({ file, line: i + 1, fn, level: /die|err|error/.test(m[1]) ? "FAIL" : "warn", text: m[2] });
    }
    for (const m of line.matchAll(RAW)) {
      messages.push({ file, line: i + 1, fn, level: "FAIL", text: m[1].replace(/^row-template: /, "") });
    }
  });
}
writeFileSync(join(ROOT, "src", "data", "installer-messages.json"),
  JSON.stringify({ source: "Row-Template installer", count: messages.length, messages }, null, 2) + "\n");

console.log(`sync: ${ids.length} templates, ${ids.length * 2} screenshots, ${ids.length} live pages, ${messages.length} installer messages`);
