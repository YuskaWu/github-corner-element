import { execSync } from 'child_process'
import fs from 'fs'
import showdown from 'showdown'
import showdownHighlight from 'showdown-highlight'
import docMeta from './doc-meta.json' assert { type: 'json' }

const SAVE_PATH = './docs/index.html'
const GITHUB_CSS_FILE_PATH =
  './node_modules/github-markdown-css/github-markdown.css'
const HLJS_CSS_FILE_PATH = './node_modules/highlight.js/styles/github.css'

const converter = new showdown.Converter({
  ghCompatibleHeaderId: true,
  simpleLineBreaks: true,
  ghMentions: true,
  tables: true,
  emoji: true,
  parseImgDimensions: true,
  extensions: [showdownHighlight],
})

converter.setFlavor('github')

const githubCssText = fs.readFileSync(GITHUB_CSS_FILE_PATH, 'utf-8')
const hljsCssText = fs.readFileSync(HLJS_CSS_FILE_PATH, 'utf-8')
const readmeText = fs.readFileSync('./README.md', 'utf-8')
const readmeHtml = converter.makeHtml(readmeText)

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>${docMeta['title']}</title>
    <link rel="icon" type="image/png" href="./favicon.png">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="Yuska Wu, yuska@msn.com" />
    <meta name="description" content="${docMeta['description']}" />

    <!-- FB sharing meta data -->
    <meta property="og:url" content="${docMeta['url']}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${docMeta['title']}" />
    <meta property="og:description" content="${docMeta['description']}" />
    <meta property="og:image" content="${docMeta['image'].url}" />
    <meta property="og:image:type" content="image/png" />

    <!-- Twitter sharing meta data -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${docMeta['title']}" />
    <meta name="twitter:description" content="${docMeta['description']}" />
    <meta name="twitter:image" content="${docMeta['image'].url}" />

    <style>
      ${hljsCssText}
      ${githubCssText}

      .markdown-body {
        box-sizing: border-box;
        max-width: 980px;
        margin: 0 auto;
        padding: 2rem;
      }

      @media (max-width: 767px) {
        .markdown-body {
          padding: 1rem;
        }
      }
    </style>

    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "DigitalDocument",
      "name": "${docMeta['title']} document",
      "keywords": "Web Components, Custom Element, github-corner, corner banner, octocat",
      "description": "${docMeta['description']}",
      "url": "${docMeta['url']}"
    }
    </script>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WBCJWPM');</script>
    <!-- End Google Tag Manager -->

  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WBCJWPM"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <main class="markdown-body">
    ${readmeHtml}
    </main>
  </body>
</html>
`

fs.writeFileSync(SAVE_PATH, html, 'utf-8')

execSync(`npx prettier --write ${SAVE_PATH}`)
