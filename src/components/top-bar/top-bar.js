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
    document.addEventListener('scroll', this.toggleCollapse.bind(this))
  }

  toggleCollapse() {
    if (window.scrollY > 0 && !this.classList.contains('collapsed'))
      this.classList.add('collapsed')
    else if (window.scrollY === 0) this.classList.remove('collapsed')
  }
}

customElements.define('gchatterjee-top-bar', TopBar)
