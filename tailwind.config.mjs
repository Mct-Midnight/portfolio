/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Nouvelle palette officielle "Midnight & Cobalt Vibrant"
        midnight: {
          DEFAULT: '#090D16', // Bleu Nuit encre profond
          light: '#131B2E',   // Bleu nuit intermédiaire
          dark: '#030712',    // Noir bleuté absolu
          border: '#1E293B',  // Bordure ardoise
        },
        cobalt: {
          DEFAULT: '#2563EB', // Bleu Cobalt électrique
          hover: '#1D4ED8',   // Bleu Cobalt soutenu au survol
          electric: '#3B82F6',// Bleu électrique lumineux
          light: '#EFF6FF',   // Bleu très clair pour fond des badges
          dark: '#1E40AF',    // Bleu foncé pour le texte des badges
        },
        ice: {
          DEFAULT: '#F8FAFC', // Fond de page principal (Slate 50)
          card: '#FFFFFF',    // Fond blanc pur des cartes
          border: '#E2E8F0',  // Micro-bordure ardoise fine
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
        'card-hover': '0 12px 28px -4px rgba(37, 99, 235, 0.12), 0 4px 8px -2px rgba(9, 13, 22, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
