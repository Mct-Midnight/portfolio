# Portfolio Professionnel — BTS SIO Option SLAM (CNED)

[![Contrôle Qualité & CI](https://github.com/Mct-Midnight/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Mct-Midnight/portfolio/actions/workflows/ci.yml)
[![Astro v5](https://img.shields.io/badge/Astro-v5-18181B?logo=astro&logoColor=white&style=flat-square)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5-18181B?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-18181B?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![BTS SIO SLAM](https://img.shields.io/badge/%C3%89preuve_E4-BTS_SIO_SLAM-18181B?style=flat-square)](docs/REFERENTIEL_BLOC_1.md)

Bienvenue sur le dépôt du portfolio professionnel conçu pour la préparation et la validation du **BTS SIO (Services Informatiques aux Organisations)**, spécialité **SLAM (Solutions Logicielles et Applications Métiers)**, suivi à distance via le **CNED**.

Ce projet respecte une séparation stricte entre les **spécifications de design UI/UX**, les **contenus éditoriaux Markdown**, les **ressources graphiques** et la **future couche d'intégration web**.

---

## 🎯 Finalité du Dépôt

1. **Validation Académique — Épreuve E4 (Bloc 1) :**
   - Servir de support officiel pour l'oral de l'épreuve _Support et mise à disposition de services informatiques_.
   - Justifier l'acquisition des compétences officielles du Bloc 1 à travers des réalisations concrètes (ateliers de professionnalisation et projets personnels/professionnels).
2. **Recherche de Stage SLAM 2027 :**
   - Présenter une candidature soignée et convaincante pour le **stage de 1re année (4 à 5 semaines, mai à août 2027)**.
   - Mettre en valeur une double approche : maîtrise de l'ingénierie logicielle (architecture, clean code, BDD) et vision orientée gestion de projet / entrepreneuriat.

---

## 🎨 Direction Artistique & Expérience Utilisateur (UI/UX)

Le design est inspiré d'une maquette de référence validée par le CNED :

- **Architecture Dual-Pane :**
  - Volet gauche fixe (Sidebar ~260px) : fond sombre élégant _Espresso_ (`#1E1B18`), photo de profil, identité, navigation verticale avec icônes.
  - Volet droit dynamique : fond clair doux _Crème chaud_ (`#F8F7F4`), typographie moderne sans-serif (_Inter / Poppins_), surtitres en capitales couleur d'accent _Terracotta_ (`#D95A2B`).
- **Composants clés :**
  - Grille de compétences sous forme de cartes carrées blanches avec logos officiels centrés (aucune barre de pourcentage arbitraire).
  - Bannières de certifications avec badge "Obtenue" en vert pastel (`#D1FAE5`).
  - Grille de projets à 3 colonnes avec filtres scolaires/professionnels et badges de statut (`réalisé`, `en cours`, `à venir`).
  - Section Contact en deux colonnes équilibrées (coordonnées directes et formulaire).

---

## 📁 Architecture du Projet

```text
Portfolio/
├── docs/                             # Spécifications techniques, charte et référentiels
│   ├── CAHIER_DES_CHARGES.md         # Cahier des charges exhaustif & spécifications UI/UX
│   ├── REFERENTIEL_BLOC_1.md         # Grille officielle et checklist d'évaluation Épreuve E4
│   └── TEMPLATE_FICHE_PROJET.md      # Gabarit Markdown type pour rédiger une étude de cas
├── public/                           # Fichiers servis publiquement à la racine du serveur
│   └── docs/                         # Emplacement dédié au CV au format PDF
├── src/                              # Ressources et contenus éditoriaux
│   ├── assets/                       # Fichiers multimédias
│   │   ├── icons/                    # Logos officiels des technologies (Devicon / Lucide)
│   │   └── images/                   # Captures d'écran, schémas et photos
│   └── content/                      # Données de contenu
│       ├── data/                     # Fichiers de données structurées (profil, compétences)
│       └── projects/                 # Fiches projets individuelles rédigées en Markdown
├── .gitignore                        # Règles d'exclusion des dépendances, builds et secrets
└── README.md                         # Documentation générale du projet
```

---

## 🛠️ Méthodologie de Mise à Jour du Dépôt

Pour alimenter et maintenir le portfolio de manière rigoureuse durant les deux années de formation, suivre ce protocole :

### 1. Ajouter un nouveau projet

1. Dupliquer le modèle [docs/TEMPLATE_FICHE_PROJET.md](file:///c:/Users/Happy/Desktop/Portfolio/docs/TEMPLATE_FICHE_PROJET.md).
2. Nommer le fichier dans `src/content/projects/` selon la convention : `YYYY-MM-nom-du-projet.md`.
3. Renseigner le frontmatter YAML (titre, statut, catégorie, tags, thumbnail, dépôts).
4. Rédiger les 6 sections d'analyse en excluant formellement tout texte généré par IA pour l'analyse métier.
5. Déposer les captures d'écran et schémas d'architecture dans `src/assets/images/projets/`.
6. Mettre à jour la matrice récapitulative dans [docs/REFERENTIEL_BLOC_1.md](file:///c:/Users/Happy/Desktop/Portfolio/docs/REFERENTIEL_BLOC_1.md).

### 2. Mettre à jour les compétences ou certifications

1. Ajouter les logos vectoriels requis au format SVG dans `src/assets/icons/`.
2. Mettre à jour les données structurées dans `src/content/data/`.
3. Consigner l'attestation ou preuve d'obtention pour chaque nouvelle certification.

### 3. Actualiser le CV

1. Exporter le CV au format PDF normé (ex: `CV_Prenom_Nom_BTS_SIO.pdf`).
2. Remplacer le fichier dans `public/docs/`.

---

## ⚡ Stack Technique & Commandes

- **Générateur Statique :** [Astro 5](https://astro.build/)
- **Design & Styles :** [Tailwind CSS 3.4](https://tailwindcss.com/) avec tokens officiels
- **Icônes :** `@lucide/astro` et Devicon CDN
- **Gestion de contenu :** Content Collections Astro avec validation Zod
- **Qualité & CI/CD :** Pipeline GitHub Actions avec audit d'intégrité automatisé

### Commandes usuelles :

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement local
npm run dev

# Exécuter la suite complète de contrôle qualité (audit d'intégrité + build Astro)
npm test

# Compiler le site statique pour la production
npm run build

# Prévisualiser la version de production en local
npm run preview
```

---

## 🛡️ Assurance Qualité & Tests Automatisés (CI/CD)

Afin de garantir une fiabilité totale aux recruteurs ainsi qu'au jury de l'Épreuve E4, le projet adopte une véritable démarche professionnelle de **qualité logicielle continue (DevOps)** :

### 1. La suite de validation locale (`npm test`)
La commande `npm test` orchestre trois niveaux d'exigence avant toute livraison :
- **Audit d'intégrité physique (`scripts/audit-qualite.mjs`) :**
  - **Documents vitaux :** Contrôle de la présence et de la non-vacuité des pièces officielles obligatoires (CV au format PDF dans `public/docs/`, cahier des charges, référentiel de compétences Bloc 1, gabarit de fiche projet, `robots.txt` et favicon).
  - **Données structurées :** Vérification syntaxique stricte des fichiers JSON (`profile.json`, `skills.json`, `timeline.json`).
  - **Validation des médias Markdown :** Analyse de chaque fiche projet Markdown (`src/content/projects/*.md`) pour s'assurer que chaque visuel référencé existe réellement sur le disque.
- **Validation Zod & Compilation de production (`astro build`) :**
  - Contrôle des types et des schémas de données stricts via **Zod** (champs obligatoires, statuts autorisés, URLs valides).
  - Compilation statique intégrale de l'ensemble des pages HTML dans `dist/`.
- **Vérificateur automatique de liens internes (`scripts/verifier-liens.mjs` ou `npm run check:links`) :**
  - **Routes internes :** Contrôle de chaque lien `<a href="/...">` vers une page HTML réelle.
  - **Ancres intra et inter-pages :** Vérification que chaque ancre (ex: `#projets`, `#competences`, `#contact`) pointe vers un identifiant `id` existant dans la page cible.
  - **Ressources statiques :** Contrôle physique des liens de téléchargement (CV PDF, documents).
  - **Filtrage propre :** Exclusion des liens externes (`http://`, `https://`), emails (`mailto:`) et numéros de téléphone (`tel:`).

### 2. Déclenchement automatique (Pipeline GitHub Actions)
- À chaque livraison (`git push`) ou Pull Request sur la branche principale `main`, le pipeline automatisé [`.github/workflows/ci.yml`](.github/workflows/ci.yml) se déclenche sur un environnement Linux propre.
- Il configure Node.js 20 LTS, procède à une installation déterministe (`npm ci`) et exécute automatiquement la commande `npm test`.
- **Garantie de non-régression :** Si un document est absent, un lien d'image manquant ou une donnée mal renseignée, le pipeline échoue immédiatement et bloque la mise en ligne. Le badge de statut officiel en tête de ce dépôt garantit ainsi en permanence la conformité et l'intégrité du portfolio.
