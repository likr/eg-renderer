import "eg-renderer/umd/eg-renderer.js";
import "eg-renderer-ogdf/umd/eg-renderer-ogdf";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

customElements.whenDefined("eg-renderer-ogdf").then(() => {
  const egRenderer = document.getElementById("renderer");
  const contentWrapper = document.getElementById("wrapper");
  egRenderer.setAttribute("width", contentWrapper.clientWidth);
  egRenderer.setAttribute("height", contentWrapper.clientHeight);

  window.addEventListener("resize", (event) => {
    egRenderer.setAttribute("width", contentWrapper.clientWidth);
    egRenderer.setAttribute("height", contentWrapper.clientHeight);
  });

  document.getElementById("update").addEventListener("click", (event) => {
    egRenderer.update();
  });

  document.getElementById("center").addEventListener("click", (event) => {
    egRenderer.center();
  });

  document.getElementById("layout").addEventListener("change", (event) => {
    egRenderer.layoutMethod = event.target.value;
  });

  document.getElementById("auto-update").addEventListener("change", (event) => {
    egRenderer.autoUpdate = event.target.checked;
  });

  document
    .getElementById("auto-centering")
    .addEventListener("change", (event) => {
      egRenderer.autoCentering = event.target.checked;
    });
});
