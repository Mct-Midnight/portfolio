---
name: portfolio-audit-qualite
description: Protocole d'audit d'intégrité, de qualité et de conformité du Portfolio BTS SIO — contrôle des documents obligatoires (CV, fiches projets, images), validation des fichiers JSON de données, vérification de la compilation Astro et rapport managérial.
---

# Skill : Audit Qualité & Intégrité du Portfolio (`portfolio-audit-qualite`)

Ce skill formalise le protocole d'audit complet du Portfolio avant une présentation d'examen (BTS SIO) ou un partage professionnel/client.

**Règle d'or :** L'agent lance cet audit **sur demande explicite de l'utilisateur** (ex: *"Lance l'audit du portfolio"*, *"Vérifie la qualité du portfolio"*, *"Audit avant examen"*, ou la commande `/portfolio-audit-qualite`).

---

## 1. Déroulement du processus (Les 4 étapes obligatoires)

```text
[1. Contrôle d'Intégrité] ➔ [2. Validation du Build] ➔ [3. Vérification des Liens Internes] ➔ [4. Contrôle Accessibilité & SEO] ➔ [5. Tableau de Synthèse]
```

---

### Étape 1 : Contrôle d'Intégrité Automatisé
L'agent exécute le script d'audit du projet :
```bash
node scripts/audit-qualite.mjs
```
Ce script vérifie :
- La présence physique et non vide des documents vitaux (`CV_Quentin_Machu_BTS_SIO.pdf`, `favicon.svg`, `og-preview.png`, référentiels BTS).
- La validité syntaxique des fichiers de données (`profile.json`, `skills.json`, `timeline.json`).
- L'intégrité de toutes les fiches projets Markdown (`src/content/projects/`) et l'existence réelle de chaque image/miniature sur le disque.

---

### Étape 2 : Validation du Build de Production
L'agent s'assure que le site Astro compile à 100 % sans erreur de syntaxe ou de TypeScript :
```bash
npm run build
```
- Toutes les pages statiques (accueil, fiches projets individuelles) doivent être générées avec succès dans `dist/`.

---

### Étape 3 : Vérification Automatique des Liens & Ancres (Link Checker)
L'agent exécute le contrôleur de liens post-compilation :
```bash
node scripts/verifier-liens.mjs
```
- Contrôle de toutes les routes internes (pages HTML dans `dist/`).
- Validation de l'existence des identifiants ciblés par les ancres de navigation (`#ancre`).
- Vérification des ressources de téléchargement physiques (PDF, assets).
- Exclusion propre des liens externes, adresses e-mail et numéros de téléphone.

---

### Étape 4 : Contrôle Accessibilité & Expérience Utilisateur
L'agent vérifie :
1. Que les images comportent des descriptions textuelles alternatives (`alt`).
2. Que les méta-balises de titre et de description sont présentes pour le référencement naturel (SEO).
3. Que le contraste et la lisibilité sont conformes aux bonnes pratiques web.

---

### Étape 5 : Restitution Managériale sous forme de Tableau de Bord
L'agent synthétise les résultats dans un tableau clair et compréhensible sans jargon :

| Domaine de Contrôle | Périmètre Audité | Statut | Commentaire Managérial |
|---|---|---|---|
| **Documents officiels** | CV PDF, Favicon, Référentiel E4 | ✅ Conforme | Fichiers présents et accessibles |
| **Données dynamiques** | Profil, Compétences, Parcours | ✅ Conforme | Syntaxe JSON valide et structurée |
| **Fiches Projets** | 4 projets Markdown & Images | ✅ Conforme | Aucune image brisée ni lien manquant |
| **Moteur Web Astro** | Compilation `dist/` (10 pages) | ✅ Conforme | Build de production 100 % réussi |
| **Liens & Ancres** | Navigation interne, ancres & PDF | ✅ Conforme | Zéro lien mort (404) ni ancre orpheline |
| **Prêt pour Examen** | Épreuve E4 & Présentation pro | ✅ Prêt | Zéro anomalie bloquante détectée |
