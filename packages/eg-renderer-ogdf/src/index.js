import {layout} from './layout'

const egRendererTagName = 'eg-renderer'

window.customElements.whenDefined(egRendererTagName).then(() => {
  const EgRendererElement = window.customElements.get(egRendererTagName)

  class EgRendererOGDFElement extends EgRendererElement {
    static get observedAttributes () {
      const attributes = [
        'layout-method'
      ]
      return attributes.concat(EgRendererElement.observedAttributes)
    }

    attributeChangedCallback (attr, oldValue, newValue) {
      switch (attr) {
        case 'layout-method':
          if (this.autoUpdate) {
            this.layout()
          }
          break
        default:
          super.attributeChangedCallback(attr, oldValue, newValue)
      }
    }

    onLayout (data) {
      layout(data, this.layoutMethod)
    }

    get layoutMethod () {
      if (!this.hasAttribute('layout-method')) {
        return 'fmmm'
      }
      return this.getAttribute('layout-method')
    }

    set layoutMethod (value) {
      this.setAttribute('layout-method', value)
    }
  }

  window.customElements.define('eg-renderer-ogdf', EgRendererOGDFElement)
})
