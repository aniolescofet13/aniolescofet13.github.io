// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://aniolescofet13.github.io',
  integrations: [mdx()],
  // /projects/lap-time-simulator/ rather than .html, so a shared link reads cleanly
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
