import {initShader, initProgram} from './program'

const vertexShaderProgram = (gl) => {
  const vertexShader = initShader(gl, gl.VERTEX_SHADER, `#version 300 es
      layout(location = 0) in vec3 aPosition0;
      layout(location = 1) in vec3 aPosition1;
      layout(location = 2) in vec4 aColor0;
      layout(location = 3) in vec4 aColor1;
      layout(location = 4) in float aSize;
      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;
      uniform float r;
      out vec4 vColor;
      void main() {
        vec4 mvPosition = uMVMatrix * vec4(r * aPosition1 + (1.0 - r) * aPosition0, 1.0);
        gl_PointSize = aSize * uMVMatrix[0][0];
        gl_Position = uPMatrix * mvPosition;
        vColor = r * aColor1 + (1.0 - r) * aColor0;
      }
    `)
  const fragmentShader = initShader(gl, gl.FRAGMENT_SHADER, `#version 300 es
      precision mediump float;
      in vec4 vColor;
      out vec4 oFragColor;
      void main() {
        vec3 n;
        n.xy = gl_PointCoord * 2.0 - 1.0;
        n.z = 1.0 - dot( n.xy, n.xy );
        if (n.z < 0.0) {
          discard;
        }
        oFragColor = vColor;
      }
    `)
  return initProgram(gl, vertexShader, fragmentShader)
}

const setData = (data, index, current, next, a0, a1) => {
  data[index * 15] = current.x
  data[index * 15 + 1] = current.y
  data[index * 15 + 2] = 0
  data[index * 15 + 3] = next.x
  data[index * 15 + 4] = next.y
  data[index * 15 + 5] = 0
  data[index * 15 + 6] = current.fillColor.r / 255
  data[index * 15 + 7] = current.fillColor.g / 255
  data[index * 15 + 8] = current.fillColor.b / 255
  data[index * 15 + 9] = a0
  data[index * 15 + 10] = next.fillColor.r / 255
  data[index * 15 + 11] = next.fillColor.g / 255
  data[index * 15 + 12] = next.fillColor.b / 255
  data[index * 15 + 13] = a1
  data[index * 15 + 14] = next.width
}

export const setVertexData = (gl, obj, layout) => {
  const n = layout.enter.vertices.length + layout.update.vertices.length + layout.exit.vertices.length
  const data = new Float32Array(n * 15)
  let offset = 0
  for (let i = 0; i < layout.enter.vertices.length; ++i) {
    const item = layout.enter.vertices[i]
    setData(data, i, item, item, 0, 1)
  }
  offset += layout.enter.vertices.length
  for (let i = 0; i < layout.update.vertices.length; ++i) {
    const {current, next} = layout.update.vertices[i]
    setData(data, offset + i, current, next, current.fillColor.opacity, next.fillColor.opacity)
  }
  offset += layout.update.vertices.length
  for (let i = 0; i < layout.exit.vertices.length; ++i) {
    const item = layout.exit.vertices[i]
    setData(data, offset + i, item, item, 1, 0)
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer.buffer)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  obj.vertexBuffer.data = data

  const elements = new Uint16Array(n)
  for (let i = 0; i < n; ++i) {
    elements[i] = i
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.elementBuffer.buffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, elements, gl.STATIC_DRAW)
  obj.elementBuffer.data = elements
}

export const vertexObject = (gl) => {
  const vertexBuffer = gl.createBuffer()
  const elementBuffer = gl.createBuffer()
  const program = vertexShaderProgram(gl)
  const position0Location = gl.getAttribLocation(program, 'aPosition0')
  const position1Location = gl.getAttribLocation(program, 'aPosition1')
  const color0Location = gl.getAttribLocation(program, 'aColor0')
  const color1Location = gl.getAttribLocation(program, 'aColor1')
  const sizeLocation = gl.getAttribLocation(program, 'aSize')
  const vertexArray = gl.createVertexArray()
  gl.bindVertexArray(vertexArray)
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer)
  gl.enableVertexAttribArray(position0Location)
  gl.enableVertexAttribArray(position1Location)
  gl.enableVertexAttribArray(color0Location)
  gl.enableVertexAttribArray(color1Location)
  gl.enableVertexAttribArray(sizeLocation)
  gl.vertexAttribPointer(position0Location, 3, gl.FLOAT, false, 60, 0)
  gl.vertexAttribPointer(position1Location, 3, gl.FLOAT, false, 60, 12)
  gl.vertexAttribPointer(color0Location, 4, gl.FLOAT, false, 60, 24)
  gl.vertexAttribPointer(color1Location, 4, gl.FLOAT, false, 60, 40)
  gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, 60, 56)
  gl.bindVertexArray(null)
  return {
    mode: gl.POINTS,
    program,
    vertexBuffer: {
      buffer: vertexBuffer,
      data: new Float32Array()
    },
    elementBuffer: {
      buffer: elementBuffer,
      data: new Uint16Array()
    },
    geometry: vertexArray
  }
}
