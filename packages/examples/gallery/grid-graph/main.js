import "eg-renderer/umd/eg-renderer.js";
import "eg-renderer-ogdf/umd/eg-renderer-ogdf";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

customElements.whenDefined("eg-renderer-ogdf").then(() => {
  const renderer = document.querySelector("eg-renderer-ogdf");
  const size = 20;
  const rows = size;
  const cols = size;
  const nodes = [];
  const links = [];
  for (let i = 0; i < rows * cols; ++i) {
    nodes.push({});
  }
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (i !== rows - 1) {
        links.push({ source: i * cols + j, target: (i + 1) * cols + j });
      }
      if (j !== cols - 1) {
        links.push({ source: i * cols + j, target: i * cols + j + 1 });
      }
    }
  }
  renderer.load({ nodes, links });
});
