import * as d3 from "d3";
import "eg-renderer/umd/eg-renderer.js";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

customElements.whenDefined("eg-renderer").then(() => {
  const renderer = document.getElementById("renderer");

  renderer.addEventListener("datafetchend", (event) => {
    const data = event.detail;
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    for (const node of data.nodes) {
      node.fillColor = colorScale(node["Modularity Class"]);
      node.x *= 1000;
      node.y *= 1000;
    }
  });
});
