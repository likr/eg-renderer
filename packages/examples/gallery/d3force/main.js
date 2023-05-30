import * as d3 from "d3";
import "eg-renderer/umd/eg-renderer.js";
import wasmUrl from "eg-renderer/umd/eg-renderer.wasm?url";
egRenderer(wasmUrl);

customElements.whenDefined("eg-renderer").then(() => {
  const renderer = document.querySelector("eg-renderer");
  const width = renderer.width;
  const height = renderer.height;
  const simulation = d3
    .forceSimulation()
    .force(
      "link",
      d3.forceLink().id((d) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  d3.json("/data/miserables.json", (graph) => {
    const color = d3.scaleOrdinal(d3.schemeCategory20);
    graph.nodes.forEach((node) => {
      node.fillColor = color(node.group);
    });
    for (const link of graph.links) {
      link.strokeWidth = Math.sqrt(link.value);
      link.sourceId = link.source;
      link.targetId = link.target;
    }
    simulation.nodes(graph.nodes).on("tick", () => {
      renderer.load(graph);
    });

    simulation.force("link").links(graph.links);

    renderer.addEventListener("nodemovestart", (event) => {
      simulation.alphaTarget(0.3).restart();
      const { id } = event.detail;
      const node = graph.nodes.find((node) => node.id === id);
      node.fx = node.x;
      node.fy = node.y;
    });

    renderer.addEventListener("nodemove", (event) => {
      const { id, x, y } = event.detail;
      const node = graph.nodes.find((node) => node.id === id);
      node.fx = x;
      node.fy = y;
    });

    renderer.addEventListener("nodemoveend", (event) => {
      simulation.alphaTarget(0.0);
      const { id } = event.detail;
      const node = graph.nodes.find((node) => node.id === id);
      node.fx = null;
      node.fy = null;
    });
  });
});
