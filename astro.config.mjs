// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://manpuc.me',
  integrations: [react(), sitemap()],
  adapter: vercel(),
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('@fontsource')) {
              return 'fonts';
            }
          }
        }
      }
    }
  }
});
