// Languages, interface strings and URL helpers.
//
// English is the source language and lives at the site root; Persian lives
// under /fa/ and is rendered right-to-left. A page's content comes from
// src/content/docs/<locale>/; everything else a reader sees is here.

export const LOCALES = ["en", "fa"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; short: string; dir: "ltr" | "rtl"; lang: string }> = {
  en: { label: "English", short: "EN", dir: "ltr", lang: "en" },
  fa: { label: "فارسی", short: "فا", dir: "rtl", lang: "fa" },
};

export const UI = {
  en: {
    siteTitle: "Row-Template",
    siteDescription:
      "Documentation for Row-Template, the self-contained, white-label subscription page for 3X-UI panels.",
    docs: "Docs",
    templates: "Templates",
    errors: "Errors",
    changelog: "Changelog",
    searchPlaceholder: "Search documentation…",
    searchShort: "Search",
    searchEmpty: "No results found.",
    searchLoading: "Searching…",
    searchUnavailable: "Search is available on the published site.",
    searchHint: "to navigate",
    searchSelect: "to select",
    searchClose: "to close",
    onThisPage: "On This Page",
    previous: "Previous",
    next: "Next",
    editPage: "Edit this page on GitHub",
    toggleTheme: "Toggle theme",
    toggleMenu: "Toggle menu",
    language: "Language",
    copy: "Copy",
    copied: "Copied",
    skipToContent: "Skip to content",
    github: "GitHub",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you are looking for does not exist or has moved.",
    backToDocs: "Back to the documentation",
    appliesTo: "Applies to Row-Template 1.2.0",
  },
  fa: {
    siteTitle: "Row-Template",
    siteDescription:
      "مستندات Row-Template، صفحهٔ اشتراک مستقل و بدون برند (white-label) برای پنل‌های 3X-UI.",
    docs: "مستندات",
    templates: "تمپلیت‌ها",
    errors: "خطاها",
    changelog: "تغییرات",
    searchPlaceholder: "جستجو در مستندات…",
    searchShort: "جستجو",
    searchEmpty: "نتیجه‌ای پیدا نشد.",
    searchLoading: "در حال جستجو…",
    searchUnavailable: "جستجو در نسخهٔ منتشرشدهٔ سایت در دسترس است.",
    searchHint: "برای جابه‌جایی",
    searchSelect: "برای انتخاب",
    searchClose: "برای بستن",
    onThisPage: "در این صفحه",
    previous: "قبلی",
    next: "بعدی",
    editPage: "ویرایش این صفحه در GitHub",
    toggleTheme: "تغییر پوسته",
    toggleMenu: "باز و بسته کردن منو",
    language: "زبان",
    copy: "کپی",
    copied: "کپی شد",
    skipToContent: "رفتن به محتوا",
    github: "GitHub",
    notFoundTitle: "صفحه پیدا نشد",
    notFoundBody: "صفحه‌ای که دنبال آن هستید وجود ندارد یا جابه‌جا شده است.",
    backToDocs: "بازگشت به مستندات",
    appliesTo: "مربوط به Row-Template نسخهٔ 1.2.0",
  },
} as const;

export type UIStrings = (typeof UI)["en"];

export function t(locale: Locale): UIStrings {
  return UI[locale] as UIStrings;
}

/** The site base without a trailing slash, e.g. "/Web-Row-Template". */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefix a root-relative path with the site base. */
export function withBase(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${clean}`;
}

/** The URL of a documentation page, "" being the introduction. */
export function docHref(locale: Locale, slug: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const tail = slug ? `/${slug}/` : "/";
  return withBase(`${prefix}/docs${tail}`);
}

/** The URL of a landing page. */
export function homeHref(locale: Locale): string {
  return withBase(locale === DEFAULT_LOCALE ? "/" : `/${locale}/`);
}

/** Swap the locale of a path produced by this site (base included). */
export function switchLocale(pathname: string, to: Locale): string {
  let rest = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  for (const l of LOCALES) {
    if (l !== DEFAULT_LOCALE && (rest === `/${l}` || rest.startsWith(`/${l}/`))) {
      rest = rest.slice(l.length + 1) || "/";
    }
  }
  const prefix = to === DEFAULT_LOCALE ? "" : `/${to}`;
  return withBase(`${prefix}${rest}`);
}
