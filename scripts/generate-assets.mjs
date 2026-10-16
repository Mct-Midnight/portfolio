// Script de génération des maquettes et miniatures PNG vectorielles
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function createPng(width, height, r, g, b) {
  // Génère un PNG valide non compressé avec la couleur RGB donnée
  const rawData = Buffer.alloc(height * (1 + width * 3));
  let pos = 0;
  for (let y = 0; y < height; y++) {
    rawData[pos++] = 0; // Filter type 0: None
    for (let x = 0; x < width; x++) {
      rawData[pos++] = r;
      rawData[pos++] = g;
      rawData[pos++] = b;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ ((c & 1) ? 0xedb88320 : 0);
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const combined = Buffer.concat([typeBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(combined), 0);
    return Buffer.concat([len, combined, crc]);
  }

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 2; // Truecolor (RGB)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  return Buffer.concat([
    header,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflated),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// Couleurs en RGB
const terracotta = [24, 24, 27]; // Anthracite mat
const espresso = [39, 39, 42]; // Titane foncé
const moka = [244, 244, 245]; // Gris titane clair
const sage = [228, 228, 231]; // Gris titane moyen

const files = [
  { path: 'public/assets/images/projets/contacts-list.png', w: 800, h: 450, color: moka },
  { path: 'public/assets/images/projets/contacts-form.png', w: 800, h: 450, color: sage },
  { path: 'public/assets/images/projets/contacts-mcd.png', w: 800, h: 450, color: espresso },
  { path: 'public/assets/images/projets/contacts-mvc.png', w: 800, h: 450, color: terracotta },
  { path: 'public/assets/images/projets/ap2-tickets.png', w: 800, h: 450, color: sage },
  { path: 'public/assets/images/projets/ap2-dashboard.png', w: 800, h: 450, color: espresso },
  { path: 'public/assets/images/projets/ap2-mcd.png', w: 800, h: 450, color: terracotta },
  { path: 'public/assets/images/projets/ap2-usecase.png', w: 800, h: 450, color: moka },
  { path: 'public/assets/images/projets/stage-architecture-placeholder.png', w: 800, h: 450, color: espresso },
  { path: 'public/assets/images/projets/stage-ui-placeholder.png', w: 800, h: 450, color: sage },
  { path: 'public/assets/images/projets/portfolio-dualpane.png', w: 800, h: 450, color: espresso },
  { path: 'public/assets/images/projets/portfolio-architecture.png', w: 800, h: 450, color: terracotta },
  { path: 'public/assets/images/projets/portfolio-cicd.png', w: 800, h: 450, color: sage },
  { path: 'public/assets/images/projets/portfolio-lighthouse.png', w: 800, h: 450, color: moka },
];

for (const f of files) {
  const buf = createPng(f.w, f.h, f.color[0], f.color[1], f.color[2]);
  fs.writeFileSync(f.path, buf);
}
console.log('PNGs créés avec succès.');
