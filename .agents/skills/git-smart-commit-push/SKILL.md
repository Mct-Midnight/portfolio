---
name: git-smart-commit-push
description: Protocole complet de livraison Git sur demande de l'utilisateur — vérification du build Astro préalable, analyse différentielle, découpage et groupement par domaine (UI, contenu, styles, assets, docs), commits atomiques conventionnels en français, push sur GitHub et tableau récapitulatif.
---

# Skill : Livraison Git Intelligente & Groupée (`git-smart-commit-push`)

Ce skill formalise la méthodologie exacte d'audit, de découpage cohérent et d'envoi des modifications sur GitHub pour le projet Portfolio.

**Règle d'or :** L'agent ne commite jamais de sa propre initiative au fil des modifications. Ce processus s'enclenche **uniquement lorsque l'utilisateur le demande** (ex: *"Commite et push"*, *"Sauvegarde sur GitHub"*, *"Prépare les commits et pousse"*, ou commande `/git-smart-commit-push`).

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
1. `git status` pour identifier les fichiers suivis modifiés et les nouveaux fichiers non suivis (*untracked*).
2. `git diff --stat` pour évaluer le volume et la nature des modifications.
3. Analyse du contenu de chaque modification pour identifier à quel domaine ou composant elle appartient.

---

### Étape 3 : Matrice de Groupement par Domaine

Chaque fichier doit être rattaché à son périmètre cohérent. Ne jamais faire un unique commit global *"diverses modifications"*.

| Domaine / Scope | Périmètre et Fichiers concernés | Exemple de message |
|---|---|---|
| **`ui` / `components`** | `src/components/`, `src/layouts/`, `src/pages/` | `feat(ui): refonte responsive de la barre latérale et navigation mobile` |
| **`content`** | `src/content/projects/`, `src/content/data/`, `src/content/config.ts` | `feat(content): ajout de la fiche descriptive du projet contacts desktop` |
| **`styles`** | `src/styles/global.css`, `tailwind.config.mjs` | `style(theme): ajustement des dégradés sombres et des contrastes d'accessibilité` |
| **`assets`** | `public/assets/images/`, `public/assets/icons/`, `public/assets/badges/`, `public/docs/` | `chore(assets): ajout des badges de certification et mise à jour du cv` |
| **`docs`** | `docs/`, `README.md`, cahier des charges, référentiel BTS | `docs: mise à jour du référentiel bloc 1 et des guides d'épreuve` |
| **`chore` / `config`** | `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore` | `chore(deps): mise à jour des dépendances astro et tailwindcss` |

*Note : Si plusieurs pages ou blocs majeurs sont modifiés indépendamment, séparer en deux commits distincts au sein du même domaine pour garantir une lisibilité optimale.*

---

### Étape 4 : Exécution des Commits Groupés Atomiques
Pour chaque groupe logique identifié à l'Étape 3 :
1. Indexation stricte des fichiers du lot :
   ```bash
   git add chemin/fichier1 chemin/fichier2 ...
   ```
2. Création du commit avec un message explicite en français au format Conventional Commits :
   ```bash
   git commit -m "<type>(<domaine>): <description claire et concise en minuscules>"
   ```
   - Types autorisés : `feat` (nouvelle fonctionnalité ou section), `fix` (correctif de bug ou affichage), `refactor` (restructuration de code propre), `chore` (maintenance, configuration, assets), `docs` (documentation), `style` (mise en page CSS pure).

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

| # | Hash | Type / Domaine | Description vulgarisée du changement | Statut Build |
|---|---|---|---|---|
| 1 | `a1b2c3d` | `feat(ui)` | Nouveau composant de certifications interactif | ✅ Validé |
| 2 | `e4f5g6h` | `feat(content)` | Fiche projet Constellation Lab's avec tags | ✅ Validé |
