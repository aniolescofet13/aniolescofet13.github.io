import { getCollection, type CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

export const CATEGORIES = [
  { key: 'personal', prefix: 'PP',  tab: 'Personal',        title: 'Personal Projects' },
  { key: 'fs',       prefix: 'FS',  tab: 'Formula Student', title: 'Formula Student — BCNeMotorsport' },
  { key: 'pro',      prefix: 'PRO', tab: 'Professional',    title: 'Professional Projects' },
  { key: 'uni',      prefix: 'UNI', tab: 'University',      title: 'University Projects' },
] as const;

const byOrder = (a: Project, b: Project) => a.data.order - b.data.order;

/** Listed projects grouped by category, in display order. Empty groups are dropped. */
export async function listedByCategory() {
  const listed = (await getCollection('projects')).filter((p) => p.data.visibility === 'listed');
  return CATEGORIES
    .map((c) => ({ ...c, items: listed.filter((p) => p.data.category === c.key).sort(byOrder) }))
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
