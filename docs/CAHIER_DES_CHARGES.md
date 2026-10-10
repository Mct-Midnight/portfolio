# Cahier des Charges & Charte UI/UX — Portfolio BTS SIO SLAM

> **Rôle du document :** Spécifications fonctionnelles, ergonomiques et techniques de référence pour la conception du portfolio professionnel (BTS SIO option SLAM — suivi via le CNED).  
> **Direction Artistique :** Inspirée du modèle de référence validé par le CNED (Layout Dual-Pane, tons chauds chocolat/terracotta/crème, typographie contemporaine et cartes épurées).

---

## 1. Vision Stratégique & Objectifs

### 1.1. Objectifs Académiques (Épreuve E4 - Bloc 1)
- Servir de support visuel et interactif officiel lors de l'oral de l'**Épreuve E4 : Support et mise à disposition de services informatiques**.
- Démontrer la maîtrise des compétences du **Bloc 1** grâce à des études de cas détaillées, vérifiables et reliées aux sous-compétences officielles.
- Offrir une navigation instantanée au jury entre la vue d'ensemble du profil et les preuves techniques de mise en œuvre.

### 1.2. Objectifs Professionnels (Stage SLAM & Opportunités)
- **Recherche de stage de 1re année :** Décrocher un stage d'une durée de **4 à 5 semaines**, planifié entre **mai et août 2027** dans le développement d'applications logicielles ou web.
- Valoriser une posture hybride recherchée : rigueur du développeur (clean code, architecture, persistance) alliée à une vision managériale et entrepreneuriale (gestion de projet, orientation valeur client).
- Faciliter le contact direct et la prise de décision des recruteurs (règle des 15 secondes, consultation rapide du CV au format PDF).

---

## 2. Direction Artistique (DA) & Design System

### 2.1. Palette Chromatique Officielle (Monochrome Mat & Titane Exécutif)
La palette repose sur un contraste exécutif haut de gamme entre une barre latérale sombre anthracite mat, un espace de lecture lumineux et des accents noir mat profond, sans aucune teinte bleue criarde.

| Rôle Visuel | Nom de la Teinte | Code HEX | Usage & Justification |
| :--- | :--- | :--- | :--- |
| **Fond Sidebar** | *Anthracite Mat* | `#18181B` | Fond de la barre latérale fixe (ancrage visuel haut de gamme, contraste élevé). |
| **Bordures Sidebar** | *Titane Foncé* | `#27272A` | Lignes de séparation et délimitations de la barre latérale. |
| **Onglet Actif Sidebar** | *Capsule Blanc Pur* | `#FFFFFF` | Pill d'ancrage avec texte et icône en noir mat `#09090B`. |
| **Fond Principal** | *Studio Neutre* | `#FAFAFA` | Fond de la zone de contenu (confort de lecture supérieur au blanc pur). |
| **Fond Cartes** | *Blanc Pur* | `#FFFFFF` | Conteneurs des cartes de compétences, projets et contact avec bordure fine `#E2E8F0`. |
| **Boutons Principaux (CTA)** | *Noir Mat Profond* | `#09090B` | Boutons d'action prioritaires (`bg-zinc-900 hover:bg-black text-white`). |
| **Boutons Secondaires** | *Blanc Bordé* | `#FFFFFF` | Boutons d'action secondaires avec bordure grise discrète (`border-zinc-200`). |
| **Texte Principal** | *Noir Encre Mat* | `#09090B` | Titres majeurs et corps de texte pour une lisibilité maximale. |
| **Texte Secondaire** | *Gris Ardoise Neutre* | `#64748B` | Métadonnées, descriptions secondaires, dates, labels de formulaire. |
| **Pastilles & Badges** | *Titane Feutré* | `#F4F4F5` | Fond des pastilles technologiques et catégories (`bg-zinc-100 text-zinc-800`). |
| **Statut "Réalisé / Dispo"** | *Vert Émeraude* | `#10B981` | Pastille discrète de disponibilité stage ou certification délivrée. |

### 2.2. Typographie & Rythme Visuel
- **Police Principale :** `Inter` ou `Poppins` (Google Fonts), polices sans-serif modernes, géométriques et hautement lisibles sur tous les types d'écrans.
- **Hiérarchie Typographique :**
  - **Surtitres de rubriques (Eyebrows) :** Majuscules (`uppercase`), graisse fine à moyenne (`font-medium` ou `font-semibold`), espacement inter-lettres accentué (`tracking-widest`), couleur d'accent `#D95A2B`.
  - **Titres H1 / Hero :** 36px à 48px, graisse forte (`font-extrabold`), couleur sombre `#1E1B18`.
  - **Titres de sections H2 :** 28px à 32px, graisse marquée (`font-bold`).
  - **Titres de cartes H3 :** 18px à 20px, graisse semi-bold (`font-semibold`).
  - **Corps de texte :** 15px à 16px, interligne généreux (`leading-relaxed`), couleur `#374151`.

### 2.3. Formes & Composants d'Interface
- **Rayon de courbure (Border Radius) :** Arrondi doux (`rounded-xl` à `rounded-2xl`, soit 12px à 16px) sur toutes les cartes, modales et boutons.
- **Ombrages (Box Shadows) :** Ombres diffuses et subtiles (`0 4px 20px -2px rgba(0, 0, 0, 0.05)`) pour éviter l'effet surchargé.

---

## 3. Architecture de Navigation : Layout Dual-Pane

Le portfolio adopte une structure moderne à double volet (*Dual-Pane Layout*), particulièrement adaptée à la présentation d'un profil d'ingénieur.

```
┌───────────────────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR FIXE (Desktop)   │  ZONE DE CONTENU PRINCIPALE (Scroll Fluide)                  │
│  Largeur : ~260px         │  Fond : #F8F7F4                                              │
│  Fond : #1E1B18           │                                                              │
│                           │  1. Hero / Accueil (Titre, CTA, photo ronde)                 │
│  [ Photo de profil ]      │  2. Profil & Encadré "Recherche de stage 2027"               │
│  Prénom Nom               │  3. Parcours (Timeline continue avec points orange)         │
│  Étudiant BTS SIO SLAM    │  4. Compétences (Grid Cards avec logos centrés)              │
│                           │  5. Certifications (Bannières avec badge vert "Obtenue")    │
│  • Accueil                │  6. Projets (Onglets Scolaires / Professionnels)             │
│  • À propos               │  7. Contact (Cartes coordonnées + Formulaire)               │
│  • Parcours               │                                                              │
│  • Compétences            │                                                              │
│  • Certifications         │                                                              │
│  • Projets (Scolaire/Pro) │                                                              │
│  • Contact                │                                                              │
└───────────────────────────┴──────────────────────────────────────────────────────────────┘
```

### 3.1. Volet Latéral Gauche (Sidebar Fixe Desktop)
- **Dimensions :** Largeur fixe de **260px**, hauteur de 100vh, position `fixed` à gauche de l'écran.
- **Couleur d'arrière-plan :** Teinte sombre Espresso `#1E1B18`.
- **En-tête de la Sidebar :**
  - Photo de profil ronde (diamètre ~90px), bordure fine subtile (`#3D3834`).
  - Nom complet en blanc pur (`#FFFFFF`, `font-bold`, 18px).
  - Intitulé du poste : *"Étudiant en BTS SIO Option SLAM"* en gris clair chaud (`#A8A29E`, 13px).
- **Navigation verticale :**
  - Liens avec icônes vectorielles sobres (accueil, utilisateur, formation, code, diplôme, classeur, enveloppe).
  - États : Survol interactif avec fond translucide (`rgba(255, 255, 255, 0.08)`), état actif souligné par une bordure gauche ou un texte teinté Terracotta `#D95A2B`.
  - Rubrique *Projets* découpée avec sous-liens indentés : *Projets scolaires* et *Projets professionnels*.
- **Pied de sidebar :** Mention discrète de l'année en cours et lien discret vers les mentions légales.

### 3.2. Version Mobile / Tablette (Responsive Drawer)
- Sur écran inférieur à 1024px, la sidebar se replie automatiquement.
- Barre d'en-tête mobile supérieure (*Navbar sticky*) avec logo/nom et bouton menu hamburger.
- Tiroir latéral rétractable (*Drawer*) coulissant depuis la gauche avec fond sombre `#1E1B18` lors du clic.

### 3.3. Zone de Contenu Principale (Right Pane)
- Défilement vertical fluide (*Smooth scrolling*).
- Largeur maximale contenue (ex: `max-w-5xl`) et centrée sur grands écrans pour préserver le confort visuel.
- Espacement vertical généreux entre chaque section pour aérer les blocs d'information.

---

## 4. Spécifications Détaillées des 7 Sections

---

### Section 1 : Hero / Accueil
- **Objectif :** Règle des 15 secondes. Présentation percutante et accès direct aux actions prioritaires.
- **Disposition :** Structure en 2 colonnes ou bloc héroïque équilibré.
- **Contenu :**
  - Surtitre orange Terracotta `#D95A2B` : `PORTFOLIO`.
  - Titre H1 imposant : `[Prénom Nom]`.
  - Sous-titre valorisant : `Étudiant en informatique / Développement d'applications`.
  - Mention explicite du cursus : `BTS Services Informatiques aux Organisations — Option SLAM (CNED)`.
  - Phrase d'accroche soulignant la rigueur technique, le sens de l'organisation et la volonté de créer des solutions concrètes.
  - **Groupe de boutons d'action (CTA) :**
    1. Bouton primaire plein (Orange Terracotta `#D95A2B`) : *"Voir les projets"* (ancre fluide vers la section Projets).
    2. Bouton secondaire avec contour : *"Voir mon CV"* (ouvre/télécharge le CV PDF situé dans `public/docs/`).
    3. Bouton tertiaire discret ou icône : *"Me contacter"* (ancre vers la section Contact).
  - **Élément visuel droit :** Photo de profil portrait stylisée dans un conteneur circulaire ou arrondi moderne avec ombre portée douce.

---

### Section 2 : Profil & Encadré Recherche de Stage
- **Objectif :** Exposer la démarche personnelle et formaliser le besoin de stage.
- **Disposition :** Grille asymétrique en 2 colonnes.
- **Colonne de gauche (À propos / Bio) :**
  - Surtitre : `À PROPOS`.
  - Titre de section : `Profil & Parcours Professionnel`.
  - Paragraphes de présentation : transition vers le développement, méthodologie de travail en autonomie grâce au CNED, appétence pour la gestion de projet et l'architecture logicielle.
- **Colonne de droite (Carte d'Appel "Recherche de Stage") :**
  - Carte blanche surélevée (`#FFFFFF`) avec liseré supérieur ou badge Terracotta.
  - Titre bien visible : `🎯 Recherche de stage 2027`.
  - **Mentions contractuelles obligatoires :**
    - Durée : **4 à 5 semaines consécutives**.
    - Période éligible : **Mai à Août 2027**.
    - Spécialité : **Développement d'applications logicielles & Web (SLAM)**.
    - Modalités : Présentiel prioritaire (secteur Cambrai), hybride ponctuel possible (1 à 2 j max/semaine).
    - Bouton dédié : *"Proposer une opportunité"* pointant directement vers le formulaire de contact.

---

### Section 3 : Parcours (Timeline de Formation & Expériences)
- **Objectif :** Retracer l'historique post-bac et les expériences sous une forme chronologique limpide.
- **Disposition :** Ligne guide verticale continue avec points de repère de couleur Terracotta `#D95A2B`.
- **Cartes d'étape :**
  - Fond blanc `#FFFFFF`, angles arrondis, bordure légère.
  - Badge temporel en haut à droite (ex: `Sept. 2026 - En cours`).
  - Titre du diplôme ou poste (ex: `BTS SIO Option SLAM`).
  - Organisme et lieu (ex: `CNED — Enseignement à distance`).
  - Descriptif des compétences clés acquises ou missions réalisées.
  - Bouton optionnel *"En savoir plus"* pour afficher les détails du programme.

---

### Section 4 : Compétences Techniques (Le composant "Grid Cards")
- **Objectif :** Présenter l'arsenal technologique sans recourir aux barres de progression ou pourcentages arbitraires (proscrits par les standards de recrutement tech).
- **Organisation catégorisée :**
  1. *Développement Web & Applications* (ex: Python, JavaScript, TypeScript, PHP, Frameworks).
  2. *Bases de données & Persistance* (ex: PostgreSQL, MySQL, modélisation relationnelle).
  3. *Outils, DevOps & Environnements* (ex: Git, GitHub, Docker, VS Code, Linux).
  4. *Méthodes de conception & Gestion de projet* (ex: Agile/Scrum, Kanban, UML/Merise).
- **Design du composant Carte Compétence (Card) :**
  - Carte carrée individuelle à fond blanc `#FFFFFF`, bords arrondis (`rounded-xl`), ombre douce au survol (`hover:shadow-md hover:-translate-y-1 transition-all`).
  - Logo technologique vectoriel officiel (issu de Devicon ou Lucide) centré en haut de carte.
  - Nom clair de la technologie centré sous le logo.
  - Absence totale d'estimation subjective de niveau (pas d'étoiles, pas de pourcentages).

---

### Section 5 : Certifications
- **Objectif :** Prouver la démarche d'auto-formation et de validation des compétences académiques/industrielles.
- **Disposition :** Liste de bannières horizontales blanches (`#FFFFFF`) épurées.
- **Composants d'une bannière :**
  - Logo officiel de l'organisme certificateur à gauche (ANSSI, OpenClassrooms, Cisco, Google, etc.).
  - Titre officiel de la certification.
  - Organisme émetteur et date d'obtention.
  - Court descriptif des acquis validés.
  - Badge de statut à droite : **"Obtenue"** en vert pastel doux (fond `#D1FAE5`, texte `#065F46`).
  - Lien externe vers le certificat de vérification en ligne.

---

### Section 6 : Projets & Réalisations (Études de Cas)
- **Objectif :** Pièce maîtresse de l'épreuve E4 et vitrine d'ingénierie logicielle.
- **Organisation en sous-onglets :**
  1. **Projets Scolaires / Ateliers :** Réalisations guidées et ateliers de professionnalisation CNED.
  2. **Projets Professionnels / Personnels :** Applications concrètes développées en situation réelle ou en totale autonomie.
- **Grille de cartes à 3 colonnes (Desktop) :**
  - **Visuel supérieur :** Image miniature représentative de l'interface ou maquette (format 16:9).
  - **Badge de statut :** Pastille positionnée en incrustation sur l'image ou en haut de carte :
    - `réalisé` (Badge vert / accompli)
    - `en cours` (Badge ambre / en développement)
    - `à venir` (Badge gris chaud / planifié)
  - **Titre du projet :** Clair et explicite.
  - **Description synthétique :** 2 à 3 lignes résumant la problématique métier résolue.
  - **Pastilles technologiques (Pills) :** Badges discrets moka/gris chaud `#ECE8E1` indiquant la stack utilisée.
  - **Actions cliquables :**
    - Bouton principal : *"Lire l'étude de cas"* (ouvre la fiche projet complète générée depuis le Markdown).
    - Lien secondaire avec icône : *"Projet sur GitHub"* menant au code source.

---

### Section 7 : Contact
- **Objectif :** Permettre une prise de contact fluide, immédiate et sécurisée.
- **Disposition :** Deux colonnes symétriques et équilibrées.
- **Colonne de gauche (Coordonnées directes) :**
  - Pile de cartes blanches individuelles avec icônes colorées Terracotta :
    - **Localisation :** Ville et région uniquement (respect de la vie privée).
    - **Téléphone :** Numéro de portable professionnel.
    - **Email :** Adresse professionnelle normée (`prenom.nom@domaine.com`).
    - **LinkedIn :** Lien direct vers le profil professionnel.
    - **GitHub :** Lien direct vers le dépôt et l'activité de code.
- **Colonne de droite (Formulaire de contact) :**
  - Carte blanche intégrant le formulaire de contact interactif.
  - Champs requis :
    - *Nom & Prénom*
    - *Adresse E-mail*
    - *Objet de la prise de contact* (avec option rapide "Proposition de stage 2027")
    - *Message*
  - Bouton de soumission stylisé en Orange Terracotta `#D95A2B` : *"Envoyer le message"*.
  - Traitement avec message de retour utilisateur clair (succès ou erreur de validation).

---

## 5. Règles Déontologiques BTS SIO & Conformité Examen

1. **Tolérance Zéro pour les contenus rédigés par IA :**
   - Les descriptions de projets, analyses d'incidents et bilans de compétences doivent être rédigés à la main par l'étudiant.
   - Les jurys de BTS SIO disposent d'outils de vérification et sanctionnent sévèrement les analyses stéréotypées générées artificiellement.
   - L'IA est acceptée uniquement comme assistant d'architecture de code et de mise en page.
2. **Arrimage obligatoire au Bloc 1 (Épreuve E4) :**
   - Chaque projet publié doit impérativement faire référence à la grille officielle du Bloc 1 détaillée dans `docs/REFERENTIEL_BLOC_1.md`.
3. **Qualité logicielle & Performance :**
   - Le code HTML/CSS généré doit respecter les normes W3C, l'accessibilité WCAG AA et obtenir des scores Lighthouse supérieurs à 90 sur tous les indicateurs.
