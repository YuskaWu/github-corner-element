import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'github-corner-element',
      formats: ['es', 'umd'],
      fileName: (format) => `github-corner-element.${format}.js`,
    },
    rollupOptions: {},
  },
})
