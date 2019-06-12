export const identity = () => {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
}

export const translate = (dx, dy, dz = 0) => {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, dx, dy, dz, 1])
}

export const scale = (sx, sy, sz = 1) => {
  return new Float32Array([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1])
}

export const cross = (v1, v2) => {
  return [
    v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0]
  ]
}

export const normalize = (v) => {
  const sum = v.reduce((a, b) => a + b)
  v.map((x) => x / sum)
  v.forEach((x, i) => {
    v[i] = x / sum
  })
}

export const matmul = (a, b) => {
  const c = new Float32Array(16)
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
      for (let k = 0; k < 4; ++k) {
        c[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j]
      }
    }
  }
  return c
}

export const viewingMatrix = (eye, up, target) => {
  const d = eye.map((e, i) => target[i] - e)
  const r = cross(d, up)
  const f = cross(r, d)
  normalize(d)
  normalize(r)
  normalize(f)
  return new Float32Array([
    r[0],
    f[0],
    -d[0],
    0,
    r[1],
    f[1],
    -d[1],
    0,
    r[2],
    f[2],
    -d[2],
    0,
    0,
    0,
    0,
    1
  ])
}

export const orthogonalMatrix = (left, right, top, bottom, near, far) => {
  const w = right - left
  const x = right + left
  const h = top - bottom
  const y = top + bottom
  const d = far - near
  const z = far + near
  return new Float32Array([
    2 / w,
    0,
    0,
    0,
    0,
    2 / h,
    0,
    0,
    0,
    0,
    -2 / d,
    0,
    -x / w,
    -y / h,
    -z / d,
    1
  ])
}
