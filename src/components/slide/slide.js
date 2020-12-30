import attachElements from '../../lib/attachElements'

import markup from './slide.html'
import style from './slide.scss'

const template = attachElements(markup, style)

class Slide extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('gchatterjee-slide', Slide)
