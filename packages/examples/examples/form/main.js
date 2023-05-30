import "eg-renderer/umd/eg-renderer.js";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

customElements.whenDefined("eg-renderer").then(() => {
  const renderer = document.querySelector("eg-renderer");

  renderer.addEventListener("datafetchend", (event) => {
    const data = event.detail;
    const nodes = new Map(data.nodes.map((node, i) => [i, node]));
    const links = new Map(
      data.links.map((link) => [`${link.source}-${link.target}`, link])
    );

    data.nodes.forEach((node, i) => {
      document
        .querySelector(`#node-${i}`)
        .addEventListener("change", (event) => {
          node.visibility = event.target.checked;
          renderer.invalidate();
        });
    });

    data.links.forEach((link) => {
      document
        .querySelector(`#link-${link.source}-${link.target}`)
        .addEventListener("change", (event) => {
          link.visibility = event.target.checked;
          renderer.invalidate();
        });
    });
  });

  renderer.addEventListener("nodemove", (event) => {
    const { id, x, y } = event.detail;
    const node = renderer.data.nodes.find((node) => node.id === id);
    node.x = x;
    node.y = y;
  });
});
