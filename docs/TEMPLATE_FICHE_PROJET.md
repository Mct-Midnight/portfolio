---
title: "Nom de la Réalisation / Projet Métier"
status: "réalisé" # Valeurs acceptées : réalisé | en cours | à venir
category: "scolaire" # Valeurs acceptées : scolaire | professionnel
dateStart: "2026-11-01"
dateEnd: "2026-12-15"
tags: ["Python", "PostgreSQL", "Docker", "Git"]
demoUrl: "https://demo.mon-projet.fr" # Laisser vide si non disponible
repoUrl: "https://github.com/mon-compte/mon-projet"
thumbnail: "/assets/images/projets/mon-projet-cover.png"
featured: true
---

# Nom de la Réalisation / Projet Métier

> **Synthèse en une phrase :** Résumé clair et percutant de l'application, du public ciblé et du bénéfice métier concret apporté par la solution.

---

## 1. Contexte & Besoins

### 1.1. Contexte organisationnel
- **Cadre du projet :** Atelier de Professionnalisation (CNED) / Projet personnel d'apprentissage / Mission professionnelle réelle.
- **Rôle tenu :** Développeur applicatif SLAM / Concepteur logiciel / Référent technique.
- **Bénéficiaires ou utilisateurs cibles :** Utilisateurs finaux, administrateurs système, clients ou gestionnaires métiers.

### 1.2. Identification des besoins
- **Situation initiale :** Description des processus manuels, inefficacités ou dysfonctionnements observés.
- **Besoins exprimés :** Expression formelle des attentes fonctionnelles (gain de temps, fiabilisation des données, automatisation).
- **Contraintes du projet :**
  - **Temporelles :** Calendrier de réalisation, dates de livraison imposées.
  - **Techniques :** Environnement d'exécution imposé, dépendances, normes d'interopérabilité.
  - **Réglementaires :** Confidentialité, conformité au RGPD, intégrité des données stockées.

---

## 2. Problématiques Techniques

### 2.1. Problématique centrale de conception
*Quelle difficulté technique ou architecturale majeure a nécessité une réflexion d'ingénierie logicielle approfondie ?*  
Exemple : *Comment garantir la cohérence des transactions financières réparties tout en maintenant un temps de réponse inférieur à 200 ms lors de pics de charge ?*

### 2.2. Spécifications & Exigences clés
- **Sécurité applicative :** Protection contre les failles OWASP (injections SQL, failles XSS, protection CSRF, hachage fort des mots de passe avec bcrypt/Argon2).
- **Intégrité de la persistance :** Respect des contraintes d'intégrité référentielle en base de données relationnelle.
- **Gestion des rôles :** Cloisonnement strict des accès selon les privilèges utilisateurs (RBAC - Role-Based Access Control).

---

## 3. Solutions Apportées & Démarche d'Ingénierie

### 3.1. Architecture logicielle & Choix technologiques
- **Modélisation conceptuelle :** Schéma Relationnel / MCD Merise ou diagramme de classes UML.
- **Structure applicative :** Justification de l'architecture retenue (MVC, Clean Architecture, API REST découplée).
- **Pile technique (Stack) :**
  - Langage & runtime : Justification du choix.
  - Système de Gestion de Base de Données (SGBD) : Choix et paramétrage.
  - Outils de test et conteneurisation (ex. Docker).

### 3.2. Méthodologie et suivi des développements
- Découpage opérationnel des fonctionnalités en tâches unitaires (Kanban / Backlog agile).
- Stratégie de gestion de versions avec Git (branches fonctionnelles, revues de code, messages de commit conventionnels).

### 3.3. Défis rencontrés & Résolutions documentées
1. **Obstacle technique n°1 :**  
   - *Description de l'anomalie ou du blocage rencontré.*  
   - *Démarche de diagnostic méthodique.*  
   - *Solution technique implémentée et vérifiée.*
2. **Obstacle technique n°2 :**  
   - *Description de l'anomalie ou du blocage rencontré.*  
   - *Démarche de diagnostic méthodique.*  
   - *Solution technique implémentée et vérifiée.*

---

## 4. Captures d'Écran, Maquettes & Schémas

*(Remplacer les images par les fichiers réels situés dans `src/assets/images/projets/`)*

| Interface Principale / Dashboard | Vue Opérationnelle / Formulaire Métier |
| :------------------------------: | :------------------------------------: |
| ![Vue Dashboard](/assets/images/projets/screenshot-1.png) | ![Vue Métier](/assets/images/projets/screenshot-2.png) |
| *Légende technique détaillée du tableau de bord* | *Légende technique détaillée du formulaire* |

| Modélisation des Données (MCD / UML) | Architecture Système / Flux |
| :-----------------------------------: | :--------------------------: |
| ![Modélisation](/assets/images/projets/mcd-modele.png) | ![Architecture](/assets/images/projets/schema-infra.png) |
| *Diagramme conceptuel de la base de données* | *Flux de communication client / API / BDD* |

---

## 5. Résultats Obtenus & Métriques

- **Livrables fonctionnels :** Application déployée, opérationnelle et conforme aux critères d'acceptation initiaux.
- **Indicateurs de qualité logicielle :**
  - Couverture des tests unitaires et d'intégration : `X %`.
  - Temps de chargement moyen / temps de réponse des requêtes : `< X ms`.
  - Taux de disponibilité du service en environnement de test : `100 %`.
- **Ressources & Documentation :**
  - [Code source sur GitHub](https://github.com/mon-compte/mon-projet)
  - [Documentation technique d'installation (README)](https://github.com/mon-compte/mon-projet#readme)
  - [Démonstration interactive en direct](https://demo.mon-projet.fr)

---

## 6. Tableau de Correspondance & Justifications — Bloc 1 (Épreuve E4)

> *Cochez les compétences mobilisées lors de cette réalisation. Chaque compétence cochée doit obligatoirement comporter un paragraphe d'argumentation concret prouvant la réalisation.*

| Compétence Officielle Bloc 1 | Mobilisée | Sous-compétence(s) visée(s) |
| :--- | :---: | :--- |
| **B1.1 — Gérer le patrimoine informatique** | [ ] | *(ex. B1.1.2 Exploitation de référentiels / B1.1.5 Sauvegardes)* |
| **B1.2 — Répondre aux incidents et demandes** | [ ] | *(ex. B1.2.3 Traitement des demandes applicatives)* |
| **B1.3 — Développer la présence en ligne** | [ ] | *(ex. B1.3.3 Évolution de site web avec données d'organisation)* |
| **B1.4 — Travailler en mode projet** | [ ] | *(ex. B1.4.1 Objectifs du projet / B1.4.2 Planification)* |
| **B1.5 — Mettre à disposition un service** | [ ] | *(ex. B1.5.1 Tests d'acceptation / B1.5.2 Déploiement)* |
| **B1.6 — Organiser son développement pro** | [ ] | *(ex. B1.6.1 Environnement d'apprentissage / B1.6.2 Veille)* |

### Justifications Détaillées des Compétences Cochées

#### Justification B1.1 — Gérer le patrimoine informatique
> *Décrire ici la mise en place de politiques de sauvegarde automatisée, le respect des conventions de code strictes ou la gestion des droits d'accès.*

#### Justification B1.2 — Répondre aux incidents et demandes d'assistance et d'évolution
> *Décrire un cas concret de bogue logiciel corrigé, ou une demande de modification fonctionnelle formulée par l'enseignant/client et intégrée dans le code.*

#### Justification B1.3 — Développer la présence en ligne de l'organisation
> *Expliquer comment l'application a permis de valoriser les services ou données de l'organisation sur le Web tout en respectant les règles juridiques (RGPD).*

#### Justification B1.4 — Travailler en mode projet
> *Présenter le découpage en tâches (Kanban/backlog), le respect du rétroplanning et la gestion des priorités face aux imprévus.*

#### Justification B1.5 — Mettre à disposition des utilisateurs un service informatique
> *Détailler la procédure de déploiement (environnement serveur, conteneurisation) et la réalisation des jeux d'essais validant la mise à disposition.*

#### Justification B1.6 — Organiser son développement professionnel
> *Exposer les compétences techniques assimilées en autonomie, la veille technologique menée pour ce projet et la contribution au projet professionnel.*
