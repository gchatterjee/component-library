;(() => {
  var e = {
      959: e => {
        e.exports = '<div id="container"></div> '
      },
      71: e => {
        e.exports =
          '<div id="slide-container"> <div id="toc"> <slot name="toc"></slot> </div> <div id="viewport"> <slot id="slides"></slot> </div> <div id="outer-container"> <div id="inner-container"></div> </div> </div> '
      },
      726: e => {
        e.exports =
          '<div id="slide"> <slot id="content"></slot> <div> </div></div>'
      }
    },
    t = {}
  function i(o) {
    if (t[o]) return t[o].exports
    var s = (t[o] = { exports: {} })
    return e[o](s, s.exports, i), s.exports
  }
  ;(i.n = e => {
    var t = e && e.__esModule ? () => e.default : () => e
    return i.d(t, { a: t }), t
  }),
    (i.d = (e, t) => {
      for (var o in t)
        i.o(t, o) &&
          !i.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] })
    }),
    (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      'use strict'
      function e(e, t) {
        const i = document.createElement('template')
        return (i.innerHTML = `${e}<style type="text/css">${t}</style>`), i
      }
      var t = i(71)
      const o = e(
        i.n(t)(),
        ':host{width:100%;height:100%}:host #slide-container{position:relative;width:100%;height:100%;display:flex;align-items:center}:host #slide-container #toc{position:absolute}:host #slide-container #viewport{overflow:hidden;position:absolute;width:100%;height:100%}:host #slide-container #outer-container{position:relative;width:100%;height:100%;overflow-y:scroll}:host #slide-container #outer-container #inner-container{width:0}'
      )
      class s extends HTMLElement {
        constructor() {
          super(),
            this.attachShadow({ mode: 'open' }).appendChild(
              o.content.cloneNode(!0)
            )
        }
        connectedCallback() {
          this.shadowRoot
            .querySelector('#slides')
            .addEventListener('slotchange', this.setHeight.bind(this)),
            this.shadowRoot
              .querySelector('#outer-container')
              .addEventListener('scroll', this.setCurrentSlide.bind(this))
        }
        disconnectedCallback() {
          this.shadowRoot
            .querySelector('#slides')
            .removeEventListener('slotchange', this.setHeight.bind(this)),
            this.shadowRoot
              .querySelector('#outer-container')
              .removeEventListener('scroll', this.setCurrentSlide.bind(this))
        }
        setHeight() {
          const e = this.shadowRoot.querySelector('#inner-container'),
            t = this.querySelectorAll('gchatterjee-slide')
          ;(e.style.height = 100 * t.length + '%'),
            setTimeout(this.setCurrentSlide.bind(this), 0)
        }
        setCurrentSlide() {
          const e = this.shadowRoot.querySelector('#outer-container'),
            t = Math.round(
              e.offsetHeight ? e.scrollTop / e.offsetHeight : void 0
            )
          if (t !== this.activeSlide) {
            this.activeSlide = t
            const e = this.querySelectorAll('gchatterjee-slide')
            e.forEach((e, i) => {
              i === t ? e.classList.add('active') : e.classList.remove('active')
            })
            const i = this.querySelector('gchatterjee-circle-toc[slot=toc]')
            i.setAttribute('number', `${t}`), i.setAttribute('of', e.length)
          }
        }
      }
      customElements.define('gchatterjee-slide-container', s)
      var n = i(959)
      const r = e(
        i.n(n)(),
        ':host{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px}:host div.circle{opacity:50%;transition:opacity 1s}:host div.circle.active{opacity:100%}'
      )
      class c extends HTMLElement {
        constructor() {
          super(),
            this.attachShadow({ mode: 'open' }).appendChild(
              r.content.cloneNode(!0)
            )
        }
        static get observedAttributes() {
          return ['number', 'of']
        }
        setActiveCircle(e) {
          this.shadowRoot.querySelectorAll('div.circle').forEach((t, i) => {
            const o = e === i ? 'add' : 'remove'
            t.classList[o]('active')
          })
        }
        renderIndicatorCircles(e, t) {
          const i = [...new Array(e)]
            .map(() => '<div class="circle">&bull;</div>')
            .join('')
          ;(this.shadowRoot.querySelector('#container').innerHTML = i),
            this.setActiveCircle(t)
        }
        attributeChangedCallback(e, t, i) {
          console.log(`another one: ${e}`)
          const o = parseInt(this.getAttribute('number'), 10),
            s = parseInt(this.getAttribute('of'), 10)
          switch (e) {
            case 'number':
              t === i || isNaN(o) || isNaN(s) || this.setActiveCircle(o)
              break
            case 'of':
              t === i ||
                isNaN(o) ||
                isNaN(s) ||
                this.renderIndicatorCircles(s, o)
              break
            default:
              return
          }
        }
      }
      customElements.define('gchatterjee-circle-toc', c)
      var l = i(726)
      const a = e(
        i.n(l)(),
        ':host{position:absolute;top:0;left:0;width:100%;height:100%;justify-content:space-between;opacity:0;transition:opacity 1s,visibility 0s 1s;visibility:hidden}:host(.active){transition:opacity 1s;opacity:100%;visibility:visible}#slide{width:100%;height:100%;display:flex;align-items:center;justify-content:space-between}#content::slotted(*){text-align:center;flex:auto}'
      )
      class d extends HTMLElement {
        constructor() {
          super(),
            this.attachShadow({ mode: 'open' }).appendChild(
              a.content.cloneNode(!0)
            )
        }
      }
      customElements.define('gchatterjee-slide', d)
    })()
})()
