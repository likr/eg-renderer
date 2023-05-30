import "eg-renderer/umd/eg-renderer.js";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

customElements.whenDefined("eg-renderer").then(() => {
  const renderer = document.querySelector("eg-renderer");
  const status = document.querySelector("#status");

  renderer.addEventListener("datafetchend", (event) => {
    const data = event.detail;
    const nodes = new Map(data.nodes.map((node, i) => [`${i}`, node]));
    const links = new Map(
      data.links.map((link) => [`${link.source}-${link.target}`, link])
    );

    renderer.addEventListener("nodemouseenter", (event) => {
      const { id } = event.detail;
      status.textContent = `nodemouseenter ${id}`;
      const node = nodes.get(id);
      if (!node.checked) {
        node.fillColor = "green";
        renderer.update(true);
      }
    });

    renderer.addEventListener("nodemouseleave", (event) => {
      const { id } = event.detail;
      status.textContent = `nodemouseleave ${id}`;
      const node = nodes.get(id);
      if (!node.checked) {
        delete node.fillColor;
        renderer.update(true);
      }
    });

    renderer.addEventListener("linkclick", (event) => {
      const { source, target } = event.detail;
      status.textContent = `linkclick ${source}:${target}`;
      const link = links.get(`${source}-${target}`);
      if (link.checked) {
        link.checked = false;
        delete link.strokeColor;
      } else {
        link.checked = true;
        link.strokeColor = "red";
      }
      renderer.update(true);
    });

    renderer.addEventListener("linkmouseenter", (event) => {
      const { source, target } = event.detail;
      status.textContent = `linkmouseenter ${source}:${target}`;
      const link = links.get(`${source}-${target}`);
      if (!link.checked) {
        link.strokeColor = "green";
        renderer.update(true);
      }
    });

    renderer.addEventListener("linkmouseleave", (event) => {
      const { source, target } = event.detail;
      status.textContent = `linkmouseleave ${source}:${target}`;
      const link = links.get(`${source}-${target}`);
      if (!link.checked) {
        delete link.strokeColor;
        renderer.update(true);
      }
    });

    renderer.addEventListener("updateend", (event) => {
      const { preservePositions } = event.detail;
      if (!preservePositions) {
        renderer.center();
      }
    });

    renderer.addEventListener("nodeclick", (event) => {
      const { id } = event.detail;
      status.textContent = `nodeclick ${id}`;
      const node = nodes.get(id);
      if (node.checked) {
        node.checked = false;
        delete node.fillColor;
      } else {
        node.checked = true;
        node.fillColor = "red";
      }
      renderer.update(true);
    });

    renderer.addEventListener("nodedblclick", (event) => {
      status.textContent = `nodedblclick ${event.detail.id}`;
    });

    renderer.addEventListener("nodecontextmenu", (event) => {
      status.textContent = `nodecontextmenu ${event.detail.id}`;
    });
  });

  renderer.addEventListener("updateend", (event) => {
    renderer.center();
  });
});
