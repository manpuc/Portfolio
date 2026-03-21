import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import critters from 'astro-critters';
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
  site: 'https://manpuc.me',
  integrations: [react(), sitemap(), critters()],

  vite: {
    css: {
      postcss: {
        plugins: []
      },
      preprocessorOptions: {
        scss: {}
      }
    },
    build: {
      cssCodeSplit: true,
      cssMinify: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            'layout': ['src/layouts/Layout.astro']
          }
        }
      }
    }
  },
  build: {
    format: 'file'
  },
  image: {
    domains: ['manpuc.me'],
    sizes: [400, 800]
  },
  compressHTML: true,
  adapter: vercel({
    entrypointResolution: 'auto'
  })

});
