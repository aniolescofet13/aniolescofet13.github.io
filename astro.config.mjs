// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://aniolescofet13.github.io',
  integrations: [mdx()],
  // /projects/lap-time-simulator/ rather than .html, so a shared link reads cleanly
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // English at the root, Catalan under /ca/ and Spanish under /es/. Components
  // read the language from the page's URL (Astro.currentLocale), so nothing
  // has to pass it down, not even the sliders inside a project's text.
  i18n: {
    locales: ['en', 'ca', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
