import { existsSync } from 'node:fs'
import { mkdir, rename, rm } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const apiDir = resolve(root, 'src/app/api')
const parkedDir = resolve(root, '.next-static-build/api')

await mkdir(dirname(parkedDir), { recursive: true })
if (existsSync(parkedDir)) await rm(parkedDir, { recursive: true, force: true })
if (existsSync(apiDir)) await rename(apiDir, parkedDir)

try {
  const nextBin = resolve(root, 'node_modules/next/dist/bin/next')
  const code = await new Promise((done) => {
    const child = spawn(process.execPath, [nextBin, 'build'], { cwd: root, stdio: 'inherit', env: process.env })
    child.on('exit', (value) => done(value ?? 1))
  })
  if (code !== 0) process.exitCode = code
} finally {
  if (existsSync(parkedDir)) await rename(parkedDir, apiDir)
  if (existsSync(dirname(parkedDir))) await rm(dirname(parkedDir), { recursive: true, force: true })
}
