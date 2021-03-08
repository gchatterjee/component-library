import attachElements from '../../lib/attachElements'

import markup from './percentage-bar.html'
import style from './percentage-bar.scss'

const template = attachElements(markup, style)

class PercentageBar extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }

  static get observedAttributes() {
    return ['percent', 'disabled']
  }

  attributeChangedCallback() {
    const bar = this.shadowRoot.querySelector('#bar')
    if (this.getAttribute('disabled') !== null) {
      bar.style.width = '0'
    } else {
      bar.style.width = `${this.getAttribute('percent') || '0'}%`
    }
  }
}

customElements.define('gchatterjee-percentage-bar', PercentageBar)
