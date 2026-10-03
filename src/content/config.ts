import { defineCollection, z } from 'astro:content';

// Définition de la collection des projets BTS SIO avec validation Zod stricte
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['réalisé', 'en cours', 'à venir']),
    category: z.enum(['scolaire', 'professionnel', 'freelance']),
    dateStart: z.string(),
    dateEnd: z.string(),
    tags: z.array(z.string()),
    demoUrl: z.string().optional().default(''),
    repoUrl: z.string().optional().default(''),
    thumbnail: z.string(),
    featured: z.boolean().default(false),
  }),
});

// Définition de la collection des données statiques JSON (profil, compétences, parcours)
const data = defineCollection({
  type: 'data',
  schema: z.record(z.any()),
});

// Exportation des collections reconnues par Astro
export const collections = {
  projects,
  data,
};
