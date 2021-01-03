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

  connectedCallback() {
    const sectionTitleSlot = this.shadowRoot.querySelector(
      'slot[name=section-title]'
    )
    sectionTitleSlot.addEventListener('slotchange', () =>
      this.renderIndicatorCircles.bind(this)(
        parseInt(this.getAttribute('of'), 10),
        parseInt(this.getAttribute('number'), 10)
      )
    )
  }

  disconnectedCallback() {
    const sectionTitleSlot = this.shadowRoot.querySelector(
      'slot[name=section-title]'
    )
    sectionTitleSlot.addEventListener('slotchange', () =>
      this.renderIndicatorCircles.bind(this)(
        parseInt(this.getAttribute('of'), 10),
        parseInt(this.getAttribute('number'), 10)
      )
    )
  }

  static get observedAttributes() {
    return ['number', 'of']
  }

  setActiveCircle(indicator) {
    const circles = this.shadowRoot.querySelectorAll('span.bullet')
    if (indicator < circles.length) {
      if (this.activeCircle !== undefined)
        circles[this.activeCircle].classList.remove('active')
      circles[indicator].classList.add('active')
      this.activeCircle = indicator
    }
  }

  renderIndicatorCircles(count, indicator) {
    const template = this.shadowRoot.querySelector('template#circle-template')
    const circles = [...new Array(count)]
    const container = this.shadowRoot.querySelector('#container')
    container.innerHTML = ''
    const elements = new DocumentFragment()
    circles.forEach((_, i) => {
      const contents = template.content.cloneNode(true)
      const title = this.children.item(i)
      if (title) {
        contents.querySelector('span.section-title').innerText =
          title.textContent
      }
      if (title && title.getAttribute('href')) {
        contents.querySelector(
          'span.bullet'
        ).innerHTML = `<a href="${title.getAttribute('href')}">&bull;</a>`
      }
      elements.appendChild(contents)
    })
    container.appendChild(elements)
    this.setActiveCircle(indicator)
  }

  // attributeChangedCallback(attributeName, oldValue, newValue) {
  //   const indicator = parseInt(this.getAttribute('number'), 10)
  //   const count = parseInt(this.getAttribute('of'), 10)
  //   switch (attributeName) {
  //     case 'number':
  //       if (oldValue !== newValue && !isNaN(indicator) && !isNaN(count))
  //         this.setActiveCircle(indicator)
  //       break
  //     case 'of':
  //       if (oldValue !== newValue && !isNaN(indicator) && !isNaN(count))
  //         this.renderIndicatorCircles(count, indicator)
  //       break
  //     default:
  //       return
  //   }
  // }
}

customElements.define('gchatterjee-circle-toc', CircleToc)
