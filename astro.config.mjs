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
        scss: {}  // SCSSを使いたい場合
      }
    },
    build: {
      cssCodeSplit: true  // ページごとにCSS分割（重要）
    }
  },
  adapter: vercel({
    entrypointResolution: 'auto'
  })
});
