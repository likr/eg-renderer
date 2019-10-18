import { easeCubic as d3EaseCubic } from 'd3-ease'
import { color as d3Color } from 'd3-color'
import { select as d3Select } from 'd3-selection'
import { zoomIdentity as d3ZoomIdentity } from 'd3-zoom'
import { centerTransform, layoutRect } from './centering'
import { diff } from './interpolate'
import { devicePixelRatio } from './device-pixel-ratio'
import { zoom } from './zoom'
import { adjustEdge } from './marker-point'

const get = (...args) => {
  let d = args[0]
  const key = args[1]
  const attrs = key.split('.')
  for (const attr of attrs) {
    if (!(attr in d)) {
      if (args.length === 2) {
        throw new Error(`Object doesn't have an attribute ${key}`)
      }
      return args[2]
    }
    d = d[attr]
  }
  return d
}

const privates = new WeakMap()

const setWidth = (e, width) => {
  const p = privates.get(e)
  p.canvas.width = width * devicePixelRatio()
  p.canvas.style.width = `${width}px`
  if (p.renderer) {
    p.renderer.resize(e.width, e.height)
  }
}

const setHeight = (e, height) => {
  const p = privates.get(e)
  p.canvas.height = height * devicePixelRatio()
  p.canvas.style.height = `${height}px`
  if (p.renderer) {
    p.renderer.resize(e.width, e.height)
  }
}

const getter = (element, attributeName, defaultValue) => {
  if (!element.hasAttribute(attributeName)) {
    return defaultValue
  }
  return element.getAttribute(attributeName)
}

const includes = (v, x, y) => {
  if (v.type === 'circle') {
    const xa = (2 * (x - v.x)) / v.width
    const yb = (2 * (y - v.y)) / v.height
    return xa * xa + yb * yb <= 1
  }
  return (
    v.x - v.width / 2 <= x &&
    x <= v.x + v.width / 2 &&
    v.y - v.height / 2 <= y &&
    y <= v.y + v.height / 2
  )
}

export default (Renderer) => {
  return class EgRendererElement extends window.HTMLElement {
    static get observedAttributes() {
      return [
        'src',
        'width',
        'height',
        'graph-groups-property',
        'graph-nodes-property',
        'graph-links-property',
        'group-id-property',
        'group-x-property',
        'group-y-property',
        'group-width-property',
        'group-height-property',
        'group-type-property',
        'group-visibility-property',
        'group-fill-color-property',
        'group-fill-opacity-property',
        'group-stroke-color-property',
        'group-stroke-opacity-property',
        'group-stroke-width-property',
        'group-label-property',
        'group-label-dx-property',
        'group-label-dy-property',
        'group-label-fill-color-property',
        'group-label-fill-opacity-property',
        'group-label-stroke-color-property',
        'group-label-stroke-opacity-property',
        'group-label-stroke-width-property',
        'group-label-font-size-property',
        'group-label-font-family-property',
        'group-label-text-align-property',
        'group-label-text-baseline-property',
        'node-id-property',
        'node-x-property',
        'node-y-property',
        'node-width-property',
        'node-height-property',
        'node-type-property',
        'node-visibility-property',
        'node-fill-color-property',
        'node-fill-opacity-property',
        'node-stroke-color-property',
        'node-stroke-opacity-property',
        'node-stroke-width-property',
        'node-label-property',
        'node-label-dx-property',
        'node-label-dy-property',
        'node-label-fill-color-property',
        'node-label-fill-opacity-property',
        'node-label-stroke-color-property',
        'node-label-stroke-opacity-property',
        'node-label-stroke-width-property',
        'node-label-font-size-property',
        'node-label-font-family-property',
        'node-label-text-align-property',
        'node-label-text-baseline-property',
        'link-source-property',
        'link-target-property',
        'link-stroke-color-property',
        'link-stroke-opacity-property',
        'link-stroke-width-property',
        'link-visibility-property',
        'link-source-marker-shape-property',
        'link-source-marker-size-property',
        'link-target-marker-shape-property',
        'link-target-marker-size-property',
        'link-label-property',
        'link-label-dx-property',
        'link-label-dy-property',
        'link-label-fill-color-property',
        'link-label-fill-opacity-property',
        'link-label-stroke-color-property',
        'link-label-stroke-opacity-property',
        'link-label-stroke-width-property',
        'link-label-font-size-property',
        'link-label-font-family-property',
        'link-label-text-align-property',
        'link-label-text-baseline-property',
        'default-group-x',
        'default-group-y',
        'default-group-width',
        'default-group-height',
        'default-group-type',
        'default-group-visibility',
        'default-group-fill-color',
        'default-group-fill-opacity',
        'default-group-stroke-color',
        'default-group-stroke-opacity',
        'default-group-stroke-width',
        'default-group-label',
        'default-group-label-dx',
        'default-group-label-dy',
        'default-group-label-fill-color',
        'default-group-label-fill-opacity',
        'default-group-label-stroke-color',
        'default-group-label-stroke-opacity',
        'default-group-label-stroke-width',
        'default-group-label-font-size',
        'default-group-label-font-family',
        'default-group-label-text-align',
        'default-group-label-text-baseline',
        'default-node-x',
        'default-node-y',
        'default-node-width',
        'default-node-height',
        'default-node-type',
        'default-node-visibility',
        'default-node-fill-color',
        'default-node-fill-opacity',
        'default-node-stroke-color',
        'default-node-stroke-opacity',
        'default-node-stroke-width',
        'default-node-label',
        'default-node-label-dx',
        'default-node-label-dy',
        'default-node-label-fill-color',
        'default-node-label-fill-opacity',
        'default-node-label-stroke-color',
        'default-node-label-stroke-opacity',
        'default-node-label-stroke-width',
        'default-node-label-font-size',
        'default-node-label-font-family',
        'default-node-label-text-align',
        'default-node-label-text-baseline',
        'default-link-stroke-color',
        'default-link-stroke-opacity',
        'default-link-stroke-width',
        'default-link-visibility',
        'default-link-source-marker-shape',
        'default-link-source-marker-size',
        'default-link-target-marker-shape',
        'default-link-target-marker-size',
        'default-link-label',
        'default-link-label-dx',
        'default-link-label-dy',
        'default-link-label-fill-color',
        'default-link-label-fill-opacity',
        'default-link-label-stroke-color',
        'default-link-label-stroke-opacity',
        'default-link-label-stroke-width',
        'default-link-label-font-size',
        'default-link-label-font-family',
        'default-link-label-text-align',
        'default-link-label-text-baseline'
      ]
    }

    constructor() {
      super()
      const canvas = document.createElement('canvas')
      const p = {
        invalidate: false,
        invalidatePositions: false,
        originalData: null,
        canvas,
        data: {
          groupIds: [],
          groups: new Map(),
          vertexIds: [],
          vertices: new Map(),
          edgeIds: [],
          edges: new Map()
        },
        transform: {
          x: 0,
          y: 0,
          k: 1
        },
        currentRegion: null,
        layout: {
          update: {
            groups: [],
            vertices: [],
            edges: []
          },
          enter: {
            groups: [],
            vertices: [],
            edges: []
          },
          exit: {
            groups: [],
            vertices: [],
            edges: []
          }
        },
        margin: 10,
        layoutTime: 0,
        ease: d3EaseCubic,
        stop: false
      }

      p.zoom = zoom(this, p)
      privates.set(this, p)

      d3Select(p.canvas)
        .call(p.zoom)
        .on('dblclick.zoom', null)

      p.canvas.addEventListener('mousemove', (event) => {
        if (event.region) {
          const obj = JSON.parse(event.region)
          if (p.currentRegion == null) {
            if (obj.id) {
              const { id } = obj
              this.dispatchEvent(
                new window.CustomEvent('nodemouseenter', {
                  detail: { id }
                })
              )
            } else if (obj.source && obj.target) {
              const { source, target } = obj
              this.dispatchEvent(
                new window.CustomEvent('linkmouseenter', {
                  detail: { source, target }
                })
              )
            }
          }
          p.currentRegion = obj
        } else {
          if (p.currentRegion) {
            const obj = p.currentRegion
            if (obj.id) {
              const { id } = obj
              this.dispatchEvent(
                new window.CustomEvent('nodemouseleave', {
                  detail: { id }
                })
              )
            } else if (obj.source && obj.target) {
              const { source, target } = obj
              this.dispatchEvent(
                new window.CustomEvent('linkmouseleave', {
                  detail: { source, target }
                })
              )
            }
          }
          p.currentRegion = null
        }
        if (this.canDragNode && event.region) {
          const obj = JSON.parse(event.region)
          if (obj.id) {
            p.canvas.style.cursor = 'pointer'
          }
        } else if (this.canZoom) {
          p.canvas.style.cursor = 'move'
        } else {
          p.canvas.style.cursor = 'default'
        }
      })

      const events = ['click', 'dblclick', 'contextmenu']
      for (const name of events) {
        p.canvas.addEventListener(name, (event) => {
          const id = this.findNode(event.offsetX, event.offsetY)
          if (id) {
            if (name === 'contextmenu') {
              event.preventDefault()
            }
            this.dispatchEvent(
              new window.CustomEvent(`node${name}`, {
                detail: { id }
              })
            )
          }
        })
      }
    }

    connectedCallback() {
      const p = privates.get(this)
      this.appendChild(p.canvas)

      const render = () => {
        if (p.stop) {
          return
        }
        if (p.invalidate && p.originalData) {
          this.update(!p.invalidatePositions)
        }
        p.invalidate = false
        p.invalidatePositions = false
        const now = new Date()
        const transitionDuration = this.transitionDuration
        const t = Math.min(
          1,
          now > p.layoutTime
            ? (now - p.layoutTime) / transitionDuration
            : 1 / transitionDuration
        )
        const r = p.ease(t)
        p.renderer.enableLinkEvents = this.enableLinkEvents
        p.renderer.render(r)
        window.requestAnimationFrame(render)
      }

      p.renderer = new Renderer(p.canvas, p.layout, p.transform)
      this.invalidate()
      p.renderer.resize(p.canvas.width, p.canvas.height)
      render()
    }

    disconnectedCallback() {
      const p = privates.get(this)
      p.stop = true
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      switch (attr) {
        case 'src':
          window
            .fetch(newValue)
            .then((response) => response.json())
            .then((data) => {
              this.dispatchEvent(
                new window.CustomEvent('datafetchend', { detail: data })
              )
              this.load(data)
            })
          break
        case 'width':
          setWidth(this, newValue)
          break
        case 'height':
          setHeight(this, newValue)
          break
        default:
          this.invalidate()
      }
    }

    center() {
      const { canvas, data, margin, zoom } = privates.get(this)
      const items = [].concat(
        Array.from(data.vertices.values()),
        Array.from(data.groups.values())
      )
      const { layoutWidth, layoutHeight, left, top } = layoutRect(items)
      const canvasWidth = canvas.width / devicePixelRatio()
      const canvasHeight = canvas.height / devicePixelRatio()
      const { x, y, k } = centerTransform(
        layoutWidth,
        layoutHeight,
        left,
        top,
        canvasWidth,
        canvasHeight,
        margin
      )
      zoom.transform(
        d3Select(canvas),
        d3ZoomIdentity
          .translate(x, y)
          .scale(k)
          .translate(-left, -top)
      )
      return this
    }

    focus(x, y) {
      const { canvas, data, margin, zoom } = privates.get(this)
      const items = [].concat(
        Array.from(data.vertices.values()),
        Array.from(data.groups.values())
      )
      const { layoutWidth, layoutHeight, left, top } = layoutRect(items)
      const canvasWidth = canvas.width / devicePixelRatio()
      const canvasHeight = canvas.height / devicePixelRatio()
      const { k } = centerTransform(
        layoutWidth,
        layoutHeight,
        left,
        top,
        canvasWidth,
        canvasHeight,
        margin
      )
      zoom.transform(
        d3Select(canvas),
        d3ZoomIdentity
          .translate(x, y)
          .scale(k)
          .translate(-left, -top)
      )
      return this
    }

    load(data) {
      privates.get(this).originalData = data
      return this.update()
    }

    update(preservePositions = false) {
      const p = privates.get(this)
      p.prevData = p.data
      const data = p.originalData
      const groups = Array.from(get(data, this.graphGroupsProperty, []))
        .filter((group) =>
          get(group, this.groupVisibilityProperty, this.defaultGroupVisibility)
        )
        .map((group, i) => {
          const fillColor = d3Color(
            get(group, this.groupFillColorProperty, this.defaultGroupFillColor)
          )
          fillColor.opacity = +get(
            group,
            this.groupFillOpacityProperty,
            this.defaultGroupFillOpacity
          )
          const strokeColor = d3Color(
            get(
              group,
              this.groupStrokeColorProperty,
              this.defaultGroupStrokeColor
            )
          )
          strokeColor.opacity = +get(
            group,
            this.groupStrokeOpacityProperty,
            this.defaultGroupStrokeOpacity
          )
          const labelFillColor = d3Color(
            get(
              group,
              this.groupLabelFillColorProperty,
              this.defaultGroupLabelFillColor
            )
          )
          labelFillColor.opacity = +get(
            group,
            this.groupLabelFillOpacityProperty,
            this.defaultGroupLabelFillOpacity
          )
          const labelStrokeColor = d3Color(
            get(
              group,
              this.groupLabelStrokeColorProperty,
              this.defaultGroupLabelStrokeColor
            )
          )
          labelStrokeColor.opacity = +get(
            group,
            this.groupLabelStrokeOpacityProperty,
            this.defaultGroupLabelStrokeOpacity
          )
          const g = (this.groupIdProperty === '$index'
            ? i
            : get(group, this.groupIdProperty)
          ).toString()
          return {
            g,
            x:
              preservePositions && p.prevData.groups.has(g)
                ? p.prevData.groups.get(g).x
                : +get(group, this.groupXProperty, this.defaultGroupX),
            y:
              preservePositions && p.prevData.groups.has(g)
                ? p.prevData.groups.get(g).y
                : +get(group, this.groupYProperty, this.defaultGroupY),
            width: +get(group, this.groupWidthProperty, this.defaultGroupWidth),
            height: +get(
              group,
              this.groupHeightProperty,
              this.defaultGroupHeight
            ),
            type: get(group, this.groupTypeProperty, this.defaultGroupType),
            fillColor,
            strokeColor,
            strokeWidth: +get(
              group,
              this.groupStrokeWidthProperty,
              this.defaultGroupStrokeWidth
            ),
            label: get(group, this.groupLabelProperty, this.defaultGroupLabel),
            labelDx: get(
              group,
              this.groupLabelDxProperty,
              this.defaultGroupLabelDx
            ),
            labelDy: get(
              group,
              this.groupLabelDyProperty,
              this.defaultGroupLabelDy
            ),
            labelFillColor,
            labelStrokeColor,
            labelStrokeWidth: +get(
              group,
              this.groupLabelStrokeWidthProperty,
              this.defaultGroupLabelStrokeWidth
            ),
            labelFontSize: +get(
              group,
              this.groupLabelFontSizeProperty,
              this.defaultGroupLabelFontSize
            ),
            labelFontFamily: get(
              group,
              this.groupLabelFontFamilyProperty,
              this.defaultGroupLabelFontFamily
            ),
            labelTextAlign: get(
              group,
              this.groupLabelTextAlignProperty,
              this.defaultGroupLabelTextAlign
            ),
            labelTextBaseline: get(
              group,
              this.groupLabelTextBaselineProperty,
              this.defaultGroupLabelTextBaseline
            ),
            d: group
          }
        })
      const vertices = Array.from(get(data, this.graphNodesProperty))
        .filter((node) =>
          get(node, this.nodeVisibilityProperty, this.defaultNodeVisibility)
        )
        .map((node, i) => {
          const fillColor = d3Color(
            get(node, this.nodeFillColorProperty, this.defaultNodeFillColor)
          )
          fillColor.opacity = +get(
            node,
            this.nodeFillOpacityProperty,
            this.defaultNodeFillOpacity
          )
          const strokeColor = d3Color(
            get(node, this.nodeStrokeColorProperty, this.defaultNodeStrokeColor)
          )
          strokeColor.opacity = +get(
            node,
            this.nodeStrokeOpacityProperty,
            this.defaultNodeStrokeOpacity
          )
          const labelFillColor = d3Color(
            get(
              node,
              this.nodeLabelFillColorProperty,
              this.defaultNodeLabelFillColor
            )
          )
          labelFillColor.opacity = +get(
            node,
            this.nodeLabelFillOpacityProperty,
            this.defaultNodeLabelFillOpacity
          )
          const labelStrokeColor = d3Color(
            get(
              node,
              this.nodeLabelStrokeColorProperty,
              this.defaultNodeLabelStrokeColor
            )
          )
          labelStrokeColor.opacity = +get(
            node,
            this.nodeLabelStrokeOpacityProperty,
            this.defaultNodeLabelStrokeOpacity
          )
          const u = (this.nodeIdProperty === '$index'
            ? i
            : get(node, this.nodeIdProperty)
          ).toString()
          return {
            u,
            x:
              preservePositions && p.prevData.vertices.has(u)
                ? p.prevData.vertices.get(u).x
                : +get(node, this.nodeXProperty, this.defaultNodeX),
            y:
              preservePositions && p.prevData.vertices.has(u)
                ? p.prevData.vertices.get(u).y
                : +get(node, this.nodeYProperty, this.defaultNodeY),
            width: +get(node, this.nodeWidthProperty, this.defaultNodeWidth),
            height: +get(node, this.nodeHeightProperty, this.defaultNodeHeight),
            type: get(node, this.nodeTypeProperty, this.defaultNodeType),
            fillColor,
            strokeColor,
            strokeWidth: +get(
              node,
              this.nodeStrokeWidthProperty,
              this.defaultNodeStrokeWidth
            ),
            label: get(node, this.nodeLabelProperty, this.defaultNodeLabel),
            labelDx: get(
              node,
              this.nodeLabelDxProperty,
              this.defaultNodeLabelDx
            ),
            labelDy: get(
              node,
              this.nodeLabelDyProperty,
              this.defaultNodeLabelDy
            ),
            labelFillColor,
            labelStrokeColor,
            labelStrokeWidth: +get(
              node,
              this.nodeLabelStrokeWidthProperty,
              this.defaultNodeLabelStrokeWidth
            ),
            labelFontSize: +get(
              node,
              this.nodeLabelFontSizeProperty,
              this.defaultNodeLabelFontSize
            ),
            labelFontFamily: get(
              node,
              this.nodeLabelFontFamilyProperty,
              this.defaultNodeLabelFontFamily
            ),
            labelTextAlign: get(
              node,
              this.nodeLabelTextAlignProperty,
              this.defaultNodeLabelTextAlign
            ),
            labelTextBaseline: get(
              node,
              this.nodeLabelTextBaselineProperty,
              this.defaultNodeLabelTextBaseline
            ),
            inEdges: [],
            outEdges: [],
            d: node
          }
        })
      const indices = new Map(vertices.map(({ u }, i) => [u, i]))
      const edges = Array.from(get(data, this.graphLinksProperty))
        .filter((link) =>
          get(link, this.linkVisibilityProperty, this.defaultLinkVisibility)
        )
        .filter((link) => {
          const u = get(link, this.linkSourceProperty).toString()
          const v = get(link, this.linkTargetProperty).toString()
          return indices.has(u) && indices.has(v)
        })
        .map((link) => {
          const u = get(link, this.linkSourceProperty).toString()
          const v = get(link, this.linkTargetProperty).toString()
          const strokeColor = d3Color(
            get(link, this.linkStrokeColorProperty, this.defaultLinkStrokeColor)
          )
          strokeColor.opacity = +get(
            link,
            this.linkStrokeOpacityProperty,
            this.defaultLinkStrokeOpacity
          )
          const labelFillColor = d3Color(
            get(
              link,
              this.linkLabelFillColorProperty,
              this.defaultLinkLabelFillColor
            )
          )
          labelFillColor.opacity = +get(
            link,
            this.linkLabelFillOpacityProperty,
            this.defaultLinkLabelFillOpacity
          )
          const labelStrokeColor = d3Color(
            get(
              link,
              this.linkLabelStrokeColorProperty,
              this.defaultLinkLabelStrokeColor
            )
          )
          labelStrokeColor.opacity = +get(
            link,
            this.linkLabelStrokeOpacityProperty,
            this.defaultLinkLabelStrokeOpacity
          )
          const du = vertices[indices.get(u)]
          const dv = vertices[indices.get(v)]
          const newPoints = [[du.x, du.y]]
          for (const [x, y] of get(link, this.linkBendsProperty, [])) {
            newPoints.push([x, y])
          }
          newPoints.push([dv.x, dv.y])
          const points =
            preservePositions &&
            p.prevData.edges.has(u) &&
            p.prevData.edges.get(u).has(v)
              ? p.prevData.edges.get(u).get(v).points
              : newPoints
          const edge = {
            u,
            v,
            points,
            type: get(link, this.linkTypeProperty, this.defaultLinkType),
            strokeColor,
            strokeWidth: +get(
              link,
              this.linkStrokeWidthProperty,
              this.defaultLinkStrokeWidth
            ),
            sourceMarkerShape: get(
              link,
              this.linkSourceMarkerShapeProperty,
              this.defaultLinkSourceMarkerShape
            ),
            sourceMarkerSize: +get(
              link,
              this.linkSourceMarkerSizeProperty,
              this.defaultLinkSourceMarkerSize
            ),
            targetMarkerShape: get(
              link,
              this.linkTargetMarkerShapeProperty,
              this.defaultLinkTargetMarkerShape
            ),
            targetMarkerSize: +get(
              link,
              this.linkTargetMarkerSizeProperty,
              this.defaultLinkTargetMarkerSize
            ),
            label: get(link, this.linkLabelProperty, this.defaultLinkLabel),
            labelDx: get(
              link,
              this.linkLabelDxProperty,
              this.defaultLinkLabelDx
            ),
            labelDy: get(
              link,
              this.linkLabelDyProperty,
              this.defaultLinkLabelDy
            ),
            labelFillColor,
            labelStrokeColor,
            labelStrokeWidth: +get(
              link,
              this.linkLabelStrokeWidthProperty,
              this.defaultLinkLabelStrokeWidth
            ),
            labelFontSize: +get(
              link,
              this.linkLabelFontSizeProperty,
              this.defaultLinkLabelFontSize
            ),
            labelFontFamily: get(
              link,
              this.linkLabelFontFamilyProperty,
              this.defaultLinkLabelFontFamily
            ),
            labelTextAlign: get(
              link,
              this.linkLabelTextAlignProperty,
              this.defaultLinkLabelTextAlign
            ),
            labelTextBaseline: get(
              link,
              this.linkLabelTextBaselineProperty,
              this.defaultLinkLabelTextBaseline
            ),
            d: link
          }
          du.outEdges.push(edge)
          dv.inEdges.push(edge)
          return edge
        })
      p.data = {
        groupIds: groups.map(({ g }) => g),
        groups: new Map(groups.map((group) => [group.g, group])),
        vertexIds: vertices.map(({ u }) => u),
        vertices: new Map(vertices.map((vertex) => [vertex.u, vertex])),
        edgeIds: edges.map(({ u, v }) => [u, v]),
        edges: new Map(vertices.map((vertex) => [vertex.u, new Map()]))
      }
      for (const edge of edges) {
        p.data.edges.get(edge.u).set(edge.v, edge)
      }
      this.onLayout(p.data, preservePositions)
      for (const [u, v] of p.data.edgeIds) {
        const edge = p.data.edges.get(u).get(v)
        const du = p.data.vertices.get(u)
        const dv = p.data.vertices.get(v)
        adjustEdge(edge, du, dv)
      }
      p.layout = diff(p.prevData, p.data)
      if (p.renderer) {
        p.renderer.update(p.layout)
      }
      p.layoutTime = new Date()
      if (this.autoCentering) {
        this.center()
      }
      this.dispatchEvent(
        new window.CustomEvent('updateend', {
          detail: { preservePositions }
        })
      )
      return this
    }

    onLayout() {}

    invalidate() {
      if (this.autoUpdate) {
        privates.get(this).invalidate = true
      }
    }

    invalidatePositions() {
      if (this.autoUpdate) {
        privates.get(this).invalidatePositions = true
      }
    }

    findNode(px, py) {
      const p = privates.get(this)
      const t = p.transform
      const x = (px - t.x - p.margin) / t.k
      const y = (py - t.y - p.margin) / t.k

      let closest = null
      let closestDist = Infinity
      for (const vertex of p.data.vertices.values()) {
        if (includes(vertex, x, y)) {
          const dx = vertex.x - x
          const dy = vertex.y - y
          const dist = dx * dx + dy * dy
          if (dist < closestDist) {
            closest = vertex.u
            closestDist = dist
          }
        }
      }
      return closest
    }

    get autoUpdate() {
      return !this.hasAttribute('no-auto-update')
    }

    set autoUpdate(value) {
      if (value) {
        this.removeAttribute('no-auto-update')
      } else {
        this.setAttribute('no-auto-update', '')
      }
    }

    get autoCentering() {
      return !this.hasAttribute('no-auto-centering')
    }

    set autoCentering(value) {
      if (value) {
        this.removeAttribute('no-auto-centering')
      } else {
        this.setAttribute('no-auto-centering', '')
      }
    }

    get canZoom() {
      return !this.hasAttribute('no-zoom')
    }

    set canZoom(value) {
      if (value) {
        this.removeAttribute('no-zoom')
      } else {
        this.setAttribute('no-zoom', '')
      }
    }

    get canDragNode() {
      return !this.hasAttribute('no-drag-node')
    }

    set canDragNode(value) {
      if (value) {
        this.removeAttribute('no-drag-node')
      } else {
        this.setAttribute('no-drag-node', '')
      }
    }

    get enableLinkEvents() {
      return this.hasAttribute('enable-link-events')
    }

    set enableLinkEvents(value) {
      if (value) {
        this.removeAttribute('no-drag-node')
      } else {
        this.setAttribute('enable-link-events', '')
      }
    }

    get src() {
      return getter(this, 'src', null)
    }

    set src(value) {
      this.setAttribute('src', value)
    }

    get width() {
      return getter(this, 'width', 300)
    }

    set width(value) {
      this.setAttribute('width', value)
    }

    get height() {
      return getter(this, 'height', 150)
    }

    set height(value) {
      this.setAttribute('height', value)
    }

    get transitionDuration() {
      return getter(this, 'transition-duration', 0)
    }

    set transitionDuration(value) {
      this.setAttribute('transition-duration', value)
    }

    get graphGroupsProperty() {
      return getter(this, 'graph-groups-property', 'groups')
    }

    set graphGroupsProperty(value) {
      this.setAttribute('graph-groups-property', value)
    }

    get graphNodesProperty() {
      return getter(this, 'graph-nodes-property', 'nodes')
    }

    set graphNodesProperty(value) {
      this.setAttribute('graph-nodes-property', value)
    }

    get graphLinksProperty() {
      return getter(this, 'graph-links-property', 'links')
    }

    set graphLinksProperty(value) {
      this.setAttribute('graph-links-property', value)
    }

    get groupIdProperty() {
      return getter(this, 'group-id-property', '$index')
    }

    set groupIdProperty(value) {
      this.setAttribute('group-id-property', value)
    }

    get groupXProperty() {
      return getter(this, 'group-x-property', 'x')
    }

    set groupXProperty(value) {
      this.setAttribute('group-x-property', value)
    }

    get groupYProperty() {
      return getter(this, 'group-y-property', 'y')
    }

    set groupYProperty(value) {
      this.setAttribute('group-y-property', value)
    }

    get groupWidthProperty() {
      return getter(this, 'group-width-property', 'width')
    }

    set groupWidthProperty(value) {
      this.setAttribute('group-width-property', value)
    }

    get groupHeightProperty() {
      return getter(this, 'group-height-property', 'height')
    }

    set groupHeightProperty(value) {
      this.setAttribute('group-height-property', value)
    }

    get groupFillColorProperty() {
      return getter(this, 'group-fill-color-property', 'fillColor')
    }

    set groupFillColorProperty(value) {
      this.setAttribute('group-fill-color-property', value)
    }

    get groupFillOpacityProperty() {
      return getter(this, 'group-fill-opacity-property', 'fillOpacity')
    }

    set groupFillOpacityProperty(value) {
      this.setAttribute('group-fill-opacity-property', value)
    }

    get groupStrokeColorProperty() {
      return getter(this, 'group-stroke-color-property', 'strokeColor')
    }

    set groupStrokeColorProperty(value) {
      this.setAttribute('group-stroke-color-property', value)
    }

    get groupStrokeOpacityProperty() {
      return getter(this, 'group-stroke-opacity-property', 'strokeOpacity')
    }

    set groupStrokeOpacityProperty(value) {
      this.setAttribute('group-stroke-opacity-property', value)
    }

    get groupStrokeWidthProperty() {
      return getter(this, 'group-stroke-width-property', 'strokeWidth')
    }

    set groupStrokeWidthProperty(value) {
      this.setAttribute('group-stroke-width-property', value)
    }

    get groupTypeProperty() {
      return getter(this, 'group-type-property', 'type')
    }

    set groupTypeProperty(value) {
      this.setAttribute('group-type-property', value)
    }

    get groupVisibilityProperty() {
      return getter(this, 'group-visibility-property', 'visibility')
    }

    set groupVisibilityProperty(value) {
      this.setAttribute('group-visibility-property', value)
    }

    get groupLabelProperty() {
      return getter(this, 'group-label-property', 'label')
    }

    set groupLabelProperty(value) {
      this.setAttribute('group-label-property', value)
    }

    get groupLabelDxProperty() {
      return getter(this, 'group-label-dx-property', 'labelDx')
    }

    set groupLabelDxProperty(value) {
      this.setAttribute('group-label-dx-property', value)
    }

    get groupLabelDyProperty() {
      return getter(this, 'group-label-dy-property', 'labelDx')
    }

    set groupLabelDyProperty(value) {
      this.setAttribute('group-label-dy-property', value)
    }

    get groupLabelFillColorProperty() {
      return getter(this, 'group-label-fill-color-property', 'labelFillColor')
    }

    set groupLabelFillColorProperty(value) {
      this.setAttribute('group-label-fill-color-property', value)
    }

    get groupLabelFillOpacityProperty() {
      return getter(
        this,
        'group-label-fill-opacity-property',
        'labelFillOpacity'
      )
    }

    set groupLabelFillOpacityProperty(value) {
      this.setAttribute('group-label-fill-opacity-property', value)
    }

    get groupLabelStrokeColorProperty() {
      return getter(
        this,
        'group-label-stroke-color-property',
        'labelStrokeColor'
      )
    }

    set groupLabelStrokeColorProperty(value) {
      this.setAttribute('group-label-stroke-color-property', value)
    }

    get groupLabelStrokeOpacityProperty() {
      return getter(
        this,
        'group-label-stroke-opacity-property',
        'labelStrokeOpacity'
      )
    }

    set groupLabelStrokeOpacityProperty(value) {
      this.setAttribute('group-label-stroke-opacity-property', value)
    }

    get groupLabelStrokeWidthProperty() {
      return getter(
        this,
        'group-label-stroke-width-property',
        'labelStrokeWidth'
      )
    }

    set groupLabelStrokeWidthProperty(value) {
      this.setAttribute('group-label-stroke-width-property', value)
    }

    get groupLabelFontSizeProperty() {
      return getter(this, 'group-label-font-size-property', 'labelFontSize')
    }

    set groupLabelFontSizeProperty(value) {
      this.setAttribute('group-label-font-size-property', value)
    }

    get groupLabelFontFamilyProperty() {
      return getter(this, 'group-label-font-family-property', 'labelFontFamily')
    }

    set groupLabelFontFamilyProperty(value) {
      this.setAttribute('group-label-font-family-property', value)
    }

    get groupLabelTextAlignProperty() {
      return getter(this, 'group-label-text-align-property', 'labelTextAlign')
    }

    set groupLabelTextAlignProperty(value) {
      this.setAttribute('group-label-text-align-property', value)
    }

    get groupLabelTextBaselineProperty() {
      return getter(
        this,
        'group-label-text-baseline-property',
        'labelTextBaseline'
      )
    }

    set groupLabelTextBaselineProperty(value) {
      this.setAttribute('group-label-text-baseline-property', value)
    }

    get nodeIdProperty() {
      return getter(this, 'node-id-property', '$index')
    }

    set nodeIdProperty(value) {
      this.setAttribute('node-id-property', value)
    }

    get nodeXProperty() {
      return getter(this, 'node-x-property', 'x')
    }

    set nodeXProperty(value) {
      this.setAttribute('node-x-property', value)
    }

    get nodeYProperty() {
      return getter(this, 'node-y-property', 'y')
    }

    set nodeYProperty(value) {
      this.setAttribute('node-y-property', value)
    }

    get nodeWidthProperty() {
      return getter(this, 'node-width-property', 'width')
    }

    set nodeWidthProperty(value) {
      this.setAttribute('node-width-property', value)
    }

    get nodeHeightProperty() {
      return getter(this, 'node-height-property', 'height')
    }

    set nodeHeightProperty(value) {
      this.setAttribute('node-height-property', value)
    }

    get nodeFillColorProperty() {
      return getter(this, 'node-fill-color-property', 'fillColor')
    }

    set nodeFillColorProperty(value) {
      this.setAttribute('node-fill-color-property', value)
    }

    get nodeFillOpacityProperty() {
      return getter(this, 'node-fill-opacity-property', 'fillOpacity')
    }

    set nodeFillOpacityProperty(value) {
      this.setAttribute('node-fill-opacity-property', value)
    }

    get nodeStrokeColorProperty() {
      return getter(this, 'node-stroke-color-property', 'strokeColor')
    }

    set nodeStrokeColorProperty(value) {
      this.setAttribute('node-stroke-color-property', value)
    }

    get nodeStrokeOpacityProperty() {
      return getter(this, 'node-stroke-opacity-property', 'strokeOpacity')
    }

    set nodeStrokeOpacityProperty(value) {
      this.setAttribute('node-stroke-opacity-property', value)
    }

    get nodeStrokeWidthProperty() {
      return getter(this, 'node-stroke-width-property', 'strokeWidth')
    }

    set nodeStrokeWidthProperty(value) {
      this.setAttribute('node-stroke-width-property', value)
    }

    get nodeTypeProperty() {
      return getter(this, 'node-type-property', 'type')
    }

    set nodeTypeProperty(value) {
      this.setAttribute('node-type-property', value)
    }

    get nodeVisibilityProperty() {
      return getter(this, 'node-visibility-property', 'visibility')
    }

    set nodeVisibilityProperty(value) {
      this.setAttribute('node-visibility-property', value)
    }

    get nodeLabelProperty() {
      return getter(this, 'node-label-property', 'label')
    }

    set nodeLabelProperty(value) {
      this.setAttribute('node-label-property', value)
    }

    get nodeLabelDxProperty() {
      return getter(this, 'node-label-dx-property', 'labelDx')
    }

    set nodeLabelDxProperty(value) {
      this.setAttribute('node-label-dx-property', value)
    }

    get nodeLabelDyProperty() {
      return getter(this, 'node-label-dy-property', 'labelDx')
    }

    set nodeLabelDyProperty(value) {
      this.setAttribute('node-label-dy-property', value)
    }

    get nodeLabelFillColorProperty() {
      return getter(this, 'node-label-fill-color-property', 'labelFillColor')
    }

    set nodeLabelFillColorProperty(value) {
      this.setAttribute('node-label-fill-color-property', value)
    }

    get nodeLabelFillOpacityProperty() {
      return getter(
        this,
        'node-label-fill-opacity-property',
        'labelFillOpacity'
      )
    }

    set nodeLabelFillOpacityProperty(value) {
      this.setAttribute('node-label-fill-opacity-property', value)
    }

    get nodeLabelStrokeColorProperty() {
      return getter(
        this,
        'node-label-stroke-color-property',
        'labelStrokeColor'
      )
    }

    set nodeLabelStrokeColorProperty(value) {
      this.setAttribute('node-label-stroke-color-property', value)
    }

    get nodeLabelStrokeOpacityProperty() {
      return getter(
        this,
        'node-label-stroke-opacity-property',
        'labelStrokeOpacity'
      )
    }

    set nodeLabelStrokeOpacityProperty(value) {
      this.setAttribute('node-label-stroke-opacity-property', value)
    }

    get nodeLabelStrokeWidthProperty() {
      return getter(
        this,
        'node-label-stroke-width-property',
        'labelStrokeWidth'
      )
    }

    set nodeLabelStrokeWidthProperty(value) {
      this.setAttribute('node-label-stroke-width-property', value)
    }

    get nodeLabelFontSizeProperty() {
      return getter(this, 'node-label-font-size-property', 'labelFontSize')
    }

    set nodeLabelFontSizeProperty(value) {
      this.setAttribute('node-label-font-size-property', value)
    }

    get nodeLabelFontFamilyProperty() {
      return getter(this, 'node-label-font-family-property', 'labelFontFamily')
    }

    set nodeLabelFontFamilyProperty(value) {
      this.setAttribute('node-label-font-family-property', value)
    }

    get nodeLabelTextAlignProperty() {
      return getter(this, 'node-label-text-align-property', 'labelTextAlign')
    }

    set nodeLabelTextAlignProperty(value) {
      this.setAttribute('node-label-text-align-property', value)
    }

    get nodeLabelTextBaselineProperty() {
      return getter(
        this,
        'node-label-text-baseline-property',
        'labelTextBaseline'
      )
    }

    set nodeLabelTextBaselineProperty(value) {
      this.setAttribute('node-label-text-baseline-property', value)
    }

    get linkSourceProperty() {
      return getter(this, 'link-source-property', 'source')
    }

    set linkSourceProperty(value) {
      this.setAttribute('link-source-property', value)
    }

    get linkTargetProperty() {
      return getter(this, 'link-target-property', 'target')
    }

    set linkTargetProperty(value) {
      this.setAttribute('link-target-property', value)
    }

    get linkBendsProperty() {
      return getter(this, 'link-bends-property', 'bends')
    }

    set linkBendsProperty(value) {
      this.setAttribute('link-bends-property', value)
    }

    get linkStrokeColorProperty() {
      return getter(this, 'link-stroke-color-property', 'strokeColor')
    }

    set linkStrokeColorProperty(value) {
      this.setAttribute('link-stroke-color-property', value)
    }

    get linkStrokeOpacityProperty() {
      return getter(this, 'link-stroke-opacity-property', 'strokeOpacity')
    }

    set linkStrokeOpacityProperty(value) {
      this.setAttribute('link-stroke-opacity-property', value)
    }

    get linkStrokeWidthProperty() {
      return getter(this, 'link-stroke-width-property', 'strokeWidth')
    }

    set linkStrokeWidthProperty(value) {
      this.setAttribute('link-stroke-width-property', value)
    }

    get linkTypeProperty() {
      return getter(this, 'link-type-property', 'type')
    }

    set linkTypeProperty(value) {
      this.setAttribute('link-type-property', value)
    }

    get linkVisibilityProperty() {
      return getter(this, 'link-visibility-property', 'visibility')
    }

    set linkVisibilityProperty(value) {
      this.setAttribute('link-visibility-property', value)
    }

    get linkSourceMarkerShapeProperty() {
      return getter(
        this,
        'link-source-marker-shape-property',
        'sourceMarkerShape'
      )
    }

    set linkSourceMarkerShapeProperty(value) {
      this.setAttribute('link-source-marker-shape-property', value)
    }

    get linkSourceMarkerSizeProperty() {
      return getter(
        this,
        'link-source-marker-size-property',
        'sourceMarkerSize'
      )
    }

    set linkSourceMarkerSizeProperty(value) {
      this.setAttribute('link-source-marker-size-property', value)
    }

    get linkTargetMarkerShapeProperty() {
      return getter(
        this,
        'link-target-marker-shape-property',
        'targetMarkerShape'
      )
    }

    set linkTargetMarkerShapeProperty(value) {
      this.setAttribute('link-target-marker-shape-property', value)
    }

    get linkTargetMarkerSizeProperty() {
      return getter(
        this,
        'link-target-marker-size-property',
        'targetMarkerSize'
      )
    }

    set linkTargetMarkerSizeProperty(value) {
      this.setAttribute('link-target-marker-size-property', value)
    }

    get linkLabelProperty() {
      return getter(this, 'link-label-property', 'label')
    }

    set linkLabelProperty(value) {
      this.setAttribute('link-label-property', value)
    }

    get linkLabelDxProperty() {
      return getter(this, 'link-label-dx-property', 'labelDx')
    }

    set linkLabelDxProperty(value) {
      this.setAttribute('link-label-dx-property', value)
    }

    get linkLabelDyProperty() {
      return getter(this, 'link-label-dy-property', 'labelDx')
    }

    set linkLabelDyProperty(value) {
      this.setAttribute('link-label-dy-property', value)
    }

    get linkLabelFillColorProperty() {
      return getter(this, 'link-label-fill-color-property', 'labelFillColor')
    }

    set linkLabelFillColorProperty(value) {
      this.setAttribute('link-label-fill-color-property', value)
    }

    get linkLabelFillOpacityProperty() {
      return getter(
        this,
        'link-label-fill-opacity-property',
        'labelFillOpacity'
      )
    }

    set linkLabelFillOpacityProperty(value) {
      this.setAttribute('link-label-fill-opacity-property', value)
    }

    get linkLabelStrokeColorProperty() {
      return getter(
        this,
        'link-label-stroke-color-property',
        'labelStrokeColor'
      )
    }

    set linkLabelStrokeColorProperty(value) {
      this.setAttribute('link-label-stroke-color-property', value)
    }

    get linkLabelStrokeOpacityProperty() {
      return getter(
        this,
        'link-label-stroke-opacity-property',
        'labelStrokeOpacity'
      )
    }

    set linkLabelStrokeOpacityProperty(value) {
      this.setAttribute('link-label-stroke-opacity-property', value)
    }

    get linkLabelStrokeWidthProperty() {
      return getter(
        this,
        'link-label-stroke-width-property',
        'labelStrokeWidth'
      )
    }

    set linkLabelStrokeWidthProperty(value) {
      this.setAttribute('link-label-stroke-width-property', value)
    }

    get linkLabelFontSizeProperty() {
      return getter(this, 'link-label-font-size-property', 'labelFontSize')
    }

    set linkLabelFontSizeProperty(value) {
      this.setAttribute('link-label-font-size-property', value)
    }

    get linkLabelFontFamilyProperty() {
      return getter(this, 'link-label-font-family-property', 'labelFontFamily')
    }

    set linkLabelFontFamilyProperty(value) {
      this.setAttribute('link-label-font-family-property', value)
    }

    get linkLabelTextAlignProperty() {
      return getter(this, 'link-label-text-align-property', 'labelTextAlign')
    }

    set linkLabelTextAlignProperty(value) {
      this.setAttribute('link-label-text-align-property', value)
    }

    get linkLabelTextBaselineProperty() {
      return getter(
        this,
        'link-label-text-baseline-property',
        'labelTextBaseline'
      )
    }

    set linkLabelTextBaselineProperty(value) {
      this.setAttribute('link-label-text-baseline-property', value)
    }

    get defaultGroupX() {
      return getter(this, 'default-group-x', 0)
    }

    set defaultGroupX(value) {
      this.setAttribute('default-group-x', value)
    }

    get defaultGroupY() {
      return getter(this, 'default-group-y', 0)
    }

    set defaultGroupY(value) {
      this.setAttribute('default-group-y', value)
    }

    get defaultGroupWidth() {
      return getter(this, 'default-group-width', 10)
    }

    set defaultGroupWidth(value) {
      this.setAttribute('default-group-width', value)
    }

    get defaultGroupHeight() {
      return getter(this, 'default-group-height', 10)
    }

    set defaultGroupHeight(value) {
      this.setAttribute('default-group-height', value)
    }

    get defaultGroupFillColor() {
      return getter(this, 'default-group-fill-color', '#fff')
    }

    set defaultGroupFillColor(value) {
      this.setAttribute('default-group-fill-color', value)
    }

    get defaultGroupFillOpacity() {
      return getter(this, 'default-group-fill-opacity', 1)
    }

    set defaultGroupFillOpacity(value) {
      this.setAttribute('default-group-fill-opacity', value)
    }

    get defaultGroupStrokeColor() {
      return getter(this, 'default-group-stroke-color', '#000')
    }

    set defaultGroupStrokeColor(value) {
      this.setAttribute('default-group-stroke-color', value)
    }

    get defaultGroupStrokeOpacity() {
      return getter(this, 'default-group-stroke-opacity', 1)
    }

    set defaultGroupStrokeOpacity(value) {
      this.setAttribute('default-group-stroke-opacity', value)
    }

    get defaultGroupStrokeWidth() {
      return getter(this, 'default-group-stroke-width', 1)
    }

    set defaultGroupStrokeWidth(value) {
      this.setAttribute('default-group-stroke-width', value)
    }

    get defaultGroupType() {
      return getter(this, 'default-group-type', 'rect')
    }

    set defaultGroupType(value) {
      this.setAttribute('default-group-type', value)
    }

    get defaultGroupVisibility() {
      return getter(this, 'default-group-visibility', true)
    }

    set defaultGroupVisibility(value) {
      this.setAttribute('default-group-visibility', value)
    }

    get defaultGroupLabel() {
      return getter(this, 'default-group-label', '')
    }

    set defaultGroupLabel(value) {
      this.setAttribute('default-group-label', value)
    }

    get defaultGroupLabelDx() {
      return getter(this, 'default-group-label-dx', 0)
    }

    set defaultGroupLabelDx(value) {
      this.setAttribute('default-group-label-dx', value)
    }

    get defaultGroupLabelDy() {
      return getter(this, 'default-group-label-dy', 0)
    }

    set defaultGroupLabelDy(value) {
      this.setAttribute('default-group-label-dy', value)
    }

    get defaultGroupLabelFillColor() {
      return getter(this, 'default-group-label-fill-color', '#000')
    }

    set defaultGroupLabelFillColor(value) {
      this.setAttribute('default-group-label-fill-color', value)
    }

    get defaultGroupLabelFillOpacity() {
      return getter(this, 'default-group-label-fill-opacity', 1)
    }

    set defaultGroupLabelFillOpacity(value) {
      this.setAttribute('default-group-label-fill-opacity', value)
    }

    get defaultGroupLabelStrokeColor() {
      return getter(this, 'default-group-label-stroke-color', '#fff')
    }

    set defaultGroupLabelStrokeColor(value) {
      this.setAttribute('default-group-label-stroke-color', value)
    }

    get defaultGroupLabelStrokeOpacity() {
      return getter(this, 'default-group-label-stroke-opacity', 1)
    }

    set defaultGroupLabelStrokeOpacity(value) {
      this.setAttribute('default-group-label-stroke-opacity', value)
    }

    get defaultGroupLabelStrokeWidth() {
      return getter(this, 'default-group-label-stroke-width', 0)
    }

    set defaultGroupLabelStrokeWidth(value) {
      this.setAttribute('default-group-label-stroke-width', value)
    }

    get defaultGroupLabelFontSize() {
      return getter(this, 'default-group-label-font-size', 10)
    }

    set defaultGroupLabelFontSize(value) {
      this.setAttribute('default-group-label-font-size', value)
    }

    get defaultGroupLabelFontFamily() {
      return getter(this, 'default-group-label-font-family', 'serif')
    }

    set defaultGroupLabelFontFamily(value) {
      this.setAttribute('default-group-label-font-family', value)
    }

    get defaultGroupLabelTextAlign() {
      return getter(this, 'default-group-label-text-baseline', 'center')
    }

    set defaultGroupLabelTextAlign(value) {
      this.setAttribute('default-group-label-text-align', value)
    }

    get defaultGroupLabelTextBaseline() {
      return getter(this, 'default-group-label-text-baseline', 'middle')
    }

    set defaultGroupLabelTextBaseline(value) {
      this.setAttribute('default-group-label-text-baseline', value)
    }

    get defaultNodeX() {
      return getter(this, 'default-node-x', 0)
    }

    set defaultNodeX(value) {
      this.setAttribute('default-node-x', value)
    }

    get defaultNodeY() {
      return getter(this, 'default-node-y', 0)
    }

    set defaultNodeY(value) {
      this.setAttribute('default-node-y', value)
    }

    get defaultNodeWidth() {
      return getter(this, 'default-node-width', 10)
    }

    set defaultNodeWidth(value) {
      this.setAttribute('default-node-width', value)
    }

    get defaultNodeHeight() {
      return getter(this, 'default-node-height', 10)
    }

    set defaultNodeHeight(value) {
      this.setAttribute('default-node-height', value)
    }

    get defaultNodeFillColor() {
      return getter(this, 'default-node-fill-color', '#fff')
    }

    set defaultNodeFillColor(value) {
      this.setAttribute('default-node-fill-color', value)
    }

    get defaultNodeFillOpacity() {
      return getter(this, 'default-node-fill-opacity', 1)
    }

    set defaultNodeFillOpacity(value) {
      this.setAttribute('default-node-fill-opacity', value)
    }

    get defaultNodeStrokeColor() {
      return getter(this, 'default-node-stroke-color', '#000')
    }

    set defaultNodeStrokeColor(value) {
      this.setAttribute('default-node-stroke-color', value)
    }

    get defaultNodeStrokeOpacity() {
      return getter(this, 'default-node-stroke-opacity', 1)
    }

    set defaultNodeStrokeOpacity(value) {
      this.setAttribute('default-node-stroke-opacity', value)
    }

    get defaultNodeStrokeWidth() {
      return getter(this, 'default-node-stroke-width', 1)
    }

    set defaultNodeStrokeWidth(value) {
      this.setAttribute('default-node-stroke-width', value)
    }

    get defaultNodeType() {
      return getter(this, 'default-node-type', 'circle')
    }

    set defaultNodeType(value) {
      this.setAttribute('default-node-type', value)
    }

    get defaultNodeVisibility() {
      return getter(this, 'default-node-visibility', true)
    }

    set defaultNodeVisibility(value) {
      this.setAttribute('default-node-visibility', value)
    }

    get defaultNodeLabel() {
      return getter(this, 'default-node-label', '')
    }

    set defaultNodeLabel(value) {
      this.setAttribute('default-node-label', value)
    }

    get defaultNodeLabelDx() {
      return getter(this, 'default-node-label-dx', 0)
    }

    set defaultNodeLabelDx(value) {
      this.setAttribute('default-node-label-dx', value)
    }

    get defaultNodeLabelDy() {
      return getter(this, 'default-node-label-dy', 0)
    }

    set defaultNodeLabelDy(value) {
      this.setAttribute('default-node-label-dy', value)
    }

    get defaultNodeLabelFillColor() {
      return getter(this, 'default-node-label-fill-color', '#000')
    }

    set defaultNodeLabelFillColor(value) {
      this.setAttribute('default-node-label-fill-color', value)
    }

    get defaultNodeLabelFillOpacity() {
      return getter(this, 'default-node-label-fill-opacity', 1)
    }

    set defaultNodeLabelFillOpacity(value) {
      this.setAttribute('default-node-label-fill-opacity', value)
    }

    get defaultNodeLabelStrokeColor() {
      return getter(this, 'default-node-label-stroke-color', '#fff')
    }

    set defaultNodeLabelStrokeColor(value) {
      this.setAttribute('default-node-label-stroke-color', value)
    }

    get defaultNodeLabelStrokeOpacity() {
      return getter(this, 'default-node-label-stroke-opacity', 1)
    }

    set defaultNodeLabelStrokeOpacity(value) {
      this.setAttribute('default-node-label-stroke-opacity', value)
    }

    get defaultNodeLabelStrokeWidth() {
      return getter(this, 'default-node-label-stroke-width', 0)
    }

    set defaultNodeLabelStrokeWidth(value) {
      this.setAttribute('default-node-label-stroke-width', value)
    }

    get defaultNodeLabelFontSize() {
      return getter(this, 'default-node-label-font-size', 10)
    }

    set defaultNodeLabelFontSize(value) {
      this.setAttribute('default-node-label-font-size', value)
    }

    get defaultNodeLabelFontFamily() {
      return getter(this, 'default-node-label-font-family', 'serif')
    }

    set defaultNodeLabelFontFamily(value) {
      this.setAttribute('default-node-label-font-family', value)
    }

    get defaultNodeLabelTextAlign() {
      return getter(this, 'default-node-label-text-baseline', 'center')
    }

    set defaultNodeLabelTextAlign(value) {
      this.setAttribute('default-node-label-text-align', value)
    }

    get defaultNodeLabelTextBaseline() {
      return getter(this, 'default-node-label-text-baseline', 'middle')
    }

    set defaultNodeLabelTextBaseline(value) {
      this.setAttribute('default-node-label-text-baseline', value)
    }

    get defaultLinkStrokeColor() {
      return getter(this, 'default-link-stroke-color', '#000')
    }

    set defaultLinkStrokeColor(value) {
      this.setAttribute('default-link-stroke-color', value)
    }

    get defaultLinkStrokeOpacity() {
      return getter(this, 'default-link-stroke-opacity', 1)
    }

    set defaultLinkStrokeOpacity(value) {
      this.setAttribute('default-link-stroke-opacity', value)
    }

    get defaultLinkStrokeWidth() {
      return getter(this, 'default-link-stroke-width', 1)
    }

    set defaultLinkStrokeWidth(value) {
      this.setAttribute('default-link-stroke-width', value)
    }

    get defaultLinkType() {
      return getter(this, 'default-link-type', 'line')
    }

    set defaultLinkType(value) {
      this.setAttribute('default-link-type', value)
    }

    get defaultLinkVisibility() {
      return getter(this, 'default-link-visibility', true)
    }

    set defaultLinkVisibility(value) {
      this.setAttribute('default-link-visibility', value)
    }

    get defaultLinkSourceMarkerShape() {
      return getter(this, 'default-link-source-marker-shape', 'none')
    }

    set defaultLinkSourceMarkerShape(value) {
      this.setAttribute('default-link-source-marker-shape', value)
    }

    get defaultLinkSourceMarkerSize() {
      return getter(this, 'default-link-source-marker-size', 5)
    }

    set defaultLinkSourceMarkerSize(value) {
      this.setAttribute('default-link-source-marker-size', value)
    }

    get defaultLinkTargetMarkerShape() {
      return getter(this, 'default-link-target-marker-shape', 'none')
    }

    set defaultLinkTargetMarkerShape(value) {
      this.setAttribute('default-link-target-marker-shape', value)
    }

    get defaultLinkTargetMarkerSize() {
      return getter(this, 'default-link-target-marker-size', 5)
    }

    set defaultLinkTargetMarkerSize(value) {
      this.setAttribute('default-link-target-marker-size', value)
    }

    get defaultLinkLabel() {
      return getter(this, 'default-link-label', '')
    }

    set defaultLinkLabel(value) {
      this.setAttribute('default-link-label', value)
    }

    get defaultLinkLabelDx() {
      return getter(this, 'default-link-label-dx', 0)
    }

    set defaultLinkLabelDx(value) {
      this.setAttribute('default-link-label-dx', value)
    }

    get defaultLinkLabelDy() {
      return getter(this, 'default-link-label-dy', 0)
    }

    set defaultLinkLabelDy(value) {
      this.setAttribute('default-link-label-dy', value)
    }

    get defaultLinkLabelFillColor() {
      return getter(this, 'default-link-label-fill-color', '#000')
    }

    set defaultLinkLabelFillColor(value) {
      this.setAttribute('default-link-label-fill-color', value)
    }

    get defaultLinkLabelFillOpacity() {
      return getter(this, 'default-link-label-fill-opacity', 1)
    }

    set defaultLinkLabelFillOpacity(value) {
      this.setAttribute('default-link-label-fill-opacity', value)
    }

    get defaultLinkLabelStrokeColor() {
      return getter(this, 'default-link-label-stroke-color', '#fff')
    }

    set defaultLinkLabelStrokeColor(value) {
      this.setAttribute('default-link-label-stroke-color', value)
    }

    get defaultLinkLabelStrokeOpacity() {
      return getter(this, 'default-link-label-stroke-opacity', 1)
    }

    set defaultLinkLabelStrokeOpacity(value) {
      this.setAttribute('default-link-label-stroke-opacity', value)
    }

    get defaultLinkLabelStrokeWidth() {
      return getter(this, 'default-link-label-stroke-width', 0)
    }

    set defaultLinkLabelStrokeWidth(value) {
      this.setAttribute('default-link-label-stroke-width', value)
    }

    get defaultLinkLabelFontSize() {
      return getter(this, 'default-link-label-font-size', 10)
    }

    set defaultLinkLabelFontSize(value) {
      this.setAttribute('default-link-label-font-size', value)
    }

    get defaultLinkLabelFontFamily() {
      return getter(this, 'default-link-label-font-family', 'serif')
    }

    set defaultLinkLabelFontFamily(value) {
      this.setAttribute('default-link-label-font-family', value)
    }

    get defaultLinkLabelTextAlign() {
      return getter(this, 'default-link-label-text-baseline', 'center')
    }

    set defaultLinkLabelTextBaseline(value) {
      this.setAttribute('default-link-label-text-align', value)
    }

    get defaultLinkLabelTextBaseline() {
      return getter(this, 'default-link-label-text-baseline', 'middle')
    }

    set defaultLinkLabelTextAlign(value) {
      this.setAttribute('default-link-label-text-baseline', value)
    }

    get data() {
      return privates.get(this).originalData
    }
  }
}
