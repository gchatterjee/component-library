import attachElements from '../../lib/attachElements'

import markup from './tile.html'
import style from './tile.scss'

const template = attachElements(markup, style)

class Tile extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    const more = this.shadowRoot.querySelector('#more')
    more.addEventListener('click', this.more.bind.this)
  }

  disconnectedCallback() {
    const more = this.shadowRoot.querySelector('#more')
    more.removeEventListener('click', this.more.bind.this)
  }

  more() {
    console.log('more')
  }
}

customElements.define('gchatterjee-tile', Tile)
