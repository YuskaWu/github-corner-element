import { execSync } from 'child_process'
import fs from 'fs'

execSync(
  'npx github-readme-to-html -i README.md -o index.html -t github-corner-element'
)
fs.renameSync('./dist/index.html', './docs/index.html')
