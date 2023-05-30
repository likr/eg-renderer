import "eg-renderer/umd/eg-renderer.js";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

customElements.whenDefined("eg-renderer").then(() => {
  const renderer = document.querySelector("eg-renderer");

  document.querySelector("#shuffle").addEventListener("click", () => {
    for (const node of renderer.data.nodes) {
      node.x = Math.random() * 400 + 100;
      node.y = Math.random() * 200 + 100;
    }
    for (const link of renderer.data.links) {
      if (link.bends) {
        for (const p of link.bends) {
          p[0] = Math.random() * 400 + 100;
          p[1] = Math.random() * 200 + 100;
        }
      }
    }
    renderer.update();
  });
});
