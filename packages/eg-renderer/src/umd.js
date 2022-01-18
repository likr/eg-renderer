import init, { Renderer } from "eg-renderer-core/dist/web/eg_renderer_core";
import initElement from "./eg-renderer-element";

export default (wasmUrl) => {
  return init(wasmUrl).then((result) => {
    const EgRendererElement = initElement(Renderer);
    window.customElements.define("eg-renderer", EgRendererElement);
  });
};
