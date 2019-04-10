import {
  interpolateGroup,
  interpolateVertex,
  interpolateEdge
} from '../../interpolate'
import { devicePixelRatio } from '../../device-pixel-ratio'
import {
  renderGroup,
  renderGroupLabel,
  renderEdge,
  renderEdgeLabel,
  renderEdgeRegion,
  renderVertex,
  renderVertexLabel
} from './render'

const renderObjects = (ctx, r, exit, enter, update, render, interpolate) => {
  if (r < 1) {
    ctx.globalAlpha = 1 - r
    for (const item of exit) {
      render(ctx, item)
    }
  }
  ctx.globalAlpha = Math.min(1, r)
  for (const item of enter) {
    render(ctx, item)
  }
  ctx.globalAlpha = 1
  for (const { current, next } of update) {
    if (r < 1) {
      render(ctx, interpolate(current, next, r))
    } else {
      render(ctx, next)
    }
  }
}

export class CanvasRenderer {
  constructor (canvas, layout, transform) {
    this.canvas = canvas
    this.t = transform
    this.layout = layout
  }

  render (r) {
    const margin = 10
    const { canvas, layout } = this
    const transform = this.t
    const ctx = canvas.getContext('2d')
    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(devicePixelRatio(), devicePixelRatio())
    ctx.translate(margin, margin)
    ctx.translate(transform.x, transform.y)
    ctx.scale(transform.k, transform.k)

    renderObjects(ctx, r, layout.exit.groups, layout.enter.groups, layout.update.groups, renderGroup, interpolateGroup)
    renderObjects(ctx, r, layout.exit.groups, layout.enter.groups, layout.update.groups, renderGroupLabel, interpolateGroup)
    if (this.enableLinkEvents) {
      renderObjects(ctx, r, layout.exit.edges, layout.enter.edges, layout.update.edges, renderEdgeRegion, interpolateEdge)
    }
    renderObjects(ctx, r, layout.exit.edges, layout.enter.edges, layout.update.edges, renderEdge, interpolateEdge)
    renderObjects(ctx, r, layout.exit.edges, layout.enter.edges, layout.update.edges, renderEdgeLabel, interpolateEdge)
    renderObjects(ctx, r, layout.exit.vertices, layout.enter.vertices, layout.update.vertices, renderVertex, interpolateVertex)
    renderObjects(ctx, r, layout.exit.vertices, layout.enter.vertices, layout.update.vertices, renderVertexLabel, interpolateVertex)

    ctx.restore()
  }

  resize () {
  }

  update (layout) {
    this.layout = layout
  }

  transform (transform) {
    this.t = transform
  }
}
