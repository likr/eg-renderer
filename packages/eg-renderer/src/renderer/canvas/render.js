const withContext = (ctx, f) => {
  ctx.save()
  f()
  ctx.restore()
}

const setVertexStyles = (ctx, args) => {
  const {
    fillColor,
    strokeColor,
    strokeWidth
  } = args
  ctx.fillStyle = fillColor.toString()
  ctx.strokeStyle = strokeColor.toString()
  ctx.lineWidth = strokeWidth
}

const setEdgeStyles = (ctx, args) => {
  const {
    strokeColor,
    strokeWidth
  } = args
  ctx.strokeStyle = strokeColor.toString()
  ctx.lineWidth = strokeWidth
}

const setLabelStyles = (ctx, args) => {
  const {
    labelFillColor,
    labelStrokeColor,
    labelStrokeWidth,
    labelFontSize,
    labelFontFamily
  } = args
  ctx.fillStyle = labelFillColor.toString()
  ctx.strokeStyle = labelStrokeColor.toString()
  ctx.lineWidth = labelStrokeWidth
  ctx.font = `${labelFontSize}px ${labelFontFamily}`
}

const renderRectVertex = (ctx, width, height) => {
  ctx.moveTo(-width / 2, -height / 2)
  ctx.lineTo(width / 2, -height / 2)
  ctx.lineTo(width / 2, height / 2)
  ctx.lineTo(-width / 2, height / 2)
  ctx.closePath()
}

const renderCircleVertex = (ctx, width, height) => {
  ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, 2 * Math.PI)
}

export const renderGroupLabel = (ctx, args) => {
  const {
    type,
    x,
    y,
    width,
    height,
    label
  } = args
  if (!label) {
    return
  }
  withContext(ctx, () => {
    setLabelStyles(ctx, args)
    switch (type) {
      case 'circle':
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.translate(x, y - height / 2)
        break
      case 'rect':
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.translate(x - width / 2 + 5, y - height / 2 + 5)
        break
    }
    const lines = label.split('\n')
    let offset = -lines.length * args.labelFontSize / 2
    for (const line of lines) {
      if (args.labelStrokeWidth > 0) {
        ctx.strokeText(line, 0, offset)
      }
      ctx.fillText(line, 0, offset)
      offset += args.labelFontSize
    }
  })
}

export const renderVertex = (ctx, args) => {
  const {
    type,
    u,
    x,
    y,
    width,
    height,
    strokeWidth
  } = args
  withContext(ctx, () => {
    ctx.translate(x, y)
    withContext(ctx, () => {
      setVertexStyles(ctx, args)
      ctx.beginPath()
      switch (type) {
        case 'circle':
          renderCircleVertex(ctx, width, height)
          break
        case 'rect':
          renderRectVertex(ctx, width, height)
          break
        default:
          throw new Error(`Unknown type "${type}"`)
      }
      ctx.closePath()
      ctx.fill()
      if (strokeWidth > 0) {
        ctx.stroke()
      }
    })
    if (ctx.addHitRegion) {
      ctx.addHitRegion({ id: JSON.stringify({ id: u }) })
    }
  })
}

export const renderVertexLabel = (ctx, args) => {
  const {
    x,
    y,
    label
  } = args
  if (!label) {
    return
  }
  withContext(ctx, () => {
    setLabelStyles(ctx, args)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    const lines = label.split('\n')
    let offset = -lines.length * args.labelFontSize / 2
    for (const line of lines) {
      if (args.labelStrokeWidth > 0) {
        ctx.strokeText(line, x, y + offset)
      }
      ctx.fillText(line, x, y + offset)
      offset += args.labelFontSize
    }
  })
}

const renderLineEdge = (ctx, points) => {
  ctx.moveTo(points[0][0], points[0][1])
  for (let i = 1; i < points.length; ++i) {
    ctx.lineTo(points[i][0], points[i][1])
  }
}

const renderQuadraticCurveEdge = (ctx, points) => {
  const n = points.length
  if (n < 3 || n % 2 === 0) {
    throw new Error(`The number of edge points should be an odd number greater than 2 for quadratic curve edges: got ${n}`)
  }
  ctx.moveTo(points[0][0], points[0][1])
  for (let i = 2; i < n; i += 2) {
    const [x1, y1] = points[i - 1]
    const [x2, y2] = points[i]
    ctx.quadraticCurveTo(x1, y1, x2, y2)
  }
}

const renderArcEdge = (ctx, points) => {
  const dx = points[1][0] - points[0][0]
  const dy = points[1][1] - points[0][1]
  const r = Math.sqrt(dx * dx + dy * dy) / 2
  const cx = (points[0][0] + points[1][0]) / 2
  const cy = (points[0][1] + points[1][1]) / 2
  const theta = Math.atan2(dy, dx)
  ctx.arc(cx, cy, r, theta, theta + Math.PI)
}

export const renderEdgeRegion = (ctx, args) => {
  const {
    u,
    v,
    points
  } = args
  withContext(ctx, () => {
    const x1 = points[0][0]
    const y1 = points[0][1]
    const x2 = points[points.length - 1][0]
    const y2 = points[points.length - 1][1]
    const theta = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2
    const d = 5
    ctx.strokeStyle = '#fff'
    ctx.moveTo(x1 + d * Math.cos(theta), y1 + d * Math.sin(theta))
    ctx.lineTo(x2 + d * Math.cos(theta), y2 + d * Math.sin(theta))
    ctx.lineTo(x2 + d * Math.cos(theta + Math.PI), y2 + d * Math.sin(theta + Math.PI))
    ctx.lineTo(x1 + d * Math.cos(theta + Math.PI), y1 + d * Math.sin(theta + Math.PI))
    ctx.closePath()
    ctx.stroke()
    if (ctx.addHitRegion) {
      ctx.addHitRegion({ id: JSON.stringify({ source: u, target: v }) })
    }
  })
}

export const renderEdge = (ctx, args) => {
  const {
    type,
    points,
    sourceMarkerShape,
    sourceMarkerSize,
    targetMarkerShape,
    targetMarkerSize
  } = args
  withContext(ctx, () => {
    withContext(ctx, () => {
      setEdgeStyles(ctx, args)
      ctx.beginPath()
      switch (type) {
        case 'arc':
          renderArcEdge(ctx, points)
          break
        case 'quadratic':
          renderQuadraticCurveEdge(ctx, points)
          break
        case 'line':
          renderLineEdge(ctx, points)
          break
        default:
          throw new Error(`Unknown type "${type}"`)
      }
      ctx.stroke()
    })

    switch (sourceMarkerShape) {
      case 'circle':
        withContext(ctx, () => {
          const [x, y] = points[0]
          const r = sourceMarkerSize / 2
          ctx.fillStyle = args.strokeColor.toString()
          ctx.translate(x, y)
          ctx.beginPath()
          ctx.ellipse(0, 0, r, r, 0, 0, 2 * Math.PI)
          ctx.fill()
        })
        break
      case 'triangle':
        withContext(ctx, () => {
          const [x, y] = points[0]
          const [x0, y0] = points[1]
          const theta = Math.atan2(y - y0, x - x0)
          const r = sourceMarkerSize * 2 / 3
          ctx.fillStyle = args.strokeColor.toString()
          ctx.beginPath()
          ctx.moveTo(x + Math.cos(theta) * r, y + Math.sin(theta) * r)
          ctx.lineTo(x + Math.cos(theta + Math.PI * 2 / 3) * r, y + Math.sin(theta + Math.PI * 2 / 3) * r)
          ctx.lineTo(x + Math.cos(theta + Math.PI * 4 / 3) * r, y + Math.sin(theta + Math.PI * 4 / 3) * r)
          ctx.closePath()
          ctx.fill()
        })
        break
    }

    switch (targetMarkerShape) {
      case 'circle':
        withContext(ctx, () => {
          const [x, y] = points[points.length - 1]
          const r = targetMarkerSize / 2
          ctx.fillStyle = args.strokeColor.toString()
          ctx.translate(x, y)
          ctx.beginPath()
          ctx.ellipse(0, 0, r, r, 0, 0, 2 * Math.PI)
          ctx.fill()
        })
        break
      case 'triangle':
        withContext(ctx, () => {
          const [x, y] = points[points.length - 1]
          const [x0, y0] = points[points.length - 2]
          const theta = Math.atan2(y - y0, x - x0)
          const r = targetMarkerSize * 2 / 3
          ctx.fillStyle = args.strokeColor.toString()
          ctx.beginPath()
          ctx.moveTo(x + Math.cos(theta) * r, y + Math.sin(theta) * r)
          ctx.lineTo(x + Math.cos(theta + Math.PI * 2 / 3) * r, y + Math.sin(theta + Math.PI * 2 / 3) * r)
          ctx.lineTo(x + Math.cos(theta + Math.PI * 4 / 3) * r, y + Math.sin(theta + Math.PI * 4 / 3) * r)
          ctx.closePath()
          ctx.fill()
        })
        break
    }
  })
}

export const renderEdgeLabel = (ctx, args) => {
  const {
    points,
    label
  } = args
  if (!label) {
    return
  }
  withContext(ctx, () => {
    const x = (points[0][0] + points[points.length - 1][0]) / 2
    const y = (points[0][1] + points[points.length - 1][1]) / 2
    setLabelStyles(ctx, args)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (args.labelStrokeWidth > 0) {
      ctx.strokeText(label, x, y)
    }
    ctx.fillText(label, x, y)
  })
}

export const renderGroup = (ctx, args) => {
  renderVertex(ctx, args)
}
