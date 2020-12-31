import attachElements from '../../lib/attachElements'

import markup from './slide-container.html'
import style from './slide-container.scss'

const template = attachElements(markup, style)

class SlideContainer extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector('#slides')
      .addEventListener('slotchange', this.setHeight.bind(this))
    this.shadowRoot
      .querySelector('#outer-container')
      .addEventListener('scroll', this.setCurrentSlide.bind(this))
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector('#slides')
      .removeEventListener('slotchange', this.setHeight.bind(this))
    this.shadowRoot
      .querySelector('#outer-container')
      .removeEventListener('scroll', this.setCurrentSlide.bind(this))
  }

  setHeight() {
    const innerContainer = this.shadowRoot.querySelector('#inner-container')
    const slides = this.querySelectorAll(':scope > gchatterjee-slide')
    innerContainer.style.height = `${slides.length * 100}%`
    setTimeout(this.setCurrentSlide.bind(this), 0)
  }

  setCurrentSlide() {
    const outerContainer = this.shadowRoot.querySelector('#outer-container')
    const viewport = this.shadowRoot.querySelector('#viewport')
    const visibleSlide = Math.round(
      outerContainer.offsetHeight
        ? outerContainer.scrollTop / outerContainer.offsetHeight
        : undefined
    )
    viewport.style.top = `${outerContainer.scrollTop}px`

    if (visibleSlide !== this.activeSlide) {
      this.activeSlide = visibleSlide || 0
      const slides = this.querySelectorAll(':scope > gchatterjee-slide')
      slides.forEach((slide, i) => {
        if (i === this.activeSlide) slide.classList.add('active')
        else slide.classList.remove('active')
      })
      const toc = this.querySelector('gchatterjee-circle-toc[slot=toc]')
      if (toc) {
        toc.setAttribute('number', `${this.activeSlide}`)
        toc.setAttribute('of', slides.length)
      }
    }
  }
}

customElements.define('gchatterjee-slide-container', SlideContainer)
