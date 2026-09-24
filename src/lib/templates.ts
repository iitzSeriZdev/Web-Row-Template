// The template catalogue, synced from Row-Template (docs/src/data/templates.json)
// by scripts/sync-from-row-template.mjs. Facts in it are read from the product's
// source; only the descriptions are authored prose.

import data from "../data/templates.json";
import type { Locale } from "./i18n";

export interface Template {
  id: string;
  name: string;
  family: string;
  composition: string;
  density: string;
  grouping: string;
  radius: string;
  measure: string;
  description: Record<string, string>;
}

export const TEMPLATES: Template[] = (data as { templates: Template[] }).templates;
export const TEMPLATE_META = (data as { meta: { count: number; default: string; ceiling: string } }).meta;

export function templateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function describe(t: Template, locale: Locale): string {
  return t.description[locale] ?? t.description.en;
}

/** Labels for the catalogue's attribute values. */
const ATTR: Record<string, Record<Locale, string>> = {
  family: { en: "Layout", fa: "چیدمان" },
  composition: { en: "Composition", fa: "ترکیب" },
  density: { en: "Density", fa: "تراکم" },
  grouping: { en: "Grouping", fa: "گروه‌بندی" },
  radius: { en: "Corners", fa: "گوشه‌ها" },
  measure: { en: "Line length", fa: "طول سطر" },
};

const VALUES: Record<string, Record<Locale, string>> = {
  // family
  "single-column": { en: "Single column", fa: "تک‌ستونی" },
  "narrow-column": { en: "Narrow column", fa: "ستون باریک" },
  "wide-board": { en: "Wide board", fa: "صفحهٔ پهن" },
  cabinet: { en: "Cabinet", fa: "کابینتی" },
  console: { en: "Console", fa: "کنسولی" },
  dashboard: { en: "Dashboard", fa: "داشبورد" },
  dossier: { en: "Dossier", fa: "پرونده‌ای" },
  faceted: { en: "Faceted", fa: "چندوجهی" },
  // composition
  airy: { en: "Airy", fa: "باز و سبک" },
  "card-led": { en: "Card-led", fa: "کارت‌محور" },
  centred: { en: "Centred", fa: "وسط‌چین" },
  "choice-led": { en: "Choice-led", fa: "انتخاب‌محور" },
  "document-led": { en: "Document-led", fa: "سندمحور" },
  "framed-screen": { en: "Framed screen", fa: "صفحهٔ قاب‌دار" },
  "grid-led": { en: "Grid-led", fa: "شبکه‌محور" },
  "hand-ruled": { en: "Hand-ruled", fa: "خط‌کشی دستی" },
  "information-forward": { en: "Information-forward", fa: "اطلاعات‌محور" },
  monospace: { en: "Monospace", fa: "تک‌فاصله" },
  "reading-first": { en: "Reading-first", fa: "خوانش‌محور" },
  "record-led": { en: "Record-led", fa: "رکوردمحور" },
  "session-sheet": { en: "Session sheet", fa: "برگهٔ جلسه" },
  "status-led": { en: "Status-led", fa: "وضعیت‌محور" },
  "type-led": { en: "Type-led", fa: "تایپوگرافی‌محور" },
  // density
  comfortable: { en: "Comfortable", fa: "راحت" },
  compact: { en: "Compact", fa: "فشرده" },
  dense: { en: "Dense", fa: "متراکم" },
  spacious: { en: "Spacious", fa: "جادار" },
  // grouping
  bands: { en: "Bands", fa: "نوارها" },
  cards: { en: "Cards", fa: "کارت‌ها" },
  columns: { en: "Columns", fa: "ستون‌ها" },
  facets: { en: "Facets", fa: "وجه‌ها" },
  grid: { en: "Grid", fa: "شبکه" },
  panels: { en: "Panels", fa: "پنل‌ها" },
  rules: { en: "Rules", fa: "خطوط" },
  space: { en: "Space", fa: "فضای خالی" },
  // radius
  soft: { en: "Soft", fa: "نرم" },
  square: { en: "Square", fa: "تیز" },
  // measure
  medium: { en: "Medium", fa: "متوسط" },
  narrow: { en: "Narrow", fa: "باریک" },
  wide: { en: "Wide", fa: "پهن" },
};

export const ATTRIBUTE_KEYS = ["family", "composition", "density", "grouping", "radius", "measure"] as const;

export function attrLabel(key: string, locale: Locale): string {
  return ATTR[key]?.[locale] ?? key;
}

/** A value's label, or the value itself (title-cased) when it has none. */
export function valueLabel(value: string, locale: Locale): string {
  const known = VALUES[value]?.[locale];
  if (known) return known;
  return value.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}
