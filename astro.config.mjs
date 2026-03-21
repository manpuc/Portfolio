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
        plugins: process.env.NODE_ENV === 'production' ? [
          purgecss({
            content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
            safelist: {
              standard: [
                /^astro-/, /^back-/, /^text-/, /^work-/, /^txt-/, /^rand-/, /^bg-/, /^p-/, /^contact-/, /^btn-/, /icon/, /reveal/, /theme-toggle/,
                'dark', 'light', 'en-mode', 'visible', 'absorbed', 'tag', 'tags', 'container', 'site-footer', 'skills-grid', 'skill-item'
              ],
              deep: [/^astro-/, /^back-/]
            },
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          })
        ] : []
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
