import { chromium } from 'playwright'
import { spawn } from 'child_process'

const PORT = 5280
const server = spawn('npx.cmd', ['vite', '--port', String(PORT)], {
  cwd: process.cwd(),
  stdio: 'ignore',
})

await new Promise(r => setTimeout(r, 5000))

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

page.on('pageerror', err => console.log('PAGE_ERR:', err.message))

await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle', timeout: 20000 })

const info = await page.evaluate(() => {
  const section = document.getElementById('projects')
  if (!section) return { error: 'no projects section' }

  const btns = section.querySelectorAll('button')
  const cells = []
  btns.forEach((btn, i) => {
    const r = btn.getBoundingClientRect()
    cells.push({ i, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), text: btn.textContent?.trim().substring(0, 40) })
  })

  return { cells }
})

console.log(JSON.stringify(info, null, 2))
await page.screenshot({ path: 'colmena_screenshot.png', fullPage: true })
console.log('screenshot saved')

await browser.close()
server.kill()
