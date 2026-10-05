// Script de génération de la bannière Open Graph et Twitter Cards (1200x630 px) - Version Rééquilibrée & Footer Pleine Largeur
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RACINE = path.resolve(__dirname, '..');

// Chemins des fichiers source et cible
const avatarPath = path.join(RACINE, 'public/assets/images/profile-avatar.jpg');
const destinationPng = path.join(RACINE, 'public/assets/images/og-preview.png');

console.log('--- Génération de la bannière Open Graph rééquilibrée (1200x630 px) ---');

// Encodage de l'avatar en base64 pour un rendu immédiat et sans dépendance réseau
let avatarBase64 = '';
if (fs.existsSync(avatarPath)) {
  const avatarBuffer = fs.readFileSync(avatarPath);
  avatarBase64 = `data:image/jpeg;base64,${avatarBuffer.toString('base64')}`;
  console.log('✓ Avatar de profil chargé avec succès');
} else {
  console.warn('⚠ Avatar introuvable, fallback sans photo');
}

// Gabarit HTML haute fidélité avec disposition en 2 étages (corps centré + footer pleine largeur)
const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1200px;
      height: 630px;
      background-color: #121214;
      background-image: 
        radial-gradient(circle at 15% 20%, rgba(39, 39, 42, 0.45) 0%, transparent 45%),
        radial-gradient(circle at 85% 80%, rgba(39, 39, 42, 0.35) 0%, transparent 45%);
      color: #FAFAFA;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px;
      overflow: hidden;
    }

    .container {
      width: 100%;
      height: 100%;
      background: #18181B;
      border: 1px solid #27272A;
      border-radius: 24px;
      padding: 42px 50px 32px 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.65);
    }

    /* Grille décorative géométrique feutrée */
    .container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-size: 30px 30px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      pointer-events: none;
      border-radius: 24px;
    }

    /* Zone principale contenant les deux colonnes rééquilibrées */
    .main-body {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
      padding-bottom: 20px;
    }

    .left-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 24px;
      padding-right: 48px;
    }

    .badges-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .badge-sio {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 15px;
      background: #27272A;
      border: 1px solid #3F3F46;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #F4F4F5;
    }

    .badge-stage {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 15px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.32);
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      color: #34D399;
    }

    .dot-green {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
    }

    .main-title-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .candidate-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 56px;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #FFFFFF;
      line-height: 1.05;
      text-transform: uppercase;
    }

    .role-title {
      font-size: 25px;
      font-weight: 700;
      color: #E4E4E7;
    }

    .description {
      font-size: 17px;
      color: #A1A1AA;
      line-height: 1.6;
      max-width: 630px;
    }

    /* Rangée des 3 piliers avec icônes concrètes et espacements harmonieux */
    .pillars-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 6px;
    }

    .pillar-card {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 11px 18px;
      background: #202024;
      border: 1px solid #2C2C30;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #E4E4E7;
    }

    .pillar-card svg {
      color: #A1A1AA;
      flex-shrink: 0;
    }

    /* Colonne droite : Photo & Informations RH */
    .right-col {
      width: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      z-index: 2;
    }

    .photo-wrapper {
      position: relative;
      width: 230px;
      height: 230px;
      border-radius: 24px;
      padding: 5px;
      background: linear-gradient(135deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.7);
    }

    .photo-inner {
      width: 100%;
      height: 100%;
      border-radius: 19px;
      overflow: hidden;
      background: #27272A;
    }

    .photo-inner img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      filter: grayscale(100%) contrast(106%);
    }

    .card-meta {
      width: 100%;
      background: #202024;
      border: 1px solid #2C2C30;
      border-radius: 16px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13.5px;
    }

    .meta-label {
      color: #71717A;
      font-weight: 500;
    }

    .meta-val {
      color: #FAFAFA;
      font-weight: 600;
    }

    /* Barre de pied de page s'étendant proprement sur TOUTE la largeur de la carte */
    .footer-bar {
      width: 100%;
      border-top: 1px solid #27272A;
      padding-top: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 2;
    }

    .site-domain {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15.5px;
      font-weight: 600;
      color: #FAFAFA;
      letter-spacing: 0.01em;
    }

    .site-tag {
      font-size: 13.5px;
      font-weight: 500;
      color: #71717A;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Zone Principale Rééquilibrée : Les informations occupent l'espace naturellement sans vide -->
    <div class="main-body">
      <div class="left-col">
        <div class="badges-row">
          <div class="badge-sio">
            <span>BTS SIO SLAM</span>
            <span style="opacity: 0.35">•</span>
            <span>CNED</span>
          </div>
          <div class="badge-stage">
            <span class="dot-green"></span>
            <span>Stage : Mai – Août 2027</span>
          </div>
        </div>

        <div class="main-title-section">
          <h1 class="candidate-name">Quentin Machu</h1>
          <h2 class="role-title">Développeur d'applications en formation</h2>
          <p class="description">
            Portfolio professionnel et réalisations techniques dans le cadre du BTS SIO (Option SLAM). Développement web, modélisation relationnelle et gestion de projet.
          </p>
        </div>

        <!-- Les 3 compétences avec icônes concrètes et la nouvelle icône de gestion de projet (Checklist de tâches) -->
        <div class="pillars-row">
          <!-- Icône 1 : Développeur (Code) -->
          <div class="pillar-card">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>Développement</span>
          </div>

          <!-- Icône 2 : Base de données (Database) -->
          <div class="pillar-card">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
            <span>Bases de données</span>
          </div>

          <!-- Icône 3 : Gestion de projet (Presse-papier avec coche de tâche accomplie / suivi de livraison) -->
          <div class="pillar-card">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <path d="m9 14 2 2 4-4"></path>
            </svg>
            <span>Gestion de projet</span>
          </div>
        </div>
      </div>

      <div class="right-col">
        <div class="photo-wrapper">
          <div class="photo-inner">
            ${avatarBase64 ? `<img src="${avatarBase64}" alt="Quentin Machu" />` : ''}
          </div>
        </div>

        <div class="card-meta">
          <div class="meta-item">
            <span class="meta-label">Mobilité</span>
            <span class="meta-val">Cambrai (59) / Télétravail</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Période</span>
            <span class="meta-val">Mai à Août 2027</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Durée</span>
            <span class="meta-val">4 à 5 semaines</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Barre de pied de page parfaitement alignée d'un bout à l'autre du cadre -->
    <div class="footer-bar">
      <div class="site-domain">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span>mct-midnight.github.io</span>
      </div>
      <div class="site-tag">Portfolio BTS SIO SLAM • Épreuve E4</div>
    </div>
  </div>
</body>
</html>`;

// Écriture du fichier HTML temporaire
const tempHtmlPath = path.join(os.tmpdir(), `og-template-${Date.now()}.html`);
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf-8');

// Détection du navigateur Chromium / Edge sous Windows
const edgeBinary = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

if (!fs.existsSync(edgeBinary)) {
  console.error('❌ Moteur Edge introuvable à l\'emplacement standard :', edgeBinary);
  process.exit(1);
}

try {
  // Capture headless au format exact 1200 x 630
  const normalizedHtmlUrl = `file:///${tempHtmlPath.replace(/\\/g, '/')}`;
  const commande = `"${edgeBinary}" --headless --disable-gpu --hide-scrollbars --window-size=1200,630 --screenshot="${destinationPng}" "${normalizedHtmlUrl}"`;
  
  console.log('Exécution du rendu graphique en cours...');
  execSync(commande, { stdio: 'inherit' });

  // Contrôle des dimensions et de la validité du PNG généré
  if (fs.existsSync(destinationPng)) {
    const pngBuffer = fs.readFileSync(destinationPng);
    const width = pngBuffer.readUInt32BE(16);
    const height = pngBuffer.readUInt32BE(20);
    const fileSizeKb = Math.round(pngBuffer.length / 1024);

    console.log(`✅ Image Open Graph créée avec succès : ${destinationPng}`);
    console.log(`   - Dimensions : ${width} x ${height} px`);
    console.log(`   - Poids      : ${fileSizeKb} Ko`);

    if (width !== 1200 || height !== 630) {
      console.warn(`⚠ Attention : dimensions attendues 1200x630, obtenues ${width}x${height}`);
    }
  } else {
    throw new Error('Le fichier PNG de destination n\'a pas été créé.');
  }
} catch (error) {
  console.error('❌ Échec de la génération :', error.message);
  process.exit(1);
} finally {
  // Nettoyage du fichier temporaire
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }
}
