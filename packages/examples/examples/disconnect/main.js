import "eg-renderer/umd/eg-renderer.js";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

document.getElementById("toggle-button").addEventListener("click", () => {
  const e = document.getElementById("container");
  if (e.innerHTML) {
    e.innerHTML = "";
  } else {
    e.innerHTML = `<eg-renderer width="600" height="400" src="/data/demo.json"></eg-renderer>`;
  }
});
