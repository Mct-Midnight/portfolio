import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Configuration principale d'Astro avec intégration Tailwind CSS
export default defineConfig({
  site: 'https://mct-midnight.github.io',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
