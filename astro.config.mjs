import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';


export default defineConfig({
  site: 'https://manpuc.me',
  integrations: [react(), sitemap()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {}
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            layout: ['./src/layouts/Layout.astro']
          }
        }
      }
    }
  },
    build: {
    format: 'file'
  },
  adapter: vercel({
    entrypointResolution: 'auto'
  })
});
