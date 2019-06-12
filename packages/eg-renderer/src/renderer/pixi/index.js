import { Application, Container, Graphics, Matrix, utils } from 'pixi.js'
import { devicePixelRatio } from '../../device-pixel-ratio'

const colorHex = (color) => {
  const { r, g, b } = color
  return utils.rgb2hex([r / 255, g / 255, b / 255])
}

const renderVertex = (context, vertex) => {
  context.clear()
  context.lineStyle(vertex.strokeWidth, colorHex(vertex.strokeColor))
  context.beginFill(colorHex(vertex.fillColor))
  context.drawEllipse(vertex.x, vertex.y, vertex.width / 2, vertex.height / 2)
}

const renderEdge = (context, edge) => {
  context.lineStyle(
    edge.strokeWidth,
    colorHex(edge.strokeColor),
    edge.strokeColor.opacity
  )
  context.moveTo(edge.points[0][0], edge.points[0][1])
  for (let j = 1; j < edge.points.length; ++j) {
    context.lineTo(edge.points[j][0], edge.points[j][1])
  }
}

export class PIXIRenderer {
  constructor(canvas, layout, transform) {
    this.app = new Application({
      autoStart: true,
      width: canvas.width,
      height: canvas.height,
      view: canvas,
      transparent: true,
      antialias: true,
      resolution: devicePixelRatio(),
      backgroundColor: 0xffffff
    })
    this.app.stage.addChild(new Graphics())
    this.app.stage.addChild(new Graphics())
    this.update(layout)
    this.transform(transform)
  }

  render(r) {
    this.app.render()
  }

  update(layout) {
    console.log('update')
    this.layout = layout
    this.app.stage.destroy()
    this.app.stage = new Container()

    const edges = new Container()
    edges.addChild(new Graphics())
    edges.addChild(new Graphics())
    edges.addChild(new Graphics())
    for (const edge of this.layout.enter.edges) {
      renderEdge(edges.children[0], edge)
    }
    for (const edge of this.layout.exit.edges) {
      renderEdge(edges.children[1], edge)
    }
    for (const { current: edge } of this.layout.update.edges) {
      renderEdge(edges.children[2], edge)
    }
    this.app.stage.addChild(edges)

    const vertices = new Container()
    vertices.addChild(new Container())
    vertices.addChild(new Container())
    vertices.addChild(new Container())
    for (const vertex of this.layout.enter.vertices) {
      const gfx = new Graphics()
      renderVertex(gfx, vertex)
      vertices.children[0].addChild(gfx)
    }
    for (const vertex of this.layout.exit.vertices) {
      const gfx = new Graphics()
      renderVertex(gfx, vertex)
      vertices.children[1].addChild(gfx)
    }
    for (const { current: vertex } of this.layout.update.vertices) {
      const gfx = new Graphics()
      renderVertex(gfx, vertex)
      vertices.children[2].addChild(gfx)
    }
    this.app.stage.addChild(vertices)
    console.log(this.app.stage.children[0])
  }

  resize(width, height) {
    console.log('resize', width, height)
    this.app.resize(width, height)
  }

  transform({ x, y, k }) {
    this.app.stage.transform.setFromMatrix(new Matrix(k, 0, 0, k, k + x, k + y))
  }
}
