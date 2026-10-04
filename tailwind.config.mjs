/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Palette officielle "Graphite & Titane" (Option 2)
        graphite: {
          DEFAULT: '#18181B', // Anthracite pur mat (Zinc 900)
          light: '#27272A',   // Titane intermédiaire (Zinc 800)
          dark: '#09090B',    // Noir graphite absolu (Zinc 950)
          border: '#27272A',  // Bordure titane soignée
        },
        // Rétrocompatibilité pour midnight
        midnight: {
          DEFAULT: '#18181B',
          light: '#27272A',
          dark: '#09090B',
          border: '#27272A',
        },
        // Fond et bordures de base
        ice: {
          DEFAULT: '#FAFAFA', // Fond de page principal (Zinc 50 studio épuré)
          card: '#FFFFFF',    // Fond blanc pur des cartes
          border: '#E4E4E7',  // Micro-bordure titane clair
        },
      },
      fontFamily: {
        // Police fluide pour le corps de texte et les composants
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        // Police massive, épaisse et charismatique pour les titres H1-H4
        title: ['"Montserrat"', 'system-ui', 'sans-serif'],
        display: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(9, 13, 22, 0.04)',
        card: '0 1px 3px 0 rgba(9, 13, 22, 0.05), 0 1px 2px -1px rgba(9, 13, 22, 0.05)',
        // Ombre portée au survol feutrée et monochrome (zéro reflet bleu)
        'card-hover': '0 12px 28px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
