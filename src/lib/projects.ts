import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { createHash } from 'node:crypto';
import { DEFAULT_LOCALE, useT, type Locale } from '../i18n/ui';

type Project = CollectionEntry<'projects'>;

export const CATEGORIES = [
  { key: 'personal', prefix: 'PP' },
  { key: 'fs',       prefix: 'FS' },
  { key: 'pro',      prefix: 'PRO' },
  { key: 'uni',      prefix: 'UNI' },
] as const;

const byOrder = (a: Project, b: Project) => a.data.order - b.data.order;

/** Listed projects grouped by category, in display order, with the headings in `lang`. Empty groups are dropped. */
export async function listedByCategory(lang: Locale = DEFAULT_LOCALE) {
  const t = useT(lang).projects;
  const listed = (await getCollection('projects')).filter((p) => p.data.visibility === 'listed');
  return CATEGORIES
    .map((c) => ({ ...c, tab: t.tabs[c.key], title: t.titles[c.key], items: listed.filter((p) => p.data.category === c.key).sort(byOrder) }))
    .filter((c) => c.items.length > 0);
}

/**
 * "PP — 02" and "pp-02" for a project, from its position among the *listed*
 * projects of its category. Unlisted projects have no position on the
 * portfolio, so they get the bare category prefix.
 */
export async function labelFor(project: Project) {
  const cat = CATEGORIES.find((c) => c.key === project.data.category)!;
  const groups = await listedByCategory();
  const i = groups.find((g) => g.key === cat.key)?.items.findIndex((p) => p.id === project.id) ?? -1;
  if (i < 0) return { label: cat.prefix, anchor: project.id };
  const n = String(i + 1).padStart(2, '0');
  return { label: `${cat.prefix} — ${n}`, anchor: `${cat.prefix.toLowerCase()}-${n}` };
}

/** Fingerprint of an English write-up; a translation records the one it was made from. */
export function sourceHash(body: string | undefined) {
  // Line endings normalised: Windows and Git may store the same text either way.
  return createHash('sha1').update((body ?? '').replace(/\r\n/g, '\n').trim()).digest('hex').slice(0, 10);
}

const warned = new Set<string>();

/**
 * The project as it reads in `lang`: the translation's headings and text when
 * there is one, the English otherwise. Settings (visibility, category, order,
 * repository) always come from the English file.
 */
export async function localize(project: Project, lang: Locale) {
  const base = { ...project.data, entry: project as Project | CollectionEntry<'translations'>, translated: lang === DEFAULT_LOCALE };
  if (lang === DEFAULT_LOCALE) return base;
  const tr = await getEntry('translations', `${project.id}.${lang}`);
  if (!tr) return base;
  if (tr.data.source && tr.data.source !== sourceHash(project.body) && !warned.has(tr.id)) {
    warned.add(tr.id);
    console.warn(`[i18n] ${tr.id}.mdx was translated from an older version of ${project.id}.mdx; it still shows, but needs updating.`);
  }
  return {
    ...base,
    title: tr.data.title,
    subtitle: tr.data.subtitle,
    tags: tr.data.tags.length ? tr.data.tags : project.data.tags,
    badge: tr.data.badge ?? project.data.badge,
    entry: tr,
    translated: true,
  };
}
