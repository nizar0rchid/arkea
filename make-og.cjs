const sharp = require('sharp')
const path = require('path')

const W = 1200
const H = 630
const ROOT = 'C:/Users/nizar/Desktop/arkea-website'

// Mirrors app/globals.css theme tokens
const BG = '#0b0a0c'
const FG = '#f2ede6'
const PRIMARY = '#712fff'
const DIM = '#6b6460'

const DISPLAY = 'Bebas Neue'
const MONO = 'Consolas'

// Everything is drawn as SVG so the type, spacing and emblem match the page
const layer = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gridFade" cx="50%" cy="50%" r="78%">
      <stop offset="0%" stop-color="#0b0a0c" stop-opacity="0"/>
      <stop offset="58%" stop-color="#0b0a0c" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0b0a0c" stop-opacity="0.55"/>
    </radialGradient>
    <radialGradient id="scrim" cx="50%" cy="50%" r="62%">
      <stop offset="0%" stop-color="#0b0a0c" stop-opacity="0.42"/>
      <stop offset="60%" stop-color="#0b0a0c" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0b0a0c" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="55%">
      <stop offset="0%" stop-color="${PRIMARY}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${PRIMARY}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${PRIMARY}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${PRIMARY}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${PRIMARY}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <g stroke="${FG}" stroke-opacity="0.14" stroke-width="1">
    ${Array.from({ length: Math.ceil(W / 64) + 1 }, (_, i) => `<line x1="${i * 64}" y1="0" x2="${i * 64}" y2="${H}"/>`).join('')}
    ${Array.from({ length: Math.ceil(H / 64) + 1 }, (_, i) => `<line x1="0" y1="${i * 64}" x2="${W}" y2="${i * 64}"/>`).join('')}
  </g>
  <rect width="${W}" height="${H}" fill="url(#gridFade)"/>

  <g opacity="0.28" transform="translate(${W / 2} ${H / 2}) scale(0.54) translate(-617 -617)">
    ${require('fs').readFileSync(path.join(ROOT, 'public/SVG/pad-emblem.svg'), 'utf8').replace(/<\?xml[^>]*\?>/, '').replace(/<svg[^>]*>/, '').replace('</svg>', '')}
  </g>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>

  <text x="${W / 2}" y="152" text-anchor="middle"
        font-family="${DISPLAY}" font-size="31" letter-spacing="9"
        fill="${PRIMARY}">SOMETHING IS COMING</text>

  <image href="data:image/png;base64,${require('fs').readFileSync(path.join(ROOT, 'public/logo.png')).toString('base64')}"
         x="${W / 2 - 180}" y="186" width="360" height="126"
         preserveAspectRatio="xMidYMid meet" opacity="0.94"/>

  <text x="${W / 2}" y="392" text-anchor="middle"
        font-family="${DISPLAY}" font-size="52" letter-spacing="2"
        fill="${FG}" fill-opacity="0.95">TRIALS OF THE ELEMENTS</text>

  <rect x="${W / 2 - 165}" y="424" width="330" height="1.5" fill="url(#rule)"/>

  <text x="${W / 2}" y="487" text-anchor="middle"
        font-family="${MONO}" font-size="30" font-weight="700" letter-spacing="4"
        fill="${PRIMARY}">13 OCTOBER 2026 &#8212; 19:00 UTC+1</text>

  <text x="${W / 2}" y="534" text-anchor="middle"
        font-family="Inter, Arial, sans-serif" font-size="25"
        fill="${FG}" fill-opacity="0.6">Every element hides a trial, every trial reveals a secret.</text>
</svg>`

async function main() {
  const out = path.join(ROOT, 'public/og-image-countdown.png')

  await sharp(globalThis.Buffer.from(layer))
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(out)

  const meta = await sharp(out).metadata()
  globalThis.console.log('wrote', out)
  globalThis.console.log('dimensions:', meta.width + 'x' + meta.height)
  globalThis.console.log('format:', meta.format, 'channels:', meta.channels)
}

main().catch((err) => {
  globalThis.console.error(err)
  globalThis.process.exit(1)
})
