import {initShader, initProgram} from './program'

const labelShaderProgram = (gl) => {
  const vertexShader = initShader(gl, gl.VERTEX_SHADER, `#version 300 es
      layout(location = 0) in vec3 aPosition0;
      layout(location = 1) in vec3 aPosition1;
      layout(location = 2) in vec2 aTextureCoord;
      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;
      uniform float r;
      out vec2 vTextureCoord;
      void main() {
        vTextureCoord = aTextureCoord;
        gl_Position = uPMatrix * uMVMatrix * vec4(r * aPosition1 + (1.0 - r) * aPosition0, 1.0);
      }
    `)
  const fragmentShader = initShader(gl, gl.FRAGMENT_SHADER, `#version 300 es
      precision mediump float;
      uniform sampler2D image;
      in vec2 vTextureCoord;
      out vec4 oFragColor;
      void main() {
        vec4 smpColor = texture(image, vTextureCoord);
        oFragColor = smpColor;
      }
    `)
  return initProgram(gl, vertexShader, fragmentShader)
}

const labelObject = (gl) => {
  const vertexBuffer = gl.createBuffer()
  const elementBuffer = gl.createBuffer()
  const program = labelShaderProgram(gl)
  const position0Location = gl.getAttribLocation(program, 'aPosition0')
  const position1Location = gl.getAttribLocation(program, 'aPosition1')
  const textureCoordLocation = gl.getAttribLocation(program, 'aTextureCoord')
  const array = gl.createVertexArray()
  gl.bindVertexArray(array)
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer)
  gl.enableVertexAttribArray(position0Location)
  gl.enableVertexAttribArray(position1Location)
  gl.enableVertexAttribArray(textureCoordLocation)
  gl.vertexAttribPointer(position0Location, 3, gl.FLOAT, false, 32, 0)
  gl.vertexAttribPointer(position1Location, 3, gl.FLOAT, false, 32, 12)
  gl.vertexAttribPointer(textureCoordLocation, 2, gl.FLOAT, false, 32, 24)
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
    geometry: array
  }
}

const createTextImage = (text, options, scale) => {
  const canvas = document.createElement('canvas')
  canvas.width = 64 * scale
  canvas.height = 16 * scale
  const ctx = canvas.getContext('2d')
  ctx.font = `${options.labelFontSize * scale}px ${options.labelFontFamily}`
  ctx.fillStyle = options.labelFillColor.toString()
  ctx.strokeStyle = options.labelStrokeColor.toString()
  ctx.lineWidth = options.labelStrokeWidth * scale
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  return canvas
}

const createTexture = (gl, canvas) => {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
  gl.generateMipmap(gl.TEXTURE_2D)
  gl.bindTexture(gl.TEXTURE_2D, null)
  return texture
}

const createLabelObject = (gl, item) => {
  const scale = 2
  const canvas = createTextImage(item.label, item, scale)
  const texture = createTexture(gl, canvas)
  const obj = labelObject(gl)
  const {x, y} = item
  const width = canvas.width / scale
  const height = canvas.height / scale
  const data = new Float32Array([
    x - width / 2, y + height / 2, 0.0, x - width / 2, y + height / 2, 0.0, 0.0, 1.0,
    x + width / 2, y + height / 2, 0.0, x + width / 2, y + height / 2, 0.0, 1.0, 1.0,
    x - width / 2, y - height / 2, 0.0, x - width / 2, y - height / 2, 0.0, 0.0, 0.0,
    x + width / 2, y - height / 2, 0.0, x + width / 2, y - height / 2, 0.0, 1.0, 0.0
  ])
  const elements = new Uint16Array([0, 1, 2, 3, 2, 1])

  gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer.buffer)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  obj.vertexBuffer.data = data
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.elementBuffer.buffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, elements, gl.STATIC_DRAW)
  obj.elementBuffer.data = elements
  obj.texture = texture

  return obj
}

export const setLabelData = (gl, layout) => {
  const items = []
  for (const {next} of layout.update.vertices) {
    const item = next
    if (item.label) {
      items.push(createLabelObject(gl, item))
    }
  }
  for (const item of layout.enter.vertices) {
    if (item.label) {
      items.push(createLabelObject(gl, item))
    }
  }
  return items
}
