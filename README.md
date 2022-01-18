# EgRenderer

Easy graph renderer for the Web.

## Example

index.html

```html
<script type="module">
  import "../../eg-renderer.js";
  egRenderer("../../eg-renderer.wasm");
</script>
<eg-renderer width="600" height="400" src="data.json"></eg-renderer>
```

data.json

```json
{
  "nodes": [
    {
      "label": "source",
      "type": "circle",
      "x": 100,
      "y": 100,
      "width": 120,
      "height": 20,
      "fillColor": "green"
    },
    {
      "label": "target",
      "type": "rect",
      "x": 200,
      "y": 200,
      "width": 120,
      "height": 20,
      "fillColor": "red"
    }
  ],
  "links": [
    {
      "source": 0,
      "target": 1,
      "sourceMarkerShape": "circle",
      "targetMarkerShape": "triangle"
    }
  ]
}
```

## Demos

https://likr.github.io/eg-renderer/

## Quick Start

Run following commands and open http://localhost:8080/ .

```console
$ pip install cookiecutter
$ cookiecutter gh:likr/cookiecutter-eg-renderer
$ cd {{repo_name}}
$ npm start
```
