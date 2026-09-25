// The documentation pages: the MDX collection plus the template pages that are
// generated from the catalogue. Everything that lists pages (the sidebar, the
// previous / next links, the route table) reads it from here.

import { getCollection, type CollectionEntry } from "astro:content";
import { LOCALES, BASE, type Locale } from "./i18n";
import { TEMPLATES } from "./templates";

export type DocEntry = CollectionEntry<"docs">;

export interface PageInfo {
  slug: string;
  title: string;
  label: string;
  description: string;
  entry?: DocEntry;
  templateId?: string;
}

/** "src/content/docs/fa/installation/manual.mdx" -> ["fa", "installation/manual"] */
export function splitPath(filePath: string): [Locale, string] {
  const rel = filePath.replace(/\\/g, "/").replace(/^.*?src\/content\/docs\//, "").replace(/\.mdx$/, "");
  const [locale, ...rest] = rel.split("/");
  const slug = rest.join("/").replace(/(^|\/)index$/, "");
  return [locale as Locale, slug];
}

let cache: Map<Locale, Map<string, PageInfo>> | undefined;

export async function pages(locale: Locale): Promise<Map<string, PageInfo>> {
  if (!cache) {
    cache = new Map(LOCALES.map((l) => [l, new Map<string, PageInfo>()]));
    for (const entry of await getCollection("docs")) {
      const [l, slug] = splitPath(entry.filePath ?? entry.id);
      cache.get(l)?.set(slug, {
        slug,
        title: entry.data.title,
        label: entry.data.nav ?? entry.data.title,
        description: entry.data.description,
        entry,
      });
    }
    for (const l of LOCALES) {
      for (const t of TEMPLATES) {
        cache.get(l)!.set(`templates/${t.id}`, {
          slug: `templates/${t.id}`,
          title: t.name,
          label: t.name,
          description: t.description[l] ?? t.description.en,
          templateId: t.id,
        });
      }
    }
  }
  return cache.get(locale)!;
}

/** The locale a URL belongs to. */
export function localeOf(url: URL): Locale {
  const rest = url.pathname.startsWith(BASE) ? url.pathname.slice(BASE.length) : url.pathname;
  for (const l of LOCALES) if (rest === `/${l}` || rest.startsWith(`/${l}/`)) return l;
  return "en";
}
