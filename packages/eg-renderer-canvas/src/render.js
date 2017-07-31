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
    labelStrokeWidth
  } = args
  ctx.fillStyle = labelFillColor.toString()
  ctx.strokeStyle = labelStrokeColor.toString()
  ctx.lineWidth = labelStrokeWidth
}

const renderRectVertex = (ctx, args) => {
  const {
    u,
    x,
    y,
    width,
    height,
    label,
    strokeWidth
  } = args
  withContext(ctx, () => {
    ctx.translate(x, y)
    withContext(ctx, () => {
      setVertexStyles(ctx, args)
      ctx.beginPath()
      ctx.moveTo(-width / 2, -height / 2)
      ctx.lineTo(width / 2, -height / 2)
      ctx.lineTo(width / 2, height / 2)
      ctx.lineTo(-width / 2, height / 2)
      ctx.closePath()
      ctx.fill()
      if (strokeWidth > 0) {
        ctx.stroke()
      }
    })
    if (ctx.addHitRegion) {
      ctx.addHitRegion({id: u})
    }
    if (label) {
      setLabelStyles(ctx, args)
      ctx.textAlign = 'center'
      if (args.labelStrokeWidth > 0) {
        ctx.strokeText(label, 0, 4)
      }
      ctx.fillText(label, 0, 4)
    }
  })
}

const renderCircleVertex = (ctx, args) => {
  const {
    u,
    x,
    y,
    width,
    height,
    label,
    strokeWidth
  } = args
  withContext(ctx, () => {
    ctx.translate(x, y)
    withContext(ctx, () => {
      setVertexStyles(ctx, args)
      ctx.beginPath()
      ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fill()
      if (strokeWidth > 0) {
        ctx.stroke()
      }
    })
    if (ctx.addHitRegion) {
      ctx.addHitRegion({id: u})
    }
    if (label) {
      setLabelStyles(ctx, args)
      ctx.textAlign = 'center'
      if (args.labelStrokeWidth > 0) {
        ctx.strokeText(label, 0, 4)
      }
      ctx.fillText(label, 0, 4)
    }
  })
}

export const renderVertex = (ctx, args) => {
  switch (args.type) {
    case 'circle':
      renderCircleVertex(ctx, args)
      break
    case 'rect':
      renderRectVertex(ctx, args)
      break
  }
}

const renderLineEdge = (ctx, args) => {
  const {
    points,
    label,
    sourceMarkerShape,
    sourceMarkerSize,
    targetMarkerShape,
    targetMarkerSize
  } = args
  withContext(ctx, () => {
    withContext(ctx, () => {
      setEdgeStyles(ctx, args)
      ctx.beginPath()
      ctx.moveTo(points[0][0], points[0][1])
      for (let i = 1; i < points.length; ++i) {
        ctx.lineTo(points[i][0], points[i][1])
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

    if (label) {
      const x = (points[0][0] + points[points.length - 1][0]) / 2
      const y = (points[0][1] + points[points.length - 1][1]) / 2
      ctx.translate(x, y)
      setLabelStyles(ctx, args)
      ctx.textAlign = 'center'
      if (args.labelStrokeWidth > 0) {
        ctx.strokeText(label, 0, 4)
      }
      ctx.fillText(label, 0, 4)
    }
  })
}

const renderQuadraticCurve = (ctx, x1, y1, x2, y2) => {
  const dx = x2 - x1
  const dy = y2 - y1
  ctx.quadraticCurveTo(x1 + dx / 4, y1, x1 + dx / 2, y1 + dy / 2)
  ctx.quadraticCurveTo(x1 + 3 * dx / 4, y2, x2, y2)
}

const renderCurveEdge = (ctx, args) => {
  const {points} = args
  withContext(ctx, () => {
    setEdgeStyles(ctx, args)
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    ctx.lineTo(points[1][0], points[1][1])
    renderQuadraticCurve(ctx, points[1][0], points[1][1], points[2][0], points[2][1])
    ctx.lineTo(points[3][0], points[3][1])
    renderQuadraticCurve(ctx, points[3][0], points[3][1], points[4][0], points[4][1])
    ctx.lineTo(points[5][0], points[5][1])
    ctx.stroke()
  })
}

const renderArcEdge = (ctx, args) => {
  const {points} = args
  const dx = points[1][0] - points[0][0]
  const dy = points[1][1] - points[0][1]
  const r = Math.sqrt(dx * dx + dy + dy) / 2
  const cx = (points[0][0] + points[1][0]) / 2
  const cy = (points[0][1] + points[1][1]) / 2
  const theta = Math.atan(dy / dx)
  withContext(ctx, () => {
    setEdgeStyles(ctx, args)
    ctx.beginPath()
    ctx.arc(cx, cy, r, theta, theta + Math.PI)
    ctx.stroke()
  })
}

export const renderEdge = (ctx, args) => {
  switch (args.type) {
    case 'arc':
      renderArcEdge(ctx, args)
      break
    case 'hierarchy':
      renderCurveEdge(ctx, args)
      break
    case 'line':
      renderLineEdge(ctx, args)
      break
  }
}
