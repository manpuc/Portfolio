import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import critters from 'astro-critters';
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
  site: 'https://manpuc.me',
  integrations: [react(), critters({
    preload: 'swap',
    pruneSource: false,
    logLevel: 'warn'
  })],
  adapter: vercel({
    entrypointResolution: 'auto'
  }),
  vite: {
    css: {
      postcss: {
        plugins: [
          process.env.NODE_ENV === 'production' ? purgecss({
            content: ['./src/**/*.astro', './src/**/*.tsx', './src/**/*.ts', './src/**/*.js'],
            safelist: {
              standard: [
                /^astro-/, /^back-/, /^text-/, /^work-/, /^txt-/, /^rand-/, /^bg-/, /^p-/, /^contact-/, /^btn-/, /icon/, /reveal/, /theme-toggle/,
                'dark', 'light', 'en-mode', 'visible', 'absorbed', 'container', 'site-footer', 'skills-grid', 'skill-item',
                /tag/, /work/, /no-link/
              ],
              deep: [/^astro-/, /^back-/, /tag/, /work/, /no-link/]
            },
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          }) : null
        ].filter(Boolean)
      },
      preprocessorOptions: {
        scss: {}
      }
    },
  }
});
