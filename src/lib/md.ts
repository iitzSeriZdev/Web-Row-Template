// A very small inline formatter for prose kept in data files (the error
// reference): `code`, **bold**, [text](link) and ‹placeholder›. Everything else
// is escaped, so data can never inject markup.

import { withBase, DEFAULT_LOCALE, type Locale } from "./i18n";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function href(to: string, locale: Locale): string {
  if (to.startsWith("/docs")) return withBase(`${locale === DEFAULT_LOCALE ? "" : `/${locale}`}${to}`);
  if (to.startsWith("/")) return withBase(to);
  return to;
}

function inline(s: string, locale: Locale): string {
  let out = esc(s);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/‹([^›]+)›/g, '<span class="ph">‹$1›</span>');
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text: string, to: string) => {
    const raw = to.replace(/&amp;/g, "&");
    const external = /^https?:/.test(raw);
    return `<a href="${esc(href(raw, locale))}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${text}</a>`;
  });
  return out;
}

export function md(s: string, locale: Locale): string {
  return s
    .split(/(`[^`]+`)/)
    .map((part) => (part.startsWith("`") && part.endsWith("`") && part.length > 1
      ? `<code${part.length <= 32 ? ' class="nw"' : ""}>${esc(part.slice(1, -1))}</code>`
      : inline(part, locale)))
    .join("");
}

/** Every internal link in a piece of prose, for the link checker. */
export function links(s: string): string[] {
  return [...s.replace(/`[^`]+`/g, "").matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]);
}
