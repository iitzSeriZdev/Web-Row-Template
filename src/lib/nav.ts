// The sidebar, in reading order. Slugs are paths under /docs/; "" is the
// introduction. Page labels come from each page's frontmatter (`nav`, else
// `title`), so a translation renames its own sidebar entry. The template pages
// are generated from the template catalogue rather than written by hand.

import type { Locale } from "./i18n";
import { TEMPLATES } from "./templates";

export interface NavGroup {
  key: string;
  label: Record<Locale, string>;
  slugs: string[];
}

export const NAV: NavGroup[] = [
  {
    key: "getting-started",
    label: { en: "Getting Started", fa: "شروع کار" },
    slugs: ["", "quick-start", "requirements"],
  },
  {
    key: "installation",
    label: { en: "Installation", fa: "نصب" },
    slugs: [
      "installation/installer",
      "installation/manual",
      "installation/activation",
      "installation/environment",
    ],
  },
  {
    key: "templates",
    label: { en: "Templates", fa: "تمپلیت‌ها" },
    slugs: ["templates", "templates/choosing", ...TEMPLATES.map((t) => `templates/${t.id}`)],
  },
  {
    key: "configuration",
    label: { en: "Configuration", fa: "پیکربندی" },
    slugs: ["configuration/branding", "configuration/subscriber-page"],
  },
  {
    key: "management",
    label: { en: "Management", fa: "مدیریت" },
    slugs: [
      "management/cli",
      "management/manager",
      "management/updating",
      "management/rollback",
      "management/verify",
      "management/uninstall",
    ],
  },
  {
    key: "help",
    label: { en: "Help", fa: "راهنما و عیب‌یابی" },
    slugs: ["help/errors", "help/troubleshooting", "help/faq"],
  },
  {
    key: "reference",
    label: { en: "Reference", fa: "مرجع" },
    slugs: [
      "reference/security",
      "reference/releases",
      "reference/compatibility",
      "reference/changelog",
      "reference/contributing",
    ],
  },
];

/** Every slug in reading order, for previous / next links. */
export const ORDER: string[] = NAV.flatMap((g) => g.slugs);

export function groupOf(slug: string): NavGroup | undefined {
  return NAV.find((g) => g.slugs.includes(slug));
}
