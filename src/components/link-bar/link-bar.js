import attachElements from '../../lib/attachElements'

import markup from './link-bar.html'
import style from './link-bar.scss'

const template = attachElements(markup, style)

class LinkBar extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    this.shadowRoot.querySelector('slot[name=link]')
  }
}

customElements.define('gchatterjee-link-bar', LinkBar)
