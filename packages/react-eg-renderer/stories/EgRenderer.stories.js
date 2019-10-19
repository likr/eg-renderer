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
      links.push({ source: i, target: j })
    }
  }
  return { nodes, links }
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
  .add('node attributes', () => {
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
            right: 'right',
            center: 'center'
          },
          'center'
        )}
        default-node-label-dx={number('default-node-label-dx', 0)}
        default-node-label-dy={number('default-node-label-dy', 0)}
        default-node-label-dx-base={select(
          'default-node-label-dx-base',
          { left: 'left', right: 'right', center: 'center' },
          'center'
        )}
        default-node-label-dy-base={select(
          'default-node-label-dy-base',
          { top: 'top', bottom: 'bottom', middle: 'middle' },
          'middle'
        )}
        default-link-source-marker-shape='circle'
        default-link-target-marker-shape='circle'
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
