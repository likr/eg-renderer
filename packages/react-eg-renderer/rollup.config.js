import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/eg-renderer.js',
  output: {
    file: pkg.main,
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies)
  ]
}
