import attachElements from '../../lib/attachElements'

import markup from './top-bar.html'
import style from './top-bar.scss'

const template = attachElements(markup, style)

class TopBar extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    document.addEventListener('scroll', () =>
      this.classList[window.scrollY > 0 ? 'add' : 'remove']('collapsed')
    )
  }
}

customElements.define('gchatterjee-top-bar', TopBar)
