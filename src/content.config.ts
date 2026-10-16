import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  // The English original. Translations sit next to it as <slug>.ca.mdx and
  // <slug>.es.mdx and are their own collection, below.
  loader: glob({ pattern: ['*.mdx', '!*.ca.mdx', '!*.es.mdx'], base: './src/content/projects' }),
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

// A translation carries only what is written: the text and the card's
// headings. Visibility, category, order and the repository come from the
// English file, so they can never disagree between languages.
const translations = defineCollection({
  loader: glob({
    pattern: ['*.ca.mdx', '*.es.mdx'],
    base: './src/content/projects',
    // "purple-stint.ca.mdx" -> "purple-stint.ca": the slug and the language.
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    tags: z.array(z.string()).default([]),
    badge: z.preprocess((v) => (v === '' || v === null ? undefined : v), z.string().optional()),
    // Fingerprint of the English text this was translated from. When the
    // English changes, the build lists the translation as out of date.
    source: z.string().optional(),
  }),
});

export const collections = { projects, translations };
