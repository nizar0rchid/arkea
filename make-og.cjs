const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const W = 1200
const H = 630
const ROOT = 'C:/Users/nizar/Desktop/arkea-website'

// Mirrors app/globals.css theme tokens
const BG = '#0b0a0c'
const FG = '#f2ede6'
const PRIMARY = '#712fff'

const DISPLAY = 'Bebas Neue'
const MONO = 'Consolas'

const EMBLEM = fs
  .readFileSync(path.join(ROOT, 'public/SVG/pad-emblem.svg'), 'utf8')
  .replace(/<\?xml[^>]*\?>/, '')
  .replace(/<svg[^>]*>/, '')
  .replace('</svg>', '')

const LOGO = fs
  .readFileSync(path.join(ROOT, 'public/logo.png'))
  .toString('base64')

// "TRIALS OF THE ELEMENTS" wordmark, supplied as artwork rather than
// re-typeset. The source has a transparent background but black lettering,
// which vanishes on the dark backdrop, so the RGB channels are inverted while
// alpha is left untouched.
const WORDMARK_PATH = path.join(ROOT, 'public/home/hero/herotitle.png')

let wordmarkCache = null

async function wordmarkLight() {
  if (wordmarkCache) return wordmarkCache

  const { data, info } = await sharp(WORDMARK_PATH)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]
    data[i + 1] = 255 - data[i + 1]
    data[i + 2] = 255 - data[i + 2]
  }

  const out = await sharp(data, { raw: info }).png().toBuffer()
  wordmarkCache = out.toString('base64')
  return wordmarkCache
}

// Shared chrome. Both variants get the same treatment so the pair reads as one
// set: grid texture, sigil watermark, purple glow and scrim.
const backdrop = `
  <defs>
    <radialGradient id="gridFade" cx="50%" cy="50%" r="78%">
      <stop offset="0%" stop-color="${BG}" stop-opacity="0"/>
      <stop offset="58%" stop-color="${BG}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0.55"/>
    </radialGradient>
    <radialGradient id="scrim" cx="50%" cy="50%" r="62%">
      <stop offset="0%" stop-color="${BG}" stop-opacity="0.42"/>
      <stop offset="60%" stop-color="${BG}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
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
    ${Array.from(
      { length: Math.ceil(W / 64) + 1 },
      (_, i) => `<line x1="${i * 64}" y1="0" x2="${i * 64}" y2="${H}"/>`,
    ).join('')}
    ${Array.from(
      { length: Math.ceil(H / 64) + 1 },
      (_, i) => `<line x1="0" y1="${i * 64}" x2="${W}" y2="${i * 64}"/>`,
    ).join('')}
  </g>
  <rect width="${W}" height="${H}" fill="url(#gridFade)"/>

  <g opacity="0.28" transform="translate(${W / 2} ${H / 2}) scale(0.54) translate(-617 -617)">
    ${EMBLEM}
  </g>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
`

const logo = (y, width = 360) => `
  <image href="data:image/png;base64,${LOGO}"
         x="${W / 2 - width / 2}" y="${y}" width="${width}"
         height="${Math.round((width / 658) * 231)}"
         preserveAspectRatio="xMidYMid meet" opacity="0.94"/>
`

const eyebrow = (y, text) => `
  <text x="${W / 2}" y="${y}" text-anchor="middle"
        font-family="${DISPLAY}" font-size="31" letter-spacing="9"
        fill="${PRIMARY}">${text}</text>
`

const title = (y, text) => `
  <text x="${W / 2}" y="${y}" text-anchor="middle"
        font-family="${DISPLAY}" font-size="52" letter-spacing="2"
        fill="${FG}" fill-opacity="0.95">${text}</text>
`

const rule = (y, width = 330) =>
  `<rect x="${W / 2 - width / 2}" y="${y}" width="${width}" height="1.5" fill="url(#rule)"/>`

const mono = (y, text, size = 30) => `
  <text x="${W / 2}" y="${y}" text-anchor="middle"
        font-family="${MONO}" font-size="${size}" font-weight="700" letter-spacing="4"
        fill="${PRIMARY}">${text}</text>
`

const caption = (y, text, size = 25) => `
  <text x="${W / 2}" y="${y}" text-anchor="middle"
        font-family="Inter, Arial, sans-serif" font-size="${size}"
        fill="${FG}" fill-opacity="0.6">${text}</text>
`

const svg = (body) =>
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${backdrop}${body}</svg>`

// Teaser artwork, used while SITE_STATE is countdown.
const countdown = svg(`
  ${eyebrow(152, 'SOMETHING IS COMING')}
  ${logo(186)}
  ${title(392, 'TRIALS OF THE ELEMENTS')}
  ${rule(424)}
  ${mono(487, '13 OCTOBER 2026 &#8212; 19:00 UTC+1')}
  ${caption(534, 'Every element hides a trial, every trial reveals a secret.')}
`)

// General artwork, used for game and home states. Leads with the band the way
// the home page does, with the game as the hook.
const general = (wordmark) => svg(`
  ${logo(196)}
  <image href="data:image/png;base64,${wordmark}"
         x="${W / 2 - 355}" y="352" width="710" height="107"
         preserveAspectRatio="xMidYMid meet"/>
  ${caption(516, 'Play the game, listen to the debut, and meet ArkeA.', 25)}
`)

async function main() {
  const targets = [
    ['public/og-image-countdown.png', countdown],
    ['public/og-image.png', general(await wordmarkLight())],
  ]

  for (const [file, svgSource] of targets) {
    const out = path.join(ROOT, file)
    await sharp(globalThis.Buffer.from(svgSource))
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(out)
    const meta = await sharp(out).metadata()
    const kb = (fs.statSync(out).size / 1024).toFixed(1)
    globalThis.console.log(
      `wrote ${file}  ${meta.width}x${meta.height}  ${kb} KB`,
    )
  }
}

main().catch((err) => {
  globalThis.console.error(err)
  globalThis.process.exit(1)
})