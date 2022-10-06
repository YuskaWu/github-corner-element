import cssContent from './style.css?inline'
import templateContent from './template.html?raw'

const ELEMENT_NAME = 'github-corner'

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: GithubCorner
  }
}

const ATTRIBUTES = [
  'size',
  'href',
  'placement',
  'banner-color',
  'octocat-color',
  'wave-duration',
] as const

type Attributes = typeof ATTRIBUTES

const template = document.createElement('template')
template.innerHTML = templateContent

const PLACEMENT = ['top-right', 'top-left', 'bottom-right', 'bottom-left']

const DEFAULT_SIZE = '5rem'
const DEFAULT_BANNER_COLOR = 'black'
const DEFAULT_OCTOCAT_COLOR = 'white'
const DEFAULT_DURATION = '0.5s'

class GithubCorner extends HTMLElement {
  #shadowRoot: ShadowRoot

  #anchor: HTMLAnchorElement
  #svgContainer: SVGElement
  #banner: SVGPathElement
  #octocat: SVGGElement
  #octocatArm: SVGPathElement

  #cloneNodes: Node[] = []

  #status: 'init' | 'connected' | 'disconnected' = 'init'

  constructor() {
    super()

    // Create a shadow root
    this.#shadowRoot = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')
    style.textContent = cssContent

    // attach the created elements to the shadow DOM
    this.#shadowRoot.append(style, template.content.cloneNode(true))
    this.#anchor = this.#shadowRoot.querySelector('a.link') as HTMLAnchorElement

    this.#svgContainer = this.#shadowRoot.querySelector(
      'svg.container'
    ) as SVGElement

    this.#banner = this.#shadowRoot.querySelector(
      'path[part=banner]'
    ) as SVGPathElement
    this.#octocat = this.#shadowRoot.querySelector(
      'g[part=octocat]'
    ) as SVGGElement
    this.#octocatArm = this.#shadowRoot.querySelector(
      'path[part=octocat-arm]'
    ) as SVGPathElement

    const svgSlot = this.#shadowRoot.querySelector(
      'slot[name=svg]'
    ) as HTMLSlotElement

    // clone svg nodes from svg slot to svg.container whenever svg slot changes
    svgSlot.addEventListener('slotchange', () => {
      this.#cloneNodes.forEach((n) => {
        if (this.#svgContainer.contains(n)) {
          this.#svgContainer.removeChild(n)
        }
      })

      const svgNodes = svgSlot
        .assignedNodes()
        .filter((n) => n.nodeName === 'svg')
      this.#cloneNodes = svgNodes.map((n) => n.cloneNode(true))
      this.#cloneNodes.forEach((n) => this.#svgContainer.append(n))
    })
  }

  #init() {
    const size = this.getAttribute('size')
    this.#setSize(size ? size : DEFAULT_SIZE)

    if (!this.#banner.getAttribute('fill')) {
      this.#banner.setAttribute('fill', DEFAULT_BANNER_COLOR)
    }
    if (!this.#octocat.getAttribute('fill')) {
      this.#octocat.setAttribute('fill', DEFAULT_OCTOCAT_COLOR)
    }

    if (!this.#octocatArm.style.getPropertyValue('animation-duration')) {
      this.#octocatArm.style.setProperty('animation-duration', DEFAULT_DURATION)
    }

    if (!this.getAttribute('placement')) {
      this.setAttribute('placement', PLACEMENT[0])
    }
  }

  #setSize(size: string) {
    this.style.width = size
    this.style.height = size
  }

  connectedCallback() {
    if (this.#status === 'init') {
      this.#init()
    }
    this.#status = 'connected'
  }

  disconnectedCallback() {
    this.#status = 'disconnected'
  }

  static get observedAttributes(): Attributes {
    return ATTRIBUTES
  }

  attributeChangedCallback(
    attributeName: Attributes[number],
    _: string,
    newValue: string
  ) {
    switch (attributeName) {
      case 'size':
        this.#setSize(newValue)
        break

      case 'href':
        this.#anchor.setAttribute('href', newValue)
        break

      case 'banner-color':
        this.#banner.setAttribute('fill', newValue)
        break

      case 'octocat-color':
        this.#octocat.setAttribute('fill', newValue)
        break

      case 'wave-duration':
        this.#octocatArm.style.setProperty('animation-duration', newValue)
        break

      case 'placement':
        if (!PLACEMENT.includes(newValue)) {
          this.setAttribute('placement', PLACEMENT[0])
          break
        }
    }
  }
}

customElements.define(ELEMENT_NAME, GithubCorner)
