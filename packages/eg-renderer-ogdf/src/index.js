import {layout} from './layout'

const egRendererTagName = 'eg-renderer'

window.customElements.whenDefined(egRendererTagName).then(() => {
  const EgRendererElement = window.customElements.get(egRendererTagName)

  class EgRendererOGDFElement extends EgRendererElement {
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
      if (this.autoUpdate) {
        this.layout()
      }
    }
  }

  window.customElements.define('eg-renderer-ogdf', EgRendererOGDFElement)
})
