// Everything the pages do in the browser: theme, mobile menu, copy buttons,
// tabs, the outline's scroll-spy and the search dialog. Each part is optional:
// it looks for its markup and does nothing when the page has none.

const root = document.documentElement;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function stored(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function store(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* private mode */ }
}

/* --- theme -------------------------------------------------------------- */

document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dark = !root.classList.contains("dark");
    root.classList.add("theme-switching");
    root.classList.toggle("dark", dark);
    store("theme", dark ? "dark" : "light");
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
  });
});

/* --- platform key hint -------------------------------------------------- */

const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
if (mac) document.querySelectorAll("[data-mod]").forEach((el) => { el.textContent = "⌘"; });

/* --- mobile menu -------------------------------------------------------- */

const menuBtn = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.getElementById("mobile-nav");
function setMenu(open: boolean): void {
  if (!menuBtn || !menu) return;
  menu.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  root.classList.toggle("menu-open", open);
}
menuBtn?.addEventListener("click", () => setMenu(menu?.hidden ?? false));
menu?.addEventListener("click", (e) => { if ((e.target as HTMLElement).closest("a")) setMenu(false); });
matchMedia("(min-width: 1024px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

/* --- copy buttons ------------------------------------------------------- */

const copyTpl = document.getElementById("copy-button") as HTMLTemplateElement | null;

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

function addCopy(frame: HTMLElement, source: () => string): void {
  if (!copyTpl || frame.querySelector(":scope > .copy-btn")) return;
  const btn = copyTpl.content.firstElementChild!.cloneNode(true) as HTMLButtonElement;
  const label = btn.getAttribute("aria-label") ?? "Copy";
  let timer = 0;
  btn.addEventListener("click", async () => {
    if (!(await copyText(source()))) return;
    btn.setAttribute("data-copied", "");
    btn.setAttribute("aria-label", btn.dataset.labelCopied ?? label);
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      btn.removeAttribute("data-copied");
      btn.setAttribute("aria-label", label);
    }, 1600);
  });
  frame.append(btn);
}

document.querySelectorAll<HTMLPreElement>("pre.astro-code, pre[data-copy]").forEach((pre) => {
  let frame = pre.parentElement;
  if (!frame?.classList.contains("code-frame")) {
    frame = document.createElement("div");
    frame.className = "code-frame";
    pre.replaceWith(frame);
    frame.append(pre);
  }
  addCopy(frame, () => (pre.querySelector("code") ?? pre).textContent?.replace(/\n$/, "") ?? "");
});

/* --- tabs --------------------------------------------------------------- */

function selectTab(tabs: HTMLElement, index: number, persist: boolean): void {
  const buttons = tabs.querySelectorAll<HTMLButtonElement>(":scope > .tab-list > button");
  const panels = tabs.querySelectorAll<HTMLElement>(":scope > .tab-panel");
  buttons.forEach((b, i) => {
    b.setAttribute("aria-selected", String(i === index));
    b.tabIndex = i === index ? 0 : -1;
  });
  panels.forEach((p, i) => { p.hidden = i !== index; });
  const sync = tabs.dataset.sync;
  if (persist && sync) {
    const label = buttons[index]?.textContent?.trim() ?? "";
    store(`tabs:${sync}`, label);
    document.querySelectorAll<HTMLElement>(`.tabs[data-sync="${sync}"]`).forEach((other) => {
      if (other === tabs) return;
      const at = [...other.querySelectorAll(":scope > .tab-list > button")].findIndex((b) => b.textContent?.trim() === label);
      if (at > -1) selectTab(other, at, false);
    });
  }
}

document.querySelectorAll<HTMLElement>(".tabs").forEach((tabs, n) => {
  const buttons = [...tabs.querySelectorAll<HTMLButtonElement>(":scope > .tab-list > button")];
  const panels = [...tabs.querySelectorAll<HTMLElement>(":scope > .tab-panel")];
  buttons.forEach((b, i) => {
    const id = `tabs-${n}-${i}`;
    b.id = `${id}-tab`;
    b.setAttribute("aria-controls", `${id}-panel`);
    if (panels[i]) {
      panels[i].id = `${id}-panel`;
      panels[i].setAttribute("aria-labelledby", b.id);
    }
    b.addEventListener("click", () => selectTab(tabs, i, true));
    b.addEventListener("keydown", (e) => {
      const rtl = getComputedStyle(tabs).direction === "rtl";
      const step = e.key === "ArrowRight" ? (rtl ? -1 : 1) : e.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
      if (!step) return;
      e.preventDefault();
      const to = (i + step + buttons.length) % buttons.length;
      selectTab(tabs, to, true);
      buttons[to].focus();
    });
  });
  const remembered = tabs.dataset.sync ? stored(`tabs:${tabs.dataset.sync}`) : null;
  const at = remembered ? buttons.findIndex((b) => b.textContent?.trim() === remembered) : -1;
  selectTab(tabs, at > -1 ? at : 0, false);
  tabs.setAttribute("data-ready", "");
});

/* --- outline scroll-spy ------------------------------------------------- */

const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]")];
if (tocLinks.length) {
  const targets = tocLinks
    .map((a) => document.getElementById(a.dataset.tocLink!))
    .filter((el): el is HTMLElement => !!el);
  let ticking = false;
  const update = () => {
    ticking = false;
    const line = 120;
    let active = targets[0];
    for (const el of targets) {
      if (el.getBoundingClientRect().top - line <= 0) active = el;
      else break;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = targets[targets.length - 1];
    tocLinks.forEach((a) => a.classList.toggle("active", a.dataset.tocLink === active?.id));
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* --- search ------------------------------------------------------------- */

interface PagefindResultData {
  url: string;
  excerpt: string;
  meta: { title?: string };
  sub_results?: { title: string; url: string; excerpt: string; locations?: number[] }[];
}
interface Pagefind {
  options(o: Record<string, unknown>): Promise<void>;
  debouncedSearch(q: string, o?: unknown, ms?: number): Promise<{ results: { data(): Promise<PagefindResultData> }[] } | null>;
}

const dialog = document.querySelector<HTMLDialogElement>("[data-search-dialog]");
const input = dialog?.querySelector<HTMLInputElement>("[data-search-input]");
const list = dialog?.querySelector<HTMLElement>("[data-search-results]");
let pagefind: Pagefind | null | undefined;
let selected = 0;

async function loadPagefind(): Promise<Pagefind | null> {
  if (pagefind !== undefined) return pagefind;
  try {
    const url = `${BASE}/pagefind/pagefind.js`;
    pagefind = (await import(/* @vite-ignore */ url)) as Pagefind;
    await pagefind.options({ baseUrl: `${BASE}/`, excerptLength: 18 });
  } catch {
    pagefind = null;
  }
  return pagefind;
}

function message(text: string): void {
  if (!list) return;
  list.innerHTML = "";
  const p = document.createElement("p");
  p.className = "empty";
  p.textContent = text;
  list.append(p);
}

function highlight(index: number): void {
  const items = list ? [...list.querySelectorAll<HTMLAnchorElement>("a")] : [];
  if (!items.length) return;
  selected = (index + items.length) % items.length;
  items.forEach((a, i) => a.setAttribute("aria-selected", String(i === selected)));
  items[selected].scrollIntoView({ block: "nearest" });
}

function cleanTitle(t: string): string {
  return t.replace(/\s+[–-]\s+Row-Template$/, "");
}

async function runSearch(q: string): Promise<void> {
  if (!dialog || !list) return;
  if (!q.trim()) { list.innerHTML = ""; return; }
  message(dialog.dataset.loading ?? "");
  const pf = await loadPagefind();
  if (!pf) { message(dialog.dataset.unavailable ?? ""); return; }
  const search = await pf.debouncedSearch(q, {}, 120);
  if (!search) return; // superseded by a newer query
  const data = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
  if (input && input.value !== q) return;
  if (!data.length) { message(dialog.dataset.empty ?? ""); return; }
  list.innerHTML = "";
  for (const d of data) {
    // The section of the page with the most matches, if it is not the page itself.
    const sub = (d.sub_results ?? [])
      .filter((s) => s.url !== d.url && s.url.includes("#"))
      .sort((a, b) => (b.locations?.length ?? 0) - (a.locations?.length ?? 0))[0];
    const a = document.createElement("a");
    a.href = sub?.url ?? d.url;
    a.setAttribute("role", "option");
    const title = document.createElement("div");
    title.className = "r-title";
    title.textContent = cleanTitle(d.meta.title ?? d.url);
    if (sub && sub.title && sub.title !== d.meta.title) {
      const s = document.createElement("span");
      s.className = "r-sub";
      s.textContent = sub.title;
      title.append(s);
    }
    const ex = document.createElement("div");
    ex.className = "r-excerpt";
    ex.innerHTML = sub?.excerpt ?? d.excerpt; // pagefind escapes content and adds <mark>
    a.append(title, ex);
    list.append(a);
  }
  highlight(0);
}

function openSearch(): void {
  if (!dialog || dialog.open) return;
  dialog.showModal();
  input?.focus();
  input?.select();
  void loadPagefind();
}

document.querySelectorAll("[data-search-open]").forEach((b) => b.addEventListener("click", openSearch));
addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if ((k === "k" && (e.metaKey || e.ctrlKey)) || (k === "/" && !/input|textarea|select/i.test((e.target as HTMLElement).tagName) && !(e.target as HTMLElement).isContentEditable)) {
    e.preventDefault();
    openSearch();
  }
});
input?.addEventListener("input", () => void runSearch(input.value));
input?.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { e.preventDefault(); highlight(selected + 1); }
  else if (e.key === "ArrowUp") { e.preventDefault(); highlight(selected - 1); }
  else if (e.key === "Enter") {
    const a = list?.querySelectorAll<HTMLAnchorElement>("a")[selected];
    if (a) { e.preventDefault(); location.href = a.href; }
  }
});
dialog?.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
list?.addEventListener("click", (e) => { if ((e.target as HTMLElement).closest("a")) dialog?.close(); });
