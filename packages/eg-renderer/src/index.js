import initElement from "./eg-renderer-element";

export default import("eg-renderer-core").then(({ Renderer }) => {
  const EgRendererElement = initElement(Renderer);
  window.customElements.define("eg-renderer", EgRendererElement);
});
