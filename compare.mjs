import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'fs'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')

const PORT = 5179

// 1. Take page screenshot
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle', timeout: 15000 })
await page.screenshot({ path: 'page_screenshot.png', fullPage: true })

// 2. Get the concept image (read it, save as PNG)
const conceptPath = 'C:\\Users\\Joaquin\\proyects\\portafolio\\features\\proyectos\\concepto.png'
const conceptBuf = readFileSync(conceptPath)
writeFileSync('concept_copy.png', conceptBuf)

// 3. Compare dimensions
const pageImg = PNG.sync.read(readFileSync('page_screenshot.png'))
const conceptImg = PNG.sync.read(readFileSync('concept_copy.png'))

console.log('Page screenshot:', pageImg.width, 'x', pageImg.height)
console.log('Concept image:', conceptImg.width, 'x', conceptImg.height)

// 4. Try to extract dominant colors from specific regions of the concept
// to understand the layout

// Sample colors at various grid points
function sampleGrid(img, cols, rows) {
  const results = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = Math.round((c + 0.5) * img.width / cols)
      const y = Math.round((r + 0.5) * img.height / rows)
      const idx = (y * img.width + x) * 4
      const color = [img.data[idx], img.data[idx+1], img.data[idx+2]]
      results.push({ x, y, color: `rgb(${color[0]},${color[1]},${color[2]})`, hex: '#' + color.map(v => v.toString(16).padStart(2,'0')).join('') })
    }
  }
  return results
}

const gridSamples = sampleGrid(conceptImg, 8, 6)
console.log('\nConcept image color samples (8x6 grid):')
gridSamples.forEach(s => console.log(`  (${s.x},${s.y}): ${s.hex}`))

// 5. Find where the hexagons are in the concept (look for hexagon-shaped clusters)
// Analyze horizontal lines at various heights to detect where hexagons are
function analyzeLine(img, y) {
  const colors = []
  for (let x = 0; x < img.width; x += 5) {
    const idx = (y * img.width + x) * 4
    const r = img.data[idx], g = img.data[idx+1], b = img.data[idx+2], a = img.data[idx+3]
    // Check if pixel is not background (not amber/gray)
    const isNonBg = !(r > 200 && g > 180 && b > 150) && a > 200
    colors.push({ x, isNonBg })
  }
  // Find clusters of non-background pixels
  const clusters = []
  let start = null
  for (let i = 0; i < colors.length; i++) {
    if (colors[i].isNonBg && start === null) start = colors[i].x
    else if (!colors[i].isNonBg && start !== null) {
      clusters.push({ start, end: colors[i-1].x, width: colors[i-1].x - start })
      start = null
    }
  }
  if (start !== null) clusters.push({ start, end: colors[colors.length-1].x, width: colors[colors.length-1].x - start })
  return clusters
}

console.log('\nConcept hexagon positions (horizontal cross-section at y=30%):')
const y30 = Math.round(conceptImg.height * 0.3)
const clusters30 = analyzeLine(conceptImg, y30)
clusters30.forEach(c => console.log(`  y=${y30}: cluster x=${c.start}-${c.end}, width=${c.width}px`))

console.log('\nConcept hexagon positions (horizontal cross-section at y=55%):')
const y55 = Math.round(conceptImg.height * 0.55)
const clusters55 = analyzeLine(conceptImg, y55)
clusters55.forEach(c => console.log(`  y=${y55}: cluster x=${c.start}-${c.end}, width=${c.width}px`))

console.log('\nConcept hexagon positions (horizontal cross-section at y=80%):')
const y80 = Math.round(conceptImg.height * 0.8)
const clusters80 = analyzeLine(conceptImg, y80)
clusters80.forEach(c => console.log(`  y=${y80}: cluster x=${c.start}-${c.end}, width=${c.width}px`))

// Get page hexagon positions from the DOM
const pageInfo = await page.evaluate(() => {
  const section = document.getElementById('projects')
  if (!section) return null
  const btns = section.querySelectorAll('button')
  const cells = []
  btns.forEach(btn => {
    const r = btn.getBoundingClientRect()
    cells.push({
      x: Math.round(r.x), y: Math.round(r.y),
      w: Math.round(r.width), h: Math.round(r.height),
      text: btn.textContent?.trim().substring(0, 30),
    })
  })
  return cells
})

console.log('\nPage hexagon positions:')
pageInfo.forEach(c => console.log(`  "${c.text}" at (${c.x},${c.y}) size ${c.w}x${c.h}`))

await browser.close()
