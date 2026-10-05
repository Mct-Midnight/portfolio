// Script de génération de la bannière Open Graph et Twitter Cards (1200x630 px)
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

console.log('--- Génération de la bannière Open Graph (1200x630 px) ---');

// Encodage de l'avatar en base64 pour un rendu immédiat et sans dépendance réseau
let avatarBase64 = '';
if (fs.existsSync(avatarPath)) {
  const avatarBuffer = fs.readFileSync(avatarPath);
  avatarBase64 = `data:image/jpeg;base64,${avatarBuffer.toString('base64')}`;
  console.log('✓ Avatar de profil chargé avec succès');
} else {
  console.warn('⚠ Avatar introuvable, fallback sans photo');
}

// Gabarit HTML haute fidélité respectant strictement la charte graphique monochrome et titane
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
        radial-gradient(circle at 10% 10%, rgba(39, 39, 42, 0.4) 0%, transparent 40%),
        radial-gradient(circle at 90% 90%, rgba(39, 39, 42, 0.3) 0%, transparent 40%);
      color: #FAFAFA;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 36px;
      overflow: hidden;
    }

    .container {
      width: 100%;
      height: 100%;
      background: #18181B;
      border: 1px solid #27272A;
      border-radius: 20px;
      padding: 44px 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
    }

    /* Grille décorative subtile en fond */
    .container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-size: 32px 32px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      pointer-events: none;
      border-radius: 20px;
    }

    .left-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 2;
      padding-right: 36px;
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
      padding: 6px 14px;
      background: #27272A;
      border: 1px solid #3F3F46;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #F4F4F5;
    }

    .badge-stage {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
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
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .candidate-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 52px;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #FFFFFF;
      line-height: 1.1;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .role-title {
      font-size: 24px;
      font-weight: 700;
      color: #E4E4E7;
      margin-bottom: 12px;
    }

    .description {
      font-size: 16px;
      color: #A1A1AA;
      line-height: 1.5;
      max-width: 580px;
    }

    .skills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 8px;
    }

    .skill-pill {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      background: #212124;
      border: 1px solid #2E2E33;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #D4D4D8;
    }

    .footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #27272A;
      padding-top: 18px;
      margin-top: 12px;
    }

    .site-domain {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15px;
      font-weight: 600;
      color: #FAFAFA;
      letter-spacing: 0.02em;
    }

    .site-tag {
      font-size: 13px;
      color: #71717A;
    }

    /* Colonne droite : Photo & Carte d'identité */
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
      padding: 6px;
      background: linear-gradient(135deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.7);
    }

    .photo-inner {
      width: 100%;
      height: 100%;
      border-radius: 18px;
      overflow: hidden;
      background: #27272A;
    }

    .photo-inner img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      filter: grayscale(100%) contrast(108%);
    }

    .card-meta {
      width: 100%;
      background: #202024;
      border: 1px solid #2C2C30;
      border-radius: 16px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
    }

    .meta-label {
      color: #71717A;
      font-weight: 500;
    }

    .meta-val {
      color: #FAFAFA;
      font-weight: 600;
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
            <span style="opacity: 0.4">•</span>
            <span>CNED</span>
          </div>
          <div class="badge-stage">
            <span class="dot-green"></span>
            <span>Stage : Mai – Août 2027</span>
          </div>
        </div>

        <div class="main-title-section">
          <h1 class="candidate-name">Quentin Machu</h1>
          <h2 class="role-title">Développeur Logiciel & Solutions Web</h2>
          <p class="description">
            Portfolio professionnel officiel pour l'oral de l'Épreuve E4. Conception applicative moderne, modélisation de bases de données et gestion de projets techniques.
          </p>
        </div>

        <div class="skills-row">
          <div class="skill-pill">Astro 5 &amp; TypeScript</div>
          <div class="skill-pill">Python &amp; SQL / PostgreSQL</div>
          <div class="skill-pill">APIs REST &amp; Architecture B2B</div>
          <div class="skill-pill">Méthodologie Agile</div>
        </div>
      </div>

      <div class="footer-row">
        <div class="site-domain">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span>mct-midnight.github.io</span>
        </div>
        <div class="site-tag">Portfolio &amp; Réalisations techniques</div>
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
          <span class="meta-label">Disponibilité</span>
          <span class="meta-val">4 à 5 semaines</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Certification</span>
          <span class="meta-val">SecNumacadémie &amp; Pix</span>
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
