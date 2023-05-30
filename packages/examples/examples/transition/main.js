import "eg-renderer/umd/eg-renderer.js";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

customElements.whenDefined("eg-renderer").then(() => {
  const renderer = document.querySelector("eg-renderer");

  let flag = false;
  document.querySelector("#transition").addEventListener("click", () => {
    renderer.nodeVisibilityProperty = flag ? "visibility1" : "visibility2";
    renderer.linkVisibilityProperty = flag ? "visibility1" : "visibility2";
    renderer.linkTypeProperty = flag ? "type1" : "type2";
    flag = !flag;
  });

  renderer.addEventListener("nodemove", (event) => {
    const { id, x, y } = event.detail;
    const node = renderer.data.nodes.find((node) => node.id === id);
    node.x = x;
    node.y = y;
  });
});
