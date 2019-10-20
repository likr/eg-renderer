/* global customElements */
import React, { forwardRef, useEffect, useRef } from 'react'
import 'eg-renderer'

const useCombinedRefs = (...refs) => {
  const targetRef = React.useRef()

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

export const EgRenderer = forwardRef((props, ref) => {
  const innerRef = useRef(null)
  const rendererRef = useCombinedRefs(ref, innerRef)

  const { data, onDataFetchEnd, onNodeClick, onUpdateEnd } = props

  const handlers = [
    [
      'datafetchend',
      onDataFetchEnd,
      (event) => {
        onDataFetchEnd(event.detail)
      }
    ],
    [
      'nodeclick',
      onNodeClick,
      (event) => {
        onNodeClick(event.detail)
      }
    ],
    [
      'updateend',
      onUpdateEnd,
      () => {
        onUpdateEnd()
      }
    ]
  ]

  for (const [name, prop, handler] of handlers) {
    useEffect(() => {
      if (prop) {
        rendererRef.current.addEventListener(name, handler)
        return () => {
          rendererRef.current.removeEventListener(name, handler)
        }
      }
    }, [prop])
  }

  useEffect(() => {
    customElements.whenDefined('eg-renderer').then(() => {
      rendererRef.current.load(data)
    })
  }, [data])

  const childProps = Object.assign({}, props)
  delete childProps.data
  return <eg-renderer ref={rendererRef} {...childProps} />
})
