import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.enum(['personal', 'fs', 'pro', 'uni']),
    // Sort key within its category. The visible label (PP — 01 …) is the
    // project's position among the *listed* ones, so hiding one never leaves
    // a gap in the numbering.
    order: z.number().int(),
    tags: z.array(z.string()).default([]),
    badge: z.preprocess((v) => (v === '' || v === null ? undefined : v), z.string().optional()),

    // listed   — on the portfolio
    // unlisted — not on the portfolio, but its own page exists for a direct link
    // hidden   — not published anywhere
    visibility: z.enum(['listed', 'unlisted', 'hidden']).default('listed'),

    // Independent of visibility. The GitHub icon appears by itself when the
    // repo is public on GitHub, checked at build time (src/lib/repos.ts).
    // The CMS writes an empty field as '', which is not a URL. Without this,
    // saving a project with no repo from /admin would break the build.
    repo: z.preprocess((v) => (v === '' || v === null ? undefined : v), z.url().optional()),
  }),
});

export const collections = { projects };
