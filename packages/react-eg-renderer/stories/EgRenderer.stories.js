import React, { useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs/react'

import { EgRenderer } from '../src/eg-renderer'

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
