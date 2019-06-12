import { devicePixelRatio } from '../../device-pixel-ratio'
import { setVertexData } from './vertex'
import { setEdgeData } from './edge'
import { setLabelData } from './label'
import {
  identity,
  translate,
  scale,
  matmul,
  viewingMatrix,
  orthogonalMatrix
} from './matrix'

const margin = 10

const init = (gl, canvas) => {
  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  gl.blendFuncSeparate(
    gl.SRC_ALPHA,
    gl.ONE_MINUS_SRC_ALPHA,
    gl.ONE,
    gl.ONE_MINUS_SRC_ALPHA
  )
  gl.enable(gl.BLEND)
  gl.disable(gl.DEPTH_TEST)
  return {
    mvMatrix: translate(margin, margin),
    pMatrix: identity(),
    objects: {
      edges: [],
      vertices: [],
      labels: []
    }
  }
}

const draw = (gl, context, r) => {
  const { mvMatrix, pMatrix } = context
  gl.clear(gl.COLOR_BUFFER_BIT)

  for (const name in context.objects) {
    for (const obj of context.objects[name]) {
      gl.useProgram(obj.program)
      if (obj.texture) {
        gl.bindTexture(gl.TEXTURE_2D, obj.texture)
        const textureLocation = gl.getUniformLocation(obj.program, 'image')
        gl.uniform1i(textureLocation, 0)
      }
      const mvLocation = gl.getUniformLocation(obj.program, 'uMVMatrix')
      gl.uniformMatrix4fv(mvLocation, false, mvMatrix)
      const pLocation = gl.getUniformLocation(obj.program, 'uPMatrix')
      gl.uniformMatrix4fv(pLocation, false, pMatrix)
      const rLocation = gl.getUniformLocation(obj.program, 'r')
      gl.uniform1f(rLocation, r)
      gl.bindVertexArray(obj.geometry)
      gl.drawElements(
        obj.mode,
        obj.elementBuffer.data.length,
        gl.UNSIGNED_SHORT,
        0
      )
      gl.bindVertexArray(null)
    }
  }
}

export class WebGLRenderer {
  constructor(canvas) {
    this.canvas = canvas
    const gl = (this.gl = canvas.getContext('webgl2'))
    this.context = init(gl, canvas)
  }

  render(r) {
    draw(this.gl, this.context, r)
  }

  update(layout) {
    this.context.objects.vertices = setVertexData(this.gl, layout)
    this.context.objects.edges = setEdgeData(this.gl, layout)
    this.context.objects.label = setLabelData(this.gl, layout)
  }

  transform(transform) {
    const { x, y, k } = transform
    const mMatrix = matmul(
      scale(k, k),
      matmul(translate(x, y), translate(margin, margin))
    )
    this.context.mvMatrix = matmul(
      viewingMatrix([0, 0, 1], [0, 1, 0], [0, 0, 0]),
      mMatrix
    )
  }

  resize(width, height) {
    this.gl.viewport(
      0,
      0,
      width * devicePixelRatio(),
      height * devicePixelRatio()
    )
    const left = 0
    const right = width - 1
    const top = 0
    const bottom = height - 1
    const near = -10
    const far = 10
    this.context.pMatrix = orthogonalMatrix(left, right, top, bottom, near, far)
  }
}
