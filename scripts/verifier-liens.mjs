// Script de vérification automatique des liens internes et des ancres HTML (Link Checker)
// Portfolio BTS SIO SLAM - Quentin Machu
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RACINE = path.resolve(__dirname, '..');
const DOSSIER_DIST = path.join(RACINE, 'dist');
const DOSSIER_PUBLIC = path.join(RACINE, 'public');

console.log('====================================================');
console.log(' CONTRÔLE QUALITÉ : VÉRIFICATION DES LIENS INTERNES');
console.log('====================================================\n');

// 1. Vérification de la présence du dossier de build dist/
if (!fs.existsSync(DOSSIER_DIST)) {
  console.error('❌ ERREUR : Le dossier de build "dist/" est introuvable.');
  console.error('   Veuillez compiler le site au préalable avec "npm run build".');
  process.exit(1);
}

// Fonction récursive pour collecter tous les fichiers HTML du dossier dist/
function listerFichiersHtml(dossier) {
  let fichiers = [];
  try {
    const entrees = fs.readdirSync(dossier, { withFileTypes: true });
    for (const entree of entrees) {
      const cheminComplet = path.join(dossier, entree.name);
      if (entree.isDirectory()) {
        fichiers = fichiers.concat(listerFichiersHtml(cheminComplet));
      } else if (entree.isFile() && entree.name.endsWith('.html')) {
        fichiers.push(cheminComplet);
      }
    }
  } catch (erreur) {
    console.error(`[ERREUR] Impossible de parcourir le dossier ${dossier} : ${erreur.message}`);
  }
  return fichiers;
}

const fichiersHtml = listerFichiersHtml(DOSSIER_DIST);

if (fichiersHtml.length === 0) {
  console.error('❌ ERREUR : Aucun fichier HTML généré dans "dist/".');
  process.exit(1);
}

console.log(`📁 ${fichiersHtml.length} page(s) HTML analysée(s) dans dist/\n`);

// 2. Indexation des pages et de leurs identifiants (attributs id)
// Clé : chemin relatif normalisé avec des slashes (ex: "index.html", "journal/index.html")
// Valeur : Set contenant tous les IDs trouvés dans le code HTML de la page
const tablePagesEtIds = new Map();

for (const cheminFichier of fichiersHtml) {
  try {
    const contenu = fs.readFileSync(cheminFichier, 'utf-8');
    const cheminRelatif = path.relative(DOSSIER_DIST, cheminFichier).replace(/\\/g, '/');
    const ensembleIds = new Set();

    // Recherche de tous les attributs id="..." ou id='...' sur les balises HTML
    const regexId = /<[a-zA-Z0-9\-]+[^>]*\bid=["']([^"']+)["']/gi;
    let match;
    while ((match = regexId.exec(contenu)) !== null) {
      ensembleIds.add(match[1]);
    }

    tablePagesEtIds.set(cheminRelatif, {
      cheminAbsolu: cheminFichier,
      ids: ensembleIds
    });
  } catch (erreur) {
    console.error(`[ERREUR] Lecture impossible du fichier ${cheminFichier} : ${erreur.message}`);
  }
}

// 3. Extraction et contrôle de tous les liens de navigation <a>
let totalLiensDetectes = 0;
let totalLiensExternesIgnores = 0;
let totalLiensContactIgnores = 0;
let totalRoutesInternesValidees = 0;
let totalAncresIntraPagesValidees = 0;
let totalAncresInterPagesValidees = 0;
let totalRessourcesStatiquesValidees = 0;

const anomalies = [];

for (const [pageSourceRel, donneesPage] of tablePagesEtIds.entries()) {
  try {
    const contenu = fs.readFileSync(donneesPage.cheminAbsolu, 'utf-8');

    // Détection de toutes les balises <a ...>
    const regexBaliseA = /<a\b([^>]*)>/gis;
    let matchA;

    while ((matchA = regexBaliseA.exec(contenu)) !== null) {
      const attributs = matchA[1];
      // Extraction de l'attribut href
      const matchHref = attributs.match(/\bhref=(["'])(.*?)\1/is);
      if (!matchHref) {
        // Balise <a> sans href (ancre textuelle pure ou gérée autrement)
        continue;
      }

      totalLiensDetectes++;
      const hrefBrut = matchHref[2].trim();

      // Règle 4 : Filtrage propre des protocoles externes et contacts
      if (
        hrefBrut.startsWith('http://') ||
        hrefBrut.startsWith('https://') ||
        hrefBrut.startsWith('//')
      ) {
        totalLiensExternesIgnores++;
        continue;
      }

      if (hrefBrut.startsWith('mailto:') || hrefBrut.startsWith('tel:')) {
        totalLiensContactIgnores++;
        continue;
      }

      if (hrefBrut.startsWith('javascript:')) {
        continue;
      }

      // Cas particulier : ancre vide ou retour en haut de page "#"
      if (hrefBrut === '#' || hrefBrut === '') {
        totalAncresIntraPagesValidees++;
        continue;
      }

      // Séparation de l'URL : chemin / paramètres de requête / ancre
      const [cheminEtRequete, ancre] = hrefBrut.split('#');
      const [cheminCibleBrut] = (cheminEtRequete || '').split('?');

      let pageCibleRel = null;
      let estRessourceStatique = false;

      // Résolution de la cible
      if (!cheminCibleBrut || cheminCibleBrut === '') {
        // Lien d'ancre intra-page sur la page courante (ex: href="#projets")
        pageCibleRel = pageSourceRel;
      } else {
        // Lien avec route spécifiée (absolue ou relative)
        let normalise = cheminCibleBrut;
        if (normalise.startsWith('/')) {
          normalise = normalise.slice(1);
        } else {
          // Lien relatif par rapport au répertoire de la page courante
          const dossierCourant = path.dirname(pageSourceRel);
          normalise = path.posix.normalize(
            path.posix.join(dossierCourant === '.' ? '' : dossierCourant, normalise)
          );
        }

        // Détection de la page d'accueil "/"
        if (normalise === '' || normalise === '/') {
          pageCibleRel = 'index.html';
        } else if (normalise.endsWith('.html')) {
          // Route vers un fichier HTML direct (ex: 404.html)
          pageCibleRel = normalise;
        } else if (path.posix.extname(normalise)) {
          // Fichier avec extension non-HTML (ex: .pdf, .svg, .png) -> Ressource statique
          estRessourceStatique = true;
          pageCibleRel = normalise;
        } else {
          // Route Astro sans extension (ex: "journal" ou "projets/constellation-labs")
          const candidatIndex = path.posix.join(normalise, 'index.html');
          const candidatHtml = `${normalise}.html`;

          if (tablePagesEtIds.has(candidatIndex)) {
            pageCibleRel = candidatIndex;
          } else if (tablePagesEtIds.has(candidatHtml)) {
            pageCibleRel = candidatHtml;
          } else {
            // Possibilité d'une ressource sans extension standard ou inexistante
            pageCibleRel = candidatIndex;
          }
        }
      }

      // Validation 1 & 3 : Existence physique de la ressource ou de la page
      if (estRessourceStatique) {
        const cheminDansDist = path.join(DOSSIER_DIST, pageCibleRel);
        const cheminDansPublic = path.join(DOSSIER_PUBLIC, pageCibleRel);

        if (fs.existsSync(cheminDansDist) || fs.existsSync(cheminDansPublic)) {
          totalRessourcesStatiquesValidees++;
        } else {
          anomalies.push({
            pageSource: pageSourceRel,
            href: hrefBrut,
            motif: `Ressource statique introuvable sur le disque (ni dans dist/${pageCibleRel}, ni dans public/${pageCibleRel})`
          });
        }
        continue;
      }

      // Vérification de la page HTML cible
      const cibleExiste = tablePagesEtIds.has(pageCibleRel) ||
        fs.existsSync(path.join(DOSSIER_DIST, pageCibleRel));

      if (!cibleExiste) {
        anomalies.push({
          pageSource: pageSourceRel,
          href: hrefBrut,
          motif: `Page HTML cible introuvable dans le dossier dist/ (${pageCibleRel})`
        });
        continue;
      }

      // Validation 2 : Vérification de l'ancre si présente
      if (ancre && ancre.trim() !== '') {
        const pageCibleData = tablePagesEtIds.get(pageCibleRel);
        const identifiantsDisponibles = pageCibleData ? pageCibleData.ids : new Set();

        if (!identifiantsDisponibles.has(ancre)) {
          anomalies.push({
            pageSource: pageSourceRel,
            href: hrefBrut,
            motif: `Ancre #${ancre} inexistante dans la page cible (${pageCibleRel})`
          });
        } else {
          if (pageCibleRel === pageSourceRel) {
            totalAncresIntraPagesValidees++;
          } else {
            totalAncresInterPagesValidees++;
          }
        }
      } else {
        totalRoutesInternesValidees++;
      }
    }
  } catch (erreur) {
    console.error(`[ERREUR] Analyse des liens impossible pour ${pageSourceRel} : ${erreur.message}`);
  }
}

// 4. Synthèse et Affichage du Rapport Managérial
console.log('RÉCAPITULATIF DES CONTRÔLES EFFECTUÉS :');
console.log(`  • Liens totaux détectés           : ${totalLiensDetectes}`);
console.log(`  • Routes internes validées        : ${totalRoutesInternesValidees}`);
console.log(`  • Ancres intra-pages validées     : ${totalAncresIntraPagesValidees}`);
console.log(`  • Ancres inter-pages validées     : ${totalAncresInterPagesValidees}`);
console.log(`  • Ressources statiques (fichiers) : ${totalRessourcesStatiquesValidees}`);
console.log(`  • Liens externes ignorés (web)    : ${totalLiensExternesIgnores}`);
console.log(`  • Liens contact ignorés (mail/tel): ${totalLiensContactIgnores}`);

console.log('\n====================================================');

if (anomalies.length > 0) {
  console.error(`❌ ÉCHEC : ${anomalies.length} lien(s) rompu(s) ou ancre(s) invalide(s) détecté(s) :\n`);
  anomalies.forEach((ano, index) => {
    console.error(`  [${index + 1}] Source : dist/${ano.pageSource}`);
    console.error(`      Lien   : "${ano.href}"`);
    console.error(`      Motif  : ${ano.motif}\n`);
  });
  console.error('Le pipeline de contrôle qualité est interrompu.');
  process.exit(1);
} else {
  console.log('✅ SUCCÈS : 100 % des liens internes et ancres sont valides.');
  console.log('   Aucune erreur 404 ni ancre orpheline détectée sur l\'ensemble du site.');
  console.log('====================================================\n');
  process.exit(0);
}
