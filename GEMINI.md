# Instructions du Projet & Charte Graphique du Portfolio BTS SIO SLAM

## 1. Contexte du Projet & Profil
- **Titulaire :** Quentin Machu — Étudiant en BTS SIO (Option SLAM) auprès du CNED.
- **Objectifs :** Support officiel pour l'oral de l'Épreuve E4 (Bloc 1) et recherche de stage de développement logiciel (Mai-Août 2027).
- **Philosophie :** Approche de gestionnaire de projet, entrepreneur et futur manager. Rigueur technique, clarté pédagogique et design exécutif B2B.

---

## 2. Charte Graphique Officielle (Design System Monochrome Mat & Titane)
> **Règle absolue :** Ne jamais réintroduire de bleu vif ou saturé (`blue-600`, `blue-500`, etc.). Toute nouvelle interface ou composant doit respecter strictement cette charte monochrome haut de gamme.

### Palette de Couleurs
| Rôle | Teinte & Code HEX | Classes Tailwind Recommandées |
| :--- | :--- | :--- |
| **Barre Latérale (Sidebar)** | Anthracite Mat (`#18181B`) | `bg-[#18181B]` |
| **Bordures Sidebar** | Titane Foncé (`#27272A`) | `border-[#27272A]` |
| **Onglet Actif Sidebar** | Capsule Blanc Pur (`#FFFFFF`) | `bg-white text-zinc-950 font-semibold shadow-sm` |
| **Icône Onglet Actif** | Noir Mat (`#09090B`) | `text-zinc-950` (verrouillé contre le survol blanc) |
| **Fond Principal (Page)** | Studio Neutre (`#FAFAFA`) | `bg-[#FAFAFA]` ou `bg-slate-50` |
| **Cartes & Conteneurs** | Blanc Pur (`#FFFFFF`) | `bg-white border border-slate-200 shadow-card` |
| **Boutons Principaux (CTA)** | Noir Mat Profond (`#09090B`) | `bg-zinc-900 hover:bg-black text-white` |
| **Boutons Secondaires** | Blanc épuré bordé | `bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200` |
| **Pastilles & Badges** | Gris Titane Feutré | `bg-zinc-100 text-zinc-800 border border-zinc-200` |
| **Surbrillance Texte** | Noir Mat avec texte blanc | `selection:bg-zinc-900 selection:text-white` |
| **Statut Disponibilité** | Émeraude fonctionnel | `bg-emerald-500` (point clignotant discret) |

---

## 3. Règles d'Architecture & Code
- **Framework :** Astro 4 + Tailwind CSS + Lucide Icons.
- **Commentaires :** Rédigés obligatoirement en français.
- **Robustesse :** Toute nouvelle page doit compiler proprement (`npm run build`) avec 0 erreur.
