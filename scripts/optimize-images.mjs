import { readdir, stat, unlink, writeFile } from 'node:fs/promises'
import { join, parse, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const IMAGES_DIR = join(ROOT, 'public', 'images')
const MAX_WIDTH = 1280
const QUALITY = 80
const INPUT_EXTS = new Set(['.png', '.jpg', '.jpeg'])

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (INPUT_EXTS.has(extname(entry.name).toLowerCase())) files.push(full)
  }
  return files
}

async function main() {
  const files = await walk(IMAGES_DIR)
  if (files.length === 0) {
    console.log('No se encontraron imágenes para optimizar.')

    return
  }

  let saved = 0
  const rows = []

  for (const file of files) {
    const { dir, name } = parse(file)
    const out = join(dir, `${name}.webp`)

    const before = await stat(file)

    const image = sharp(file)
    const meta = await image.metadata()

    const needsResize =
      meta.width === undefined ||
      meta.width > MAX_WIDTH ||
      meta.height === undefined ||
      meta.height > MAX_WIDTH

    let pipeline = image
    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, height: MAX_WIDTH, fit: 'inside', withoutEnlargement: true })
    }

    const buffer = await pipeline.webp({ quality: QUALITY }).toBuffer()
    await writeFile(out, buffer)
    await unlink(file)

    const after = await stat(out)
    const reduction = ((1 - after.size / before.size) * 100).toFixed(1)
    saved += before.size - after.size
    rows.push({ name: `${parse(out).base} (${meta.width}x${meta.height})`, before: before.size, after: after.size, reduction })
  }

  console.table(rows.map((r) => ({ ...r, beforeKb: (r.before / 1024).toFixed(1), afterKb: (r.after / 1024).toFixed(1), reduction: `${r.reduction}%` })))
  console.log(`Total: ${(saved / 1024 / 1024).toFixed(2)} MB liberados (${files.length} imágenes)`)
}

main().catch((err) => {
  console.error(err)

  process.exit(1)
})