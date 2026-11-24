import { defineConfig } from 'astro/config';
import placeholders from './src/remark-placeholders.mjs';

export default defineConfig({
  site: 'https://youkiti.github.io',
  base: '/homura-project',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  markdown: { remarkPlugins: [placeholders] },
});
