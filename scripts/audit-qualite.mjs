// Script automatisé de contrôle qualité et d'audit d'intégrité pour le Portfolio
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RACINE = path.resolve(__dirname, '..');

let totalTests = 0;
let succes = 0;
let avertissements = 0;
let erreurs = 0;

function logSucces(message) {
  totalTests++;
  succes++;
  console.log(`  [OK] ${message}`);
}

function logAvertissement(message) {
  totalTests++;
  avertissements++;
  console.log(`  [ATTENTION] ${message}`);
}

function logErreur(message) {
  totalTests++;
  erreurs++;
  console.log(`  [ERREUR] ${message}`);
}

console.log('====================================================');
console.log(' AUDIT D\'INTÉGRITÉ & QUALITÉ DU PORTFOLIO BTS SIO');
console.log('====================================================\n');

// 1. Contrôle des fichiers vitaux et documents obligatoires
console.log('1. Documents officiels et fichiers clés :');
const fichiersCles = [
  { chemin: 'public/docs/CV_Quentin_Machu_BTS_SIO.pdf', label: 'CV au format PDF' },
  { chemin: 'public/favicon.svg', label: 'Favicon du site' },
  { chemin: 'public/robots.txt', label: 'Fichier robots.txt' },
  { chemin: 'public/assets/images/og-preview.png', label: 'Bannière de partage Open Graph (1200x630)' },
  { chemin: 'docs/REFERENTIEL_BLOC_1.md', label: 'Référentiel officiel Bloc 1' },
  { chemin: 'docs/TEMPLATE_FICHE_PROJET.md', label: 'Template officiel de fiche projet' },
  { chemin: 'docs/CAHIER_DES_CHARGES.md', label: 'Cahier des charges du portfolio' },
];

for (const f of fichiersCles) {
  const cheminAbsolu = path.join(RACINE, f.chemin);
  if (fs.existsSync(cheminAbsolu)) {
    const stats = fs.statSync(cheminAbsolu);
    if (stats.size > 0) {
      logSucces(`${f.label} présent (${Math.round(stats.size / 1024)} Ko)`);
    } else {
      logErreur(`${f.label} existe mais est vide (0 octet)`);
    }
  } else {
    logErreur(`${f.label} introuvable : ${f.chemin}`);
  }
}

// 2. Contrôle de validité des données JSON
console.log('\n2. Données dynamiques du profil, compétences et veille :');
const fichiersJson = [
  'src/content/data/profile.json',
  'src/content/data/skills.json',
  'src/content/data/timeline.json',
  'src/content/data/veille.json'
];

for (const relatif of fichiersJson) {
  const absolu = path.join(RACINE, relatif);
  try {
    if (!fs.existsSync(absolu)) {
      logErreur(`Fichier introuvable : ${relatif}`);
      continue;
    }
    const contenu = fs.readFileSync(absolu, 'utf-8');
    const parsed = JSON.parse(contenu);
    logSucces(`Fichier ${path.basename(relatif)} valide (${Array.isArray(parsed) ? parsed.length + ' entrées' : 'objet structuré'})`);
  } catch (err) {
    logErreur(`Erreur de syntaxe JSON dans ${relatif} : ${err.message}`);
  }
}

// 3. Contrôle des fiches projets Markdown et existence des médias
console.log('\n3. Fiches projets Markdown & Références d\'images :');
const dossierProjets = path.join(RACINE, 'src/content/projects');

if (fs.existsSync(dossierProjets)) {
  const fichiers = fs.readdirSync(dossierProjets).filter(f => f.endsWith('.md'));
  console.log(`  -> ${fichiers.length} fiche(s) projet(s) détectée(s)`);

  for (const fichier of fichiers) {
    const chemin = path.join(dossierProjets, fichier);
    const contenu = fs.readFileSync(chemin, 'utf-8');

    // Vérification sommaire du frontmatter
    const matchTitre = contenu.match(/title:\s*"([^"]+)"/);
    const matchThumb = contenu.match(/thumbnail:\s*"([^"]+)"/);
    const matchStatus = contenu.match(/status:\s*"([^"]+)"/);

    const titre = matchTitre ? matchTitre[1] : fichier;

    if (!matchTitre) {
      logErreur(`Projet ${fichier} : Champ frontmatter 'title' manquant`);
    }

    if (!matchStatus) {
      logAvertissement(`Projet ${fichier} : Champ frontmatter 'status' manquant`);
    }

    if (matchThumb) {
      const cheminImage = matchThumb[1];
      // Supprimer le slash de tête pour tester dans public/
      const cheminRelatifPublic = cheminImage.startsWith('/') ? cheminImage.slice(1) : cheminImage;
      const cheminImageAbsolu = path.join(RACINE, 'public', cheminRelatifPublic);

      if (fs.existsSync(cheminImageAbsolu)) {
        logSucces(`Fiche '${titre}' : Miniature vérifiée (${cheminImage})`);
      } else {
        logErreur(`Fiche '${titre}' : Miniature INTROUVABLE sur le disque : ${cheminImage}`);
      }
    } else {
      logAvertissement(`Fiche '${titre}' : Aucune miniature ('thumbnail') déclarée`);
    }

    // Détection des images référencées dans le texte ![](/...)
    const regexImagesCorps = /!\[.*?\]\((\/[^)]+)\)/g;
    let match;
    while ((match = regexImagesCorps.exec(contenu)) !== null) {
      const cheminImg = match[1];
      const relPublic = cheminImg.startsWith('/') ? cheminImg.slice(1) : cheminImg;
      const absPublic = path.join(RACINE, 'public', relPublic);
      if (!fs.existsSync(absPublic)) {
        logErreur(`Fiche '${titre}' : Image dans le corps introuvable : ${cheminImg}`);
      }
    }
  }
} else {
  logErreur('Le dossier des projets (src/content/projects) est introuvable.');
}

// Synthèse finale
console.log('\n====================================================');
console.log(` BILAN DE L'AUDIT : ${totalTests} contrôles exécutés`);
console.log(`   - Succès         : ${succes}`);
console.log(`   - Avertissements : ${avertissements}`);
console.log(`   - Erreurs        : ${erreurs}`);
console.log('====================================================');

if (erreurs > 0) {
  console.log('\n❌ Des anomalies doivent être corrigées avant livraison.');
  process.exit(1);
} else {
  console.log('\n✅ Intégrité globale validée : le portfolio est conforme.');
  process.exit(0);
}
