import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One entry per page and language: src/content/docs/<locale>/<slug>.mdx.
const docs = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Shorter label for the sidebar when the title is long.
    nav: z.string().optional(),
  }),
});

export const collections = { docs };
