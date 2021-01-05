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
    this.parentNode.addEventListener('scroll', this.adjustSize.bind(this))
  }

  adjustSize() {
    const shouldBeShrunk = this.parentNode.scrollTop !== 0
    if (shouldBeShrunk !== this.isShrunk) {
      const action = shouldBeShrunk ? 'add' : 'remove'
      this.classList[action]('shrunk')
      this.isShrunk = shouldBeShrunk
    }
  }
}

customElements.define('gchatterjee-link-bar', LinkBar)
