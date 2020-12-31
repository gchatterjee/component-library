import attachElements from '../../lib/attachElements'

import markup from './circle-toc.html'
import style from './circle-toc.scss'

const template = attachElements(markup, style)

class CircleToc extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }

  static get observedAttributes() {
    return ['number', 'of']
  }

  setActiveCircle(indicator) {
    const circles = this.shadowRoot.querySelectorAll('div.circle')
    circles.forEach((circle, i) => {
      const action = indicator === i ? 'add' : 'remove'
      circle.classList[action]('active')
    })
  }

  renderIndicatorCircles(count, indicator) {
    const circles = [...new Array(count)]
      .map(() => '<div class="circle">&bull;</div>')
      .join('')
    this.shadowRoot.querySelector('#container').innerHTML = circles
    this.setActiveCircle(indicator)
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    const indicator = parseInt(this.getAttribute('number'), 10)
    const count = parseInt(this.getAttribute('of'), 10)
    switch (attributeName) {
      case 'number':
        if (oldValue !== newValue && !isNaN(indicator) && !isNaN(count))
          this.setActiveCircle(indicator)
        break
      case 'of':
        if (oldValue !== newValue && !isNaN(indicator) && !isNaN(count))
          this.renderIndicatorCircles(count, indicator)
        break
      default:
        return
    }
  }
}

customElements.define('gchatterjee-circle-toc', CircleToc)
