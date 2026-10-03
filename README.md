# Portfolio Professionnel — BTS SIO Option SLAM (CNED)

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

### Commandes usuelles :

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement local
npm run dev

# Compiler le site statique pour la production
npm run build

# Prévisualiser la version de production en local
npm run preview
```
