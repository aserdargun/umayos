import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://umayos.org',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  i18n: { defaultLocale: 'tr', locales: ['tr', 'en'], routing: { prefixDefaultLocale: false } },
});
