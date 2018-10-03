import {initShader, initProgram} from './program'

const edgeShaderProgram = (gl) => {
  const vertexShader = initShader(gl, gl.VERTEX_SHADER, `#version 300 es
      layout(location = 0) in vec3 aPosition0;
      layout(location = 1) in vec3 aPosition1;
      layout(location = 2) in vec4 aColor0;
      layout(location = 3) in vec4 aColor1;
      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;
      uniform float r;
      out vec4 vColor;
      void main() {
        vColor = r * aColor1 + (1.0 - r) * aColor0;
        gl_Position = uPMatrix * uMVMatrix * vec4(r * aPosition1 + (1.0 - r) * aPosition0, 1.0);
      }
    `)
  const fragmentShader = initShader(gl, gl.FRAGMENT_SHADER, `#version 300 es
      precision mediump float;
      in vec4 vColor;
      out vec4 oFragColor;
      void main() {
        oFragColor = vColor;
      }
    `)
  return initProgram(gl, vertexShader, fragmentShader)
}

const lineGeometry = (points, width) => {
  const result = []
  {
    const [p1x, p1y] = points[0]
    const [p2x, p2y] = points[1]
    const theta1 = Math.atan2(p2y - p1y, p2x - p1x)
    result.push([
      width / Math.sqrt(2) * Math.cos(theta1 + 3 * Math.PI / 4) + p1x,
      width / Math.sqrt(2) * Math.sin(theta1 + 3 * Math.PI / 4) + p1y
    ])
    result.push([
      width / Math.sqrt(2) * Math.cos(theta1 - 3 * Math.PI / 4) + p1x,
      width / Math.sqrt(2) * Math.sin(theta1 - 3 * Math.PI / 4) + p1y
    ])
  }
  for (let j = 1; j < points.length - 1; ++j) {
    const [p1x, p1y] = points[j - 1]
    const [p2x, p2y] = points[j]
    const [p3x, p3y] = points[j + 1]
    const theta1 = Math.atan2(p2y - p1y, p2x - p1x)
    const theta2 = Math.atan2(p3y - p2y, p3x - p2x)
    result.push([
      width / Math.cos((theta1 - theta2) / 2) / 2 * Math.cos((theta1 + theta2 + Math.PI) / 2) + p2x,
      width / Math.cos((theta1 - theta2) / 2) / 2 * Math.sin((theta1 + theta2 + Math.PI) / 2) + p2y
    ])
    result.push([
      width / Math.cos((theta1 - theta2) / 2) / 2 * Math.cos((theta1 + theta2 - Math.PI) / 2) + p2x,
      width / Math.cos((theta1 - theta2) / 2) / 2 * Math.sin((theta1 + theta2 - Math.PI) / 2) + p2y
    ])
  }
  {
    const [p2x, p2y] = points[points.length - 2]
    const [p3x, p3y] = points[points.length - 1]
    const theta2 = Math.atan2(p3y - p2y, p3x - p2x)
    result.push([
      width / Math.sqrt(2) * Math.cos(theta2 + Math.PI / 4) + p3x,
      width / Math.sqrt(2) * Math.sin(theta2 + Math.PI / 4) + p3y
    ])
    result.push([
      width / Math.sqrt(2) * Math.cos(theta2 - Math.PI / 4) + p3x,
      width / Math.sqrt(2) * Math.sin(theta2 - Math.PI / 4) + p3y
    ])
  }
  return result
}

const setData = (data, elements, dataOffset, elementOffset, current, next, a0, a1) => {
  const r0 = current.strokeColor.r / 255
  const g0 = current.strokeColor.g / 255
  const b0 = current.strokeColor.b / 255
  const r1 = next.strokeColor.r / 255
  const g1 = next.strokeColor.g / 255
  const b1 = next.strokeColor.b / 255
  const geometry0 = lineGeometry(current.points, current.strokeWidth)
  const geometry1 = lineGeometry(next.points, next.strokeWidth)
  let dataOffsetStart = dataOffset
  for (let j = 0; j < geometry0.length; ++j) {
    data[dataOffset * 14] = geometry0[j][0]
    data[dataOffset * 14 + 1] = geometry0[j][1]
    data[dataOffset * 14 + 2] = 0
    data[dataOffset * 14 + 3] = geometry1[j][0]
    data[dataOffset * 14 + 4] = geometry1[j][1]
    data[dataOffset * 14 + 5] = 0
    data[dataOffset * 14 + 6] = r0
    data[dataOffset * 14 + 7] = g0
    data[dataOffset * 14 + 8] = b0
    data[dataOffset * 14 + 9] = a0
    data[dataOffset * 14 + 10] = r1
    data[dataOffset * 14 + 11] = g1
    data[dataOffset * 14 + 12] = b1
    data[dataOffset * 14 + 13] = a1
    dataOffset += 1
  }
  for (let j = 1; j < next.points.length; ++j) {
    elements[elementOffset * 3] = dataOffsetStart
    elements[elementOffset * 3 + 1] = dataOffsetStart + 1
    elements[elementOffset * 3 + 2] = dataOffsetStart + 2
    elements[elementOffset * 3 + 3] = dataOffsetStart + 1
    elements[elementOffset * 3 + 4] = dataOffsetStart + 2
    elements[elementOffset * 3 + 5] = dataOffsetStart + 3
    elementOffset += 2
    dataOffsetStart += 2
  }
}

export const setEdgeData = (gl, obj, layout) => {
  let vertexCount = 0
  let elementCount = 0
  for (const item of layout.enter.edges) {
    vertexCount += item.points.length * 2
    elementCount += (item.points.length - 1) * 2
  }
  for (const {next} of layout.update.edges) {
    vertexCount += next.points.length * 2
    elementCount += (next.points.length - 1) * 2
  }
  for (const item of layout.exit.edges) {
    vertexCount += item.points.length * 2
    elementCount += (item.points.length - 1) * 2
  }

  const data = new Float32Array(vertexCount * 14)
  const elements = new Uint16Array(elementCount * 3)

  let dataOffset = 0
  let elementOffset = 0
  for (let i = 0; i < layout.exit.edges.length; ++i) {
    const item = layout.exit.edges[i]
    setData(data, elements, dataOffset, elementOffset, item, item, 1, 0)
    dataOffset += 2 * item.points.length
    elementOffset += 2 * (item.points.length - 1)
  }
  for (let i = 0; i < layout.update.edges.length; ++i) {
    const {current, next} = layout.update.edges[i]
    setData(data, elements, dataOffset, elementOffset, current, next, current.strokeColor.opacity, next.strokeColor.opacity)
    dataOffset += 2 * next.points.length
    elementOffset += 2 * (next.points.length - 1)
  }
  for (let i = 0; i < layout.enter.edges.length; ++i) {
    const item = layout.enter.edges[i]
    setData(data, elements, dataOffset, elementOffset, item, item, 0, 1)
    dataOffset += 2 * item.points.length
    elementOffset += 2 * (item.points.length - 1)
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer.buffer)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  obj.vertexBuffer.data = data

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.elementBuffer.buffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, elements, gl.STATIC_DRAW)
  obj.elementBuffer.data = elements
}

export const edgeObject = (gl) => {
  const vertexBuffer = gl.createBuffer()
  const elementBuffer = gl.createBuffer()
  const program = edgeShaderProgram(gl)
  const position0Location = gl.getAttribLocation(program, 'aPosition0')
  const position1Location = gl.getAttribLocation(program, 'aPosition1')
  const color0Location = gl.getAttribLocation(program, 'aColor0')
  const color1Location = gl.getAttribLocation(program, 'aColor1')
  const edgeArray = gl.createVertexArray()
  gl.bindVertexArray(edgeArray)
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer)
  gl.enableVertexAttribArray(position0Location)
  gl.enableVertexAttribArray(position1Location)
  gl.enableVertexAttribArray(color0Location)
  gl.enableVertexAttribArray(color1Location)
  gl.vertexAttribPointer(position0Location, 3, gl.FLOAT, false, 56, 0)
  gl.vertexAttribPointer(position1Location, 3, gl.FLOAT, false, 56, 12)
  gl.vertexAttribPointer(color0Location, 4, gl.FLOAT, false, 56, 24)
  gl.vertexAttribPointer(color1Location, 4, gl.FLOAT, false, 56, 40)
  gl.bindVertexArray(null)
  return {
    mode: gl.TRIANGLES,
    program,
    vertexBuffer: {
      buffer: vertexBuffer,
      data: new Float32Array()
    },
    elementBuffer: {
      buffer: elementBuffer,
      data: new Uint16Array()
    },
    geometry: edgeArray
  }
}
