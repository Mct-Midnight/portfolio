// Script de génération de la bannière Open Graph et Twitter Cards (1200x630 px) - Version Blanche Épurée
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

console.log('--- Génération de la bannière Open Graph claire et naturelle (1200x630 px) ---');

// Encodage de l'avatar en base64 pour un rendu immédiat et sans dépendance réseau
let avatarBase64 = '';
if (fs.existsSync(avatarPath)) {
  const avatarBuffer = fs.readFileSync(avatarPath);
  avatarBase64 = `data:image/jpeg;base64,${avatarBuffer.toString('base64')}`;
  console.log('✓ Avatar de profil chargé avec succès');
} else {
  console.warn('⚠ Avatar introuvable, fallback sans photo');
}

// Gabarit HTML haute fidélité sur fond blanc épuré, sans fioritures artificielles
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
      background-color: #F4F4F5;
      color: #09090B;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 34px;
      overflow: hidden;
    }

    .container {
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border: 1px solid #E4E4E7;
      border-radius: 24px;
      padding: 46px 52px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      position: relative;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    .left-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 2;
      padding-right: 44px;
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
      background: #F4F4F5;
      border: 1px solid #E4E4E7;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #18181B;
    }

    .badge-stage {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 15px;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      color: #047857;
    }

    .dot-green {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
    }

    .main-title-section {
      margin-top: 14px;
      margin-bottom: 8px;
    }

    .candidate-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 54px;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #09090B;
      line-height: 1.05;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .role-title {
      font-size: 24px;
      font-weight: 700;
      color: #3F3F46;
      margin-bottom: 16px;
    }

    .description {
      font-size: 17px;
      color: #71717A;
      line-height: 1.6;
      max-width: 610px;
    }

    .footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #F4F4F5;
      padding-top: 20px;
      margin-top: 10px;
    }

    .site-domain {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 700;
      color: #09090B;
      letter-spacing: 0.01em;
    }

    .site-domain svg {
      color: #18181B;
    }

    .site-tag {
      font-size: 14px;
      font-weight: 500;
      color: #71717A;
    }

    /* Colonne droite : Photo & Informations RH */
    .right-col {
      width: 320px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
    }

    .photo-wrapper {
      position: relative;
      width: 250px;
      height: 250px;
      border-radius: 24px;
      padding: 5px;
      background: #FFFFFF;
      border: 1px solid #E4E4E7;
      box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.1);
    }

    .photo-inner {
      width: 100%;
      height: 100%;
      border-radius: 19px;
      overflow: hidden;
      background: #F4F4F5;
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
      background: #FAFAFA;
      border: 1px solid #E4E4E7;
      border-radius: 18px;
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
    }

    .meta-label {
      color: #71717A;
      font-weight: 500;
    }

    .meta-val {
      color: #09090B;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="left-col">
      <div>
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
            Portfolio professionnel et réalisations techniques dans le cadre du BTS SIO (Option SLAM). Conception applicative, développement web et modélisation de bases de données.
          </p>
        </div>
      </div>

      <div class="footer-row">
        <div class="site-domain">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span>mct-midnight.github.io</span>
        </div>
        <div class="site-tag">Portfolio &amp; Épreuve E4</div>
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
