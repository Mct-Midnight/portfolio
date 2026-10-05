import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Configuration principale d'Astro avec Tailwind CSS et génération automatique du Sitemap
export default defineConfig({
  site: 'https://quentin-machu-portfolio.vercel.app',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});

