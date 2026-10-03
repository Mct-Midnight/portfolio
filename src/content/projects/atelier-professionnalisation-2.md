---
title: "Atelier Professionnel n°2 — Évolution d'un Service en Ligne"
status: "en cours"
category: "scolaire"
dateStart: "2027-01-10"
dateEnd: "2027-03-01"
tags: ["PHP", "PostgreSQL", "JavaScript", "HTML5/CSS3", "Git"]
demoUrl: ""
repoUrl: "https://github.com/Mct-Midnight/ap2-service-en-ligne"
thumbnail: "/assets/images/projets/aerial-desk.jpg"
featured: true
---

# Atelier Professionnel n°2 — Évolution d'un Service en Ligne

> **Synthèse en une phrase :** Modernisation fonctionnelle et refonte architecturale d'un portail web de gestion des demandes internes, incluant le traitement des incidents applicatifs et l'exposition dynamique des données métiers.

---

## 1. Contexte & Besoins

### 1.1. Contexte organisationnel
- **Cadre du projet :** Deuxième Atelier de Professionnalisation (AP2) encadré par le CNED pour le BTS SIO SLAM.
- **Rôle tenu :** Développeur web full-stack / Analyste technique junior.
- **Bénéficiaires ou utilisateurs cibles :** Salariés d'une organisation souhaitant formuler des demandes d'intervention, et techniciens du service informatique chargés de leur traitement.

### 1.2. Identification des besoins
- **Situation initiale :** Portail web vieillissant codé en PHP procédural non sécurisé, présentant des failles de sécurité, des temps de réponse dégradés et une absence d'interface mobile.
- **Besoins exprimés :**
  - Refondre l'architecture applicative selon un modèle orienté objet (POO / MVC).
  - Intégrer un module interactif de suivi du cycle de vie des demandes d'assistance (statuts : *Reçue*, *En cours*, *Résolue*, *Clôturée*).
  - Améliorer la visibilité des indicateurs de service grâce à un tableau de bord statistique synthétique.
- **Contraintes du projet :**
  - **Techniques :** Utilisation d'un SGBD relationnel robuste (PostgreSQL), compatibilité multi-navigateurs.
  - **Sécurité :** Contrôle strict des habilitations (espace utilisateur vs espace administrateur), prévention des attaques XSS et CSRF.
  - **Méthodologiques :** Respect du calendrier des livrables de l'atelier CNED et traçabilité des tickets de maintenance.

---

## 2. Problématiques Techniques

### 2.1. Problématique centrale de conception
*Comment restructurer un service web historique sans rupture de service pour les utilisateurs tout en intégrant un système temps réel de gestion des demandes conforme aux normes de sécurité OWASP ?*

### 2.2. Spécifications & Exigences clés
- **Conformité des flux de requêtes :** Sanitisation et validation rigoureuse des entrées utilisateurs via des formulaires sécurisés (tokens CSRF systématiques).
- **Modélisation de données évolutive :** Refonte du schéma relationnel sous PostgreSQL avec gestion fine des clés étrangères, déclencheurs (*triggers*) d'horodatage et contraintes d'intégrité.
- **Accessibilité & Ergonomie :** Interface responsive respectant les critères d'accessibilité numérique de base et assurant une lisibilité optimale sur écran mobile.

---

## 3. Solutions Apportées & Démarche d'Ingénierie

### 3.1. Architecture logicielle & Choix technologiques
- **Architecture applicative :** Modèle MVC avec routeur centralisé, contrôleurs découplés et gestion des vues par gabarits.
- **Back-end :** PHP 8 orienté objet avec gestion des espaces de noms (*namespaces*) et injection des dépendances pour la connexion BDD (PDO).
- **Base de données :** PostgreSQL 16 (fiabilité sur les requêtes complexes et support natif du format JSONB pour les journaux d'audit).
- **Front-end :** HTML5 sémantique, CSS moderne (Flexbox/Grid) et JavaScript asynchrone (Fetch API) pour la validation dynamique des formulaires sans rechargement de page.

### 3.2. Méthodologie et suivi des développements
- Gestion des évolutions par le biais d'un système de tickets de demandes (Issues GitHub).
- Découpage par itérations : Itération 1 (Refonte du socle de données & authentification), Itération 2 (Module de demandes), Itération 3 (Dashboard statistique).

### 3.3. Défis rencontrés & Résolutions documentées
1. **Obstacle technique n°1 : Traitement des pièces jointes associées aux demandes d'assistance.**  
   - *Diagnostic :* Risque critique d'injection de scripts malveillants via le téléchargement de fichiers non contrôlés.  
   - *Solution :* Vérification du type MIME réel côté serveur, renommage avec un identifiant aléatoire (UUID), stockage hors de la racine web publique et limitation de taille à 5 Mo.
2. **Obstacle technique n°2 : Gestion concurrente de l'attribution des tickets.**  
   - *Diagnostic :* Possibilité que deux techniciens s'assignent la même demande d'incident au même instant.  
   - *Solution :* Utilisation de verrous pessimistes au niveau de PostgreSQL (`SELECT ... FOR UPDATE`) lors du changement d'état d'un ticket.

---

## 4. Captures d'Écran, Maquettes & Schémas

| Portail de Demandes d'Assistance | Tableau de Bord Administrateur |
| :------------------------------: | :----------------------------: |
| ![Interface Demandes](/assets/images/projets/ap2-tickets.png) | ![Tableau de bord](/assets/images/projets/ap2-dashboard.png) |
| *Formulaire de création de ticket avec sélecteur de criticité* | *Vue synthétique des indicateurs de traitement des incidents* |

| Modèle Conceptuel des Données (MCD) | Diagramme de Cas d'Utilisation UML |
| :---------------------------------: | :--------------------------------: |
| ![MCD AP2](/assets/images/projets/ap2-mcd.png) | ![Use Case UML](/assets/images/projets/ap2-usecase.png) |
| *Relations entre Utilisateurs, Rôles, Tickets et Historique* | *Acteurs (Salarié, Technicien, Responsable) et actions associées* |

---

## 5. Résultats Obtenus & Métriques

- **Livrables intermédiaires :** Socle de base de données validé, modules d'authentification et de soumission de tickets opérationnels en environnement de développement local.
- **Indicateurs de conformité :**
  - Zéro anomalie de sécurité critique détectée lors de l'audit statique.
  - Temps de chargement des pages : `< 350 ms`.
- **Ressources & Documentation :**
  - [Dépôt GitHub du projet](https://github.com/Mct-Midnight/ap2-service-en-ligne)
  - [Dossier technique de spécifications d'évolution](https://github.com/Mct-Midnight/ap2-service-en-ligne/blob/main/docs/cahier-des-charges.md)

---

## 6. Tableau de Correspondance & Justifications — Bloc 1 (Épreuve E4)

| Compétence Officielle Bloc 1 | Mobilisée | Sous-compétence(s) visée(s) |
| :--- | :---: | :--- |
| **B1.1 — Gérer le patrimoine informatique** | [ ] | Non prioritaire sur cette étape |
| **B1.2 — Répondre aux incidents et demandes** | [x] | **B1.2.1** Collecter/suivre demandes / **B1.2.3** Traitement applicatif |
| **B1.3 — Développer la présence en ligne** | [x] | **B1.3.1** Valorisation de l'image / **B1.3.3** Évolution de site web |
| **B1.4 — Travailler en mode projet** | [ ] | Phase d'évaluation en cours |
| **B1.5 — Mettre à disposition un service** | [ ] | Déploiement prévu en phase finale de l'atelier |
| **B1.6 — Organiser son développement pro** | [ ] | Référencé globalement dans le bilan de formation |

### Justifications Détaillées des Compétences Cochées

#### Justification B1.2 — Répondre aux incidents et aux demandes d'assistance et d'évolution
- **Sous-compétences mobilisées :** `B1.2.1` (Collecter, suivre et orienter des demandes) et `B1.2.3` (Traiter des demandes concernant les applications).
- **Démonstration concrète :** Conception et programmation complète du module de ticketing applicatif permettant aux utilisateurs de formuler des incidents classifiés selon leur degré d'urgence. Diagnostic et correction de dysfonctionnements historiques sur les scripts de calcul de délais de résolution dans l'application legacy.

#### Justification B1.3 — Développer la présence en ligne de l'organisation
- **Sous-compétences mobilisées :** `B1.3.1` (Participer à la valorisation de l'image de l'organisation sur les médias numériques) et `B1.3.3` (Participer à l'évolution d'un site Web exploitant les données de l'organisation).
- **Démonstration concrète :** Modernisation visuelle du portail respectant la charte graphique et garantissant la protection des données personnelles (RGPD, mentions obligatoires). Intégration d'un flux de données dynamique connecté à la base PostgreSQL pour restituer en temps réel l'état d'avancement des demandes de chaque collaborateur.
