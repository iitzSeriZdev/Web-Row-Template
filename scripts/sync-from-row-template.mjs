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
//
// The messages come from the bootstrap, the management library, the command
// launcher, and every companion the library declares (RT_INSTALLER_COMPANIONS:
// the transaction engine and the panel adapters). Each message is read as the
// bash double-quoted string it is, so a command substitution with quotes of its
// own -- $(rt_panel_label "$panel") -- is read whole. Command substitutions are
// then recorded as named placeholders (SUBST below), because what they print
// changes from run to run just like a variable does; one this script does not
// know stops the sync, so a new one is named deliberately.

import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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

const LIB = need(join(SRC, "installer", "lib", "row-template.sh"));

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
const declared = readFileSync(LIB, "utf8").match(/^RT_INSTALLER_COMPANIONS="(.*)"$/m);
if (!declared) {
  console.error("sync: the management library declares no RT_INSTALLER_COMPANIONS");
  process.exit(1);
}
const FILES = [
  "installer/install.sh",
  "installer/lib/row-template.sh",
  "installer/bin/row-template",
  ...declared[1].trim().split(/\s+/).map((rel) => `installer/${rel}`),
];
const CALL = /\b(b_die|b_err|rt_die|rt_err|rt_warn|rt_ui_warn|rt_ui_error)\s+(?=")/g;
// The CLI launcher prints two lines of its own before the library is loaded.
const RAW = /printf '(row-template: [^'\\]*)(?:\\n)?'/g;
// The printing helpers themselves.
const SKIP = new Set(["rt_ui_success", "rt_section"]);
// Command substitutions inside messages, and the placeholder each becomes.
const SUBST = [
  [/^\$\(rt_panel_label\b/, "${PANEL}"],
  [/^\$\(basename "\$dir"\)$/, "${BACKUP}"],
  [/^\$\(printf '%s' "\$found" \| tr '\\n' ' '\)$/, "${PANELS}"],
  [/^\$\(rt_panel_rebecca_image\)$/, "${IMAGE}"],
  [/^\$\(\(n_avail - n_missing\)\)$/, "${N_PRESENT}"],
];

// Read the bash double-quoted string that starts at s[i]; return its source
// text and where it ends, or null when the line does not close it.
function readDq(s, i) {
  if (s[i] !== '"') return null;
  const paren = (k) => { // k: just after "$(" -- the index after its ")"
    let depth = 1;
    while (k < s.length && depth > 0) {
      const c = s[k];
      if (c === "\\") { k += 2; continue; }
      if (c === "'") { const e = s.indexOf("'", k + 1); if (e < 0) return -1; k = e + 1; continue; }
      if (c === '"') { const r = readDq(s, k); if (!r) return -1; k = r.end; continue; }
      if (c === "(") depth++;
      else if (c === ")") depth--;
      k++;
    }
    return depth === 0 ? k : -1;
  };
  let j = i + 1;
  while (j < s.length) {
    const c = s[j];
    if (c === "\\") { j += 2; continue; }
    if (c === '"') return { text: s.slice(i + 1, j), end: j + 1 };
    if (c === "$" && s[j + 1] === "(") { const k = paren(j + 2); if (k < 0) return null; j = k; continue; }
    if (c === "$" && s[j + 1] === "{") { const k = s.indexOf("}", j + 2); if (k < 0) return null; j = k + 1; continue; }
    j++;
  }
  return null;
}

// Replace each top-level $( … ) in a message with its placeholder.
function placeholders(text, where) {
  let out = "";
  let j = 0;
  while (j < text.length) {
    if (text[j] === "\\") { out += text.slice(j, j + 2); j += 2; continue; }
    if (text[j] === "$" && text[j + 1] === "(") {
      let depth = 0, k = j + 1;
      for (; k < text.length; k++) {
        const c = text[k];
        if (c === "\\") { k++; continue; }
        if (c === "'") { k = text.indexOf("'", k + 1); continue; }
        if (c === '"') { const q = readDq(text, k); k = q.end - 1; continue; }
        if (c === "(") depth++;
        else if (c === ")" && --depth === 0) break;
      }
      const sub = text.slice(j, k + 1);
      const hit = SUBST.find(([re]) => re.test(sub));
      if (!hit) {
        console.error(`sync: ${where}: no placeholder for ${sub}; add one to SUBST`);
        process.exit(1);
      }
      out += hit[1];
      j = k + 1;
      continue;
    }
    out += text[j++];
  }
  return out;
}

const messages = [];
for (const file of FILES) {
  let fn = "(top)";
  readFileSync(need(join(SRC, file)), "utf8").split("\n").forEach((line, i) => {
    const def = line.match(/^([a-z_0-9]+)\(\) \{/);
    if (def) fn = def[1];
    if (/^\s*#/.test(line) || SKIP.has(fn)) return;
    for (const m of line.matchAll(CALL)) {
      const r = readDq(line, m.index + m[0].length);
      if (!r) {
        console.error(`sync: ${file}:${i + 1}: cannot read the message string`);
        process.exit(1);
      }
      if (/^\$\d$/.test(r.text)) continue; // the helpers passing their argument on
      messages.push({
        file, line: i + 1, fn,
        level: /die|err|error/.test(m[1]) ? "FAIL" : "warn",
        text: placeholders(r.text, `${file}:${i + 1}`),
      });
    }
    for (const m of line.matchAll(RAW)) {
      messages.push({ file, line: i + 1, fn, level: "FAIL", text: m[1].replace(/^row-template: /, "") });
    }
  });
}
writeFileSync(join(ROOT, "src", "data", "installer-messages.json"),
  JSON.stringify({ source: "Row-Template installer", count: messages.length, messages }, null, 2) + "\n");

console.log(`sync: ${ids.length} templates, ${ids.length * 2} screenshots, ${ids.length} live pages, ${messages.length} installer messages from ${FILES.length} files`);
