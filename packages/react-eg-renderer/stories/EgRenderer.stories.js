import React, { useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  color,
  number,
  object,
  select,
  withKnobs
} from '@storybook/addon-knobs/react'

import { EgRenderer } from '../src/eg-renderer'

const completeGraph = (n) => {
  const cx = 300
  const cy = 200
  const r = 150
  const nodes = Array.from({ length: n }).map((_, i) => {
    const t = (2 * Math.PI * i) / n - Math.PI / 2
    return {
      label: `node\n${i}`,
      x: r * Math.cos(t) + cx,
      y: r * Math.sin(t) + cy
    }
  })
  const links = []
  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      links.push({ source: i, target: j, label: `link\n${i}-${j}` })
    }
  }
  const groups = [
    {
      label: `group\n0`,
      x: cx,
      y: cy
    }
  ]
  return { nodes, links, groups }
}

const data = {
  nodes: [
    {
      label: 'source',
      type: 'circle',
      x: 100,
      y: 100,
      width: 120,
      height: 20,
      fillColor: 'green'
    },
    {
      label: 'target',
      type: 'rect',
      x: 200,
      y: 200,
      width: 120,
      height: 20,
      fillColor: 'red'
    }
  ],
  links: [
    {
      source: 0,
      target: 1,
      sourceMarkerShape: 'circle',
      targetMarkerShape: 'triangle'
    }
  ]
}

const data2 = completeGraph(5)

storiesOf('EgRenderer', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <EgRenderer
      width='600'
      height='400'
      data={object('data', data)}
      onNodeClick={action('node clicked')}
      onUpdateEnd={action('update end')}
    />
  ))
  .add('visual attributes', () => {
    const width = 600
    const height = 400
    return (
      <EgRenderer
        width={width}
        height={height}
        data={data2}
        default-node-width={number('default-node-width', 50, {
          min: 0,
          step: 10
        })}
        default-node-height={number('default-node-height', 50, {
          min: 0,
          step: 10
        })}
        default-node-type={select(
          'default-node-type',
          { circle: 'circle', rect: 'rect' },
          'circle'
        )}
        default-node-fill-color={color('default-node-fill-color', '#fff')}
        default-node-fill-opacity={number('default-node-fill-opacity', 1, {
          range: true,
          min: 0,
          max: 1,
          step: 0.01
        })}
        default-node-stroke-color={color('default-node-stroke-color', '#000')}
        default-node-stroke-opacity={number('default-node-stroke-opacity', 1, {
          range: true,
          min: 0,
          max: 1,
          step: 0.01
        })}
        default-node-stroke-width={number('default-node-stroke-width', 1, {
          min: 0
        })}
        default-node-label-font-size={number(
          'default-node-label-font-size',
          16
        )}
        default-node-label-fill-color={color(
          'default-node-label-fill-color',
          '#000'
        )}
        default-node-label-fill-opacity={number(
          'default-node-label-fill-opacity',
          1,
          {
            range: true,
            min: 0,
            max: 1,
            step: 0.01
          }
        )}
        default-node-label-stroke-color={color(
          'default-node-label-stroke-color',
          '#f00'
        )}
        default-node-label-stroke-opacity={number(
          'default-node-label-stroke-opacity',
          1,
          {
            range: true,
            min: 0,
            max: 1,
            step: 0.01
          }
        )}
        default-node-label-stroke-width={number(
          'default-node-label-stroke-width',
          0,
          {
            min: 0
          }
        )}
        default-node-label-text-align={select(
          'default-node-label-text-align',
          {
            left: 'left',
            center: 'center',
            right: 'right'
          },
          'center'
        )}
        default-node-label-dx={number('default-node-label-dx', 0)}
        default-node-label-dy={number('default-node-label-dy', 0)}
        default-node-label-dx-base={select(
          'default-node-label-dx-base',
          { left: 'left', center: 'center', right: 'right' },
          'center'
        )}
        default-node-label-dy-base={select(
          'default-node-label-dy-base',
          { top: 'top', middle: 'middle', bottom: 'bottom' },
          'middle'
        )}
        default-link-stroke-color={color('default-link-stroke-color', '#000')}
        default-link-stroke-opacity={number('default-link-stroke-opacity', 1, {
          range: true,
          min: 0,
          max: 1,
          step: 0.01
        })}
        default-link-stroke-width={number('default-link-stroke-width', 1, {
          min: 0
        })}
        default-link-source-marker-shape={select(
          'default-link-source-marker-shape',
          {
            none: '',
            circle: 'circle',
            triangle: 'triangle'
          },
          ''
        )}
        default-link-target-marker-shape={select(
          'default-link-target-marker-shape',
          {
            none: '',
            circle: 'circle',
            triangle: 'triangle'
          },
          ''
        )}
        default-link-source-marker-size={number(
          'default-link-source-marker-size',
          5,
          {
            min: 0
          }
        )}
        default-link-target-marker-size={number(
          'default-link-target-marker-size',
          5,
          {
            min: 0
          }
        )}
        default-link-label-font-size={number(
          'default-link-label-font-size',
          16
        )}
        default-link-label-fill-color={color(
          'default-link-label-fill-color',
          '#000'
        )}
        default-link-label-fill-opacity={number(
          'default-link-label-fill-opacity',
          1,
          {
            range: true,
            min: 0,
            max: 1,
            step: 0.01
          }
        )}
        default-link-label-stroke-color={color(
          'default-link-label-stroke-color',
          '#f00'
        )}
        default-link-label-stroke-opacity={number(
          'default-link-label-stroke-opacity',
          1,
          {
            range: true,
            min: 0,
            max: 1,
            step: 0.01
          }
        )}
        default-link-label-stroke-width={number(
          'default-link-label-stroke-width',
          0,
          {
            min: 0
          }
        )}
        default-link-label-text-align={select(
          'default-link-label-text-align',
          {
            left: 'left',
            right: 'right',
            center: 'center'
          },
          'center'
        )}
        default-link-label-dx={number('default-link-label-dx', 0)}
        default-link-label-dy={number('default-link-label-dy', 0)}
        default-link-label-dx-base={select(
          'default-link-label-dx-base',
          { left: 'left', right: 'right', center: 'center' },
          'center'
        )}
        default-link-label-dy-base={select(
          'default-link-label-dy-base',
          { top: 'top', bottom: 'bottom', middle: 'middle' },
          'middle'
        )}
        default-group-width={number('default-group-width', 380, {
          min: 0,
          step: 10
        })}
        default-group-height={number('default-group-height', 380, {
          min: 0,
          step: 10
        })}
        default-group-type={select(
          'default-group-type',
          { circle: 'circle', rect: 'rect' },
          'circle'
        )}
        default-group-fill-color={color('default-group-fill-color', '#fff')}
        default-group-fill-opacity={number('default-group-fill-opacity', 1, {
          range: true,
          min: 0,
          max: 1,
          step: 0.01
        })}
        default-group-stroke-color={color('default-group-stroke-color', '#000')}
        default-group-stroke-opacity={number(
          'default-group-stroke-opacity',
          1,
          {
            range: true,
            min: 0,
            max: 1,
            step: 0.01
          }
        )}
        default-group-stroke-width={number('default-group-stroke-width', 1, {
          min: 0
        })}
        default-group-label-font-size={number(
          'default-group-label-font-size',
          16
        )}
        default-group-label-fill-color={color(
          'default-group-label-fill-color',
          '#000'
        )}
        default-group-label-fill-opacity={number(
          'default-group-label-fill-opacity',
          1,
          {
            range: true,
            min: 0,
            max: 1,
            step: 0.01
          }
        )}
        default-group-label-stroke-color={color(
          'default-group-label-stroke-color',
          '#f00'
        )}
        default-group-label-stroke-opacity={number(
          'default-group-label-stroke-opacity',
          1,
          {
            range: true,
            min: 0,
            max: 1,
            step: 0.01
          }
        )}
        default-group-label-stroke-width={number(
          'default-group-label-stroke-width',
          0,
          {
            min: 0
          }
        )}
        default-group-label-text-align={select(
          'default-group-label-text-align',
          {
            left: 'left',
            center: 'center',
            right: 'right'
          },
          'center'
        )}
        default-group-label-dx={number('default-group-label-dx', 0)}
        default-group-label-dy={number('default-group-label-dy', 0)}
        default-group-label-dx-base={select(
          'default-group-label-dx-base',
          { left: 'left', center: 'center', right: 'right' },
          'center'
        )}
        default-group-label-dy-base={select(
          'default-group-label-dy-base',
          { top: 'top', middle: 'middle', bottom: 'bottom' },
          'middle'
        )}
        transition-duration={number('transition-duration', 500, {
          min: 0,
          step: 100
        })}
        no-auto-centering
      />
    )
  })
  .add('transition', () => {
    const [d, setData] = useState(data)
    return (
      <>
        <div>
          <EgRenderer
            width='600'
            height='400'
            data={d}
            transition-duration='1000'
            no-auto-centering
          />
        </div>
        <button
          onClick={() => {
            const newData = JSON.parse(JSON.stringify(d))
            for (const node of newData.nodes) {
              node.x = 600 * Math.random()
              node.y = 400 * Math.random()
            }
            setData(newData)
          }}
        >
          shuffle
        </button>
      </>
    )
  })
  .add('renderer functions', () => {
    const ref = useRef()
    return (
      <>
        <div>
          <EgRenderer
            ref={ref}
            width='600'
            height='400'
            data={object('data', data)}
          />
        </div>
        <button
          onClick={() => {
            ref.current.center()
          }}
        >
          reset zoom
        </button>
        <button
          onClick={() => {
            const { x, y } = ref.current.data.nodes[0]
            ref.current.focus(x, y)
          }}
        >
          focus node0
        </button>
        <button
          onClick={() => {
            const { x, y } = ref.current.data.nodes[1]
            ref.current.focus(x, y)
          }}
        >
          focus node1
        </button>
      </>
    )
  })
