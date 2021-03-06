# EgRenderer

## API

### Data Loading

JavaScript API

```javascript
window.customElements.whenDefined('eg-renderer').then(() => {
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      const renderer = document.querySelector('eg-renderer')
      renderer.graphNodesProperty = 'nodes' // use data['nodes'] as graph nodes (default: 'nodes')
      renderer.graphLinksProperty = 'links' // use data['links'] as graph links (default: 'links')
      renderer.nodeIdProperty = 'id' // use node['id'] as a node id (default: index of nodes)
      renderer.linkSourceProperty = 'source' // use link['source'] as a link source (default: 'source')
      renderer.linkTargetProperty = 'target' // use link['target'] as a link target (default: 'target')
      renderer.load(data) // load data as a graph
    })
})
```

HTML API

```html
<eg-renderer
  graph-nodes-property="nodes"
  graph-links-property="links"
  node-id-property="id"
  link-source-property="source"
  link-target-property="target"
  src="data.json"
>
</eg-renderer>
```

### Node Geometry

JavaScript API

```javascript
window.customElements.whenDefined('eg-renderer').then(() => {
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      const renderer = document.querySelector('eg-renderer')
      renderer.nodeXProperty = 'x'
      renderer.nodeYProperty = 'y'
      renderer.nodeWidthProperty = 'width'
      renderer.nodeHeightProperty = 'height'
      renderer.nodeTypeProperty = 'type'
      renderer.defaultNodeX = 0
      renderer.defaultNodeY = 0
      renderer.defaultNodeWidth = 10
      renderer.defaultNodeHeight = 10
      renderer.defaultNodeType = 'circle'
      renderer.load(data) // load data as a graph
    })
})
```

HTML API

```html
<eg-renderer
  node-x-property="x"
  node-y-property="y"
  node-width-property="width"
  node-height-property="height"
  node-type-property="type"
  default-node-x="0"
  default-node-y="0"
  default-node-width="10"
  default-node-height="10"
  default-node-type="circle"
  src="data.json"
>
</eg-renderer>
```

### Node Representation

JavaScript API

```javascript
window.customElements.whenDefined('eg-renderer').then(() => {
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      const renderer = document.querySelector('eg-renderer')
      renderer.nodeFillColorProperty = 'fillColor'
      renderer.nodeFillOpacityProperty = 'fillOpacity'
      renderer.nodeStrokeColorProperty = 'strokeColor'
      renderer.nodeStrokeOpacityProperty = 'strokeOpacity'
      renderer.nodeStrokeWidthProperty = 'strokeWidth'
      renderer.defaultNodeFillColor = '#fff'
      renderer.defaultNodeFillOpacity = 1
      renderer.defaultNodeStrokeColor = '#000'
      renderer.defaultNodeStrokeOpacity = 1
      renderer.defaultNodeStrokeWidth = 1
      renderer.load(data) // load data as a graph
    })
})
```

HTML API

```html
<eg-renderer
  node-fill-color-property="fillColor"
  node-fill-opacity-property="fillOpacity"
  node-stroke-color-property="strokeColor"
  node-stroke-opacity-property="strokeOpacity"
  node-stroke-width-property="strokeWidth"
  default-node-fill-color="#fff"
  default-node-fill-opacity="1"
  default-node-stroke-color="#000"
  default-node-stroke-opacity="1"
  default-node-stroke-width="1"
  src="data.json"
>
</eg-renderer>
```

### Node Label Representation

TODO

### Link Representation

TODO

### Link Label Representation

TODO

## API

### Properties

#### EgRendererElement.autoUpdate

#### EgRendererElement.autoCentering

#### EgRendererElement.src

#### EgRendererElement.width

#### EgRendererElement.height

#### EgRendererElement.graphNodesProperty

#### EgRendererElement.graphLinksProperty

#### EgRendererElement.nodeIdProperty

#### EgRendererElement.nodeXProperty

#### EgRendererElement.nodeYProperty

#### EgRendererElement.nodeWidthProperty

#### EgRendererElement.nodeHeightProperty

#### EgRendererElement.nodeTypeProperty

#### EgRendererElement.nodeFillColorProperty

#### EgRendererElement.nodeFillOpacityProperty

#### EgRendererElement.nodeStrokeColorProperty

#### EgRendererElement.nodeStrokeOpacityProperty

#### EgRendererElement.nodeStrokeWidthProperty

#### EgRendererElement.nodeLabelProperty

#### EgRendererElement.nodeLabelFillColorProperty

#### EgRendererElement.nodeLabelFillOpacityProperty

#### EgRendererElement.nodeLabelStrokeColorProperty

#### EgRendererElement.nodeLabelStrokeOpacityProperty

#### EgRendererElement.nodeLabelStrokeWidthProperty

#### EgRendererElement.nodeLabelFontSizeProperty

#### EgRendererElement.nodeLabelFontFamilyProperty

#### EgRendererElement.linkSourceProperty

#### EgRendererElement.linkTargetProperty

#### EgRendererElement.linkStrokeColorProperty

#### EgRendererElement.linkStrokeOpacityProperty

#### EgRendererElement.linkStrokeWidthProperty

#### EgRendererElement.linkSourceMarkerShapeProperty

#### EgRendererElement.linkSourceMarkerSizeProperty

#### EgRendererElement.linkTargetMarkerShapeProperty

#### EgRendererElement.linkTargetMarkerSizeProperty

#### EgRendererElement.linkLabelProperty

#### EgRendererElement.linkLabelFillColorProperty

#### EgRendererElement.linkLabelFillOpacityProperty

#### EgRendererElement.linkLabelStrokeColorProperty

#### EgRendererElement.linkLabelStrokeOpacityProperty

#### EgRendererElement.linkLabelStrokeWidthProperty

#### EgRendererElement.linkLabelFontSizeProperty

#### EgRendererElement.linkLabelFontFamilyProperty

#### EgRendererElement.defaultNodeX

#### EgRendererElement.defaultNodeY

#### EgRendererElement.defaultNodeWidth

#### EgRendererElement.defaultNodeHeight

#### EgRendererElement.defaultNodeType

#### EgRendererElement.defaultNodeFillColor

#### EgRendererElement.defaultNodeFillOpacity

#### EgRendererElement.defaultNodeStrokeColor

#### EgRendererElement.defaultNodeStrokeOpacity

#### EgRendererElement.defaultNodeStrokeWidth

#### EgRendererElement.defaultNodeLabel

#### EgRendererElement.defaultNodeLabelFillColor

#### EgRendererElement.defaultNodeLabelFillOpacity

#### EgRendererElement.defaultNodeLabelStrokeColor

#### EgRendererElement.defaultNodeLabelStrokeOpacity

#### EgRendererElement.defaultNodeLabelStrokeWidth

#### EgRendererElement.defaultNodeLabelFontSize

#### EgRendererElement.defaultNodeLabelFontFamily

#### EgRendererElement.defaultLinkStrokeColor

#### EgRendererElement.defaultLinkStrokeOpacity

#### EgRendererElement.defaultLinkStrokeWidth

#### EgRendererElement.defaultLinkSourceMarkerShape

#### EgRendererElement.defaultLinkSourceMarkerSize

#### EgRendererElement.defaultLinkTargetMarkerShape

#### EgRendererElement.defaultLinkTargetMarkerSize

#### EgRendererElement.defaultLinkLabel

#### EgRendererElement.defaultLinkLabelFillColor

#### EgRendererElement.defaultLinkLabelFillOpacity

#### EgRendererElement.defaultLinkLabelStrokeColor

#### EgRendererElement.defaultLinkLabelStrokeOpacity

#### EgRendererElement.defaultLinkLabelStrokeWidth

#### EgRendererElement.defaultLinkLabelFontSize

#### EgRendererElement.defaultLinkLabelFontFamily

### Methods

#### EgRendererElement.load()

#### EgRendererElement.center()

#### EgRendererElement.update()

## Integration with Other JavaScript Libraries and Frameworks

### jQuery

```javascript
$('eg-renderer')
  .attr('width', 960)
  .attr('height', 600)
  .attr('src', 'data.json')
```

### React

```jsx
import React from 'react'

export class Renderer extends React.Component {
  render() {
    const width = 960
    const height = 600
    const src = 'data.json'
    return <eg-renderer width={width} height={height} src={src} />
  }
}
```
