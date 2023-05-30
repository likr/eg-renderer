import "eg-renderer/umd/eg-renderer.js";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

customElements.whenDefined("eg-renderer").then(() => {
  fetch("/data/demo.json")
    .then((response) => response.json())
    .then((data) => {
      const renderer = document.querySelector("eg-renderer");
      renderer.load(data);
    });
});
