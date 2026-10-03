---
title: "Application de Gestion de Contacts Desktop"
status: "réalisé"
category: "scolaire"
dateStart: "2026-10-05"
dateEnd: "2026-11-20"
tags: ["Python", "SQLite", "Tkinter", "Git", "Clean Architecture"]
demoUrl: ""
repoUrl: "https://github.com/Mct-Midnight/contacts-manager-desktop"
thumbnail: "/assets/images/projets/contacts-app.png"
featured: true
---

# Application de Gestion de Contacts Desktop

> **Synthèse en une phrase :** Solution logicielle locale développée en Python permettant l'organisation, le filtrage dynamique et la persistance relationnelle de répertoires de contacts professionnels.

---

## 1. Contexte & Besoins

### 1.1. Contexte organisationnel
- **Cadre du projet :** Atelier de programmation applicative de première année de BTS SIO SLAM (CNED).
- **Rôle tenu :** Développeur logiciel indépendant / Concepteur d'architecture.
- **Bénéficiaires ou utilisateurs cibles :** Utilisateurs en entreprise ou indépendants ayant besoin d'un carnet d'adresses sécurisé, accessible hors-ligne et rapide d'exécution.

### 1.2. Identification des besoins
- **Situation initiale :** Dispersion des informations de contacts professionnels sur des fichiers tableurs hétérogènes, entraînant des doublons, des risques de corruption et une recherche laborieuse.
- **Besoins exprimés :**
  - Centraliser les contacts au sein d'une base de données locale sécurisée.
  - Proposer une interface utilisateur intuitive permettant l'ajout, la modification, la suppression et la recherche en temps réel.
  - Offrir une fonctionnalité d'exportation au format standard (CSV / JSON) pour la sauvegarde.
- **Contraintes du projet :**
  - **Techniques :** Absence de serveur distant obligatoire (fonctionnement 100 % autonome sur poste client), compatibilité Windows/Linux.
  - **Sécurité & Données :** Validation stricte des formats de saisie (adresses email normalisées, numéros de téléphone) et absence de fuite mémoire.
  - **Réglementaires :** Respect des principes minimaux de protection des données personnelles (conservation locale et suppression définitive sur demande).

---

## 2. Problématiques Techniques

### 2.1. Problématique centrale de conception
*Comment concevoir une application de bureau modulaire isolant strictement la logique métier (CRUD) de l'interface graphique utilisateur tout en garantissant des temps de réponse instantanés sur une base locale ?*

### 2.2. Spécifications & Exigences clés
- **Séparation des responsabilités :** Découpage strict selon le modèle architectural MVC (Modèle - Vue - Contrôleur).
- **Fiabilité transactionnelle :** Utilisation de transactions SQL sécurisées avec requêtes préparées pour prévenir toute injection de caractères spéciaux ou corruption de fichier.
- **Gestion des événements asynchrones :** Rafraîchissement automatique de la liste des contacts sans blocage du thread principal de l'interface lors de la saisie de filtres.

---

## 3. Solutions Apportées & Démarche d'Ingénierie

### 3.1. Architecture logicielle & Choix technologiques
- **Langage de programmation :** Python 3 (stabilité, lisibilité et richesse de la bibliothèque standard).
- **Persistance :** SGBD relationnel intégré SQLite (aucun déploiement de service tiers requis, transactions ACID garanties).
- **Interface graphique :** Tkinter / CustomTkinter pour un rendu moderne, sobre et responsive sous environnement de bureau.
- **Découpage modulaire :**
  - `models/` : Entités métier `Contact` et couche d'accès aux données (DAO / Repository).
  - `views/` : Composants visuels, fenêtres modales de formulaire et tableaux de visualisation.
  - `controllers/` : Coordination des flux, validation métier et déclenchement des actions.

### 3.2. Méthodologie et suivi des développements
- Suivi du projet avec un tableau Kanban structuré en colonnes (*À faire*, *En cours*, *Testé*, *Terminé*).
- Historique de versions sous Git avec commits atomiques et respect de la convention *Conventional Commits* (`feat:`, `fix:`, `refactor:`, `docs:`).

### 3.3. Défis rencontrés & Résolutions documentées
1. **Obstacle technique n°1 : Verrouillage de la base de données lors d'accès simultanés.**  
   - *Diagnostic :* Lors d'une tentative d'exportation simultanée à une modification, SQLite renvoyait une erreur `database is locked`.  
   - *Solution :* Implémentation du pattern *Unit of Work* avec gestionnaires de contexte Python (`with sqlite3.connect(...) as conn:`) garantissant la fermeture et la libération immédiate des verrous.
2. **Obstacle technique n°2 : Latence visuelle lors du filtrage en temps réel sur de larges volumes.**  
   - *Diagnostic :* Chaque frappe au clavier déclenchait une requête `LIKE` complète sur l'ensemble de la table sans optimisation.  
   - *Solution :* Ajout d'index B-Tree sur les colonnes `nom` et `email`, couplé à un mécanisme de debouncing (délai de 150 ms après la dernière frappe avant exécution de la recherche).

---

## 4. Captures d'Écran, Maquettes & Schémas

| Vue Principale — Liste & Filtrage | Formulaire d'Édition d'un Contact |
| :-------------------------------: | :--------------------------------: |
| ![Liste des contacts](/assets/images/projets/contacts-list.png) | ![Édition contact](/assets/images/projets/contacts-form.png) |
| *Interface principale avec barre de recherche dynamique et tableau* | *Fenêtre modale avec validation des champs en temps réel* |

| Modèle Physique des Données (SQLite) | Architecture Modulaire MVC |
| :-----------------------------------: | :-------------------------: |
| ![MCD Contacts](/assets/images/projets/contacts-mcd.png) | ![Schéma MVC](/assets/images/projets/contacts-mvc.png) |
| *Schéma de la table contacts avec contraintes d'unicité et index* | *Diagramme de packages illustrant l'isolation des couches* |

---

## 5. Résultats Obtenus & Métriques

- **Livrables fonctionnels :** Fichier exécutable autonome et code source documenté respectant la PEP 8.
- **Indicateurs de performance :**
  - Temps de chargement au démarrage : `< 250 ms`.
  - Temps d'exécution du filtrage sur 1 000 contacts : `< 15 ms`.
  - Couverture des tests unitaires sur la couche modèle : `92 %` (tests `pytest`).
- **Ressources & Documentation :**
  - [Code source sur GitHub](https://github.com/Mct-Midnight/contacts-manager-desktop)
  - [Guide d'installation et manuel utilisateur](https://github.com/Mct-Midnight/contacts-manager-desktop#readme)

---

## 6. Tableau de Correspondance & Justifications — Bloc 1 (Épreuve E4)

| Compétence Officielle Bloc 1 | Mobilisée | Sous-compétence(s) visée(s) |
| :--- | :---: | :--- |
| **B1.1 — Gérer le patrimoine informatique** | [x] | **B1.1.2** Normes et bonnes pratiques / **B1.1.5** Sauvegardes |
| **B1.2 — Répondre aux incidents et demandes** | [ ] | Non mobilisée directement sur cette version initiale |
| **B1.3 — Développer la présence en ligne** | [ ] | Application de bureau locale (non exposée en ligne) |
| **B1.4 — Travailler en mode projet** | [x] | **B1.4.1** Objectifs et organisation / **B1.4.2** Planification |
| **B1.5 — Mettre à disposition un service** | [ ] | Déploiement local prévu en version ultérieure |
| **B1.6 — Organiser son développement pro** | [ ] | Non retenue prioritairement pour cette fiche |

### Justifications Détaillées des Compétences Cochées

#### Justification B1.1 — Gérer le patrimoine informatique
- **Sous-compétences mobilisées :** `B1.1.2` (Exploiter des référentiels, normes et jeux de bonnes pratiques) et `B1.1.5` (Gérer des sauvegardes).
- **Démonstration concrète :** Application rigoureuse des standards de codage Python (PEP 8) et de typage strict (*type hints*). Mise en œuvre d'une routine de sauvegarde intégrée permettant l'exportation horodatée et la restauration de la base SQLite, prévenant toute perte irrémédiable de données en cas d'incident matériel.

#### Justification B1.4 — Travailler en mode projet
- **Sous-compétences mobilisées :** `B1.4.1` (Analyser les objectifs et les modalités d'organisation d'un projet) et `B1.4.2` (Planifier les activités).
- **Démonstration concrète :** Cadrage initial des besoins via une spécification fonctionnelle succincte découpée en user stories. Planification et suivi de l'avancement technique sur un tableau Kanban GitHub Projects, avec gestion des versions par jalons (milestones `v0.1-alpha` à `v1.0-stable`).
