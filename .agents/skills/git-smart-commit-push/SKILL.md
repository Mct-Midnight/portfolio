---
name: git-smart-commit-push
description: Protocole complet de livraison Git sur demande de l'utilisateur — vérification du build Astro préalable, analyse différentielle, découpage et groupement par domaine (UI, contenu, styles, assets, docs), commits atomiques conventionnels en français, push sur GitHub et tableau récapitulatif.
---

# Skill : Livraison Git Intelligente & Groupée (`git-smart-commit-push`)

Ce skill formalise la méthodologie exacte d'audit, de découpage cohérent et d'envoi des modifications sur GitHub pour le projet Portfolio.

**Règle d'or :** L'agent ne commite jamais de sa propre initiative au fil des modifications. Ce processus s'enclenche **uniquement lorsque l'utilisateur le demande** (ex: _"Commite et push"_, _"Sauvegarde sur GitHub"_, _"Prépare les commits et pousse"_, ou commande `/git-smart-commit-push`).

---

## 1. Déroulement du processus (Les 5 étapes obligatoires)

```text
[1. Contrôle Qualité] ➔ [2. Cartographie Diff] ➔ [3. Découpage par Domaine] ➔ [4. Commits Atomiques] ➔ [5. Push & Bilan]
```

---

### Étape 1 : Contrôle Qualité (Préalable absolu)

Avant tout ajout à Git, l'agent doit s'assurer que le projet compile et ne comporte aucune régression :

1. Exécution de `npm run build` pour vérifier que le projet Astro se construit sans erreur.
2. **Condition stricte :** Si le build échoue ou comporte des erreurs de syntaxe/TypeScript, corriger immédiatement le problème avant de procéder aux commits. Aucun code cassé ne doit être commit ni push.

---

### Étape 2 : Cartographie Différentielle Globale

L'agent liste l'ensemble des fichiers modifiés, ajoutés ou supprimés sans rien omettre :

1. `git status` pour identifier les fichiers suivis modifiés et les nouveaux fichiers non suivis (_untracked_).
2. `git diff --stat` pour évaluer le volume et la nature des modifications.
3. Analyse du contenu de chaque modification pour identifier à quel domaine ou composant elle appartient.

---

### Étape 3 : Matrice de Groupement par Domaine

Chaque fichier doit être rattaché à son périmètre cohérent. Ne jamais faire un unique commit global _"diverses modifications"_.

| Domaine / Scope         | Périmètre et Fichiers concernés                                                          | Exemple de message                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **`ui` / `components`** | `src/components/`, `src/layouts/`, `src/pages/`                                          | `feat(ui): refonte responsive de la barre latérale et navigation mobile`          |
| **`content`**           | `src/content/projects/`, `src/content/data/`, `src/content/config.ts`                    | `feat(content): ajout de la fiche descriptive du projet contacts desktop`         |
| **`styles`**            | `src/styles/global.css`, `tailwind.config.mjs`                                           | `style(theme): ajustement des dégradés sombres et des contrastes d'accessibilité` |
| **`assets`**            | `public/assets/images/`, `public/assets/icons/`, `public/assets/badges/`, `public/docs/` | `chore(assets): ajout des badges de certification et mise à jour du cv`           |
| **`docs`**              | `docs/`, `README.md`, cahier des charges, référentiel BTS                                | `docs: mise à jour du référentiel bloc 1 et des guides d'épreuve`                 |
| **`chore` / `config`**  | `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`                        | `chore(deps): mise à jour des dépendances astro et tailwindcss`                   |

_Note : Si plusieurs pages ou blocs majeurs sont modifiés indépendamment, séparer en deux commits distincts au sein du même domaine pour garantir une lisibilité optimale._

---

### Étape 4 : Exécution des Commits Groupés Atomiques & Arbitrage des Types

#### 4.1. Arbre de Décision Strict des Types (Conventional Commits)

Pour éviter toute mauvaise catégorisation, l'agent **doit impérativement** appliquer cet arbre de décision logique avant de formuler le type :

1. **S'agit-il d'une réparation d'un bogue ou d'un dysfonctionnement technique ?**
   ➔ **`fix`** (Correctif) :
   - *Critère :* Un élément ne marchait pas, était cassé, provoquait une erreur de script, un lien mort, un chevauchement non intentionnel ou un affichage dégradé sur mobile.
   - *Règle :* Ne jamais utiliser `fix` pour un simple choix esthétique si l'élément fonctionnait normalement.
   - *Exemple :* `fix(ui): correction du débordement du texte dans la modale mobile`

2. **S'agit-il d'une NOUVELLE capacité ou section inexistante auparavant ?**
   ➔ **`feat`** (Fonctionnalité) :
   - *Critère :* Le visiteur peut faire une action totalement nouvelle (ex : naviguer entre fiches, filtrer un tableau, ouvrir une modale), ou une nouvelle page/section entière a été créée.
   - *Règle d'or :* Un simple déplacement, changement de place ou ajustement d'une fonctionnalité **déjà existante** n'est **JAMAIS** un `feat`.
   - *Exemple :* `feat(veille): ajout de la navigation inter-fiches suivant/précédent`

3. **S'agit-il d'un repositionnement, d'une amélioration ergonomique ou de style visuel ?**
   ➔ **`style`** (Design, Ergonomie & Présentation) :
   - *Critère :* La fonctionnalité existe déjà et marche, mais on change sa disposition spatiale, son ergonomie, son confort de clic, son alignement, ses marges, couleurs, contrastes ou polices CSS.
   - *Exemple type :* `style(ui): repositionnement des flèches en boutons flottants latéraux pour un confort de clic accru`
   - *Autre exemple :* `style(theme): harmonisation des contrastes et arrondis des badges`

4. **S'agit-il de maintenance, de fichiers statiques, de dépendances ou d'outillage ?**
   ➔ **`chore`** (Maintenance & Intendance) :
   - *Critère :* Ajout ou optimisation d'assets (`public/assets/images`, logos SVG, badges, CV PDF), scripts d'audit, configuration Node/Astro/Tailwind, mise à jour des dépendances.
   - *Exemple :* `chore(assets): ajout des logos vectoriels des sources de veille`
   - *Exemple :* `chore(config): configuration des scripts d'audit qualité`

5. **S'agit-il d'une simple retouche de texte éditorial ou de documentation ?**
   ➔ **`docs`** (Documentation & Contenu rédactionnel simple) :
   - *Critère :* Modification de texte dans le README, guides de révision, ou simple reformulation d'un paragraphe/titre dans les données statiques sans logique logicielle.
   - *Exemple :* `docs(profile): précision de l'intitulé du cursus CNED dans les mentions`

6. **S'agit-il d'une restructuration de code interne sans changement visuel ?**
   ➔ **`refactor`** (Refactorisation) :
   - *Critère :* Nettoyage de code, découpage de fonctions, typage TypeScript propre, sans modifier ce que voit ou utilise le visiteur.
   - *Exemple :* `refactor(utils): factorisation de la logique de calcul des dates relatives`

---

#### 4.2. Exécution du Commit

Pour chaque lot logique identifié :

1. Indexation stricte des fichiers du lot :
   ```bash
   git add chemin/fichier1 chemin/fichier2 ...
   ```
2. Création du commit avec le message validé au format :
   ```bash
   git commit -m "<type>(<domaine>): <description claire et concise en minuscules>"
   ```
3. Répéter l'opération pour chaque lot jusqu'à ce que `git status` indique :
   `nothing to commit, working tree clean`.

---

### Étape 5 : Push sur GitHub & Synthèse sous forme de Tableau

1. Pousser l'ensemble des commits sur la branche distante :
   ```bash
   git push origin main
   ```
2. Vérifier que la branche est parfaitement synchronisée :
   ```bash
   git status
   ```
3. Présenter à l'utilisateur un **tableau de bord récapitulatif** clair, structuré et facile à lire :

| #   | Hash      | Type / Domaine  | Description vulgarisée du changement           | Statut Build |
| --- | --------- | --------------- | ---------------------------------------------- | ------------ |
| 1   | `a1b2c3d` | `feat(ui)`      | Nouveau composant de certifications interactif | ✅ Validé    |
| 2   | `e4f5g6h` | `feat(content)` | Fiche projet Constellation Lab's avec tags     | ✅ Validé    |
