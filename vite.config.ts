import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const packageJson = JSON.parse(
  readFileSync(resolve(import.meta.dirname, 'package.json'), 'utf8'),
) as { version: string }

const appVersion = packageJson.version
const buildId = `${appVersion}-${process.env.GITHUB_SHA?.slice(0, 8) ?? process.env.CI_COMMIT_SHA?.slice(0, 8) ?? Date.now()}`

function versionedServiceWorker(): Plugin {
  return {
    name: 'versioned-service-worker',
    generateBundle() {
      const template = readFileSync(
        resolve(import.meta.dirname, 'service-worker.template.js'),
        'utf8',
      )

      this.emitFile({
        type: 'asset',
        fileName: 'service-worker.js',
        source: template
          .replaceAll('__APP_VERSION__', appVersion)
          .replaceAll('__BUILD_ID__', buildId),
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), versionedServiceWorker()],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __BUILD_ID__: JSON.stringify(buildId),
  },
})
