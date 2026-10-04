---
title: "Portfolio Professionnel & Plateforme E4"
status: "réalisé"
category: "professionnel"
dateStart: "2026-09-01"
dateEnd: "2026-10-04"
tags: ["Astro 4", "Tailwind CSS", "TypeScript", "CI/CD GitHub Actions", "SEO & Performance", "Gestion de Projet"]
demoUrl: ""
repoUrl: "https://github.com/Mct-Midnight/portfolio"
thumbnail: "/assets/images/projets/portfolio-cover.png"
featured: true
---

# Portfolio Professionnel & Plateforme E4

> **Synthèse en une phrase :** Conception, développement et déploiement continu d'une plateforme web statique haute performance servant de support officiel à l'épreuve E4 et de vitrine professionnelle pour la recherche de stage.

---

## 1. Contexte & Besoins

### 1.1. Contexte organisationnel
- **Cadre du projet :** Projet personnel et professionnel d'ingénierie logicielle web mené dans le cadre du BTS SIO SLAM (CNED).
- **Rôle tenu :** Chef de projet, Lead Développeur Front-End & Intégrateur UI/UX.
- **Bénéficiaires ou utilisateurs cibles :**
  - **Membres du jury d'examen :** Évaluation des compétences du Bloc 1 (Épreuve E4) lors de l'oral officiel.
  - **Recruteurs & Responsables techniques :** Sélection du profil pour le stage de développement logiciel (mai-août 2027).
  - **Partenaires & Clients :** Découverte de l'écosystème entrepreneurial et des solutions numériques développées.

### 1.2. Identification des besoins
- **Situation initiale :** Les solutions génériques clés en main (WordPress, Notion, templates fermés) imposent une lourdeur technique, un manque de personnalisation ergonomique et ne permettent pas de prouver la maîtrise concrète du code et du cycle de vie logiciel.
- **Besoins exprimés :**
  - Disposer d'une plateforme web sur-mesure, ultra-rapide et sécurisée par conception.
  - Adopter une direction artistique exécutif haut de gamme (charte monochrome mat et titane) rompant avec les designs d'étudiants conventionnels.
  - Intégrer un système de gestion de contenu statique typé pour les études de cas de projets et le journal de bord.
  - Offrir une navigation fluide à double volet (*Dual-Pane Layout*) facilitant la consultation en moins de 15 secondes.
- **Contraintes du projet :**
  - **Techniques :** Génération de sites statiques (SSG) sans JavaScript superflu côté client, score Lighthouse maximal, compatibilité mobile et gestionnaire de thème sombre natif.
  - **Réglementaires :** Conformité RGPD stricte (aucun traceur invasif sans consentement), rédaction de mentions légales exhaustives et respect des normes d'accessibilité du web.
  - **Méthodologiques :** Documentation rigoureuse (cahier des charges, grille référentielle Bloc 1), gestion de versions Git avec commits conventionnels atomiques et pipeline CI/CD automatisé.

---

## 2. Problématiques Techniques

### 2.1. Problématique centrale de conception
*Comment concevoir une plateforme web statique alliant une identité visuelle B2B rigoureuse, une architecture de données dynamique et typée, et une vitesse d'affichage instantanée tout en assurant une conformité parfaite aux critères de l'épreuve E4 ?*

### 2.2. Spécifications & Exigences clés
- **Architecture modulaire à composants :** Découpage granulaire des interfaces (Sidebar, Hero, Projects, Skills, Veille, Contact) garantissant maintenabilité et réutilisabilité.
- **Validation stricte des données (Content Collections) :** Typage et contrôle à la compilation de toutes les données du site (projets, profil, compétences, journal) via des schémas de validation Zod.
- **Performance & Zéro JS superflu :** Distribution du HTML pré-rendu au serveur avec hydratation sélective uniquement là où l'interactivité utilisateur est indispensable.
- **Contrôle qualité automatisé :** Implémentation d'un script Node.js dédié vérifiant l'intégrité des documents officiels (CV PDF, référentiel, fiches projets) avant tout déploiement.

---

## 3. Solutions Apportées & Démarche d'Ingénierie

### 3.1. Architecture logicielle & Choix technologiques
- **Framework applicatif :** **Astro 4**, sélectionné pour son modèle de rendu statique optimisé (Island Architecture) éliminant l'overhead des frameworks SPA traditionnels.
- **Framework de style :** **Tailwind CSS**, configuré selon une palette monochrome mat et titane (anthracite mat `#18181B`, bordures `#27272A`, studio neutre `#FAFAFA`).
- **Langage de développement :** **TypeScript**, garantissant un typage strict et prévenant les anomalies de manipulation des données dès la phase de compilation.
- **Automatisation & CI/CD :** Pipeline **GitHub Actions** automatisant la compilation statique et le déploiement sécurisé sur GitHub Pages à chaque commit sur la branche principale.

### 3.2. Méthodologie et suivi des développements
- Élaboration d'un cahier des charges fonctionnel et ergonomique complet (`CAHIER_DES_CHARGES.md`).
- Suivi du cycle de vie du projet via des commits atomiques formulés en français selon le standard *Conventional Commits*.
- Intégration d'un module d'extraction Git dynamique (`gitCommits.ts`) alimentant le journal de bord à partir de l'historique du dépôt.
- Déploiement d'un protocole d'audit qualité (`audit-qualite.mjs`) validant l'intégrité globale du build.

### 3.3. Défis rencontrés & Résolutions documentées

1. **Obstacle technique n°1 : Élimination du flash de thème non stylisé (FOUC) lors du rechargement.**  
   - *Diagnostic :* L'application asynchrone de la classe CSS du mode sombre par script externe provoquait un clignotement blanc désagréable avant l'application du thème utilisateur.  
   - *Solution :* Injection d'un micro-script bloquant et synchrone dans la balise `<head>` de `Layout.astro`, lisant `localStorage` et la préférence système `prefers-color-scheme` avant tout affichage graphique.

2. **Obstacle technique n°2 : Extraction fiable de l'historique Git sans dépasser les quotas API ni bloquer le build.**  
   - *Diagnostic :* Lors de builds fréquents, les appels directs à l'API GitHub risquaient d'atteindre le plafond de requêtes non authentifiées (rate limiting).  
   - *Solution :* Implémentation d'une stratégie de lecture locale directe de l'historique Git via le runtime Node.js avec bascule élégante (*fallback*) vers un cache local de secours.

---

## 4. Captures d'Écran, Maquettes & Schémas

| Disposition Double-Volet (Dual-Pane) | Architecture des Collections Typées |
| :----------------------------------: | :----------------------------------: |
| ![Disposition Dual-Pane](/assets/images/projets/portfolio-dualpane.png) | ![Architecture Astro](/assets/images/projets/portfolio-architecture.png) |
| *Interface bureau avec barre latérale fixe et volet de contenu dynamique* | *Structure modulaire découplant données Zod, composants et routes* |

| Pipeline de Déploiement Continu (CI/CD) | Audit de Performance Google Lighthouse |
| :-------------------------------------: | :-------------------------------------: |
| ![Pipeline CI/CD](/assets/images/projets/portfolio-cicd.png) | ![Performance Lighthouse](/assets/images/projets/portfolio-lighthouse.png) |
| *Workflow automatisé GitHub Actions (Build, Audit & Déploiement)* | *Métriques optimales : 100 % Performance, SEO et Accessibilité* |

---

## 5. Résultats Obtenus & Métriques

- **Livrables fonctionnels :**
  - Application web responsive déployée en production et accessible en ligne.
  - CV professionnel téléchargeable en un clic au format PDF conforme aux exigences académiques.
  - Page de mentions légales et politique de confidentialité conformes aux normes CNIL et RGPD.
  - Journal de bord interactif reflétant les évolutions techniques continues du projet.
- **Indicateurs de qualité logicielle :**
  - Score Google Lighthouse : **100 / 100** sur tous les critères (Performance, Accessibilité, Bonnes Pratiques, SEO).
  - Temps moyen de compilation statique : `< 5 secondes` pour l'ensemble des routes.
  - Zéro erreur TypeScript ou anomalie de linting.
- **Ressources & Documentation :**
  - [Code source sur GitHub](https://github.com/Mct-Midnight/portfolio)
  - [Cahier des charges complet (docs/CAHIER_DES_CHARGES.md)](https://github.com/Mct-Midnight/portfolio/blob/main/docs/CAHIER_DES_CHARGES.md)

---

## 6. Tableau de Correspondance & Justifications — Bloc 1 (Épreuve E4)

> *Matrice officielle des compétences du Bloc 1 mobilisées et justifiées pour la conception et l'exploitation de la plateforme web.*

| Compétence Officielle Bloc 1 | Mobilisée | Sous-compétence(s) visée(s) |
| :--- | :---: | :--- |
| **B1.1 — Gérer le patrimoine informatique** | [x] | B1.1.2 Exploitation de référentiels et normes / B1.1.5 Sauvegardes |
| **B1.2 — Répondre aux incidents et demandes** | [x] | B1.2.3 Traitement des demandes d'évolution applicatives |
| **B1.3 — Développer la présence en ligne** | [x] | B1.3.1 Image de marque & cadre juridique / B1.3.2 SEO / B1.3.3 Données |
| **B1.4 — Travailler en mode projet** | [x] | B1.4.1 Objectifs et cahier des charges / B1.4.2 Planification |
| **B1.5 — Mettre à disposition un service** | [x] | B1.5.1 Tests d'acceptation / B1.5.2 Déploiement continu |
| **B1.6 — Organiser son développement pro** | [x] | B1.6.1 Environnement d'apprentissage / B1.6.3 Gestion d'identité pro |

### Justifications Détaillées des Compétences Mobilisées

#### Justification B1.1 — Gérer le patrimoine informatique
- **Application de normes et référentiels (B1.1.2) :** Respect strict des standards du W3C pour le HTML sémantique, des recommandations de la CNIL pour la protection des données personnelles, et des conventions de code TypeScript et Tailwind CSS.
- **Sauvegardes et traçabilité (B1.1.5) :** Décentralisation de l'ensemble du patrimoine applicatif et documentaire sur un dépôt distant sécurisé GitHub avec historique immuable de chaque version.

#### Justification B1.2 — Répondre aux incidents et demandes d'évolution
- **Traitement des demandes d'évolution applicatives (B1.2.3) :** Itérations continues sur les composants UI, résolution des anomalies de rendu visuel (correction du clignotement de thème sombre, ajustements de contrastes) et intégration de nouvelles sections (journal de bord, filtres de projets).

#### Justification B1.3 — Développer la présence en ligne de l'organisation
- **Valorisation de l'image de marque et respect juridique (B1.3.1) :** Conception d'un design system cohérent monochrome mat et titane, intégration d'une page de mentions légales conforme aux exigences de la loi pour la confiance dans l'économie numérique (LCEN) et du RGPD.
- **Référencement et visibilité (B1.3.2) :** Implémentation complète des méta-balises Open Graph, balisage Schema.org, génération de sitemap XML et de fichier robots.txt garantissant une indexation optimale.
- **Exploitation dynamique des données (B1.3.3) :** Restitution structurée et filtrable des données professionnelles grâce aux collections Astro (projets en Markdown, compétences et timeline au format JSON).

#### Justification B1.4 — Travailler en mode projet
- **Cadrage et analyse des objectifs (B1.4.1) :** Rédaction d'un cahier des charges technique et ergonomique exhaustif définissant les cibles d'utilisateurs, les critères d'acceptation et les contraintes réglementaires.
- **Planification des activités (B1.4.2) :** Découpage du projet en jalons opérationnels, ordonnancement des développements par modules indépendants et suivi d'avancement documenté.

#### Justification B1.5 — Mettre à disposition des utilisateurs un service informatique
- **Tests d'intégration et d'acceptation (B1.5.1) :** Automatisation des vérifications de non-régression via des scripts d'audit d'intégrité et validation de la conformité du build de production (`astro build`).
- **Déploiement du service (B1.5.2) :** Automatisation de la chaîne de livraison continue via GitHub Actions assurant le déploiement instantané et sécurisé de la solution en environnement de production HTTPS.

#### Justification B1.6 — Organiser son développement professionnel
- **Environnement d'apprentissage personnel (B1.6.1) :** Appropriation d'une pile logicielle moderne (Astro 4, Tailwind CSS, TypeScript), veille active sur les outils de productivité et bancs d'essais technologiques.
- **Gestion de son identité professionnelle (B1.6.3) :** Centralisation et valorisation de l'ensemble de ses réalisations, de ses compétences et de sa démarche professionnelle au sein d'une vitrine numérique accessible et soignée.
