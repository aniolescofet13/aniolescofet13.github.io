// Which project translations are missing or out of date.
//   npm run i18n           list them
//   npm run i18n -- --stamp <slug>.<lang>   record that a translation is now up to date
// A translation stores, as `source`, a fingerprint of the English text it was
// made from. When the English changes, the fingerprints differ.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const DIR = 'src/content/projects';
const LANGS = ['ca', 'es'];
const split = (t) => t.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
// Line endings normalised: Windows and Git may store the same text either way.
const hash = (body) => createHash('sha1').update(body.replace(/\r\n/g, '\n').trim()).digest('hex').slice(0, 10);

const stamp = process.argv.indexOf('--stamp');
if (stamp > 0) {
  const [slug, lang] = process.argv[stamp + 1].split('.');
  const en = split(readFileSync(`${DIR}/${slug}.mdx`, 'utf8'));
  const file = `${DIR}/${slug}.${lang}.mdx`;
  const [, fm, body] = split(readFileSync(file, 'utf8'));
  const next = fm.replace(/^source:.*$/m, '').trimEnd() + `\nsource: "${hash(en[2])}"`;
  writeFileSync(file, `---\n${next}\n---\n${body}`);
  console.log(`${file} marked as translated from the current English.`);
  process.exit(0);
}

let todo = 0;
for (const f of readdirSync(DIR).filter((f) => /^[^.]+\.mdx$/.test(f)).sort()) {
  const slug = f.slice(0, -4);
  const current = hash(split(readFileSync(`${DIR}/${f}`, 'utf8'))[2]);
  for (const lang of LANGS) {
    const file = `${DIR}/${slug}.${lang}.mdx`;
    if (!existsSync(file)) { console.log(`missing   ${slug}.${lang}.mdx`); todo++; continue; }
    const src = split(readFileSync(file, 'utf8'))[1].match(/^source:\s*"?([0-9a-f]+)"?/m)?.[1];
    if (src !== current) { console.log(`outdated  ${slug}.${lang}.mdx`); todo++; }
  }
}
console.log(todo ? `\n${todo} translation(s) to update. After updating one: npm run i18n -- --stamp <slug>.<lang>` : 'All translations are up to date.');
