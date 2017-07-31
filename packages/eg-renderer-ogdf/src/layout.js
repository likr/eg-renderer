import {
  Graph,
  GraphAttributes,
  NodeList,
  BalloonLayout,
  CircularLayout,
  DavidsonHarelLayout,
  FastMultipoleEmbedder,
  FMMMLayout,
  PlanarizationLayout,
  SugiyamaLayout,
  TreeLayout,
  TutteLayout
} from 'emogdf'

const layoutMethods = {
  balloon: BalloonLayout,
  circular: CircularLayout,
  davidsonHarel: DavidsonHarelLayout,
  fastMultipoleEmbedder: FastMultipoleEmbedder,
  fmmm: FMMMLayout,
  planarization: PlanarizationLayout,
  sugiyama: SugiyamaLayout,
  tree: TreeLayout,
  tutte: TutteLayout
}

export const layout = (graphData, mode) => {
  const indexToNode = new Map()
  const graph = new Graph()
  for (const {u} of graphData.vertices) {
    indexToNode.set(u, graph.newNode())
  }
  for (const {u, v} of graphData.edges) {
    graph.newEdge(indexToNode.get(u), indexToNode.get(v))
  }

  const {
    nodeGraphics,
    edgeGraphics,
    nodeStyle,
    edgeStyle
  } = GraphAttributes
  const attributes = new GraphAttributes(graph, nodeGraphics | edgeGraphics | nodeStyle | edgeStyle)
  const nodes = new NodeList()
  graph.allNodes(nodes)
  for (const {u, width, height} of graphData.vertices) {
    const node = indexToNode.get(u)
    attributes.setWidth(node, width)
    attributes.setHeight(node, height)
  }

  const layout = new layoutMethods[mode]()
  layout.call(attributes)

  for (const vertex of graphData.vertices) {
    const {u} = vertex
    const node = indexToNode.get(u)
    vertex.x = attributes.x(node)
    vertex.y = attributes.y(node)
  }
  for (const edge of graphData.edges) {
    const {u, v} = edge
    const unode = indexToNode.get(u)
    const vnode = indexToNode.get(v)
    edge.points = [
      [attributes.x(unode), attributes.y(unode)],
      [attributes.x(vnode), attributes.y(vnode)]
    ]
  }
}
