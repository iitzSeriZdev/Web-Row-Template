import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// Published at https://iitzseridev.github.io/Web-Row-Template/ (GitHub Pages).
const SITE = "https://iitzseridev.github.io";
const BASE = "/Web-Row-Template";

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "always",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: false,
    },
  },
  vite: {
    build: {
      // Astro marks every MDX module with a "use astro:head-inject" directive;
      // the bundler warns that it cannot keep it, once per page. It is not
      // needed at runtime, so the check is switched off to keep builds readable.
      rolldownOptions: { checks: { moduleLevelDirective: false } },
    },
  },
});
