// Whether a project's repository is public, asked of GitHub at build time.
// The card shows the GitHub icon only for a public repo: a link to a private
// one is a 404 for anyone who follows it. A private repo, a typo or a failed
// request all read as "not public", so the worst case is a missing icon,
// never a broken link.
const cache = new Map<string, Promise<boolean>>();

export function isPublicRepo(url: string | undefined): Promise<boolean> {
  const m = url?.match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+?)(?:\.git)?\/?$/);
  if (!m) return Promise.resolve(false);
  const key = `${m[1]}/${m[2]}`.toLowerCase();
  if (!cache.has(key)) cache.set(key, check(m[1], m[2]));
  return cache.get(key)!;
}

async function check(owner: string, name: string): Promise<boolean> {
  // In GitHub Actions the workflow passes its own token, which lifts the rate
  // limit; it cannot see other repositories' private contents, so a private
  // repo still answers 404.
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
      headers: { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { private?: boolean };
    return data.private === false;
  } catch (e) {
    console.warn(`[repos] could not check ${owner}/${name}: ${e}`);
    return false;
  }
}
